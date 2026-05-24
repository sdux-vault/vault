/**
 * Removes ALL HTML tags from a Compodoc HTML string.
 * Example:
 *   "<p>Hello <code>world</code></p>" → "Hello world"
 */
export function stripHtmlTags(str) {
  if (!str) return '';
  return String(str).replace(/<\/?[^>]+>/g, '');
}
