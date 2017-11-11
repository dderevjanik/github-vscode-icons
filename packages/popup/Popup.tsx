import * as React from 'react';
import * as ReactDOM from 'react-dom';

type AppState = {
    version: string;
    showIcons: {
        github: boolean;
        gist: boolean;
        gitlab: boolean;
        bitbucket: boolean;
        pastebin: boolean;
        sourceforge: boolean;
    },
};

const initialStorage: AppState = {
    version: chrome.runtime.getManifest().version,
    showIcons: {
        github: true,
        gist: true,
        gitlab: true,
        bitbucket: true,
        pastebin: true,
        sourceforge: true
    }
}

class Popup extends React.Component<AppState, AppState> {
    constructor(props: AppState) {
        super(props);
        this.state = props;
    }

    handleToggleClick = (hosting: keyof AppState['showIcons']) => {
        const newState: AppState = {
            ...this.state,
            showIcons: {
                ...this.state.showIcons,
                [hosting]: !this.state.showIcons[hosting]
            }
        };
        chrome.storage.local.set(newState);
        this.setState(newState);
    }

    handleResetButton = () => {
        const defaultState = initialStorage;
        chrome.storage.local.set(defaultState);
        this.setState(defaultState);
    }

    render() {
        const hostings = Object.keys(this.props.showIcons) as (keyof AppState['showIcons'])[];
        return (
            <div id="settings">
                <h3>vscode-icons for:</h3>
                <div>
                    {hostings.map((hosting, index) => (
                        <div key={index} className="form-group">
                            <label className="form-checkbox">
                                <input
                                    type="checkbox"
                                    checked={this.state.showIcons[hosting]}
                                    onChange={(_: any) => this.handleToggleClick(hosting)}
                                />
                                <i className="form-icon" /> {hosting}
                                {hosting}
                            </label>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

chrome.storage.local.get((storage) => {
    let store = storage as AppState;
    if (store.version === undefined) {
        // Extension is installed
        store = initialStorage;
    }
    ReactDOM.render(
        <Popup {...store} />,
        document.getElementById('app') as HTMLDivElement
    );
});
