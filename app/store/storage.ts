import {Storage} from 'redux-persist';
import {MMKV} from 'react-native-mmkv';

const storage = new MMKV();

export const reduxStorage: Storage | any = {
  setItem: (key, value) => {
    storage.set(key, value);
    return Promise.resolve(true);
  },
  getItem: key => {
    const value = storage.getString(key);
    return Promise.resolve(value);
  },
  removeItem: key => {
    storage.delete(key);
    return Promise.resolve();
  },
  clearAll: () => {
    storage.clearAll();
    return Promise.resolve();
  },
};
