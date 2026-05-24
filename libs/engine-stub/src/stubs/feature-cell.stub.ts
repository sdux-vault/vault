import { StateEmitSnapshotShape } from '@sdux-vault/shared';
import { Observable, Subject } from 'rxjs';

/** Stub class that simulates FeatureCell construction and builder output for tests. */
export class FeatureCellClass<T> {
  /** Creates a stub FeatureCell instance, ignoring all arguments. */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(..._args: any[]) {}

  /**
   * Returns a stub builder object with no-op pipeline methods.
   *
   * @returns A stub builder matching the FeatureCell builder shape.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  build(): any {
    return {
      afterTaps: () => {},
      beforeTaps: () => {},

      destroy: () => {},
      destroyed$: new Subject<void>(),

      errors: () => {},
      filters: () => {},
      hydrate: () => {},
      initialize: () => {},
      interceptors: () => {},

      mergeState: () => {},
      operators: () => {},
      reducers: () => {},
      emitStates: () => {},

      replaceState: () => {},

      reset$: new Subject<void>(),
      reset: () => {},

      state$: new Subject<StateEmitSnapshotShape<T>>(),

      fromStream: (source$: Observable<T>) => {
        source$.subscribe();
      },

      get state() {
        return {
          isLoading: false,
          value: undefined,
          error: null,
          hasValue: false
        };
      }
    };
  }
}
