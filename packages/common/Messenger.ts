import { LocalStorage } from './LocalStorage';

type CreateMessage<Type extends string, Payload extends object> = { type: Type } & Payload;

type Message = CreateMessage<'STORAGE_SET', { storage: LocalStorage }>
    | CreateMessage<'STORAGE_GET', {}>
    | CreateMessage<'STORAGE_RESET', {}>;

export function sendMessage(message: Message) {
    return new Promise((resolve, _) => {
        chrome.runtime.sendMessage(message, (response) => {
            resolve(response);
        });
    })
};

export function onMessage(
    callback: (
        message: Message,
        sender: any,
        sendResponse: (response?: any) => void
    ) => void
) {
    chrome.runtime.onMessage.addListener(
        (
            internalMessage,
            internalSender,
            internalSendResponse
        ) => {
            callback(internalMessage, internalSender, internalSendResponse);
            return true;
        }
    );
};
