// Internal
import { LocalStorage } from '../common/LocalStorage';
import { sendMessage } from '../common/Messenger';
import { getHostData } from '../common/HostData';
import { SupportedHostings } from '../common/SupportedHostings';
import { showIconsForHosting } from './utils/showIconsForHosting';
// Supported pages
import { initGithub } from './pages/GitHub';
import { initGitLab } from './pages/GitLab';
import { initBitBucket } from './pages/BitBucket';
import { initGistGithub } from './pages/GistGitHub';
import { initPasteBin } from './pages/PasteBin';
import { initSourceForge } from './pages/SourceForge';

const hostLocation = location.host;

(async function() {
	const storage = (await sendMessage({ type: 'STORAGE_GET' })) as LocalStorage;
	const hosts = Object.keys(storage.showIcons) as SupportedHostings[];
	for (const host of hosts) {
		console.log('location', hostLocation, ' against', host);
		const hostingData = getHostData(host);
		const isShowIconsTurnedOn = storage.showIcons[host];
		if (isShowIconsTurnedOn && hostLocation.includes(hostingData.host)) {
			console.log('show fucking icons');
			showIconsForHosting(host);
			break; // we don't need to iterate over another hostings when already displayed icons
		}
	}
})();
