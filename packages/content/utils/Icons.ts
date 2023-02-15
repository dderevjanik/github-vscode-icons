type NAME_TO_ICON = { [name: string]: string };
export {
  getIconForFile,
  getIconForFolder,
  getIconForOpenFolder,
  DEFAULT_FILE,
  DEFAULT_FOLDER,
  DEFAULT_FOLDER_OPENED,
  DEFAULT_ROOT_OPENED,
  DEFAULT_ROOT,
} from 'vscode-icons-ts';
import { DEFAULT_FILE } from 'vscode-icons-ts';

const PBSyntaxesToIcon = require('../data/PastebinSyntaxesToIcon.json') as NAME_TO_ICON;

/**
 * Retrieve url of icon within chrome
 */
export const getIconUrl = (iconFileName: string) => chrome.runtime.getURL('icons/' + iconFileName);

/**
 * Get icon for a pastebin syntaxes
 * @desc list of supported syntaxes https://pastebin.com/languages
 * @param syntaxName name of syntax to icon for
 * @return icon filename
 */
export function getIconForPBSyntax(syntaxName: string) {
  const syntaxIcon = PBSyntaxesToIcon[syntaxName];
  if (syntaxIcon !== undefined && syntaxIcon !== '') {
    return syntaxIcon;
  }
  return DEFAULT_FILE;
}
