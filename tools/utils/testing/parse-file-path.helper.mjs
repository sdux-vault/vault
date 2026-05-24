export function parseFilePath(filePath) {
  if (!filePath || typeof filePath !== 'string') return '';

  // Normalize slashes for Windows or POSIX
  const normalized = filePath.replace(/\\/g, '/').replace(/\/+/g, '/');

  const parts = normalized.split('/').filter(Boolean);

  if (parts.length >= 2) {
    return `${parts[parts.length - 2]}/${parts[parts.length - 1]}`;
  }

  return parts.join('/') || '';
}
