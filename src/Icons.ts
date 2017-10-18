type DICT = { [name: string]: string };

const folderNamesToIcon = require('./iconsData/FolderNamesToIcon.json') as DICT;
const fileExtensionsToIcon = require('./iconsData/FileExtensionsToIcon.json') as DICT;
const fileNamesToIcon = require('./iconsData/FileNamesToIcon.json') as DICT;
const languagesToIcon = require('./iconsData/LanguagesToIcon.json') as DICT;
const iconsToPath = require('./iconsData/IconsToPath.json') as DICT;

export const DEFAULT_FOLDER = 'default_folder.svg';
export const DEFAULT_FOLDER_OPENED = 'default_folder_opened.svg';
export const DEFAULT_FILE = 'default_file.svg';

/**
 * Get icon for a folder
 * @param folderName name of folder to find icon for
 * @return icon filename
 */
export function getIconForFolder(folderName: string) {
  const iconKey = folderNamesToIcon[folderName];
  if (iconKey) {
    const iconPath = iconsToPath[iconKey];
    if (iconPath) {
      return iconPath;
    }
  }

  // if there's no icon for folder, use default one
  return DEFAULT_FOLDER;
}

/**
 * Get icon for a file
 * @param fileName name of file to find icon for
 * @return icon filename
 */
export function getIconForFile(fileName: string) {
  // match by exact FileName
  const iconKeyFromFileName = folderNamesToIcon[fileName];
  if (iconKeyFromFileName) {
    const iconPath = iconsToPath[iconKeyFromFileName];
    return iconPath;
  }

  // match by File Extension
  const fileExtension = fileName.split('.').pop();
  const iconKeyFromFileExt = fileExtensionsToIcon[fileExtension];
  if (iconKeyFromFileExt) {
    const iconPath = iconsToPath[iconKeyFromFileExt];
    return iconPath;
  }

  // match by language
  const iconKeyFromLang = languagesToIcon[fileExtension];
  if (iconKeyFromLang) {
    const iconPath = iconsToPath[iconKeyFromLang];
    return iconPath;
  }

  // if there's no icon for file, use default one
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
