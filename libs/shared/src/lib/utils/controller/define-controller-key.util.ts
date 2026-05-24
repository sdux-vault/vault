import {
  defineVaultKey,
  validateBehaviorKey
} from '../behavior/define-behavior-key.util';

/**
 * Creates a normalized controller key following the Vault key format.
 *
 * @param domain - The logical domain or category of the controller.
 * @param name - The specific controller name within the domain.
 * @returns A normalized controller key string.
 */
export function defineControllerKey(domain: string, name: string): string {
  return defineVaultKey('Controller', domain, name);
}

/**
 * Validates whether a string conforms to the Vault controller key format.
 *
 * @param key - The controller key string to validate.
 * @returns `true` if the key matches the required pattern.
 */
export function validateControllerKey(key: string): boolean {
  return validateBehaviorKey(key);
}
