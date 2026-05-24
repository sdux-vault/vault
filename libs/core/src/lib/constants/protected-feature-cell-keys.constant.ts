/**
 * Set of reserved FeatureCell API keys that behaviors are not allowed to
 * override through `extendCellAPI()`.
 *
 * These keys represent core lifecycle operations, pipeline configuration
 * methods, state mutation entry points, source adapters, tap-stage hooks,
 * identity properties, and other protected extensions used by the
 * FeatureCell runtime. Any attempt by a behavior to redefine one of these
 * keys will result in a runtime error to preserve API integrity.
 *
 * This list ensures that behaviors cannot replace, shadow, or mutate
 * critical functionality required for correct operation of the vault,
 * pipeline builder, state transitions, or devtools visibility.
 */
export const PROTECTED_FEATURE_CELL_KEYS = new Set<string>([
  // Core lifecycle
  'initialize',
  'destroy',
  'destroyed$',
  'reset',
  'reset$',

  // Pipeline configurators
  'reducers',
  'operators',
  'filters',
  'interceptors',

  // State mutation
  'mergeState',
  'replaceState',

  // Tap stages
  'beforeTaps',
  'afterTaps',

  // Identity
  'key',

  // State container
  'state',

  // Other keys
  'cache',
  'persist',
  'encrypt',
  'beforeTap',
  'afterTap',
  'hydrate'
]);
