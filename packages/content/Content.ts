import { Github } from './pages/GitHub';
import { Gitlab } from './pages/GitLab';
import { Bitbucket } from './pages/BitBucket';
import { GistGithub } from './pages/GistGitHub';
import { Pastebin } from './pages/PasteBin';
import { SourceForge } from './pages/SourceForge';
import { sendMessage } from '../shared/Messenger';
import { HostConf } from '../shared/IConfig';

const hostLocation = location.host;

async function main() {
  console.log(`[VSCODE-ICONS] getting hostconf for '${hostLocation}'`)
  const host = await sendMessage({ type: "HOST_GET", payload: { hostLocation } }) as HostConf;
  console.log(host);
  console.log(`[VSCODE-ICONS] '${hostLocation}' is ${host ? 'supported' : 'not supported'}, showIcons:${host.showIcons}`);
  if (host.showIcons) {
    if (hostLocation.includes("bitbucket")) {
      new Bitbucket();
    } else if (hostLocation.includes("gist.github")) {
      new GistGithub();
    } else if (hostLocation.includes("github")) {
      new Github();
    } else if (hostLocation.includes("gitlab")) {
      new Gitlab();
    } else if (hostLocation.includes("pastebin")) {
      new Pastebin();
    } else if (hostLocation.includes("sourceforge")) {
      new SourceForge();
    } else {
      console.warn(`[VSCODE-ICONS] Inconsistency for ${hostLocation}`);
    }
  }
}

main();
