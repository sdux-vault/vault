import { getPathAfterMarker } from './get-path-after-marker.util.mjs';
import { pathContains } from './path-contains.util.mjs';

export function buildBehaviorPath(filePath) {
  if (pathContains(filePath, 'encrypt')) {
    return 'encrypt';
  } else if (pathContains(filePath, 'persist')) {
    return 'persist';
  }
  return getPathAfterMarker(filePath);
}
