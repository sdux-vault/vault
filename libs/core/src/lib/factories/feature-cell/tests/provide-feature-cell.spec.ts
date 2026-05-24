import { Observable } from 'rxjs';
import { Vault } from '../../vault/vault';
import { FeatureCell } from '../feature-cell';

describe('Provider: Feature Cell (core vault functionality)', () => {
  let vault: any;

  beforeEach(() => {
    Vault();
    vault = FeatureCell({
      key: 'http-2',
      initialState: [],
      insights: {} as any
    });
  });

  it('should provide the correct FeatureCell token', () => {
    expect(vault).toEqual(
      Object({
        afterTaps: jasmine.any(Function),
        beforeTaps: jasmine.any(Function),
        destroy: jasmine.any(Function),
        destroyed$: jasmine.any(Observable),
        emitStates: jasmine.any(Function),
        errors: jasmine.any(Function),
        filters: jasmine.any(Function),
        fromStream: jasmine.any(Function),
        hydrate: jasmine.any(Function),
        initialize: jasmine.any(Function),
        interceptors: jasmine.any(Function),
        mergeState: jasmine.any(Function),
        operators: jasmine.any(Function),
        reducers: jasmine.any(Function),
        replaceState: jasmine.any(Function),
        reset$: jasmine.any(Observable),
        reset: jasmine.any(Function),
        state: Object({
          isLoading: false,
          value: undefined,
          error: null,
          hasValue: false
        }),
        state$: jasmine.any(Observable)
      })
    );
  });
});
