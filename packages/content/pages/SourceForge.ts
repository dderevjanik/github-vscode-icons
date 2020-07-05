import { getIconForFile, getIconForFolder, getIconUrl } from '../utils/Icons';
import { isSourceForgeFiles } from '../utils/PageDetect';
import { mutate } from 'fastdom';
import { getFolderIcon, getFileIcon } from '../utils/Dev';

export const QUERY_SOURCEFORGE_ITEMS = '#files_list>tbody>tr';

function showIconsForFiles() {
  const items = document.querySelectorAll(QUERY_SOURCEFORGE_ITEMS);
  for (let i = 0; i < items.length; i++) {
    const item = items[i];

    const newIconEl = document.createElement('img');
    newIconEl.setAttribute('class', 'vscode-icon sf-icon');
    const iconAndNameEl = item.firstElementChild.firstElementChild as HTMLTableHeaderCellElement;

    const isFolder = item.className.includes('folder');
    if (isFolder) {
      /**
       * [TR:
       *  [TH: [A: [SVG: icon], [SPAN: folderName]]],
       *  [TD: [ABBR: date]],
       *  [TD: size],
       *  [TD: [DIV: Populated by JS], [DIV: [A: chart]]],
       * ]
       */

      const iconEl = iconAndNameEl.firstElementChild as HTMLSpanElement;
      const nameEl = iconAndNameEl.lastElementChild as HTMLAnchorElement;
      const name = nameEl.innerText.toLowerCase();
      const iconPath = getFolderIcon(name);
      mutate(() => {
        newIconEl.setAttribute('src', getIconUrl(iconPath));
        iconAndNameEl.replaceChild(newIconEl, iconEl);
      });
    } else {
      /**
       * [TR:
       *  [TH: [A: [SVG: icon]]],
       *  [TD: [ABBR: date]],
       *  [TD: size],
       *  [TD: [DIV: Populated by JS], [DIV: [A: chart]]],
       * ]
       */

      const nameEl = iconAndNameEl.firstElementChild as HTMLAnchorElement;
      const name = nameEl.innerText.toLowerCase();
      const iconPath = getFileIcon(name);
      mutate(() => {
        newIconEl.setAttribute('src', getIconUrl(iconPath));
        iconAndNameEl.insertBefore(newIconEl, nameEl);
      });
    }
  }
}

function update(e?: any) {
  if (isSourceForgeFiles) {
    showIconsForFiles();
  }
}

export function initSourceForge() {
  update();
}
