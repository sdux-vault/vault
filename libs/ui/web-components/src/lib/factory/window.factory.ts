/**
 * Factory function that provides the global Window reference for dependency injection.
 *
 * @returns The browser Window object, or undefined in SSR contexts.
 */
export function windowFactory(): Window | undefined {
  return typeof window !== 'undefined' ? window : undefined;
}
