/**
 * LocalStorageClient class to interact with the local storage
 * @class LocalStorageClient
 */
class LocalStorageClient {
  /**
   * Set a key-value pair in the local storage
   * @param key
   * @param value
   * @returns void
   */
  setItem<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  /**
   * Get a value from the local storage
   * @param key
   * @returns T | null
   */
  getItem<T>(key: string): T | null {
    const item = localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : null;
  }

  /**
   * Remove a key-value pair from the local storage
   * @param key
   * @returns void
   */
  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  /**
   * Clear the local storage
   * @returns void
   */
  clear(): void {
    localStorage.clear();
  }

  /**
   * Get all keys in the local storage
   * @returns string[]
   */
  getKeys(): string[] {
    const keys: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        keys.push(key);
      }
    }
    return keys;
  }
}

const localClient = new LocalStorageClient();
export default localClient;
