import {
  Injector,
  provideZonelessChangeDetection,
  runInInjectionContext
} from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { flushVaultPipeline } from '@sdux-vault/testing-utils';
import { BehaviorSubject } from 'rxjs';
import { provideVaultTesting } from '../../../../testing/provide-vault-testing';
import { FeatureCellShape } from '../../../shapes/feature-cell.shape';
import { AngularFeatureCellAdapter } from '../feature.cell.adapter';

describe('Adapter: AngularFeatureCell', () => {
  type State = number;

  let state$: BehaviorSubject<any>;
  let destroyed = false;

  let core: FeatureCellShape<State>;
  let adapter: AngularFeatureCellAdapter<State>;
  let cell: FeatureCellShape<State>;

  beforeEach(() => {
    destroyed = false;

    state$ = new BehaviorSubject(undefined);

    core = {
      state$: state$.asObservable(),
      destroy(): void {
        destroyed = true;
      }
    } as FeatureCellShape<State>;

    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection(), provideVaultTesting()]
    });

    const injector = TestBed.inject(Injector);

    runInInjectionContext(injector, async () => {
      adapter = new AngularFeatureCellAdapter(core);
      cell = adapter.build();
    });
  });

  afterEach(() => {
    state$.complete();
  });

  it('should expose Angular signals for state', () => {
    expect(cell.state).toBeDefined();

    expect(cell.state.isLoading()).toBeFalse();
    expect(cell.state.value()).toBeUndefined();
    expect(cell.state.error()).toBeNull();
    expect(cell.state.hasValue()).toBeFalse();
  });

  it('should reflect state$ emissions into signals', () => {
    state$.next(
      Object({
        snapshot: Object({
          isLoading: true,
          value: 123,
          error: null,
          hasValue: true
        })
      })
    );

    expect(cell.state.isLoading()).toBeTrue();
    expect(cell.state.value()).toBe(123);
    expect(cell.state.error()).toBeNull();
    expect(cell.state.hasValue()).toBeTrue();
  });

  it('should update hasValue correctly when value becomes undefined', () => {
    state$.next(
      Object({
        snapshot: Object({
          isLoading: false,
          value: 42,
          error: null,
          hasValue: true
        })
      })
    );

    expect(cell.state.hasValue()).toBeTrue();

    state$.next({
      isLoading: false,
      value: undefined,
      error: null,
      hasValue: false
    });

    expect(cell.state.hasValue()).toBeFalse();
  });

  it('should update error signal when error changes', () => {
    const error = { message: 'boom' } as any;

    state$.next(
      Object({
        snapshot: Object({
          isLoading: false,
          value: undefined,
          error,
          hasValue: false
        })
      })
    );

    expect(cell.state.error()).toBe(error);
  });

  it('should forward core properties onto the built FeatureCellModel', () => {
    expect(cell.state$).toBe(core.state$);
    expect(typeof cell.destroy).toBe('function');
  });

  it('should unsubscribe and destroy core on destroy()', async () => {
    adapter.destroy();
    await flushVaultPipeline();

    expect(destroyed).toBeTrue();

    // Emitting after destroy should NOT update signals
    state$.next(
      Object({
        snapshot: Object({
          isLoading: true,
          value: 999,
          error: null,
          hasValue: true
        })
      })
    );

    expect(cell.state.isLoading()).toBeFalse();
    expect(cell.state.value()).toBeUndefined();
  });
});
