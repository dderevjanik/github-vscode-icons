import { getIconForFolder, getIconForOpenFolder, getIconForFile } from './Icons';
import { isRepoRoot, isHistoryForFile, isRepoTree, isSingleFile, isCommit, isGist } from './PageDetect';

const getIconUrl = (iconFileName: string) => chrome.runtime.getURL('icons/' + iconFileName);

const DEFAULT_ROOT_OPENED = 'default_root_folder_opened.svg';
const QUERY_NAVIGATION_ITEMS = '.file-wrap>table>tbody:last-child>tr.js-navigation-item';
const QUERY_PATH_SEGMENTS = 'js-path-segment';
const QUERY_LAST_PATH_SEGMENT = 'final-path';

/**
 * Show icon for path segments
 */
function showIconsForSegments() {
  const aSegments = document.getElementsByClassName(QUERY_PATH_SEGMENTS) as HTMLCollectionOf<HTMLDivElement>;
  const firstSegment = aSegments[0];
  const finalSegment = document.getElementsByClassName(QUERY_LAST_PATH_SEGMENT)[0] as HTMLSpanElement | undefined;

  // first segment has always root folder icon
  if (firstSegment) {
    const spanEl = firstSegment.children[0] as HTMLSpanElement;
    spanEl.innerHTML = `<img src="${getIconUrl(
      DEFAULT_ROOT_OPENED
    )}" alt="icon" class="vscode-icon"><span> ${spanEl.innerText}</span>`;
  }

  // check if final segment is file or folder
  if (finalSegment) {
    const iconPath = window.location.href.includes('/blob/')
      ? getIconForFile(finalSegment.innerText)
      : getIconForOpenFolder(finalSegment.innerText);
    finalSegment.innerHTML = `<img src="${getIconUrl(
      iconPath
    )}" alt="icon" class="vscode-icon"><span> ${finalSegment.innerText}</span>`;
  }

  // segments between first and last are always folders
  for (let i = 1; i < aSegments.length; i++) {
    const spanEl = aSegments[i];
    const aEl = spanEl.firstChild as HTMLAnchorElement;
    const iconPath = getIconForOpenFolder(aEl.innerText);
    aEl.innerHTML = `<img src="${getIconUrl(iconPath)}" alt="icon" class="vscode-icon"><span> ${aEl.innerText}</span>`;
  }
};

/**
 * Show icons for repository files
 */
function showRepoTreeIcons() {
  // console.time('QUERY_ELEMENTS');
  const trEls = document.querySelectorAll(QUERY_NAVIGATION_ITEMS);
  // console.timeEnd('QUERY_ELEMENTS');
  // console.log(trEls.length);
  // console.time('SHOWING_ICONS');
  for (let i = 0; i < trEls.length; i++) {
    const trEl = trEls[i];

    // console.time('OBTAIN_EL');
    // [ICON_FOR_CONTENT] [CONTENT_NAME] [LAST_COMMIT_MESSAGE] [LAST_TIME_UPDATED]
    const iconEl = trEl.children[0];
    const contentEl = trEl.children[1];
    // const messageEl = trEl.children[2]; Unused
    // const ageEl = trEl.children[3]; Unused

    const linkToEl = contentEl.firstElementChild.firstElementChild as HTMLAnchorElement;
    const name = linkToEl.innerText.toLowerCase();
    // console.timeEnd('OBTAIN_EL');

    // console.time('OBTAIN_ICON');
    const iconPath = linkToEl.href.indexOf('/tree/') > 0 // is Folder ?
      ? getIconForFolder(name.split('/').shift())
      : getIconForFile(linkToEl.innerText.toLowerCase());
    // console.timeEnd('OBTAIN_ICON');

    // console.time('INJECT_IMG');
    iconEl.innerHTML = `<img src="${getIconUrl(iconPath)}" alt="icon">`;
    // console.timeEnd('INJECT_IMG');
  }
  // console.timeEnd('SHOWING_ICONS');
};

// DIFF ICONS ARE NOT COMPLETED YET
// const showDiffIcon = async () => {
//     const elements = document.getElementsByClassName('file-info');
//     for (let i = 0; i < elements.length; i++) {
//         const element = elements[i];
//         const aEl = element.children[1] as HTMLAnchorElement;
//         const filename = aEl.innerText.split('/').pop();
//         const iconPath = getIconForFile(filename);

//         const iconEl = document.createElement('div');
//         iconEl.innerHTML = `<img class="vsi-icon-diff" src="${chrome.runtime.getURL('icons/' + iconPath)}" alt="icon" class="vscode-icon">`;

//         element.insertBefore(iconEl.firstChild, element.firstChild);
//     }
// }

const showGistIcons = async () => {
  const fileInfos = document.querySelectorAll('.file-info');
  for (let i = 0; i < fileInfos.length; i++) {
    const fileInfo = fileInfos[i] as HTMLDivElement;
    const gistName = (fileInfo.lastElementChild.firstElementChild as HTMLSpanElement).innerText;
    const iconPath = getIconForFile(gistName);
    fileInfo.firstElementChild.innerHTML = `<img src="${getIconUrl(iconPath)}" alt="icon" class="vscode-icon">`;
  }
};

const domLoaded = new Promise(resolve => {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', resolve);
  } else {
    resolve();
  }
});

function update(e?: any) {
  if ((!isRepoRoot() && isRepoTree()) || isSingleFile() || isHistoryForFile()) {
    showIconsForSegments();
  }
  if (isRepoRoot() || isRepoTree()) {
    showRepoTreeIcons();
  }
  if (isCommit()) {
    // showDiffIcon();
  }
  if (isGist()) {
    showGistIcons();
  }
}

function init() {
  // Update on fragment update
  const observer = new MutationObserver(update);
  const observeFragment = () => {
    const ajaxFiles = document.querySelector('include-fragment.file-wrap');
    const navigation = document.querySelector('include-fragment.file-navigation');
    const diffContainer = document.querySelector('.js-diff-progressive-container');
    if (ajaxFiles) {
      observer.observe(ajaxFiles.parentNode, {
        childList: true
      });
    }
    if (navigation) {
      observer.observe(navigation.parentNode, {
        childList: true
      });
    }
    if (diffContainer) {
      observer.observe(diffContainer.parentNode, {
        childList: true
      });
    }
  };

  update();
  observeFragment();
  document.addEventListener('pjax:end', update); // Update on page change
  document.addEventListener('pjax:end', observeFragment);
}

init();
