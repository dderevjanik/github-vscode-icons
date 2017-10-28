import { isGist } from '../utils/PageDetect';
import { getIconForFile, getIconUrl } from '../utils/Icons';

const showGistIcons = async () => {
  const fileInfos = document.querySelectorAll('.file-info');
  for (let i = 0; i < fileInfos.length; i++) {
    const fileInfo = fileInfos[i] as HTMLDivElement;
    const gistName = (fileInfo.lastElementChild.firstElementChild as HTMLSpanElement).innerText;
    const iconPath = getIconForFile(gistName);
    fileInfo.firstElementChild.innerHTML = `<img src="${getIconUrl(iconPath)}" alt="icon" class="vscode-icon">`;
  }
};

function update(e?: any) {
  if (isGist()) {
    showGistIcons();
  }
}

export function initGistGithub() {
  update();
}
