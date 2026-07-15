import { StateSnapshotShape } from '@sdux-vault/shared';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  effectScope,
  isReactive,
  isReadonly,
  nextTick,
  watchEffect
} from 'vue';
import { VueFeatureCellAdapter } from '../vue-feature-cell.adapter';

describe('Adapter: VueFeatureCell', () => {
  let state$: BehaviorSubject<{ snapshot: StateSnapshotShape<number> }>;
  let snapshot: StateSnapshotShape<number>;
  let activeSubscriptions: number;

  beforeEach(() => {
    activeSubscriptions = 0;
    snapshot = createSnapshot();
    state$ = new BehaviorSubject({ snapshot });
  });

  afterEach(() => {
    state$.complete();
  });

  function createSnapshot(
    overrides: Partial<StateSnapshotShape<number>> = {}
  ): StateSnapshotShape<number> {
    return {
      isLoading: false,
      value: undefined,
      error: null,
      hasValue: false,
      ...overrides
    };
  }

  function createCell() {
    const observableState$ = new Observable<{
      snapshot: StateSnapshotShape<number>;
    }>((observer) => {
      activeSubscriptions += 1;
      const subscription = state$.subscribe(observer);

      return () => {
        activeSubscriptions -= 1;
        subscription.unsubscribe();
      };
    });

    const core = {
      get state() {
        return snapshot;
      },
      state$: observableState$,
      destroy: jasmine.createSpy('destroy')
    } as any;

    return {
      core,
      cell: new VueFeatureCellAdapter<number>(core).build()
    };
  }

  it('should augment and return the exact core instance', () => {
    const { core, cell } = createCell();

    expect(cell).toBe(core);
    expect(cell.state$).toBe(core.state$);
    expect(cell.destroy).toBe(core.destroy);
    expect(cell.useReactiveState).toEqual(jasmine.any(Function));
  });

  it('should expose the composable with the intended property contract', () => {
    const { cell } = createCell();
    const descriptor = Object.getOwnPropertyDescriptor(
      cell,
      'useReactiveState'
    );

    expect(descriptor).toEqual(
      jasmine.objectContaining({
        configurable: true,
        enumerable: true,
        writable: false,
        value: jasmine.any(Function)
      })
    );
  });

  it('should require an active Vue effect scope', () => {
    const { cell } = createCell();

    expect(() => cell.useReactiveState()).toThrowError(
      'useReactiveState() must be called within an active Vue effect scope.'
    );
    expect(activeSubscriptions).toBe(0);
  });

  it('should expose a readonly reactive snapshot', () => {
    const { cell } = createCell();
    const scope = effectScope();
    const reactiveState = scope.run(() => cell.useReactiveState())!;

    expect(reactiveState).toBeDefined();
    expect(isReactive(reactiveState)).toBeTrue();
    expect(isReadonly(reactiveState)).toBeTrue();
    expect(reactiveState).toEqual(
      jasmine.objectContaining({
        isLoading: false,
        value: undefined,
        error: null,
        hasValue: false
      })
    );

    scope.stop();
  });

  it('should react to committed State emissions', async () => {
    const { cell } = createCell();
    const scope = effectScope();
    const renderedSnapshots: StateSnapshotShape<number>[] = [];

    scope.run(() => {
      const reactiveState = cell.useReactiveState();

      watchEffect(() => {
        renderedSnapshots.push({ ...reactiveState });
      });
    });

    snapshot = createSnapshot({ value: 42, hasValue: true });
    state$.next({ snapshot });
    await nextTick();

    expect(renderedSnapshots[renderedSnapshots.length - 1]).toEqual(snapshot);

    scope.stop();
  });

  const snapshotChanges: Array<[string, StateSnapshotShape<number>]> = [
    ['isLoading', createSnapshot({ isLoading: true })],
    ['value', createSnapshot({ value: 1, hasValue: true })],
    ['error', createSnapshot({ error: { message: 'boom' } as any })],
    ['hasValue', createSnapshot({ hasValue: true })]
  ];

  snapshotChanges.forEach(([field, nextSnapshot]) => {
    it(`should react when ${field} changes`, async () => {
      const { cell } = createCell();
      const scope = effectScope();
      const observedValues: unknown[] = [];

      scope.run(() => {
        const reactiveState = cell.useReactiveState();

        watchEffect(() => {
          observedValues.push(
            reactiveState[field as keyof typeof reactiveState]
          );
        });
      });

      snapshot = nextSnapshot;
      state$.next({ snapshot });
      await nextTick();

      expect(observedValues[observedValues.length - 1]).toEqual(
        nextSnapshot[field as keyof typeof nextSnapshot]
      );

      scope.stop();
    });
  });

  it('should not trigger reactive effects for equivalent State', async () => {
    const { cell } = createCell();
    const scope = effectScope();
    const observedSnapshots: StateSnapshotShape<number>[] = [];

    scope.run(() => {
      const reactiveState = cell.useReactiveState();

      watchEffect(() => {
        observedSnapshots.push({ ...reactiveState });
      });
    });

    const initialEffectCount = observedSnapshots.length;
    snapshot = createSnapshot();
    state$.next({ snapshot });
    await nextTick();

    expect(observedSnapshots.length).toBe(initialEffectCount);

    scope.stop();
  });

  it('should manage multiple Vue scopes independently', () => {
    const { cell } = createCell();
    const firstScope = effectScope();
    const secondScope = effectScope();

    firstScope.run(() => cell.useReactiveState());
    secondScope.run(() => cell.useReactiveState());
    expect(activeSubscriptions).toBe(2);

    secondScope.stop();
    expect(activeSubscriptions).toBe(1);

    firstScope.stop();
    expect(activeSubscriptions).toBe(0);
  });

  it('should unsubscribe on disposal and subscribe again in a new scope', () => {
    const { cell } = createCell();
    const firstScope = effectScope();

    firstScope.run(() => cell.useReactiveState());
    expect(activeSubscriptions).toBe(1);

    firstScope.stop();
    expect(activeSubscriptions).toBe(0);

    const secondScope = effectScope();
    secondScope.run(() => cell.useReactiveState());
    expect(activeSubscriptions).toBe(1);

    secondScope.stop();
    expect(activeSubscriptions).toBe(0);
  });

  it('should release the subscription when the State stream completes', () => {
    const { cell } = createCell();
    const scope = effectScope();

    scope.run(() => cell.useReactiveState());
    expect(activeSubscriptions).toBe(1);

    state$.complete();
    expect(activeSubscriptions).toBe(0);

    scope.stop();
  });
});
