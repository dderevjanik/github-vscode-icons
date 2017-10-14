type DICT = { [key: string]: string };

const folderNames = require('./json/folderNames.json') as DICT;
const fileExtensions = require('./json/fileExtensions.json') as DICT;
const fileNames = require('./json/fileNames.json') as DICT;
const languageIds = require('./json/languagesIds.json') as DICT;
const iconDefinitions = require('./json/iconDefinitions.json') as DICT;

export const DEFAULT_FOLDER = 'default_folder.svg';
export const DEFAULT_FOLDER_OPENED = 'default_folder_opened.svg';
export const DEFAULT_FILE = 'default_file.svg';

/**
 * Get icon for a folder
 * @param folderName name of folder to find icon for
 */
export function getIconForFolder(folderName: string) {
  const iconKey = folderNames[folderName];
  if (iconKey) {
    const iconPath = iconDefinitions[iconKey];
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
 */
export function getIconForFile(fileName: string) {
  // match by exact FileName
  const iconKeyFromFileName = fileNames[fileName];
  if (iconKeyFromFileName) {
    const iconPath = iconDefinitions[iconKeyFromFileName];
    return iconPath;
  }

  // match by File Extension
  const fileExtension = fileName.split('.').pop();
  const iconKeyFromFileExt = fileExtensions[fileExtension];
  if (iconKeyFromFileExt) {
    const iconPath = iconDefinitions[iconKeyFromFileExt];
    return iconPath;
  }

  // match by language
  const iconKeyFromLang = languageIds[fileExtension];
  if (iconKeyFromLang) {
    const iconPath = iconDefinitions[iconKeyFromLang];
    return iconPath;
  }

  // if there's no icon for file, use default one
  return DEFAULT_FILE;
}

/**
 * Get icon for an opened folder
 * @param folderName name of opened folder to icon for
 */
export function getIconForOpenFolder(folderName: string) {
  return (
    getIconForFolder(folderName)
      .split('.')
      .shift() + '_opened.svg'
  );
}
