import {
  getIconForFolder,
  getIconForOpenFolder,
  getIconForFile,
  getIconUrl,
  DEFAULT_ROOT_OPENED,
  DEFAULT_ROOT,
  DEFAULT_FILE,
} from '../utils/Icons';
import { isCommit, isRepoRoot, isSingleFile, isRepoTree } from 'github-url-detection';
import { isHistoryForFile } from '../utils/PageDetect';
import * as fastdom from 'fastdom';
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
    if (iconPath) {
      finalSegment.innerHTML = `<img src="${getIconUrl(iconPath)}" alt="icon" class="vscode-icon"><span> ${
        finalSegment.innerText
      }</span>`;
    }
  }

  // segments between first and last are always folders
  for (let i = 1; i < aSegments.length; i++) {
    const spanEl = aSegments[i];
    const aEl = spanEl.firstChild as HTMLAnchorElement;
    const iconPath = getIconForOpenFolder(aEl.innerText);
    aEl.innerHTML = `<img src="${getIconUrl(iconPath)}" alt="icon" class="vscode-icon"><span> ${aEl.innerText}</span>`;
  }
}

const ICON_SIZE = 18;
function getHtmlIcon(iconPath: string, svgElem?: SVGElement) {
  return `<img src="${getIconUrl(iconPath!)}" class="vscode-icon ${
    svgElem ? svgElem.className.baseVal : ''
  }" alt="icon" width="${ICON_SIZE}" height="${ICON_SIZE}">`;
}

