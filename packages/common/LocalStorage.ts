/**
 * This file is accessible only from extension's Background
 */
import { SupportedHostings } from './SupportedHostings';

export type LocalStorage = {
  /**
     * Extension version
     */
  version: string;
  /**
     * List of showed/hidden icons for specific hosts
     */
  showIcons: { [Hosting in SupportedHostings]: boolean };
};

export const initialStorage: LocalStorage = {
  version: chrome.runtime.getManifest().version,
  showIcons: {
    github: true,
    githubgist: false,
    gitlab: true,
    bitbucket: true,
    pastebin: false,
    sourceforge: false
  }
};

export function getStorage(): Promise<LocalStorage> {
  return new Promise((resolve, reject) => {
    if (chrome.storage === undefined) {
      reject(new Error('Storage is not accessible from this part of extension'));
    }
    chrome.storage.local.get(storage => {
      const store = storage as LocalStorage;
      if (store.version === undefined) {
        // When version doesn't exists, it means that storage is empty and user is running
        // extension for first time, so use initial storage
        chrome.storage.local.set(initialStorage);
        resolve(initialStorage);
      }
      resolve(store);
    });
  });
}

export function setStorage(storage: LocalStorage) {
  if (chrome.storage === undefined) {
    throw new Error('Storage is not accessible from this part of extension');
  }
  chrome.storage.local.set(storage);
}

export function resetStorage() {
  if (chrome.storage === undefined) {
    throw new Error('Storage is not accessible from this part of extension');
  }
  chrome.storage.local.set(initialStorage);
  return initialStorage;
}
