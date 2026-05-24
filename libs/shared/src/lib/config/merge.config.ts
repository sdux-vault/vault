/**
 * Configuration options for merge operations executed by a MergeBehavior.
 *
 * `MergeConfig` allows callers to influence how undefined values are treated
 * during state merging. These options are consumed by the active merge strategy
 * (e.g., array replace, append, shallow object merge, deep merge).
 */
export interface MergeConfig {
  /**
   * When enabled, properties with `undefined` values in the incoming snapshot
   * will clear corresponding properties on the current state. When disabled,
   * incoming `undefined` values leave existing state properties unchanged.
   */
  clearUndefined?: boolean;
}
