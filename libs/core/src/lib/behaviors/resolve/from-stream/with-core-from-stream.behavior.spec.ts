import {
  BehaviorClassContext,
  BehaviorTypes,
  setVaultLogLevel
} from '@sdux-vault/shared';
import { flushVaultPipeline } from '@sdux-vault/testing-utils';
import { Subject } from 'rxjs';
import { withCoreFromStreamBehavior } from './with-core-from-stream.behavior';

describe('Behavior: withCoreFromStream', () => {
  let behavior: withCoreFromStreamBehavior<any>;
  let ctx: any;

  let destroyed$: Subject<void>;
  let reset$: Subject<void>;

  let mergeStateSpy: jasmine.Spy;
  let replaceStateSpy: jasmine.Spy;

  let vaultMonitor: any;
  let warnSpy: any;

  beforeEach(() => {
    warnSpy = spyOn(console, 'warn');

    setVaultLogLevel('warn');

    destroyed$ = new Subject<void>();
    reset$ = new Subject<void>();

    mergeStateSpy = jasmine.createSpy('mergeState');
    replaceStateSpy = jasmine.createSpy('replaceState');

    vaultMonitor = {
      ingressSubscribed: jasmine.createSpy('ingressSubscribed'),
      ingressCompleted: jasmine.createSpy('ingressCompleted')
    };

    ctx = {
      featureCellKey: 'cell-key',
      destroyed$,
      reset$,
      mergeState: mergeStateSpy,
      replaceState: replaceStateSpy,
      state$: new Subject(),
      vaultMonitor
    };

    const behaviorCtx = {} as unknown as BehaviorClassContext;
    behavior = new withCoreFromStreamBehavior('behavior key', behaviorCtx);
  });

  afterEach(() => {
    setVaultLogLevel('off');
  });

  // ------------------------------------------------------------------------------------------
  // METADATA TESTS
  // ------------------------------------------------------------------------------------------

  it('should have correct instance metadata', () => {
    expect(behavior.critical).toBeFalse();
    expect(behavior.type).toBe(BehaviorTypes.FromStream);
    expect(behavior.key).toBe('behavior key');
  });

  it('should have correct static metadata', () => {
    expect(withCoreFromStreamBehavior.critical).toBeFalse();
    expect(withCoreFromStreamBehavior.type).toBe(BehaviorTypes.FromStream);
    expect(withCoreFromStreamBehavior.key).toBe(
      'SDUX::Behavior::Core::FromStream'
    );
    expect(withCoreFromStreamBehavior.resolveType).toBe('observable');
  });

  // ------------------------------------------------------------------------------------------
  // EXTENSION API TESTS
  // ------------------------------------------------------------------------------------------

  it('should expose fromStream API', () => {
    const api = behavior.extendCellAPI(ctx);
    expect(typeof api.fromStream).toBe('function');
  });

  // ------------------------------------------------------------------------------------------
  // FROM STREAM – SUCCESS PATH
  // ------------------------------------------------------------------------------------------

  it('should merge incoming values and auto-reset error by default', async () => {
    const api = behavior.extendCellAPI(ctx);
    const source$ = new Subject<number>();

    api.fromStream(source$);

    source$.next(42);
    await flushVaultPipeline();

    expect(mergeStateSpy).toHaveBeenCalledWith({
      value: 42,
      error: null
    });

    expect(vaultMonitor.ingressSubscribed).toHaveBeenCalledWith(
      'cell-key',
      'behavior key',
      ctx,
      'fromStream'
    );
  });

  it('should NOT auto-reset error when autoResetError = false', async () => {
    const api = behavior.extendCellAPI(ctx);
    const source$ = new Subject<number>();

    api.fromStream(source$, { autoResetError: false });

    source$.next(7);
    await flushVaultPipeline();

    expect(mergeStateSpy).toHaveBeenCalledWith({
      value: 7
    });
  });

  // ------------------------------------------------------------------------------------------
  // FROM STREAM – ERROR PATH
  // ------------------------------------------------------------------------------------------

  it('should convert stream errors into VaultErrors', async () => {
    const api = behavior.extendCellAPI(ctx);
    const source$ = new Subject<number>();

    api.fromStream(source$);

    source$.error(new Error('Boom'));
    await flushVaultPipeline();

    expect(mergeStateSpy).toHaveBeenCalledWith(
      jasmine.objectContaining({
        error: jasmine.objectContaining({
          message: 'Boom',
          featureCellKey: 'behavior key',
          raw: jasmine.any(Error),
          timestamp: jasmine.any(Number)
        })
      })
    );
  });

  // ------------------------------------------------------------------------------------------
  // FROM STREAM – COMPLETE PATH
  // ------------------------------------------------------------------------------------------

  it('should notify vaultMonitor on completion', async () => {
    const api = behavior.extendCellAPI(ctx);
    const source$ = new Subject<number>();

    api.fromStream(source$);

    source$.complete();
    await flushVaultPipeline();

    expect(vaultMonitor.ingressCompleted).toHaveBeenCalledWith(
      'cell-key',
      'behavior key',
      ctx,
      'fromStream'
    );
  });

  // ------------------------------------------------------------------------------------------
  // FROM STREAM – LIFECYCLE TERMINATION
  // ------------------------------------------------------------------------------------------

  it('should not stop emitting after reset$', async () => {
    const api = behavior.extendCellAPI(ctx);
    const source$ = new Subject<number>();

    api.fromStream(source$);

    source$.next(1);
    reset$.next();

    source$.next(2);
    await flushVaultPipeline();

    expect(mergeStateSpy.calls.count()).toBe(2);
  });

  it('should stop emitting after destroyed$', async () => {
    const api = behavior.extendCellAPI(ctx);
    const source$ = new Subject<number>();

    api.fromStream(source$);

    source$.next(1);
    destroyed$.next();

    source$.next(2);
    await flushVaultPipeline();

    expect(mergeStateSpy.calls.count()).toBe(1);
  });

  // ------------------------------------------------------------------------------------------
  // LIFE-CYCLE TESTS
  // ------------------------------------------------------------------------------------------

  it('should validate destroy is noop', async () => {
    behavior.destroy();
    await flushVaultPipeline();

    expect(warnSpy).toHaveBeenCalledWith(
      '[vault]',
      'behavior key - destroy "noop"'
    );
  });

  it('should validate reset is noop', async () => {
    behavior.reset();
    await flushVaultPipeline();

    expect(warnSpy).toHaveBeenCalledWith(
      '[vault]',
      'behavior key - reset "noop"'
    );
  });
});
