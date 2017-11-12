import { LocalStorage, initialStorage, getStorage, setStorage, resetStorage } from '../common/LocalStorage';
import { onMessage, sendMessage } from '../common/Messenger';
import { setServers } from 'dns';

onMessage(async (message, _, sendResponse) => {
    switch (message.type) {
        case 'STORAGE_GET': {
            const storage = await getStorage();
            console.log(storage);
            sendResponse(storage);
            break;
        }
        case 'STORAGE_SET': {
            const storage = message.storage;
            setStorage(storage);
            break;
        }
        case 'STORAGE_RESET': {
            resetStorage();
            break;
        }
    }
});
