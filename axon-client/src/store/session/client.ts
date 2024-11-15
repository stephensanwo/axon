/**
 * SessionClient class to interact with the session storage
 * @class SessionClient
 */
class SessionClient {
  /**
   * Set a key-value pair in the session storage
   * @param key
   * @param value
   * @returns void
   */
  setItem<T>(key: string, value: T): void {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  /**
   * Get a value from the session storage
   * @param key
   * @returns T | null
   */
  getItem<T>(key: string): T | null {
    const item = sessionStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : null;
  }

  /**
   * Remove a key-value pair from the session storage
   * @param key
   * @returns void
   */
  removeItem(key: string): void {
    sessionStorage.removeItem(key);
  }

  /**
   * Clear the session storage
   * @returns void
   */
  clear(): void {
    sessionStorage.clear();
  }

  /**
   * Get all keys in the session storage
   * @returns string[]
   */
  getKeys(): string[] {
    const keys: string[] = [];
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      if (key) {
        keys.push(key);
      }
    }
    return keys;
  }
}

const sessionClient = new SessionClient();
export default sessionClient;
