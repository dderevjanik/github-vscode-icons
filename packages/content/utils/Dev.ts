import * as VSCJS from 'vscode-icons-js';

export const getFolderIcon =
  process.env.NODE_ENV === 'production'
    ? VSCJS.getIconForFolder
    : (folderName: string): string => {
        const folderIcon = VSCJS.getIconForFolder(folderName);
        if (folderIcon === VSCJS.DEFAULT_FOLDER) {
          save('FOLDER', folderName);
        }
        return folderIcon;
      };

export const getFileIcon =
  process.env.NODE_ENV === 'production'
    ? VSCJS.getIconForFile
    : (filename: string): string => {
        const fileIcon = VSCJS.getIconForFile(filename);
        if (fileIcon === VSCJS.DEFAULT_FILE) {
          save('FILE', filename);
        }
        return fileIcon;
      };

type Items = {
  folders: {
    [folderName: string]: number;
  };
  files: {
    [fileName: string]: number;
  };
};

/**
 * Save name of file/folder that doesn't have an icon
 */
export const save = (type: 'FOLDER' | 'FILE', name: string) => {
  console.log('tracking: ', type, name);
  const allItemsStr = localStorage.getItem('items');
  if (allItemsStr) {
    const items = JSON.parse(allItemsStr) as Items;
    const names = type === 'FOLDER' ? items.folders : items.files;
    if (name in names) {
      names[name] = names[name] + 1;
    } else {
      names[name] = 1;
    }
    localStorage.setItem('items', JSON.stringify(items));
  } else {
    const items = { folders: {}, files: {} } as Items;
    const names = type === 'FOLDER' ? items.folders : items.files;
    names[name] = 1;
    localStorage.setItem('items', JSON.stringify(items));
  }
};

/**
 * Load name of file/folder that doesn't have an icon
 */
export const load = (): Items => {
  const allItemsStr = localStorage.getItem('items');
  if (allItemsStr) {
    return JSON.parse(allItemsStr);
  } else {
    return {
      files: {},
      folders: {}
    };
  }
};
