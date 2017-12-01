import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { LocalStorage } from '../common/LocalStorage';
import { sendMessage } from '../common/Messenger';
import { getHostData } from '../common/HostData';

type State = {
	storage: LocalStorage;
	isSomethingChanged: boolean;
};

type Props = {
	storage: LocalStorage;
};

class Popup extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			storage: props.storage,
			isSomethingChanged: false
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
			storage: newStorage,
			isSomethingChanged: true
		});
	};

	handleResetButton = async () => {
		const defaultState = (await sendMessage({ type: 'STORAGE_RESET' })) as LocalStorage;
		this.setState({
			storage: defaultState
		});
	};

	render() {
		const hostings = Object.keys(this.props.storage.showIcons) as (keyof LocalStorage['showIcons'])[];
		const changedText = this.state.isSomethingChanged ? (
			<p style={{ color: 'orange' }}>
				<i>In order to see changes on pages, please reload them using refresh button</i>
			</p>
		) : null;
		return (
			<div id="settings">
				<h3>display icons for:</h3>
				<div>
					{hostings.map((hosting, index) => {
						const hostData = getHostData(hosting);
						return (
							<div
								key={index}
								className="form-group"
								style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
							>
								<label className="form-checkbox">
									{hostData.fullName}
									<input
										type="checkbox"
										checked={this.state.storage.showIcons[hosting]}
										onChange={(_: any) => this.handleToggleClick(hosting)}
									/>
									<i className="form-icon" />
								</label>
								<img className="vsi-icon" src={chrome.runtime.getURL(`favicons/${hostData.favicon}`)} />
							</div>
						);
					})}
					{changedText}
				</div>
				{/* <button onClick={this.handleResetButton}>Reset</button> */}
			</div>
		);
	}
}

(async function() {
	const storage = (await sendMessage({ type: 'STORAGE_GET' })) as LocalStorage;
	console.log(storage);
	ReactDOM.render(<Popup storage={storage} />, document.getElementById('app') as HTMLDivElement);
})();
