import * as localforage from "localforage";

export enum StorageItem {
  PIN = "PIN",
  KEY_PHRASE_SAVE_VIEW_VISITED = "KEY_PHRASE_SAVE_VIEW_VISITED",
  TEMP_PIN_SAVE_KEY = "TEMP_PIN_SAVE",
  PIN_SET_KEY = "PIN_SET_KEY",
  SEED_PHRASE_SAVED = "SEED_PHRASE_SAVED",
}

export const storage = {
  save: <T>(key: StorageItem, value: T) => {
    return localforage.setItem(key, value);
  },
  get: <T>(key: StorageItem) => {
    return localforage.getItem<T>(key);
  },
  remove: (key: StorageItem) => {
    return localforage.removeItem(key);
  },
};

export function temporarySavePin(pin: string): Promise<string> {
  return storage.save(StorageItem.TEMP_PIN_SAVE_KEY, pin);
}

export function getTemporarySavedPin(): Promise<string | null> {
  return storage.get(StorageItem.TEMP_PIN_SAVE_KEY);
}

export function wipeTemporarySavedPin(): Promise<void> {
  return storage.remove(StorageItem.TEMP_PIN_SAVE_KEY);
}

export function setPinSet(): Promise<void> {
  return storage.save(StorageItem.PIN_SET_KEY, 1).then();
}

export function isPinSet(): Promise<boolean> {
  return storage
    .get<number>(StorageItem.PIN_SET_KEY)
    .then((setNum) => Boolean(setNum));
}

export function setSeedPhraseSaved(): Promise<void> {
  return storage.save(StorageItem.SEED_PHRASE_SAVED, 1).then();
}

export async function isSeedPhraseSaved(): Promise<boolean> {
  return storage
    .get<number>(StorageItem.SEED_PHRASE_SAVED)
    .then((setNum) => Boolean(setNum));
}
