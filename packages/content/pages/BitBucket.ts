import { getIconForFile, getIconForFolder, getIconForOpenFolder, getIconUrl, DEFAULT_ROOT } from '../utils/Icons';
import { getFileIcon, getFolderIcon } from '../utils/Dev';
import { isBitBucketRepo } from '../utils/PageDetect';
import { mutate } from 'fastdom';

export const QUERY_FILE_TABLE_ROWS = 'table[data-qa="repository-directory"] > tbody > tr';
export const QUERY_ICONS_TO_REPLACE = `${QUERY_FILE_TABLE_ROWS} a svg`;

function showRepoTreeIcons() {
  if (!isBitBucketRepo()) return;
  if (!document.querySelector(QUERY_FILE_TABLE_ROWS) || !document.querySelector(QUERY_ICONS_TO_REPLACE)) return;
  const treeItems = document.querySelectorAll<HTMLTableRowElement>(QUERY_FILE_TABLE_ROWS);
  for (let i = 0; i < treeItems.length; i++) {
    /**
     * [TR:
     *  [TD: [DIV: [A: [SPAN: [SVG: icon]]]]]
     *  [TD: [A: name]]
     * ]
     */
    const itemEl = treeItems[i] as HTMLDivElement;
    const iconAnchorEl = itemEl.firstChild!.firstChild!.firstChild! as HTMLAnchorElement;
    const iconEl = iconAnchorEl.firstChild! as HTMLSpanElement;
    const nameAnchorEl = itemEl.children[1].firstChild! as HTMLAnchorElement;
    if (document.querySelector(`${QUERY_FILE_TABLE_ROWS}:nth-child(${i + 1}) img.vscode-icon.bb-icon`)) {
      continue;
    }

    const newIconEl = document.createElement('img');
    newIconEl.setAttribute('class', 'vscode-icon bb-icon');

    const replaceNodeIfExists = (newIconEl: HTMLImageElement) => {
      // used to prevent replacing of none existing nodes
      if (!document.querySelector(`${QUERY_FILE_TABLE_ROWS}:nth-child(${i + 1}) img.vscode-icon.bb-icon`)) {
        iconAnchorEl.replaceChild(newIconEl, iconEl);
      }
    };

    if (iconAnchorEl.href === '..') {
      // ..
      continue;
    } else if (iconAnchorEl.href.endsWith('/')) {
      // FOLDER
      const name = nameAnchorEl.innerText.toLowerCase();
      const iconPath = getFolderIcon(name);
      mutate(() => {
        newIconEl.setAttribute('src', getIconUrl(iconPath));
        replaceNodeIfExists(newIconEl);
      });
    } else if (itemEl.className.includes('subreponame')) {
      // TODO: SUBMODULE
      const iconEl = itemEl.firstElementChild! as HTMLSpanElement;
      mutate(() => {
        newIconEl.setAttribute('src', getIconUrl(getIconForFolder('submodules')));
        replaceNodeIfExists(newIconEl);
      });
    } else {
      // FILE
      const name = nameAnchorEl.innerText.toLowerCase();
      const iconPath = getFileIcon(name);
      mutate(() => {
        newIconEl.setAttribute('src', getIconUrl(iconPath));
        replaceNodeIfExists(newIconEl);
      });
    }
  }
}
function update(e?: any) {
  showRepoTreeIcons();
}

export function initBitBucket() {
  update();
  window.addEventListener('message', update);
}
