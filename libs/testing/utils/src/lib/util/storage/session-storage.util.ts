/**
 * Removes a `sessionStorage` entry associated with the provided key.
 *
 * @param key - The storage key to remove.
 */
export const clearSessionStorage = (key: string): void => {
  sessionStorage.removeItem(key);
};

/**
 * Retrieves and parses a `sessionStorage` entry associated with the provided key.
 *
 * @param key - The storage key to read.
 * @returns The parsed stored value as an object, or `null` if the key does not exist.
 */
export const getSessionStorage = (key: string): object => {
  return JSON.parse(sessionStorage.getItem(key) as string);
};

/**
 * Writes a value into `sessionStorage` under the specified key.
 *
 * If the provided value is not a string, it is serialized using `JSON.stringify`
 * before storage.
 *
 * @param key - The storage key to write.
 * @param rawData - The value to store, either a string or a serializable structure.
 */
// eslint-disable-next-line
export const setSessionStorage = (key: string, rawData: any): void => {
  const data = typeof rawData === 'string' ? rawData : JSON.stringify(rawData);
  sessionStorage.setItem(key, data);
};
