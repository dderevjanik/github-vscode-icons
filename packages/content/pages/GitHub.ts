import {
  getIconForFolder,
  getIconForOpenFolder,
  getIconForFile,
  getIconUrl,
  DEFAULT_ROOT_OPENED,
  DEFAULT_ROOT,
  DEFAULT_FILE
} from '../utils/Icons';
import { isRepoRoot, isHistoryForFile, isRepoTree, isSingleFile, isCommit, isGist } from '../utils/PageDetect';
import { mutate } from 'fastdom';
import { getFileIcon, getFolderIcon } from '../utils/Dev';

const QUERY_FILE_TABLE_ITEMS = 'div.js-navigation-container>div.js-navigation-item';
const QUERY_PATH_SEGMENTS = '.repository-content .breadcrumb a';
export const QUERY_PJAX_CONTAINER = 'main';

/**
 * Show icon for path segments
 */
function showIconsForSegments() {
  if (!((!isRepoRoot() && isRepoTree()) || isSingleFile() || isHistoryForFile())) return;
  const aSegments = document.querySelectorAll<HTMLAnchorElement>(QUERY_PATH_SEGMENTS);
  const firstSegment = aSegments[0];
  const finalSegment = document.querySelector(QUERY_LAST_PATH_SEGMENT) as HTMLSpanElement | undefined;

  // first segment has always root folder icon
  if (firstSegment) {
    const spanEl = firstSegment.children[0] as HTMLSpanElement;
    spanEl.innerHTML = `<img src="${getIconUrl(DEFAULT_ROOT_OPENED)}" alt="icon" class="vscode-icon"><span> ${
      spanEl.innerText
    }</span>`;
  }

  // check if final segment is file or folder
  if (finalSegment) {
    const iconPath = window.location.href.includes('/blob/')
      ? getIconForFile(finalSegment.innerText)
      : getIconForOpenFolder(finalSegment.innerText);
    finalSegment.innerHTML = `<img src="${getIconUrl(iconPath)}" alt="icon" class="vscode-icon"><span> ${
      finalSegment.innerText
    }</span>`;
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
  if (!(isRepoRoot() || isRepoTree())) return;
  const rowEls = document.querySelectorAll<HTMLTableRowElement>(QUERY_FILE_TABLE_ITEMS);
  for (let i = 0; i < rowEls.length; i++) {
    if (rowEls[i].firstElementChild && rowEls[i].firstElementChild.getAttribute("role") === "rowheader") {
      // ... (up)
      continue;
    }
    /**
     * <div role="row">
     *  <div><svg class={{icon}}/></div>,
     *  <div><span><a>{{name}}</a></span></div>,
     *  <div><span><a>{{message}}</a></span></div>,
     *  <div><span>{time}</span><s/div>,
     * </div>
     */
    const rowEl = rowEls[i] as HTMLTableRowElement;
    const iconEl = rowEl.children[0] as HTMLTableCellElement;
    const iconSVGEl =
      (iconEl.children[0] as HTMLElement).tagName === 'svg'
        ? (iconEl.children[0] as SVGElement)
        : (iconEl.children[0].children[0] as SVGElement); // Refined GH extension
    const contentEl = rowEl.children[1] as Element;

    const linkToEl = contentEl.firstElementChild.firstElementChild as HTMLAnchorElement;

    let iconPath = '';
    if (iconSVGEl) {
      const iconSVGClassName = iconSVGEl.className.baseVal;
      if (iconSVGClassName.includes('octicon-file-text') || iconSVGClassName.includes('octicon-file ')) {
        iconPath = getFileIcon(linkToEl.innerText.toLowerCase());
      } else if (iconSVGClassName.includes('octicon-file-directory')) {
        const name = linkToEl.innerText.toLowerCase();
        iconPath = getFolderIcon(name.split('/').shift());
      } else if (iconSVGClassName.includes('octicon-file-submodule')) {
        iconPath = getIconForFolder('submodules');
      } else if (iconSVGClassName.includes('octicon-file-symlink-file')) {
        iconPath = DEFAULT_FILE;
      } else if (iconSVGClassName.includes('octicon-file-symlink-directory')) {
        iconPath = DEFAULT_FILE;
      } else {
        console.error(`Unknown filetype: "${iconSVGClassName}" for ${i}. row, please report`);
        continue;
      }
      const x = mutate(() => {
        iconEl.innerHTML = `<img src="${getIconUrl(iconPath)}" alt="icon" data-index="${i}" width="16" height="18">`;
      });
    }
    // else {
    //   console.error(`Error during parsing: "td.icon > svg.octoicon" doesnt exists for ${i}. row`);
    // }
  }
}

function update(e?: any) {
  showIconsForSegments();
  showRepoTreeIcons();
  if (isCommit()) {
    // showDiffIcon();
  }
}

export function initGithub() {
  // Update on fragment update
  const observer = new MutationObserver(showRepoTreeIcons);
  const pjaxContainer = document.querySelector(QUERY_PJAX_CONTAINER);
  if (pjaxContainer) {
    observer.observe(pjaxContainer, {
      childList: true,
      subtree: true
    });
  }
  update();
  document.addEventListener('pjax:end', update); // Update on page change
}
