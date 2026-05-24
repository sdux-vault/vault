export const StageIdTypes = {
  Cache: 'cache',
  Encrypt: 'encrypt',
  Error: 'error',
  Filter: 'filter',
  Interceptor: 'interceptor',
  Lookup: 'lookup',
  Merge: 'merge',
  Operator: 'operator',
  Persist: 'persist',
  Policy: 'policy',
  Reducer: 'reducer',
  Resolve: 'resolve',
  State: 'state',
  Stepwise: 'stepwise',
  Tap: 'tap',
  UpdateStrategy: 'updateStrategy'
} as const;

export type StageIdType = (typeof StageIdTypes)[keyof typeof StageIdTypes];
