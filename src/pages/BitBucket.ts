import { getIconForFile, getIconForFolder, getIconForOpenFolder, getIconUrl } from '../utils/Icons';
import { isBitBucketRepo } from '../utils/PageDetect';

const QUERY_TREE_ITEMS = '.iterable-item > td:first-child';

function showRepoTreeIcons() {
  const treeItems = document.querySelectorAll(QUERY_TREE_ITEMS);
  for (let i = 0; i < treeItems.length; i++) {
    const itemEl = treeItems[i] as HTMLDivElement;

    const newIconEl = document.createElement('img');
    newIconEl.setAttribute('class', 'vscode-icon bb-icon');

    const isFolder = itemEl.className.includes('dirname');
    if (isFolder) {
      /**
       * [TR:
       *  [TD: [A: [SPAN: icon], folderName ]]
       * ]
       */

      const iconEl = itemEl.firstElementChild!.firstElementChild as HTMLSpanElement;
      const name = itemEl.innerText.toLowerCase();
      const iconPath = getIconForFolder(name);
      newIconEl.setAttribute('src', getIconUrl(iconPath));
      itemEl.firstElementChild!.replaceChild(newIconEl, iconEl);
    } else {
      /**
       * [TR:
       *  [TD: [DIV: [A: [SPAN: icon], fileName]]],
       *  [TD: [DIV: size]],
       *  [TD: [DIV: [TIME: time]]],
       *  [TD: [DIV: message]]
       * ]
       */

      const iconEl = itemEl.firstElementChild!.firstElementChild!.firstElementChild as HTMLSpanElement;
      const name = (itemEl.firstElementChild as HTMLDivElement).innerText.toLowerCase();
      const iconPath = getIconForFile(name);
      newIconEl.setAttribute('src', getIconUrl(iconPath));
      itemEl.firstElementChild!.firstElementChild!.replaceChild(newIconEl, iconEl);
    }
  }
}

const domLoaded = new Promise(resolve => {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', resolve);
  } else {
    resolve();
  }
});

function update(e?: any) {
  if (isBitBucketRepo()) {
    showRepoTreeIcons();
  }
}

export function initBitBucket() {
  const observer = new MutationObserver(update);
  const observeFragment = () => {
    const ajaxFiles = document.getElementById('source-container');
    if (ajaxFiles) {
      observer.observe(ajaxFiles, {
        childList: true
      });
    }
  };

  update();
  observeFragment();
  document.addEventListener('pjax:end', update);
  document.addEventListener('pjax:end', observeFragment);
}
