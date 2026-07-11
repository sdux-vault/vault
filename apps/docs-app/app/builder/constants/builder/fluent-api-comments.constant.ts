import { FileBuilderApiType } from '../../types/file-builder/file-builder-api.type';

export const FileBuilderVaultApiComments: Record<FileBuilderApiType, string> = {
  afterTaps: 'After-taps observe values after reducers complete',

  beforeTaps: 'Before-taps observe values before reducers run',

  behaviors: 'Behaviors modify pipeline behavior at definition time',

  controllers:
    'Controllers attach structural lifecycle behavior to the FeatureCell',

  encrypt:
    'Encrypts finalized pipeline output before persistence and decrypts during hydration.',

  emitStates: 'Emit-state callbacks run when state changes',

  errors: 'Error handlers intercept or react to pipeline failures',

  filters:
    'Filters may block or allow updates to continue through the pipeline',

  interceptors:
    'Interceptors preprocess incoming updates in order of declaration',

  lookup:
    'Enables identifier-based entity lookup coordinated through the state pipeline without time-based expiration or refresh.',

  none: '__none__',

  operators: 'Operators transform or gate values prior to filtering',

  reducers: 'Reducers transform the working state',

  stateCache:
    'Enables TTL-based entity caching with coordinated cache lookup and refresh through the state pipeline.',

  stepwiseFilter:
    'Applies deterministic policy control immediately after filtering, requiring an explicit decision before execution proceeds.',

  stepwiseReducer:
    'Applies deterministic policy control immediately after reducing, requiring an explicit decision before execution proceeds.',

  stepwiseResolve:
    'Applies deterministic policy control immediately after resolve, requiring an explicit decision before execution proceeds.',

  withDelay:
    'Delays pipeline update attempts by a configured duration before allowing them to proceed.',

  withMaxFailures:
    'Aborts pipeline execution for a given trace once its failure count reaches the configured maximum threshold.',

  withThrottle:
    'Limits the frequency of pipeline update attempts within a configured time window.'
};
