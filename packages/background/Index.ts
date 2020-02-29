import { AppLogic } from "./AppLogic";
import { OfflineStorage } from "./modules/Storage";
import { onMessage } from '../shared/Messenger';
import { defaultConf } from "../shared/DefaultConf";

const storage = new OfflineStorage(window.localStorage, 1);
storage.init((oldVer) => {
  if (oldVer < 1){
    storage.setItem("config", JSON.stringify(defaultConf));
  }
});

const appLogic = new AppLogic(storage);

onMessage(async (message, _, sendResponse) => {
  switch (message.type) {
    case "CONF_GET": {
      const conf = await appLogic.getLocalConfig();
      sendResponse(conf);
      break;
    }
    case "CONF_SET": {
      await appLogic.setLocalConfig(message.payload);
      sendResponse();
      break;
    }
    case "HOST_GET": {
      const hostConf = await appLogic.getHostConf(message.payload.hostLocation);
      sendResponse(hostConf);
      break;
    }
    case "EXT_GET_VER": {
      const manifest = chrome.runtime.getManifest();
      sendResponse(manifest.version);
      break;
    }
    default: {
      console.warn(`Uknown message ${JSON.stringify(message)}`);
    }
  }
});
