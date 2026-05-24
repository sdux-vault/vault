/**
 * Configuration options for deep object merge behaviors.
 *
 * `ObjectDeepMergeConfig` influences how nested object structures are merged
 * during a deep-merge operation. These settings are applied recursively by the
 * merge behavior and determine how undefined and null-valued fields are handled.
 */
export interface ObjectDeepMergeConfig {
  /**
   * When enabled, incoming `undefined` values will clear matching properties
   * on the current state during the merge. When disabled, `undefined` values
   * leave existing fields unchanged.
   */
  clearUndefined?: boolean;

  /**
   * When enabled, properties whose incoming value is `null` are removed from the
   * merged output. When disabled, incoming `null` values are preserved during the
   * merge operation.
   */
  stripNulls?: boolean;
}
