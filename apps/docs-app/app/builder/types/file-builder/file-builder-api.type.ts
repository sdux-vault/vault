export const FileBuilderApiTypes = {
  AfterTaps: 'afterTaps',
  BeforeTaps: 'beforeTaps',
  Behaviors: 'behaviors',
  Controllers: 'controllers',
  EmitStates: 'emitStates',
  Encrypt: 'encrypt',
  Errors: 'errors',
  Filters: 'filters',
  Interceptors: 'interceptors',
  Lookup: 'lookup',
  None: 'none',
  Operators: 'operators',
  Reducers: 'reducers',
  StepwiseFilter: 'stepwiseFilter',
  StepwiseReducer: 'stepwiseReducer',
  StepwiseResolve: 'stepwiseResolve',
  StateCache: 'stateCache',
  WithDelayController: 'withDelay',
  WithMaxFailuresController: 'withMaxFailures',
  WithThrottleController: 'withThrottle'
} as const;

export type FileBuilderApiType =
  (typeof FileBuilderApiTypes)[keyof typeof FileBuilderApiTypes];

export const FileBuilderVaultApiOrder: FileBuilderApiType[] = [
  FileBuilderApiTypes.Encrypt,
  FileBuilderApiTypes.WithDelayController,
  FileBuilderApiTypes.WithThrottleController,
  FileBuilderApiTypes.WithMaxFailuresController,
  FileBuilderApiTypes.Interceptors,
  FileBuilderApiTypes.Filters,
  FileBuilderApiTypes.Operators,
  FileBuilderApiTypes.Reducers,
  FileBuilderApiTypes.AfterTaps,
  FileBuilderApiTypes.BeforeTaps,
  FileBuilderApiTypes.EmitStates,
  FileBuilderApiTypes.Errors,
  FileBuilderApiTypes.StateCache,
  FileBuilderApiTypes.Lookup,
  FileBuilderApiTypes.StepwiseFilter,
  FileBuilderApiTypes.StepwiseReducer,
  FileBuilderApiTypes.StepwiseResolve
];
