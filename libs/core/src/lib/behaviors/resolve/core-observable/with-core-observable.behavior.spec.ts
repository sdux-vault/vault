import {
  BehaviorClassContext,
  BehaviorContext,
  BehaviorTypes,
  setVaultLogLevel
} from '@sdux-vault/shared';
import { flushVaultPipeline } from '@sdux-vault/testing-utils';
import { of, Subject, throwError } from 'rxjs';
import { withCoreObservableBehavior } from './with-core-observable.behavior';

describe('Behavior: CoreObservableResolve', () => {
  let behavior: withCoreObservableBehavior<any>;
  let ctx: BehaviorContext<any>;
  let warnSpy: jasmine.Spy;

  beforeEach(() => {
    warnSpy = spyOn(console, 'warn');

    setVaultLogLevel('warn');

    ctx = {
      featureCellKey: 'feature-cell',
      destroyed$: new Subject<void>(),
      reset$: new Subject<void>()
    } as unknown as BehaviorContext<any>;

    behavior = new withCoreObservableBehavior(
      'behavior key',
      {} as BehaviorClassContext
    );
  });

  afterEach(() => {
    setVaultLogLevel('off');
  });

  // ------------------------------------------------------------------------------------------
  // METADATA
  // ------------------------------------------------------------------------------------------

  it('should expose correct instance metadata', () => {
    expect(behavior.critical).toBeFalse();
    expect(behavior.type).toBe(BehaviorTypes.Resolve);
    expect(behavior.key).toBe('behavior key');
    expect(behavior.resolveType).toBe('observable');
  });

  it('should expose correct static metadata', () => {
    expect(withCoreObservableBehavior.key).toBe(
      'SDUX::Behavior::Core::Observable'
    );
    expect(withCoreObservableBehavior.type).toBe(BehaviorTypes.Resolve);
    expect(withCoreObservableBehavior.critical).toBeFalse();
    expect(withCoreObservableBehavior.resolveType).toBe('observable');
  });

  // ------------------------------------------------------------------------------------------
  // SKIP CASES
  // ------------------------------------------------------------------------------------------

  it('should skip when incoming is undefined', async () => {
    ctx.incoming = undefined;
    const result = await behavior.computeResolve(ctx);
    expect(result).toBeUndefined();
  });

  it('should skip when incoming is null', async () => {
    ctx.incoming = null;
    const result = await behavior.computeResolve(ctx);
    expect(result).toBeUndefined();
  });

  it('should skip when incoming is not an Observable', async () => {
    ctx.incoming = { value: 123 } as any;
    const result = await behavior.computeResolve(ctx);
    expect(result).toBeUndefined();
  });

  // ------------------------------------------------------------------------------------------
  // SUCCESS PATH
  // ------------------------------------------------------------------------------------------

  it('should resolve the first emitted value from an Observable', async () => {
    ctx.incoming = of(42);

    const result = await behavior.computeResolve(ctx);
    expect(result).toBe(42);
  });

  it('should resolve the first emitted value from an Observable without destroyed$ or reset$', async () => {
    delete ctx.destroyed$;
    delete ctx.reset$;
    ctx.incoming = of(42);

    const result = await behavior.computeResolve(ctx);
    expect(result).toBe(42);
  });

  it('should resolve complex objects correctly', async () => {
    const payload = { id: 1, name: 'Ada' };
    ctx.incoming = of(payload);

    const result = await behavior.computeResolve(ctx);
    expect(result).toEqual(payload);
  });

  it('should resolve arrays correctly', async () => {
    const payload = [1, 2, 3];
    ctx.incoming = of(payload);

    const result = await behavior.computeResolve(ctx);
    expect(result).toEqual(payload);
  });

  // ------------------------------------------------------------------------------------------
  // ERROR PATH
  // ------------------------------------------------------------------------------------------

  it('should wrap observable errors in a VaultError', async () => {
    ctx.incoming = throwError(() => new Error('Boom'));

    let caught: any;

    try {
      await behavior.computeResolve(ctx);
      fail('Expected error to be thrown');
    } catch (err) {
      caught = err;
    }

    expect(caught).toEqual(
      Object({
        message: 'Boom',
        featureCellKey: 'feature-cell',
        details: jasmine.any(String),
        raw: jasmine.any(Error),
        timestamp: jasmine.any(Number)
      })
    );
  });

  // ------------------------------------------------------------------------------------------
  // LIFE-CYCLE NOOPS
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
