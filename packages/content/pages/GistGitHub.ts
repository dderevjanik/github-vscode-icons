import { isGist } from '../utils/PageDetect';
import { getIconForFile, getIconUrl } from '../utils/Icons';
import { mutate } from 'fastdom';

export const QUERY_FILE_INFO = '.file-info';

const showGistIcons = async () => {
  const fileInfos = document.querySelectorAll(QUERY_FILE_INFO);
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
