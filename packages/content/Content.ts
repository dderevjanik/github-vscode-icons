// Internal
import { LocalStorage } from '../common/LocalStorage';
import { sendMessage } from '../common/Messenger';
import { getHostData } from '../common/HostData';
import { SupportedHostings } from '../common/SupportedHostings';
// Supported pages
import { initGithub } from './pages/GitHub';
import { initGitLab } from './pages/GitLab';
import { initBitBucket } from './pages/BitBucket';
import { initGistGithub } from './pages/GistGitHub';
import { initPasteBin } from './pages/PasteBin';
import { initSourceForge } from './pages/SourceForge';

const { hostLocation } = location;

(async function () {
  const storage = (await sendMessage({ type: 'STORAGE_GET' })) as LocalStorage;
  const hosts = Object.keys(storage.showIcons) as SupportedHostings[];
  hosts.forEach((host) => {
    const hostData = getHostData(host);
    if (hostLocation.includes(hostData.host)) {

    }
  })
  if (host.includes('github') && !host.includes('gist')) {
    initGithub();
  } else if (host.includes('gitlab')) {
    initGitLab();
  } else if (host.includes('bitbucket')) {
    initBitBucket();
  } else if (host.includes('gist') && !host.includes('github')) {
    initGistGithub();
  } else if (host.includes('pastebin')) {
    initPasteBin();
  } else if (host.includes('sourceforge')) {
    initSourceForge();
  }
})();

