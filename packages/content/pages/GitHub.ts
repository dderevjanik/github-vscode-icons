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

const QUERY_NAVIGATION_ITEMS = 'table.js-navigation-container>tbody:last-child>tr.js-navigation-item';
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
  const trEls = document.querySelectorAll(QUERY_NAVIGATION_ITEMS);
  for (let i = 0; i < trEls.length; i++) {
    /**
     * [TR:
     *  [TD: [SVG: icon]],
     *  [TD: [SPAN: [A: name]]],
     *  [TD: [SPAN: [A: message]]],
     *  [TD: [SPAN: [TIME-AGO: ago]]],
     * ]
     */
    const trEl = trEls[i] as Element;
    const iconEl = trEl.children[0] as Element;
    const iconSVGEl = (iconEl.children[0] as HTMLElement).tagName === 'svg'
      ? iconEl.children[0] as SVGElement
      : iconEl.children[0].children[0] as SVGElement; // Refined GH extension
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
    } else {
      console.error(`Error during parsing: "td.icon > svg.octoicon" doesnt exists for ${i}. row`);
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

function update() {
  if (!document.querySelector('td.icon > .spinner')) {
    return
  }

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
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  };

  observeFragment();
  document.addEventListener('pjax:end', observeFragment); // Update on page change
}
