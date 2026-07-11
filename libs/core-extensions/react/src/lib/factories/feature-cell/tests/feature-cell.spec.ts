import { Observable } from 'rxjs';
import { FeatureCell } from '../../../../public-api';

describe('Factory: React FeatureCell', () => {
  it('should expose the core API and React subscription hook', () => {
    const cell = FeatureCell<number>({
      key: 'react-test',
      initialState: 0,
      insights: {} as any
    });

    expect(cell).toEqual(
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
        state$: jasmine.any(Observable),
        useSyncExternalStore: jasmine.any(Function)
      })
    );

    cell.destroy();
  });
});
