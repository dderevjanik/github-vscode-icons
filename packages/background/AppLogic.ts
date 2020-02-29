import { OfflineStorage } from "./modules/Storage";
import { IConfig, HostConf } from "../shared/IConfig";

export class AppLogic {

    private _storage: OfflineStorage;
    private _conf: IConfig;

    constructor(storage: OfflineStorage) {
        this._storage = storage;
    }

    getHostConf(hostlocation: string): HostConf | undefined {
        const conf = this.getLocalConfig();
        const hosts = Object.keys(conf.hosts);
        for (const hostKey of hosts) {
            // @ts-ignore
            const host = conf.hosts[hostKey];
            if (hostlocation.includes(host.host)) {
                return host;
            }
        }
        return undefined;
    }

    getLocalConfig(): IConfig {
        if (this._conf) {
            return this._conf;
        } else {
            const raw = this._storage.getItem("config");
            const conf = JSON.parse(raw);
            this._conf = conf;
            return this._conf;
        }
    }

    setLocalConfig(config: IConfig) {
        this._conf = config;
        const raw = JSON.stringify(config);
        this._storage.setItem("config", raw);
    }

}
