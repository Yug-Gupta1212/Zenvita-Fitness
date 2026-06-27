export function getSafeWindow() {
  return typeof window === "undefined" ? undefined : window;
}

export function getSafeDocument() {
  return typeof document === "undefined" ? undefined : document;
}

export function getSafeLocalStorage() {
  return typeof window === "undefined" ? undefined : window.localStorage;
}

export function getSafeSessionStorage() {
  return typeof window === "undefined" ? undefined : window.sessionStorage;
}

export function safeStorageGetItem(storage: Storage | undefined, key: string, fallback: string | null = null) {
  if (!storage) return fallback;
  return storage.getItem(key) ?? fallback;
}

export function safeStorageSetItem(storage: Storage | undefined, key: string, value: string) {
  if (!storage) return;
  storage.setItem(key, value);
}

export function safeStorageRemoveItem(storage: Storage | undefined, key: string) {
  if (!storage) return;
  storage.removeItem(key);
}

export function safeStorageClear(storage: Storage | undefined) {
  if (!storage) return;
  storage.clear();
}
