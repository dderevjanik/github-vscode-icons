import { isGist } from '../utils/PageDetect';
import { getIconForFile, getIconUrl } from '../utils/Icons';
import { mutate } from 'fastdom';

const showGistIcons = async () => {
  const fileInfos = document.querySelectorAll('.file-info');
  for (let i = 0; i < fileInfos.length; i++) {
    /**
     * [DIV:
     *  [SPAN: [SVG: icon]],
     *  [A: [STRONG: name]]
     * ]
     */
    const fileInfo = fileInfos[i] as HTMLDivElement;
    const gistName = (fileInfo.lastElementChild!.firstElementChild as HTMLSpanElement).innerText;
    const iconPath = getIconForFile(gistName);
    mutate(() => {
      fileInfo.firstElementChild!.innerHTML = `<img src="${getIconUrl(iconPath)}" alt="icon" class="vscode-icon">`;
    });
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
