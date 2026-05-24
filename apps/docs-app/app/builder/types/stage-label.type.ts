export const StageLabelType = {
  Encrypt: 'Encryption',
  Error: 'Error',
  Filter: 'Filter',
  Interceptor: 'Interceptor',
  Lookup: 'Lookup',
  Merge: 'Merge',
  Operator: 'Operator',
  Persist: 'Persist',
  Policy: 'Policy',
  Stepwise: 'Stepwise',
  Reducer: 'Reducer',
  Resolve: 'Resolve',
  State: 'State',
  Cache: 'Cache',
  Tap: 'Taps'
} as const;

export type StageLabelType =
  (typeof StageLabelType)[keyof typeof StageLabelType];
