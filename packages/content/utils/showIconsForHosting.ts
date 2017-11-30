import { SupportedHostings } from '../../common/SupportedHostings';
import { initBitBucket } from '../pages/BitBucket';
import { initGistGithub } from '../pages/GistGitHub';
import { initGithub } from '../pages/GitHub';
import { initGitLab } from '../pages/GitLab';
import { initPasteBin } from '../pages/PasteBin';
import { initSourceForge } from '../pages/SourceForge';

/**
 * @param host - will show icons on page for host
 */
export function showIconsForHosting(host: SupportedHostings) {
	const funcsToShowIcons: { [H in SupportedHostings]: () => void } = {
		bitbucket: initBitBucket,
		githubgist: initGistGithub,
		github: initGithub,
		gitlab: initGitLab,
		pastebin: initPasteBin,
		sourceforge: initSourceForge
	};
	funcsToShowIcons[host]();
}
