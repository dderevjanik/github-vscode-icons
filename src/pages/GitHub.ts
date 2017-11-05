import {
  getIconForFolder,
  getIconForOpenFolder,
  getIconForFile,
  getIconUrl,
  DEFAULT_ROOT_OPENED
} from '../utils/Icons';
import { isRepoRoot, isHistoryForFile, isRepoTree, isSingleFile, isCommit, isGist } from '../utils/PageDetect';

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
}

/**
 * Show icons for repository files
 */
function showRepoTreeIcons() {
  const trEls = document.querySelectorAll(QUERY_NAVIGATION_ITEMS);
  for (let i = 0; i < trEls.length; i++) {
    const trEl = trEls[i];

    // [ICON_FOR_CONTENT] [CONTENT_NAME] [LAST_COMMIT_MESSAGE] [LAST_TIME_UPDATED]
    const iconEl = trEl.children[0];
    const contentEl = trEl.children[1];
    // const messageEl = trEl.children[2]; Unused
    // const ageEl = trEl.children[3]; Unused

    const linkToEl = contentEl.firstElementChild!.firstElementChild as HTMLAnchorElement;
    const name = linkToEl.innerText.toLowerCase();

    const iconPath =
      linkToEl.href.indexOf('/tree/') > 0 // is Folder ?
        ? getIconForFolder(name.split('/').shift())
        : getIconForFile(linkToEl.innerText.toLowerCase());

    iconEl.innerHTML = `<img src="${getIconUrl(iconPath)}" alt="icon">`;
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
  if ((!isRepoRoot() && isRepoTree()) || isSingleFile() || isHistoryForFile()) {
    showIconsForSegments();
  }
  if (isRepoRoot() || isRepoTree()) {
    showRepoTreeIcons();
  }
  if (isCommit()) {
    // showDiffIcon();
  }
}

export function initGithub() {
  // Update on fragment update
  const observer = new MutationObserver(update);
  const observeFragment = () => {
    const ajaxFiles = document.querySelector('include-fragment.file-wrap');
    const navigation = document.querySelector('include-fragment.file-navigation');
    const diffContainer = document.querySelector('.js-diff-progressive-container');
    if (ajaxFiles) {
      observer.observe(ajaxFiles.parentNode!, {
        childList: true
      });
    }
    if (navigation) {
      observer.observe(navigation.parentNode!, {
        childList: true
      });
    }
    if (diffContainer) {
      observer.observe(diffContainer.parentNode!, {
        childList: true
      });
    }
  };

  update();
  observeFragment();
  document.addEventListener('pjax:end', update); // Update on page change
  document.addEventListener('pjax:end', observeFragment);
}
