import { getSafeName } from '../get-safe-name.util.mjs';
import { toKebabCase } from '../to-kebab-case.util.mjs';
import { buildBehaviorPath } from './build-behavior-path.util.mjs';
import { pathContains } from './path-contains.util.mjs';

export function buildLink(entry) {
  let url;

  const safeLinkName = toKebabCase(getSafeName(entry.name));

  if (entry.docKind === 'behavior') {
    const category = buildBehaviorPath(entry.relativePath);
    const type = pathContains(entry.relativePath, 'core')
      ? 'behaviors'
      : 'addons';
    url = `/docs/pipeline/${type}/${category}/${safeLinkName}`;
  } else if (entry.docKind === 'controller') {
    url = `/docs/pipeline/controllers/${safeLinkName}`;
  } else {
    url = `/docs/references/${entry.docLink}/${safeLinkName}`;
  }

  return url;
}
