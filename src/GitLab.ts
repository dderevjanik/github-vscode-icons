import { getIconForFile, getIconForFolder, getIconForOpenFolder } from './Icons';

const getIconUrl = (iconFileName: string) => chrome.runtime.getURL('icons/' + iconFileName);

const QUERY_TREE_ITEMS = '.tree-item';

function showRepoTreeIcons() {
    const treeItems = document.querySelectorAll(QUERY_TREE_ITEMS);
    for (let i = 0; i < treeItems.length; i++) {
        const itemEl = treeItems[i];
        const newIconEl = document.createElement('img');

        // [ICON_AND_NAME] [LAST_COMMIT_MESSAGE] [AGE]
        const iconAndNameEls = itemEl.firstElementChild;
        const iconEl = iconAndNameEls.firstElementChild;
        const nameEl = iconAndNameEls.lastElementChild as HTMLAnchorElement;

        const name = nameEl.innerText.toLowerCase();
        const iconPath = nameEl.href.indexOf('/tree/') > 0
            ? getIconForFolder(name)
            : getIconForFile(name);

        newIconEl.setAttribute('src', getIconUrl(iconPath));
        newIconEl.setAttribute('class', 'vscode-icon');
        iconAndNameEls.replaceChild(newIconEl, iconEl);
    }
}

export function initGitLab() {
    showRepoTreeIcons();
}

