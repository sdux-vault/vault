/**
 * Metadata keys used internally by SDuX to annotate FeatureCell classes.
 *
 * These string constants are attached directly to the provider class
 * (via the `@FeatureCell()` decorator) and are later consumed by
 * the Vault orchestrator when resolving cell identity and state type.
 *
 * @constant FEATURE_CELL_KEY
 * Stores the unique identifier for a FeatureCell.
 * This value is required and is used during vault registration,
 * state lookup, debugging, and pipeline analytics.
 *
 * @constant FEATURE_CELL_STATE
 * Stores a *type anchor* for the FeatureCell’s state (TState).
 * This field contains no runtime value — instead, it allows SDuX
 * to extract strong generic types from the decorated class, enabling:
 *   • typed vault injection (`injectVault<T>()`)
 *   • typed reducers, filters, and merge behaviors
 *   • fully inferred state signatures across the pipeline
 *
 * These metadata keys must remain stable and unique, as they serve
 * as the primary lookup mechanism for FeatureCell configuration.
 */
export const VAULT_METADATA_KEYS = {
  /** Unique FeatureCell identifier assigned by the @FeatureCell decorator. */
  FEATURE_CELL_KEY: 'vault:feature-cell-key',

  /**
   * Type anchor used to infer a FeatureCell’s state type (TState).
   * This exists for TypeScript inference only and has no runtime value.
   */
  FEATURE_CELL_STATE: 'vault:feature-cell-state'
} as const;
