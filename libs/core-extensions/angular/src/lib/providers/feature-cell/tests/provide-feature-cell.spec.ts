import { Injector, provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';

import { provideVaultTesting } from '../../../../testing/provide-vault-testing';
import { FeatureCell } from '../../../decorators/feature-cell.decorator';
import { injectVault } from '../../../injectors/feature-vault.injector';
import { provideFeatureCell } from '../provide-feature-cell.provider';

describe('Provider: Feature Cell (core vault functionality)', () => {
  let injector: Injector;
  let testService: any;

  @FeatureCell<any>('test')
  class TestService {
    public readonly vault = injectVault<any>(TestService);
    constructor() {}
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        provideVaultTesting(),

        provideFeatureCell(TestService, {
          key: 'test',
          initialState: [],
          insights: {} as any
        }),
        TestService
      ]
    });

    injector = TestBed.inject(Injector);
    testService = injector.get(TestService);
  });

  it('should provide the correct FeatureCell instance', () => {
    expect(testService.vault).toEqual(
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
          isLoading: jasmine.any(Function),
          value: jasmine.any(Function),
          error: jasmine.any(Function),
          hasValue: jasmine.any(Function)
        }),
        state$: jasmine.any(Observable)
      })
    );
  });
});
