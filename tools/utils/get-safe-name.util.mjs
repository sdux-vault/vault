/** @internal Backing store for the runtime prefix used by getSafeName(). */
let _prefix;

/**
 * Sets the prefix used by {@link getSafeName} for producing safe names.
 *
 * The prefix is retained in module scope and will be applied to all
 * subsequent calls to `getSafeName()`.
 *
 * @param prefix - The prefix to associate with all safe-name generation.
 */
export function setSafeNamePrefix(prefix) {
  _prefix = prefix;
}

/**
 * Returns a "safe" class name by prefixing the provided name.
 *
 * This is typically used when generating Angular component class names
 * to avoid collisions and ensure globally unique identifiers.
 *
 * @param name - The original class name.
 * @returns The prefixed class name (no delimiter).
 *
 * @example
 * setSafeNamePrefix('sdux');
 * getSafeClassName('UserService'); // "sduxUserService"
 */
export function getSafeClassName(name) {
  return `${_prefix}${name}`;
}

/**
 * Returns a "safe" hyphenated name by prefixing the provided name.
 *
 * This helper is used when generating Angular selectors, filenames,
 * or other kebab-cased identifiers where a clear delimiter is needed.
 *
 * @param name - The original name to prefix.
 * @returns The prefixed name in `kebab-case` format.
 *
 * @example
 * setSafeNamePrefix('sdux');
 * getSafeName('user-service'); // "sdux-user-service"
 */
export function getSafeName(name) {
  return _prefix ? `${_prefix}-${name}` : name;
}
