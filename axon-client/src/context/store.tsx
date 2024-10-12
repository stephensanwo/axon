import { StateStorage } from "zustand/middleware";

const getUrlSearch = () => {
  return window.location.search.slice(1);
};

export const persistentStorage: StateStorage = {
  getItem: (key): string => {
    // Check URL first
    if (getUrlSearch()) {
      const searchParams = new URLSearchParams(getUrlSearch());
      const storedValue = searchParams.get(key);
      return JSON.parse(storedValue as string);
    } else {
      // Otherwise, we should load from localstorage or alternative storage
      return JSON.parse(localStorage.getItem(key) as string);
    }
  },
  setItem: (key, newValue): void => {
    // Check if query params exist at all, can remove check if always want to set URL
    if (getUrlSearch()) {
      const searchParams = new URLSearchParams(getUrlSearch());
      searchParams.set(key, JSON.stringify(newValue));
      window.history.replaceState(null, "", `?${searchParams.toString()}`);
    }

    localStorage.setItem(key, JSON.stringify(newValue));
  },
  removeItem: (key): void => {
    const searchParams = new URLSearchParams(getUrlSearch());
    searchParams.delete(key);
    window.location.search = searchParams.toString();
  },
};
