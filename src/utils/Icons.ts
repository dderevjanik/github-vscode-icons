type NAME_TO_ICON = { [name: string]: string };

const folderNamesToIcon = require('../iconsData/FolderNamesToIcon.json') as NAME_TO_ICON;
const fileExtensions1ToIcon = require('../iconsData/FileExtensions1ToIcon.json') as NAME_TO_ICON;
const fileExtensions2ToIcon = require('../iconsData/FileExtensions2ToIcon.json') as NAME_TO_ICON;
const fileNamesToIcon = require('../iconsData/FileNamesToIcon.json') as NAME_TO_ICON;
const languagesToIcon = require('../iconsData/LanguagesToIcon.json') as NAME_TO_ICON;
const PBSyntaxesToIcon = require('../iconsData/PBSyntaxToIcon.json') as NAME_TO_ICON;

/**
 * Retrieve url of icon within chrome
 */
export const getIconUrl = (iconFileName: string) =>
  chrome.runtime.getURL('icons/' + iconFileName);

export const DEFAULT_FOLDER = 'default_folder.svg';
export const DEFAULT_FOLDER_OPENED = 'default_folder_opened.svg';
export const DEFAULT_FILE = 'default_file.svg';

/**
 * Get icon for a folder
 * @param folderName name of folder to find icon for
 * @return icon filename
 */
export function getIconForFolder(folderName: string) {
  const folderIcon = folderNamesToIcon[folderName];
  return folderIcon ? folderIcon : DEFAULT_FOLDER;
}

/**
 * Get icon for a file
 * @param fileName name of file to find icon for
 * @return icon filename
 */
export function getIconForFile(fileName: string) {
  // match by exact FileName
  const iconFromFileName = fileNamesToIcon[fileName];
  if (iconFromFileName !== undefined) {
    return iconFromFileName;
  }

  // match by File Extension
  const extensions = fileName.split('.');
  if (extensions.length > 1) {
    const ext1 = extensions.pop();
    const ext2 = extensions.pop();
    // check for `.js.map`, `test.tsx`, ...
    const iconFromExtension2 = fileExtensions2ToIcon[`${ext2}.${ext1}`];
    if (iconFromExtension2 !== undefined) {
      return iconFromExtension2;
    }
    // check for `.js`, `tsx`, ...
    const iconFromExtension1 = fileExtensions1ToIcon[ext1];
    if (iconFromExtension1 !== undefined) {
      return iconFromExtension1;
    }
  } else {
    const ext = extensions.pop();
    const iconFromExtension = fileExtensions1ToIcon[ext];
    if (iconFromExtension !== undefined) {
      return iconFromExtension;
    }
  }

  // match by language
  const fileExtension = fileName.split('.').pop();
  if (fileExtension !== undefined) {
    const iconFromLang = languagesToIcon[fileExtension];
    if (iconFromLang) {
      return iconFromLang;
    }
  }

  // if there's no icon for file, use default one
  return DEFAULT_FILE;
}

/**
 * Get icon for a pastebin syntaxes
 * @desc list of supported syntaxes https://pastebin.com/languages
 * @param syntaxName name of syntax to icon for
 * @return icon filename
 */
export function getIconForPBSyntax(syntaxName: string) {
  const syntaxIcon = PBSyntaxesToIcon[syntaxName];
  if (syntaxIcon !== undefined) {
    return syntaxIcon;
  }
  return DEFAULT_FILE;
}

/**
 * Get icon for an opened folder
 * @param folderName name of opened folder to icon for
 * @return icon filename
 */
export function getIconForOpenFolder(folderName: string) {
  return (
    getIconForFolder(folderName)
      .split('.')
      .shift() + '_opened.svg'
  );
}
