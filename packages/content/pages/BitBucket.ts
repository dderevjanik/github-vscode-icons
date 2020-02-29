import { getIconForFolder, getIconUrl } from '../utils/Icons';
import { getFileIcon, getFolderIcon } from '../utils/Dev';
import { isBitBucketRepo } from '../utils/PageDetect';
import { mutate } from 'fastdom';

const QUERY_TREE_ITEMS = 'div[spacing="comfortable"] > div > div > div > div > table > tbody > tr';

export class Bitbucket {

  constructor() {
    const observer = new MutationObserver(() => {
      this.update();
    });
    const observeFragment = () => {
      const tableEl = document.querySelector('div[spacing="comfortable"] > div > div > div > div > table > tbody');
      if (tableEl) {
        observer.observe(tableEl, {
          childList: true
        });
      }
    };

    this.update();
    observeFragment();
    document.addEventListener('pjax:end', this.update);
    document.addEventListener('pjax:end', observeFragment);
  }

  update(e?: any) {
    if (isBitBucketRepo()) {
      this.showRepoTreeIcons();
    }
  }

  showRepoTreeIcons() {
    const treeItems = document.querySelectorAll(QUERY_TREE_ITEMS);
    console.log(treeItems);
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

      const newIconEl = document.createElement('img');
      newIconEl.setAttribute('class', 'vscode-icon bb-icon');

      if (iconAnchorEl.href === '..') {
        // ..
        continue;
      } else if (iconAnchorEl.href.endsWith('/')) {
        // FOLDER
        const name = nameAnchorEl.innerText.toLowerCase();
        const iconPath = getFolderIcon(name);
        mutate(() => {
          newIconEl.setAttribute('src', getIconUrl(iconPath));
          iconAnchorEl.replaceChild(newIconEl, iconEl);
        });
      } else if (itemEl.className.includes('subreponame')) {
        // TODO: SUBMODULE
        const iconEl = itemEl.firstElementChild! as HTMLSpanElement;
        mutate(() => {
          newIconEl.setAttribute('src', getIconUrl(getIconForFolder('submodules')));
          iconAnchorEl.replaceChild(newIconEl, iconEl);
        });
      } else {
        // FILE
        const name = nameAnchorEl.innerText.toLowerCase();
        const iconPath = getFileIcon(name);
        mutate(() => {
          newIconEl.setAttribute('src', getIconUrl(iconPath));
          iconAnchorEl.replaceChild(newIconEl, iconEl);
        });
      }
    }
  }

}

