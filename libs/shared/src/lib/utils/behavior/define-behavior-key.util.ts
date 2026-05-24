/**
 * Creates a normalized behavior key identifier used for behavior registration.
 *
 * A behavior key uniquely identifies a behavior within the Vault pipeline,
 * following the canonical format:
 *
 * `SDUX::<Domain>::<Name>`
 *
 * Both `domain` and `name` are normalized by:
 * - capitalizing the first character
 * - removing all non-alphanumeric characters
 *
 * This ensures consistent and predictable behavior keys for orchestration,
 * diagnostics, and tooling.
 *
 * @param domain - The logical domain or category of the behavior.
 * @param name - The specific behavior name within the domain.
 * @returns A normalized behavior key string.
 */
export function defineBehaviorKey(domain: string, name: string): string {
  return defineVaultKey('Behavior', domain, name);
}

/**
 * Constructs a normalized Vault key for behavior or controller registration.
 *
 * @param kind - Whether the key is for a Behavior or Controller.
 * @param domain - The logical domain or category.
 * @param name - The specific name within the domain.
 * @returns A normalized Vault key string.
 */
export function defineVaultKey(
  kind: 'Behavior' | 'Controller',
  domain: string,
  name: string
): string {
  const normalize = (s: string) =>
    s.charAt(0).toUpperCase() + s.slice(1).replace(/[^A-Za-z0-9]/g, '');

  return `SDUX::${kind}::${normalize(domain)}::${normalize(name)}`;
}

/**
 * Validates whether a string conforms to the Vault behavior key format.
 *
 * A valid behavior key must follow the structure:
 *
 * `SDUX::<Domain>::<Name>`
 *
 * Where `<Domain>` and `<Name>` begin with an uppercase character and contain
 * only alphanumeric characters.
 *
 * @param key - The behavior key string to validate.
 * @returns `true` if the key matches the required pattern; otherwise `false`.
 */
export function validateBehaviorKey(key: string): boolean {
  if (typeof key !== 'string') return false;

  const pattern =
    /^SDUX::(Behavior|Controller)::[A-Z][A-Za-z0-9]*::[A-Z][A-Za-z0-9]*$/;
  return pattern.test(key);
}
