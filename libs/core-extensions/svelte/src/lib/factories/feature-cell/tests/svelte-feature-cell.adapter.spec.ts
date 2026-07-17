import { StateSnapshotShape } from '@sdux-vault/shared';
import { Observable, Subject } from 'rxjs';
import { SvelteFeatureCellAdapter } from '../svelte-feature-cell.adapter';
import { SvelteStateTracker } from '../svelte-state.tracker';

describe('Adapter: SvelteFeatureCell', () => {
  let state$: Subject<{ snapshot: StateSnapshotShape<number> }>;
  let snapshot: StateSnapshotShape<number>;

  beforeEach(() => {
    snapshot = createSnapshot();
    state$ = new Subject();
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
    const core = {
      get state() {
        return snapshot;
      },
      state$: state$.asObservable(),
      destroy: jasmine.createSpy('destroy')
    } as any;

    return {
      core,
      cell: new SvelteFeatureCellAdapter<number>(core).build()
    };
  }

  it('should augment and return the exact core instance', () => {
    const { core, cell } = createCell();

    expect(cell).toBe(core);
    expect(cell.state$).toBe(core.state$);
    expect(cell.destroy).toBe(core.destroy);
  });

  it('should expose State with the intended property contract', () => {
    const { cell } = createCell();
    const descriptor = Object.getOwnPropertyDescriptor(cell, 'state');

    expect(descriptor).toEqual(
      jasmine.objectContaining({
        configurable: true,
        enumerable: true,
        get: jasmine.any(Function)
      })
    );
    expect(descriptor?.set).toBeUndefined();
  });

  it('should preserve synchronous access to the current Snapshot', () => {
    const { cell } = createCell();

    expect(cell.state).toBe(snapshot);

    snapshot = createSnapshot({ value: 42, hasValue: true });

    expect(cell.state).toBe(snapshot);
  });

  it('should register each State read with the Svelte tracker', () => {
    const track = spyOn(SvelteStateTracker.prototype, 'track');
    const { cell } = createCell();

    expect(cell.state).toBe(snapshot);
    expect(cell.state).toBe(snapshot);

    expect(track).toHaveBeenCalledTimes(2);
  });

  it('should reject a core State surface that is not a getter', () => {
    const core = {
      state: snapshot,
      state$: state$.asObservable()
    } as any;

    expect(() => new SvelteFeatureCellAdapter<number>(core)).toThrowError(
      'SvelteFeatureCellAdapter requires FeatureCell state to be exposed by a getter.'
    );
  });
});

describe('SvelteStateTracker', () => {
  let state$: Subject<{ snapshot: StateSnapshotShape<number> }>;
  let snapshot: StateSnapshotShape<number>;
  let start: ((update: () => void) => void | (() => void)) | undefined;
  let track: jasmine.Spy<() => void>;

  beforeEach(() => {
    snapshot = {
      isLoading: false,
      value: undefined,
      error: null,
      hasValue: false
    };
    state$ = new Subject();
    start = undefined;
    track = jasmine.createSpy('track');
  });

  afterEach(() => {
    state$.complete();
  });

  function createTracker(): SvelteStateTracker<number> {
    const core = {
      get state() {
        return snapshot;
      },
      state$: new Observable<{ snapshot: StateSnapshotShape<number> }>(
        (observer) => state$.subscribe(observer)
      )
    };

    const subscriberFactory = ((startCallback: typeof start) => {
      start = startCallback;

      return track;
    }) as any;

    return new SvelteStateTracker(core as any, subscriberFactory);
  }

  it('should delegate reactive reads to the Svelte subscriber', () => {
    const tracker = createTracker();

    tracker.track();

    expect(track).toHaveBeenCalledTimes(1);
  });

  it('should notify Svelte when FeatureCell State emits', () => {
    createTracker();
    const update = jasmine.createSpy('update');
    const cleanup = start?.(update);

    expect(update).not.toHaveBeenCalled();

    snapshot = {
      isLoading: false,
      value: 42,
      error: null,
      hasValue: true
    };
    state$.next({
      snapshot
    });

    expect(update).toHaveBeenCalledTimes(1);

    if (typeof cleanup === 'function') cleanup();
  });

  it('should release the State subscription when Svelte disposes the effect', () => {
    let activeSubscriptions = 0;
    const observable = new Observable<{
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
      state$: observable
    };
    const subscriberFactory = ((startCallback: typeof start) => {
      start = startCallback;

      return track;
    }) as any;
    const tracker = new SvelteStateTracker(core as any, subscriberFactory);
    tracker.track();

    const cleanup = start?.(jasmine.createSpy('update'));
    expect(activeSubscriptions).toBe(1);

    if (typeof cleanup === 'function') cleanup();
    expect(activeSubscriptions).toBe(0);
  });
});
