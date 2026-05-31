/** Shape tracking the count of fluent API registrations on a FeatureCell. */
export interface VaultRegistrationFluentApiShape {
  /** Number of registered filter functions. */
  filters: number;

  /** Number of registered reducer functions. */
  reducers: number;

  /** Number of registered before-tap callbacks. */
  beforeTaps: number;

  /** Number of registered after-tap callbacks. */
  afterTaps: number;

  /** Number of registered interceptor classes. */
  interceptors: number;

  /** Number of registered operator classes. */
  operators: number;

  /** Number of registered emit-state callbacks. */
  emitStateCallbacks: number;

  /** Number of registered error callbacks. */
  errorCallbacks: number;
}
