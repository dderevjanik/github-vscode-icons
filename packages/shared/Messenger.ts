import { IConfig, HostConf } from "./IConfig";

type CreateMessage<Type extends string, Payload, Response> = {
  type: Type;
  payload: Payload;
  // response: Response;
}

type Message =
  | CreateMessage<"CONF_GET", {}, IConfig>
  | CreateMessage<"CONF_SET", IConfig, {}>
  | CreateMessage<"HOST_GET", { hostLocation: string; }, HostConf>
  | CreateMessage<"EXT_GET_VER", {}, string>;

export function sendMessage<M extends Message>(message: M) {
  return new Promise((resolve, _) => {
    chrome.runtime.sendMessage(message, response => {
      resolve(response);
    });
  });
}

export function onMessage<M extends Message>(callback: (message: M, sender: any, sendResponse: (response?: any) => void) => void) {
  chrome.runtime.onMessage.addListener((internalMessage, internalSender, internalSendResponse) => {
    callback(internalMessage, internalSender, internalSendResponse);
    return true;
  });
}
