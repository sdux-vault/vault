/**
 * Runtime-safe registry of all behavior types.
 *
 * This object acts as an enum substitute without introducing JavaScript enum
 * overhead.
 * Values are string literals preserved at runtime and suitable for
 * switch statements, comparisons, and pipeline classification.
 * Each key maps 1:1 to its string literal value.
 * The structure is fully tree-shakable and safely inferable by TypeScript.
 */
export const BehaviorTypes = {
  CoreAfterTap: 'coreAfterTap',
  CoreBeforeTap: 'coreBeforeTap',
  ReplayGlobalError: 'replayGlobalError',
  CoreError: 'coreError',
  CoreErrorCallback: 'coreErrorCallback',
  CoreState: 'coreState',
  Encrypt: 'encrypt',
  CoreEmitState: 'coreEmitState',
  CoreLicense: 'coreLicense',
  ErrorTransform: 'errorTransform',
  Extension: 'extension',
  Filter: 'filter',
  FromObservable: 'fromObservable',
  FromPromise: 'fromPromise',
  FromStream: 'fromStream',
  Interceptor: 'interceptor',
  Merge: 'merge',
  Operator: 'operator',
  Persist: 'persist',
  Reduce: 'reduce',
  Resolve: 'resolve',
  StepwiseFilter: 'stepwiseFilter',
  StepwiseReducer: 'stepwiseReducer',
  StepwiseResolve: 'stepwiseResolve',
  TabSyncState: 'tabSyncState'
} as const;

/**
 * Union of all valid behavior type strings.
 *
 * This type is derived from `BehaviorTypes` using literal inference, ensuring
 * strong typing while preserving full runtime compatibility.
 * This type should not be manually extended—add new values to `BehaviorTypes`
 * instead.
 *
 */
export type BehaviorType = (typeof BehaviorTypes)[keyof typeof BehaviorTypes];
