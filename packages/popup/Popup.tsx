import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { LocalStorage } from '../common/LocalStorage';
import { sendMessage } from '../common/Messenger';

type State = {
    storage: LocalStorage
};

type Props = {
    storage: LocalStorage
};

class Popup extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            storage: props.storage
        };
    }

    handleToggleClick = (hosting: keyof LocalStorage['showIcons']) => {
        const prevStorage = this.state.storage;
        const newStorage: LocalStorage = {
            ...prevStorage,
            showIcons: {
                ...prevStorage.showIcons,
                [hosting]: !prevStorage.showIcons[hosting]
            }
        };
        sendMessage({ type: 'STORAGE_SET', storage: newStorage });
        this.setState({
            storage: newStorage
        });
    }

    handleResetButton = async () => {
        const defaultState = await sendMessage({ type: 'STORAGE_RESET' }) as LocalStorage;
        this.setState({
            storage: defaultState
        });
    }

    render() {
        const hostings = Object.keys(this.props.storage.showIcons) as (keyof LocalStorage['showIcons'])[];
        return (
            <div id="settings">
                <h3>vscode-icons for:</h3>
                <div>
                    {hostings.map((hosting, index) => (
                        <div key={index} className="form-group" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <label className="form-checkbox">
                                {hosting}
                                <input
                                    type="checkbox"
                                    checked={this.state.storage.showIcons[hosting]}
                                    onChange={(_: any) => this.handleToggleClick(hosting)}
                                />
                                <i className="form-icon" />
                            </label>
                            <img src={chrome.runtime.getURL(`favicons/${hosting}-favicon.ico`)} width="16" height="16" />
                        </div>
                    ))}
                </div>
                {/* <button onClick={this.handleResetButton}>Reset</button> */}
            </div>
        );
    }
}

(async function () {
    const storage = await sendMessage({ type: 'STORAGE_GET' }) as LocalStorage;
    console.log(storage);
    ReactDOM.render(
        <Popup storage={storage} />,
        document.getElementById('app') as HTMLDivElement
    );
})();
