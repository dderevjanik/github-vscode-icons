import {
  getIconForFolder,
  getIconForOpenFolder,
  getIconForFile,
  getIconUrl,
  DEFAULT_ROOT_OPENED,
  DEFAULT_ROOT,
  DEFAULT_FILE
} from '../utils/Icons';
import { isCommit, isRepoRoot, isSingleFile, isRepoTree } from 'github-url-detection';
import { isHistoryForFile } from '../utils/PageDetect';
import { mutate } from 'fastdom';
import { getFileIcon, getFolderIcon } from '../utils/Dev';
import { observe } from 'selector-observer';

export const QUERY_FILE_TABLE_ITEMS = 'div.js-navigation-container>div.js-navigation-item';
export const QUERY_PATH_SEGMENTS = '.repository-content .js-path-segment a';
export const QUERY_PJAX_CONTAINER = 'main';
export const QUERY_LAST_PATH_SEGMENT = '.final-path';

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
function showRepoTreeIcons(rowEl: Element) {
    const iconEl = rowEl.children[0] as HTMLTableCellElement;
    const iconSVGEl = iconEl.querySelector<SVGElement>('.octicon');
    if (!iconSVGEl) {
      // ... (up)
      return;
    }
    /**
     * <div role="row">
     *  <div><svg class={{icon}}/></div>,
     *  <div><span><a>{{name}}</a></span></div>,
     *  <div><span><a>{{message}}</a></span></div>,
     *  <div><span>{time}</span><s/div>,
     * </div>
     */
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
        console.error(`Unknown filetype: "${iconSVGClassName}", please report`);
        return;
      }
      const x = mutate(() => {
        iconSVGEl.outerHTML = `<img src="${getIconUrl(iconPath)}" class="${iconSVGClassName}" alt="icon" width="16" height="16">`;
      });
    }
    // else {
    //   console.error(`Error during parsing: "td.icon > svg.octoicon" doesnt exists for ${i}. row`);
    // }
}

function update(e?: any) {
  showIconsForSegments();
  if (isCommit()) {
    // showDiffIcon();
  }
}

export function initGithub() {
  // Update on fragment update
  observe(QUERY_FILE_TABLE_ITEMS, {
    add(rowEl) {
      showRepoTreeIcons(rowEl);
    }
  });
  update();
  document.addEventListener('pjax:end', update); // Update on page change
}
