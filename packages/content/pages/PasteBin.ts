import { getIconForPBSyntax, getIconUrl } from '../utils/Icons';
import { isPastebinUserList, isPasteOpen } from '../utils/PageDetect';
import { mutate } from 'fastdom';

const QUERY_PASTEBIN_ITEMS = '.maintable>tbody>tr';
const QUERY_PASTEBIN_PASTE = '#code_buttons>span:last-child';

export class Pastebin {

  constructor() {
    this.update();
  }

  update(e?: any) {
    if (isPastebinUserList) {
      this.showIconsForFiles();
    } else if (isPasteOpen) {
      // this.showIconForPaste();
    }
  }

  showIconsForFiles() {
    const pastes = document.querySelectorAll(QUERY_PASTEBIN_ITEMS);
    // skip first tr, which is header
    for (let i = 1; i < pastes.length; i++) {
      /**
       * [TR:
       *  [TD: [[IMAGE: icon], [A: name]]],
       *  [TD: added],
       *  [TD: expires],
       *  [TD: hits],
       *  [TD: [A: syntax]],
       *  [TD: ?]
       * ]
       */
      const item = pastes[i];

      const iconAndNameEl = item.firstElementChild as HTMLTableDataCellElement;
      const iconEl = iconAndNameEl.firstElementChild as HTMLImageElement;

      const syntaxEl = item.childNodes[9] as HTMLAnchorElement;
      const syntaxName = syntaxEl.innerText;

      const iconPath = getIconForPBSyntax(syntaxName);

      const newIconEl = document.createElement('img');
      mutate(() => {
        newIconEl.setAttribute('src', getIconUrl(iconPath));
        newIconEl.setAttribute('class', 'vscode-icon vsi-pb');

        iconAndNameEl.replaceChild(newIconEl, iconEl);
      });
    }
  }

}

