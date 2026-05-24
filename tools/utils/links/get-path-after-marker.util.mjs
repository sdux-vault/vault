import path from 'node:path';

export function getPathAfterMarker(filePath, marker = 'behaviors') {
  const normalized = path.normalize(filePath);
  const parts = normalized.split(path.sep);

  const index = parts.indexOf(marker);
  if (index === -1) return null;

  // the folder immediately after "behaviors"
  return parts[index + 1] ?? null;
}
