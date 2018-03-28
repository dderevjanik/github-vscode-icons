import { getIconForFile, getIconForFolder, getIconForOpenFolder, getIconUrl, DEFAULT_ROOT } from '../utils/Icons';
import { getFileIcon, getFolderIcon } from '../utils/Dev';
import { isBitBucketRepo } from '../utils/PageDetect';
import { mutate } from 'fastdom';

const QUERY_TREE_ITEMS = '.iterable-item > td:first-child';

function showRepoTreeIcons() {
  const treeItems = document.querySelectorAll(QUERY_TREE_ITEMS);
  for (let i = 0; i < treeItems.length; i++) {
    const itemEl = treeItems[i] as HTMLDivElement;

    const newIconEl = document.createElement('img');
    newIconEl.setAttribute('class', 'vscode-icon bb-icon');

    if (itemEl.className.includes('dirname')) {
      // FOLDER
      /**
       * [TR:
       *  [TD: [A: [SPAN: icon], folderName ]]
       * ]
       */

      const iconEl = itemEl.firstElementChild!.firstElementChild as HTMLSpanElement;
      const name = itemEl.innerText.toLowerCase();
      const iconPath = getFolderIcon(name);
      mutate(() => {
        newIconEl.setAttribute('src', getIconUrl(iconPath));
        itemEl.firstElementChild!.replaceChild(newIconEl, iconEl);
      });
    } else if (itemEl.className.includes('filename')) {
      // FILE
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
      const iconPath = getFileIcon(name);
      mutate(() => {
        newIconEl.setAttribute('src', getIconUrl(iconPath));
        itemEl.firstElementChild!.firstElementChild!.replaceChild(newIconEl, iconEl);
      });
    } else if (itemEl.className.includes('subreponame')) {
      // SUBMODULE
      /**
       * [TR:
       *  [TD:
       *    [SPAN: icon ]
       *    [A: subRepoName ]
       *    [A: linkToSubRepo ]
       *  ]
       * ]
       */
      const iconEl = itemEl.firstElementChild! as HTMLSpanElement;
      mutate(() => {
        newIconEl.setAttribute('src', getIconUrl(getIconForFolder('submodules')));
        itemEl.replaceChild(newIconEl, iconEl);
      });
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
