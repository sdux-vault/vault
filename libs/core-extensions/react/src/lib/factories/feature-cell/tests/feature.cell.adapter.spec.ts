import { StateSnapshotShape } from '@sdux-vault/shared';
import { createElement } from 'react';
import { act } from 'react';
import { createRoot, Root } from 'react-dom/client';
import { renderToString } from 'react-dom/server';
import { BehaviorSubject, Observable } from 'rxjs';
import { ReactFeatureCellAdapter } from '../feature.cell.adapter';

describe('Adapter: ReactFeatureCell', () => {
  let host: HTMLDivElement;
  let root: Root;
  let state$: BehaviorSubject<{ snapshot: StateSnapshotShape<number> }>;
  let snapshot: StateSnapshotShape<number>;
  let activeSubscriptions: number;

  beforeAll(() => {
    (globalThis as any).IS_REACT_ACT_ENVIRONMENT = true;
  });

  beforeEach(() => {
    host = document.createElement('div');
    document.body.appendChild(host);
    root = createRoot(host);
    activeSubscriptions = 0;
    snapshot = createSnapshot();
    state$ = new BehaviorSubject({ snapshot });
  });

  afterEach(() => {
    act(() => root.unmount());
    state$.complete();
    host.remove();
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
      cell: new ReactFeatureCellAdapter<number>(core).build()
    };
  }

  it('should augment and return the exact core instance', () => {
    const { core, cell } = createCell();

    expect(cell).toBe(core);
    expect(cell.state$).toBe(core.state$);
    expect(cell.destroy).toBe(core.destroy);
    expect(cell.useSyncExternalStore).toEqual(jasmine.any(Function));
  });

  it('should expose the hook with the intended property contract', () => {
    const { cell } = createCell();
    const descriptor = Object.getOwnPropertyDescriptor(
      cell,
      'useSyncExternalStore'
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

  it('should render the current snapshot and react to state emissions', () => {
    const { cell } = createCell();

    function TestComponent() {
      const state = cell.useSyncExternalStore();
      return createElement('span', null, String(state.value));
    }

    act(() => root.render(createElement(TestComponent)));
    expect(host.textContent).toBe('undefined');

    act(() => {
      snapshot = createSnapshot({ value: 42, hasValue: true });
      state$.next({ snapshot });
    });

    expect(host.textContent).toBe('42');
  });

  it('should retain the snapshot reference for equivalent state', () => {
    const { cell } = createCell();
    let renderCount = 0;

    function TestComponent() {
      renderCount += 1;
      cell.useSyncExternalStore();
      return null;
    }

    act(() => root.render(createElement(TestComponent)));
    const initialRenderCount = renderCount;

    act(() => {
      snapshot = createSnapshot();
      state$.next({ snapshot });
    });

    expect(renderCount).toBe(initialRenderCount);
  });

  const snapshotChanges: Array<[string, StateSnapshotShape<number>]> = [
    ['isLoading', createSnapshot({ isLoading: true })],
    ['value', createSnapshot({ value: 1, hasValue: true })],
    ['error', createSnapshot({ error: { message: 'boom' } as any })],
    ['hasValue', createSnapshot({ hasValue: true })]
  ];

  snapshotChanges.forEach(([field, nextSnapshot]) => {
    it(`should invalidate the cached snapshot when ${field} changes`, () => {
      const { cell } = createCell();
      const renderedSnapshots: StateSnapshotShape<number>[] = [];

      function TestComponent() {
        renderedSnapshots.push(cell.useSyncExternalStore());
        return null;
      }

      act(() => root.render(createElement(TestComponent)));

      act(() => {
        snapshot = nextSnapshot;
        state$.next({ snapshot });
      });

      const latestSnapshot = renderedSnapshots[renderedSnapshots.length - 1];

      expect(renderedSnapshots.length).toBeGreaterThan(1);
      expect(latestSnapshot).not.toBe(renderedSnapshots[0]);
      expect(latestSnapshot).toBe(nextSnapshot);
    });
  });

  it('should manage multiple subscriptions independently', () => {
    const { cell } = createCell();

    function Subscriber() {
      cell.useSyncExternalStore();
      return null;
    }

    function TestComponent({ second }: { second: boolean }) {
      return createElement(
        'div',
        null,
        createElement(Subscriber, { key: 'first' }),
        second ? createElement(Subscriber, { key: 'second' }) : null
      );
    }

    act(() => root.render(createElement(TestComponent, { second: true })));
    expect(activeSubscriptions).toBe(2);

    act(() => root.render(createElement(TestComponent, { second: false })));
    expect(activeSubscriptions).toBe(1);

    act(() => root.unmount());
    expect(activeSubscriptions).toBe(0);
  });

  it('should unsubscribe on unmount and subscribe again on remount', () => {
    const { cell } = createCell();

    function TestComponent() {
      cell.useSyncExternalStore();
      return null;
    }

    act(() => root.render(createElement(TestComponent)));
    expect(activeSubscriptions).toBe(1);

    act(() => root.unmount());
    expect(activeSubscriptions).toBe(0);

    root = createRoot(host);
    act(() => root.render(createElement(TestComponent)));
    expect(activeSubscriptions).toBe(1);
  });

  it('should release the subscription when the state stream completes', () => {
    const { cell } = createCell();

    function TestComponent() {
      cell.useSyncExternalStore();
      return null;
    }

    act(() => root.render(createElement(TestComponent)));
    expect(activeSubscriptions).toBe(1);

    state$.complete();

    expect(activeSubscriptions).toBe(0);
  });

  it('should render the current snapshot during server-side rendering', () => {
    snapshot = createSnapshot({ value: 42, hasValue: true });
    const { cell } = createCell();

    function TestComponent() {
      const state = cell.useSyncExternalStore();
      return createElement('span', null, String(state.value));
    }

    expect(renderToString(createElement(TestComponent))).toContain('42');
    expect(activeSubscriptions).toBe(0);
  });
});
