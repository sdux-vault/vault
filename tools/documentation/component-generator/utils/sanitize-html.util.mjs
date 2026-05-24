/**
 * Sanitizes arbitrary HTML or text from Compodocs so Angular does not attempt
 * to interpret generic types, decorators, or HTML tags.
 *
 * STEP 1 — Remove ALL <elements> and </elements>
 *   - <p>, </p>
 *   - <code>, </code>
 *   - <strong>, </strong>
 *   - <foo-bar>, </foo-bar>
 *
 * STEP 2 — Escape everything else to safe HTML entities
 */
export function sanitizeHtml(str) {
  if (!str) return '';

  let cleaned = String(str);

  // First-pass: remove all HTML-like tags entirely
  cleaned = cleaned.replace(/<\/?[A-Za-z0-9\-\_]+[^>]*>/g, '');

  // Now sanitize remaining characters
  return cleaned
    .replace(/\*\*/g, '') // remove markdown bold
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;') // escape literal "<"
    .replace(/>/g, '&gt;') // escape literal ">"
    .replace(/{/g, '&#123;')
    .replace(/}/g, '&#125;')
    .replace(/@/g, '&#64;')
    .replace(/`/g, '&#96;') // prevents backtick issues
    .replace(/"/g, '&quot;') // attribute-safe
    .replace(/'/g, '&#39;'); // attribute-safe
}

export function sanitizeParameters(str) {
  if (!str) return '';

  return String(str)
    .replace(/\*\* /g, '') // markdown cleanup
    .replace(/&/g, '&amp;') // must be first
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/{/g, '&#123;')
    .replace(/}/g, '&#125;')
    .replace(/@/g, '&#64;')
    .replace(/`/g, '&#96;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