/**
 * Show icons for repository files (legacy view)
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

  const linkToEl = contentEl.firstElementChild!.firstElementChild as HTMLAnchorElement;

  let iconPath = '' as string | undefined;
  if (iconSVGEl) {
    const iconSVGClassName = iconSVGEl.className.baseVal;
    if (!iconSVGClassName) return;
    if (iconSVGClassName.includes('octicon-file-text') || iconSVGClassName.includes('octicon-file ')) {
      iconPath = getFileIcon(linkToEl.innerText.toLowerCase());
    } else if (iconSVGClassName.includes('octicon-file-directory')) {
      const name = linkToEl.innerText.toLowerCase();
      iconPath = getFolderIcon(name.split('/').shift()!);
    } else if (iconSVGClassName.includes('octicon-file-submodule')) {
      iconPath = getIconForFolder('submodules');
    } else if (iconSVGClassName.includes('octicon-file-symlink-file')) {
      iconPath = DEFAULT_FILE;
    } else if (iconSVGClassName.includes('octicon-file-symlink-directory')) {
      iconPath = DEFAULT_FILE;
    } else {
      console.warn(`[vscode-icons] Unknown filetype: "${iconSVGClassName}", please report`);
      return;
    }
    if (!iconPath) return;
    const x = (fastdom as any).mutate(() => {
      iconSVGEl.outerHTML = getHtmlIcon(iconPath!, iconSVGEl);
    });
  }
  // else {
  //   console.error(`Error during parsing: "td.icon > svg.octoicon" doesnt exists for ${i}. row`);
  // }
}

function isNavSidebarSvgShouldBeIgnored(svg: SVGSVGElement) {
  const className = svg.className.baseVal.toLowerCase();
  return className.includes('spinner') || className.includes('chevron');
}

function newShowRepoTreeIcons(row: HTMLElement) {
  const fileName = row.querySelector('a')!.textContent!.toLowerCase();
  if (fileName === '..') return;
  const linkToFile = row.querySelector('a')!.href;

  let iconPath: string | undefined;
  const linkUrl = new URL(linkToFile, window.location.href);
  if (isSingleFile(linkUrl)) {
    iconPath = getFileIcon(fileName);
  } else if (isRepoTree(linkUrl)) {
    iconPath = getFolderIcon(fileName.split('/').shift()!);
  } else {
    console.warn(`[vscode-icons] Unknown link type: "${linkToFile}", please report`);
  }

  if (iconPath) {
    (fastdom as any).mutate(() => {
      const iconEl = row.querySelector('svg')!;
      iconEl.outerHTML = getHtmlIcon(iconPath!, iconEl);
    });
  }
}

function newShowRepoTreeIconsFileSearchResult(row: HTMLElement) {
  const fileName = row.children[0]?.children?.[0].textContent?.toLowerCase();
  if (!fileName) return;

  const iconPath = getFileIcon(fileName);

  if (!iconPath) return;

  const a = row.closest('a')!;
  if ([...a.children].some((elem) => elem.classList.contains('vscode-icon'))) return;

  (fastdom as any).mutate(() => {
    a.insertAdjacentHTML('afterbegin', getHtmlIcon(iconPath!));
    const justInsertedIcon = a.children[0] as HTMLElement;
    justInsertedIcon.style.marginRight = '3px';
    justInsertedIcon.style.marginTop = '3px';
  });
}

function newShowRepoTreeIconsCommandPallete(row: HTMLElement) {
  const fileName = (row.querySelector('[data-target="command-palette-item.titleElement"]') ??
    row.querySelector('span'))!.textContent!.toLowerCase();
  if (fileName === '..') return;
  const linkToFile = row.querySelector('a')!.href;

  let iconPath: string | undefined;
  const linkUrl = new URL(linkToFile, window.location.href);
  if (isSingleFile(linkUrl)) {
    iconPath = getFileIcon(fileName);
  } else if (isRepoTree(linkUrl)) {
    iconPath = getFolderIcon(fileName.split('/').shift()!);
  } else {
    console.warn(`[vscode-icons] Unknown link type: "${linkToFile}", please report`);
  }

  if (iconPath) {
    (fastdom as any).mutate(() => {
      const iconEl = row.querySelector('svg')!;
      iconEl.outerHTML = getHtmlIcon(iconPath!, iconEl);
    });
  }
}

function newShowRepoTreeIconsSidebar(li: HTMLElement) {
  const fileName = li.textContent!.toLowerCase();
  const folderName = fileName.split('/').shift()!;

  let iconPath: string | undefined;
  const svgs = [...li.querySelectorAll('svg')].filter((svg) => !isNavSidebarSvgShouldBeIgnored(svg));
  const svgFileElem = svgs[0];
  if (!svgFileElem) return;
  const { classList } = svgFileElem;
  if (classList.contains('octicon-file')) {
    iconPath = getFileIcon(fileName);
  } else if (classList.contains('octicon-file-directory-fill')) {
    iconPath = getFolderIcon(folderName);
  } else if (classList.contains('octicon-file-directory-open-fill')) {
    iconPath = getIconForOpenFolder(folderName);
  } else {
    console.warn(`[vscode-icons] Unknown sidebar className: "${[...classList.values()].join(' ')}", please report`);
  }

  if (!iconPath) return;
  (fastdom as any).mutate(() => {
    const iconEl = svgFileElem;
    iconEl.style.display = 'none';
    // sometimes it just happens that the icon is not in the DOM anymore somehow
    if (!iconEl.parentElement) return;
    // cleanup previously added icons
    for (const child of iconEl.parentElement.children) {
      if (child.classList.contains('vscode-icon')) {
        child.remove();
      }
    }
    const imgNode = getHtmlIcon(iconPath!, iconEl);
    iconEl.insertAdjacentHTML('afterend', imgNode);
  });
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
    },
  });
  const QUERY_NEW_FILE_TABLE_ITEMS = 'react-app div[tabindex="0"] tbody tr';
  observe(QUERY_NEW_FILE_TABLE_ITEMS, {
    add(row) {
      newShowRepoTreeIcons(row as HTMLElement);
    },
  });
  const FILE_SIDE_NAVIGATION_ITEMS_SVG = 'nav[aria-label="File Tree Navigation"] li svg';
  observe(FILE_SIDE_NAVIGATION_ITEMS_SVG, {
    // svg file icon update (opened / closed) or add
    add(elem) {
      const svg = elem as SVGSVGElement;
      if (isNavSidebarSvgShouldBeIgnored(svg)) return;
      newShowRepoTreeIconsSidebar((svg.closest('li') as HTMLElement).children[0] as HTMLElement);
    },
  });
  const FILE_COMMAND_PALLETE_ITEMS = 'command-palette-item-group [aria-label="Files results"] command-palette-item';
  observe(FILE_COMMAND_PALLETE_ITEMS, {
    add(row) {
      newShowRepoTreeIconsCommandPallete(row as HTMLElement);
    },
  });
  const FILE_SEARCH_RESULT_ITEMS = 'span[id^=file-result-]';
  observe(FILE_SEARCH_RESULT_ITEMS, {
    add(row) {
      console.log(row);
      newShowRepoTreeIconsFileSearchResult(row as HTMLElement);
    },
  });
  update();
  document.addEventListener('pjax:end', update); // Update on page change
}
