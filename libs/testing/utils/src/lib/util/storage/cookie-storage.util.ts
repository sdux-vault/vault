/**
 * Removes a cookie associated with the provided key.
 *
 * @param key - The cookie name to remove.
 */
export const clearCookieStorage = (key: string): void => {
  document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
};

/**
 * Retrieves and parses a cookie associated with the provided key.
 *
 * @param key - The cookie name to read.
 * @returns The parsed stored value as an object, or `null` if the cookie does not exist.
 */
export const getCookieStorage = (key: string): object | null => {
  const name = key + '=';
  const parts = document.cookie.split('; ');

  for (const part of parts) {
    if (part.startsWith(name)) {
      const encodedValue = part.substring(name.length);
      const raw = decodeURIComponent(encodedValue);

      try {
        return JSON.parse(raw);
      } catch {
        return raw as unknown as object;
      }
    }
  }

  return null;
};

/**
 * Writes a value into a cookie under the specified key.
 *
 * If the provided value is not a string, it is serialized using `JSON.stringify`
 * before storage.
 *
 * @param key - The cookie name to write.
 * @param rawData - The value to store, either a string or a serializable structure.
 */
// eslint-disable-next-line
export const setCookieStorage = (key: string, rawData: any): void => {
  const data = typeof rawData === 'string' ? rawData : JSON.stringify(rawData);
  const encodedKey = key;
  const encodedValue = encodeURIComponent(data);
  document.cookie = `${encodedKey}=${encodedValue}; path=/`;
};
