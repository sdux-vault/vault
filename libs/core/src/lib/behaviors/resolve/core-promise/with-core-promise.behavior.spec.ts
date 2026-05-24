import {
  BehaviorClassContext,
  BehaviorContext,
  BehaviorTypes,
  setVaultLogLevel
} from '@sdux-vault/shared';
import { flushVaultPipeline } from '@sdux-vault/testing-utils';
import { Subject } from 'rxjs';
import { withCorePromiseBehavior } from './with-core-promise.behavior';

describe('Behavior: CorePromiseResolve', () => {
  let behavior: withCorePromiseBehavior<any>;
  let ctx: BehaviorContext<any>;
  let warnSpy: jasmine.Spy;
  let debugSpy: jasmine.Spy;

  beforeEach(() => {
    warnSpy = spyOn(console, 'warn');
    debugSpy = spyOn(console, 'debug');

    setVaultLogLevel('debug');

    ctx = {
      featureCellKey: 'feature-cell',
      destroyed$: new Subject<void>(),
      reset$: new Subject<void>()
    } as unknown as BehaviorContext<any>;

    behavior = new withCorePromiseBehavior<any>(
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
    expect(behavior.resolveType).toBe('promise');
  });

  it('should expose correct static metadata', () => {
    expect(withCorePromiseBehavior.key).toBe('SDUX::Behavior::Core::Promise');
    expect(withCorePromiseBehavior.type).toBe(BehaviorTypes.Resolve);
    expect(withCorePromiseBehavior.critical).toBeFalse();
    expect(withCorePromiseBehavior.resolveType).toBe('promise');
    expect((withCorePromiseBehavior as any).wantsConfig).toBeFalse();
    expect((withCorePromiseBehavior as any).needsLicense).toBeFalse();
    expect((withCorePromiseBehavior as any).licenseId).toBeUndefined();
    expect((withCorePromiseBehavior as any).configKey).toBeUndefined();
    expect(
      (typeof withCorePromiseBehavior as any).installFluentApi
    ).toBeUndefined();
  });

  // ------------------------------------------------------------------------------------------
  // SKIP CASES
  // ------------------------------------------------------------------------------------------

  it('should skip when incoming is undefined', async () => {
    ctx.incoming = undefined;

    const result = await behavior.computeResolve(ctx);

    expect(result).toBeUndefined();
    expect(debugSpy).toHaveBeenCalledWith(
      '[vault]',
      'behavior key computeResolve promise called with incoming: undefined'
    );

    expect(debugSpy).toHaveBeenCalledWith(
      '[vault]',
      'behavior key computeResolve skipped — incoming is not a deferred factory.'
    );
  });

  it('should skip when incoming is null', async () => {
    ctx.incoming = null;

    const result = await behavior.computeResolve(ctx);

    expect(result).toBeUndefined();

    expect(debugSpy).toHaveBeenCalledWith(
      '[vault]',
      'behavior key computeResolve promise called with incoming: null'
    );

    expect(debugSpy).toHaveBeenCalledWith(
      '[vault]',
      'behavior key computeResolve skipped — incoming is not a deferred factory.'
    );
  });

  it('should skip when incoming is not a deferred factory', async () => {
    ctx.incoming = { value: 123 } as any;

    const result = await behavior.computeResolve(ctx);

    expect(result).toBeUndefined();

    expect(debugSpy).toHaveBeenCalledTimes(2);
  });

  it('should skip when deferred factory has non-function value property', async () => {
    ctx.incoming = { value: 123 } as any;

    const result = await behavior.computeResolve(ctx);

    expect(result).toBeUndefined();
    expect(debugSpy).toHaveBeenCalledTimes(2);
  });

  it('should skip when deferred factory has no value property', async () => {
    ctx.incoming = {} as any;

    const result = await behavior.computeResolve(ctx);

    expect(result).toBeUndefined();
    expect(debugSpy).toHaveBeenCalledTimes(2);
  });

  it('should return undefined when deferred factory returns undefined', async () => {
    ctx.incoming = {
      value: () => undefined
    };

    const result = await behavior.computeResolve(ctx);

    expect(result).toBeUndefined();
  });

  it('should return null when deferred factory returns null', async () => {
    ctx.incoming = {
      value: () => null
    };

    const result = await behavior.computeResolve(ctx);

    expect(result).toBeNull();
  });

  // ------------------------------------------------------------------------------------------
  // SUCCESS PATH
  // ------------------------------------------------------------------------------------------

  it('should resolve a value', async () => {
    ctx.incoming = () => 42;

    const result = await behavior.computeResolve(ctx);

    expect(result).toBe(42);
  });

  it('should resolve a promise value', async () => {
    ctx.incoming = () => Promise.resolve(42);

    const result = await behavior.computeResolve(ctx);

    expect(result).toBe(42);
  });

  it('should resolve a promise value', async () => {
    ctx.incoming = {
      value: () => Promise.resolve(42)
    };

    const result = await behavior.computeResolve(ctx);

    expect(result).toBe(42);
  });

  it('should resolve a promise value without destroyed$ or reset$', async () => {
    delete (ctx as any).destroyed$;
    delete (ctx as any).reset$;

    ctx.incoming = {
      value: () => Promise.resolve(42)
    };

    const result = await behavior.computeResolve(ctx);

    expect(result).toBe(42);
  });

  it('should resolve complex objects correctly', async () => {
    const payload = { id: 1, name: 'Ada' };

    ctx.incoming = {
      value: () => Promise.resolve(payload)
    };

    const result = await behavior.computeResolve(ctx);

    expect(result).toEqual(payload);
  });

  it('should resolve arrays correctly', async () => {
    const payload = [1, 2, 3];
    ctx.incoming = {
      value: () => Promise.resolve(payload)
    };

    const result = await behavior.computeResolve(ctx);

    expect(result).toEqual(payload);
  });

  it('should work with thenables (non-native Promise objects)', async () => {
    const thenable = {
      then: (resolve: (v: number) => void) => resolve(7)
    } as any;

    ctx.incoming = {
      value: () => thenable
    };

    const result = await behavior.computeResolve(ctx);

    expect(result).toBe(7);
  });

  it('should resolve synchronous values returned by deferred factory', async () => {
    ctx.incoming = {
      value: () => 123
    };

    const result = await behavior.computeResolve(ctx);

    expect(result).toBe(123);
  });
  // ------------------------------------------------------------------------------------------
  // ERROR PATH
  // ------------------------------------------------------------------------------------------

  it('should wrap promise rejections in a VaultError', async () => {
    ctx.incoming = {
      value: () => Promise.reject(new Error('Boom'))
    };

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

  it('should wrap synchronous factory throws in a VaultError', async () => {
    ctx.incoming = {
      value: () => {
        throw new Error('Sync Boom');
      }
    };

    let caught: any;

    try {
      await behavior.computeResolve(ctx);
      fail('Expected error');
    } catch (err) {
      caught = err;
    }

    expect(caught.message).toBe('Sync Boom');
  });

  it('should wrap non-Error promise rejections in a VaultError', async () => {
    ctx.incoming = {
      value: () => Promise.reject('Bad')
    };

    let caught: any;

    try {
      await behavior.computeResolve(ctx);
      fail('Expected error to be thrown');
    } catch (err) {
      caught = err;
    }

    expect(caught).toEqual(
      Object({
        message: 'Bad',
        featureCellKey: 'feature-cell',
        details: jasmine.any(String),
        raw: jasmine.anything(),
        timestamp: jasmine.any(Number)
      })
    );
  });

  it('should execute deferred factory each time computeResolve is called', async () => {
    const spy = jasmine.createSpy().and.returnValue(Promise.resolve(1));

    ctx.incoming = { value: spy };

    await behavior.computeResolve(ctx);
    await behavior.computeResolve(ctx);

    expect(spy).toHaveBeenCalledTimes(2);
  });

  it('should handle missing featureCellKey gracefully', async () => {
    delete (ctx as any).featureCellKey;

    ctx.incoming = {
      value: () => Promise.reject('Oops')
    };

    await expectAsync(behavior.computeResolve(ctx)).toBeRejected();
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
