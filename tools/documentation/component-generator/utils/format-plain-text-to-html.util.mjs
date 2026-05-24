import { sanitizeHtml } from './sanitize-html.util.mjs';

/**
 * Converts plain Compodoc description text into safe HTML.
 * - Splits on blank lines → <p>...</p>
 * - Converts inline `code` → <code>...</code>
 * - Sanitizes HTML entities
 */
export function formatPlainTextToHtml(text) {
  if (!text) return '';

  // Convert inline code: `T` → <code>T</code>
  text = text.replace(/`([^`]+)`/g, '$1');

  // Sanitize BEFORE paragraph processing
  const safe = sanitizeHtml(text);

  // Split into paragraphs on blank lines
  const paragraphs = safe.trim().split(/\n\s*\n/); // ← remove <br/> conversion

  // Wrap paragraphs
  return paragraphs.map((p) => `${p}<br/><br/>`).join('\n');
}
