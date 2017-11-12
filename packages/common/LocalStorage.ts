/**
 * This file is accessible only from Background
 */

export type LocalStorage = {
    version: string;
    showIcons: {
        github: boolean;
        githubgist: boolean;
        gitlab: boolean;
        bitbucket: boolean;
        pastebin: boolean;
        sourceforge: boolean;
    },
};

export const initialStorage: LocalStorage = {
    version: chrome.runtime.getManifest().version,
    showIcons: {
        github: true,
        githubgist: true,
        gitlab: true,
        bitbucket: true,
        pastebin: true,
        sourceforge: true
    }
}

export function getStorage(): Promise<LocalStorage> {
    return new Promise((resolve, reject) => {
        if (chrome.storage === undefined) {
            reject(new Error('Storage is not accessible from this part of extension'));
        }
        chrome.storage.local.get((storage) => {
            const store = storage as LocalStorage;
            if (store.version === undefined) {
                // When version doesn't exists, it means that storage is empty and user is running
                // extension for first time, so use initial storage
                chrome.storage.local.set(initialStorage);
                resolve(initialStorage);
            }
            resolve(store);
        });
    })
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
