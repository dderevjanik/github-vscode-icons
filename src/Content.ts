import { initGithub } from './pages/GitHub';
import { initGitLab } from './pages/GitLab';
import { initBitBucket } from './pages/BitBucket';
import { initGistGithub } from './pages/GistGitHub';
import { initPasteBin } from './pages/PasteBin';

const host = location.host;

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
}
