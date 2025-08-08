type Value = unknown;

// Add type declaration for Chrome extension APIs
declare const chrome: {
  storage: {
    local: {
      get: (keys: string[], callback: (result: Record<string, unknown>) => void) => void;
      set: (items: Record<string, unknown>, callback?: () => void) => void;
    };
  };
};

const hasChromeStorage =
  typeof chrome !== "undefined" &&
  !!chrome.storage &&
  !!chrome.storage.local;

export async function getItem<T = Value>(key: string, fallback: T): Promise<T> {
  if (hasChromeStorage) {
    return new Promise<T>((resolve) => {
      chrome.storage.local.get([key], (res) => {
        resolve((res?.[key] as T) ?? fallback);
      });
    });
  }
  const raw = localStorage.getItem(key);
  return raw ? (JSON.parse(raw) as T) : fallback;
}

export async function setItem<T = Value>(key: string, value: T): Promise<void> {
  if (hasChromeStorage) {
    return new Promise<void>((resolve) => {
      chrome.storage.local.set({ [key]: value }, () => resolve());
    });
  }
  localStorage.setItem(key, JSON.stringify(value));
}
