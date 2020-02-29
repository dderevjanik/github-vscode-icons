type LStorage = typeof localStorage;

export class OfflineStorage {

    private _lStorage: LStorage;
    private _version: number;

    constructor(
        lStorage: LStorage,
        version: number
    ) {
        this._lStorage = lStorage;
        this._version = version;
    }

    init(onUpgradeNeeded: (oldVersion: number) => void) {
        const prev = this._lStorage.getItem("__version");
        const oldVersion = prev ? parseInt(prev) : 0;
        if (oldVersion < this._version) {
            console.log(`[Storage] Upgrade needed from ${oldVersion} to ${this._version}`);
            onUpgradeNeeded(oldVersion);
            this._lStorage.setItem("__version", this._version.toString());
        }
    }

    getItem(key: string): string {
        return this._lStorage.getItem(key);
    }

    setItem(key: string, val: string): void {
        this._lStorage.setItem(key, val);
    }

    removeItem(key: string): void {
        this._lStorage.removeItem(key);
    }

    clear() {
        this._lStorage.clear();
    }

}
