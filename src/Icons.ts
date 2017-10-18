type DICT = { [name: string]: string };

const folderNamesToIcon = require('./iconsData/FolderNamesToIcon.json') as DICT;
const fileExtensionsToIcon = require('./iconsData/FileExtensionsToIcon.json') as DICT;
const fileNamesToIcon = require('./iconsData/FileNamesToIcon.json') as DICT;
const languagesToIcon = require('./iconsData/LanguagesToIcon.json') as DICT;
const iconsToPath = require('./iconsData/IconsToPath.json') as DICT;
const fileExtensionsKeys = Object.keys(fileExtensionsToIcon);

export const DEFAULT_FOLDER = 'default_folder.svg';
export const DEFAULT_FOLDER_OPENED = 'default_folder_opened.svg';
export const DEFAULT_FILE = 'default_file.svg';

/**
 * Get icon for a folder
 * @param folderName name of folder to find icon for
 * @return icon filename
 */
export function getIconForFolder(folderName: string) {
  const lowerCased = folderName.toLowerCase();
  const iconKey = folderNamesToIcon[lowerCased];
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
  const lowerCased = fileName.toLowerCase();

  // match by exact FileName
  const iconKeyFromFileName = fileNamesToIcon[lowerCased];
  if (iconKeyFromFileName) {
    const iconPath = iconsToPath[iconKeyFromFileName];
    return iconPath;
  }

  // match by File Extension
  const extensionKey = fileExtensionsKeys.find(function (extension) {
    // try to find extension which satisfy file's extension.
    // be aware of extensions like `.test.js`, `.map.js` etc.
    const extensionRE = new RegExp(`.*\\.${extension}\Z`);
    return extensionRE.test(fileName);
  });
  if (extensionKey) {
    const iconKeyFromFileExt = fileExtensionsToIcon[extensionKey];
    const iconPath = iconsToPath[iconKeyFromFileExt];
    return iconPath;
  }

  // match by language
  const fileExtension = fileName.split('.').pop();
  if (fileExtension) {
    const iconKeyFromLang = languagesToIcon[fileExtension];
    if (iconKeyFromLang) {
      const iconPath = iconsToPath[iconKeyFromLang];
      return iconPath;
    }
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
