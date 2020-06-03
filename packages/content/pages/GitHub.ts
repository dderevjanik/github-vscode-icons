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

const QUERY_FILE_TABLE_ITEMS = 'table.js-navigation-container>tbody:last-child>tr.js-navigation-item';
const QUERY_PATH_SEGMENTS = '.repository-content .breadcrumb a';
const QUERY_LAST_PATH_SEGMENT = '.final-path';

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
  const trEls = document.querySelectorAll<HTMLTableRowElement>(QUERY_FILE_TABLE_ITEMS);
  for (let i = 0; i < trEls.length; i++) {
    /**
     * [TR:
     *  [TD: [SVG: icon]],
     *  [TD: [SPAN: [A: name]]],
     *  [TD: [SPAN: [A: message]]],
     *  [TD: [SPAN: [TIME-AGO: ago]]],
     * ]
     */
    const trEl = trEls[i] as HTMLTableRowElement;
    const iconEl = trEl.children[0] as HTMLTableCellElement;
    const iconSVGEl =
      (iconEl.children[0] as HTMLElement).tagName === 'svg'
        ? (iconEl.children[0] as SVGElement)
        : (iconEl.children[0].children[0] as SVGElement); // Refined GH extension
    const contentEl = trEl.children[1] as Element;

    const linkToEl = contentEl.firstElementChild.firstElementChild as HTMLAnchorElement;

    let iconPath = '';
    if (iconSVGEl) {
      const iconSVGClassName = iconSVGEl.className.baseVal;
      if (iconSVGClassName.includes('octicon-file-text') || iconSVGClassName.endsWith('octicon-file')) {
        iconPath = getFileIcon(linkToEl.innerText.toLowerCase());
      } else if (iconSVGClassName.endsWith('octicon-file-directory')) {
        const name = linkToEl.innerText.toLowerCase();
        iconPath = getFolderIcon(name.split('/').shift());
      } else if (iconSVGClassName.endsWith('octicon-file-submodule')) {
        iconPath = getIconForFolder('submodules');
      } else if (iconSVGClassName.endsWith('octicon-file-symlink-file')) {
        iconPath = DEFAULT_FILE;
      } else if (iconSVGClassName.endsWith('octicon-file-symlink-directory')) {
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

const domLoaded = new Promise(resolve => {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', resolve);
  } else {
    resolve();
  }
});

function update(e?: any) {
  showIconsForSegments();
  showRepoTreeIcons();
  if (isCommit()) {
    // showDiffIcon();
  }
}

export function initGithub() {
  // Update on fragment update
  const observer = new MutationObserver(update);
  const addObserver = (parent: Element) => {
    if (parent) {
      observer.observe(parent, {
        childList: true
      });
    }
  };
  const observeFragment = () => {
    const fileTable = document.querySelector('table.files tbody:last-child');
    const breadcrumbs = document.querySelector('.file-navigation .breadcrumb');
    addObserver(fileTable);
    addObserver(breadcrumbs);
  };
  update();
  observeFragment();
  document.addEventListener('pjax:end', update); // Update on page change
  document.addEventListener('pjax:end', observeFragment);
}
