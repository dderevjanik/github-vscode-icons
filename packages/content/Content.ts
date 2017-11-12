// Internal
import { LocalStorage } from '../common/LocalStorage';
import { sendMessage } from '../common/Messenger';
// Supported pages
import { initGithub } from './pages/GitHub';
import { initGitLab } from './pages/GitLab';
import { initBitBucket } from './pages/BitBucket';
import { initGistGithub } from './pages/GistGitHub';
import { initPasteBin } from './pages/PasteBin';
import { initSourceForge } from './pages/SourceForge';

const { host } = location;

(async function () {
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

