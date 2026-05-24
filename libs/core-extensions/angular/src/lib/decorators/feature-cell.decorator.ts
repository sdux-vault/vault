import { VAULT_METADATA_KEYS } from '../constants/metadata-keys.constant';

/**
 * Decorator factory that marks a class as a FeatureCell with an associated state type.
 *
 * This function produces a class decorator that attaches identifying metadata
 * used to associate a FeatureCell instance with a unique key and a compile-time
 * state type anchor.
 *
 * @param key - Unique identifier assigned to the FeatureCell.
 */
export function FeatureCell<TState>(key: string) {
  /**
   * Applies FeatureCell metadata to the decorated class.
   *
   * This decorator assigns a stable FeatureCell key and a state type anchor
   * used for compile-time inference without introducing runtime behavior.
   *
   * @param target - The class constructor being decorated.
   */
  // eslint-disable-next-line
  return function <T extends new (...args: any[]) => {}>(target: T) {
    /**
     * Attaches the unique FeatureCell identifier to the target class.
     */
    // eslint-disable-next-line
    (target as any)[VAULT_METADATA_KEYS.FEATURE_CELL_KEY] = key;

    /**
     * Attaches a state type anchor to the target class.
     */
    // eslint-disable-next-line
    (target as any)[VAULT_METADATA_KEYS.FEATURE_CELL_STATE] =
      null as unknown as TState;
  };
}
