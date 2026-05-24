import {
  BehaviorTypes,
  FeatureCellExtensionContext,
  setVaultLogLevel
} from '@sdux-vault/shared';
import { flushVaultPipeline } from '@sdux-vault/testing-utils';
import { withCoreFromPromiseBehavior } from './with-core-from-promise.behavior';

describe('Behavior: withCoreFromPromiseBehavior - Deferred', () => {
  let behavior: withCoreFromPromiseBehavior<any>;
  let ctx: FeatureCellExtensionContext<any>;
  let warnSpy: jasmine.Spy;

  beforeEach(() => {
    warnSpy = spyOn(console, 'warn');

    setVaultLogLevel('warn');

    ctx = {
      featureCellKey: 'cell-key'
    } as any;

    behavior = new withCoreFromPromiseBehavior('behavior key', {} as any);
  });

  afterEach(() => {
    setVaultLogLevel('off');
  });

  // ---------------------------------------------------------------------------
  // METADATA
  // ---------------------------------------------------------------------------

  it('should have correct instance metadata', () => {
    expect(behavior.critical).toBeFalse();
    expect(behavior.type).toBe(BehaviorTypes.FromPromise);
    expect(behavior.key).toBe('behavior key');
    expect(behavior.resolveType).toBe('promise');
  });

  it('should have correct static metadata', () => {
    expect(withCoreFromPromiseBehavior.critical).toBeFalse();
    expect(withCoreFromPromiseBehavior.type).toBe(BehaviorTypes.FromPromise);
    expect(withCoreFromPromiseBehavior.key).toBe(
      'SDUX::Behavior::Core::FromPromise'
    );
    expect(withCoreFromPromiseBehavior.resolveType).toBe('promise');
    expect((withCoreFromPromiseBehavior as any).wantsConfig).toBeFalse();
    expect((withCoreFromPromiseBehavior as any).needsLicense).toBeFalse();
    expect((withCoreFromPromiseBehavior as any).configKey).toBeUndefined();
    expect(
      (typeof withCoreFromPromiseBehavior as any).installFluentApi
    ).toBeUndefined();
  });

  // ---------------------------------------------------------------------------
  // API EXTENSION
  // ---------------------------------------------------------------------------

  it('should expose fromDeferred', () => {
    const api = behavior.extendCellAPI(ctx);
    expect(typeof api.fromDeferred).toBe('function');
  });

  // ---------------------------------------------------------------------------
  // SUCCESS PATH
  // ---------------------------------------------------------------------------

  it('should resolve to no-op StateInputType when loading and error are provided but no value exists', async () => {
    const api = behavior.extendCellAPI(ctx);

    const result = await api.fromDeferred({
      loading: true,
      error: new Error('should be ignored')
      // value intentionally omitted
    } as any);

    expect(result).toEqual({
      loading: true,
      value: undefined,
      error: jasmine.any(Error)
    });
  });

  it('should resolve a successful promise into StateInputType', async () => {
    const api = behavior.extendCellAPI(ctx);

    const promise = Promise.resolve({ id: 1, name: 'Ada' });

    const result = await api.fromDeferred({
      value: () => promise
    });

    expect(result).toEqual({
      loading: false,
      value: { id: 1, name: 'Ada' },
      error: null
    });
  });

  it('should resolve primitive values correctly', async () => {
    const api = behavior.extendCellAPI(ctx);

    const result = await api.fromDeferred({ value: () => Promise.resolve(42) });

    expect(result).toEqual({
      loading: false,
      value: 42,
      error: null
    });
  });

  // ---------------------------------------------------------------------------
  // ERROR PATH
  // ---------------------------------------------------------------------------

  it('should normalize promise rejection into a VaultError', async () => {
    const api = behavior.extendCellAPI(ctx);

    let error: any;

    try {
      await api.fromDeferred({
        value: () => Promise.reject(new Error('Boom'))
      });
    } catch (err) {
      error = err;
    }

    expect(error).toEqual({
      message: 'Boom',
      featureCellKey: 'cell-key',
      details: jasmine.any(String),
      raw: jasmine.any(Error),
      timestamp: jasmine.any(Number)
    });
  });

  it('should always reject with a fresh VaultError instance', async () => {
    const api = behavior.extendCellAPI(ctx);

    let err1: any;
    let err2: any;

    try {
      await api.fromDeferred({ value: () => Promise.reject('x') });
    } catch (e) {
      err1 = e;
    }

    try {
      await api.fromDeferred({ value: () => Promise.reject('x') });
    } catch (e) {
      err2 = e;
    }

    expect(err1).not.toBe(err2);
    expect(err1).toEqual(
      Object({
        message: 'x',
        details: 'x',
        raw: 'x',
        timestamp: jasmine.any(Number),
        featureCellKey: 'cell-key'
      })
    );
  });

  it('should resolve to no-op StateInputType when input is not a DeferredFactory', async () => {
    const api = behavior.extendCellAPI(ctx);

    const result = await api.fromDeferred({});

    expect(result).toEqual({
      loading: false,
      value: undefined,
      error: null
    });
  });

  it('should resolve to no-op StateInputType when incoming is undefined', async () => {
    const api = behavior.extendCellAPI(ctx);

    const result = await api.fromDeferred(undefined);

    expect(result).toEqual({
      loading: false,
      value: undefined,
      error: null
    });
  });

  it('should normalize synchronous throws inside value() into VaultError', async () => {
    const api = behavior.extendCellAPI(ctx);

    let error: any;

    try {
      await api.fromDeferred({
        value: () => {
          throw new Error('sync boom');
        }
      });
    } catch (err) {
      error = err;
    }

    expect(error).toEqual({
      message: 'sync boom',
      featureCellKey: 'cell-key',
      details: jasmine.any(String),
      raw: jasmine.any(Error),
      timestamp: jasmine.any(Number)
    });
  });

  it('should resolve when value() returns undefined', async () => {
    const api = behavior.extendCellAPI(ctx);

    const result = await api.fromDeferred({
      value: () => undefined
    });

    expect(result).toEqual({
      loading: false,
      value: undefined,
      error: null
    });
  });

  it('should resolve when value() returns null', async () => {
    const api = behavior.extendCellAPI(ctx);

    const result = await api.fromDeferred({
      value: () => null
    });

    expect(result).toEqual({
      loading: false,
      value: null,
      error: null
    });
  });

  it('should normalize non-promise return values via Promise.resolve', async () => {
    const api = behavior.extendCellAPI(ctx);

    const result = await api.fromDeferred({
      value: () => ({ ok: true })
    });

    expect(result).toEqual({
      loading: false,
      value: { ok: true },
      error: null
    });
  });

  it('should ignore extra DeferredFactory fields', async () => {
    const api = behavior.extendCellAPI(ctx);

    const result = await api.fromDeferred({
      loading: true,
      error: 'ignored',
      value: () => Promise.resolve('ok')
    });

    expect(result).toEqual({
      loading: true,
      value: 'ok',
      error: 'ignored'
    });
  });

  describe('Non-promises', () => {
    it('should resolve synchronous non-promise return values', async () => {
      const api = behavior.extendCellAPI(ctx);

      const result = await api.fromDeferred({
        value: () => 123
      });

      expect(result).toEqual({
        loading: false,
        value: 123,
        error: null
      });
    });

    it('should resolve thenable return values correctly', async () => {
      const api = behavior.extendCellAPI(ctx);

      const thenable = {
        then: (resolve: any) => resolve('ok')
      };

      const result = await api.fromDeferred({
        value: () => thenable as any
      });

      expect(result).toEqual({
        loading: false,
        value: 'ok',
        error: null
      });
    });

    it('should call value() exactly once', async () => {
      const api = behavior.extendCellAPI(ctx);

      const spy = jasmine.createSpy('value').and.returnValue('ok');

      const result: any = await api.fromDeferred({
        value: spy
      });

      expect(spy).toHaveBeenCalledTimes(1);
      expect(result.value).toBe('ok');
    });

    it('should defer execution until invocation time', async () => {
      const api = behavior.extendCellAPI(ctx);

      let state = 1;

      const deferred = {
        value: () => state
      };

      state = 2;

      const result: any = await api.fromDeferred(deferred);

      expect(result.value).toBe(2);
    });

    it('should pass through error when value() is missing', async () => {
      const api = behavior.extendCellAPI(ctx);

      const err = new Error('raw');

      const result = await api.fromDeferred({
        loading: true,
        error: err
      } as any);

      expect(result).toEqual({
        loading: true,
        value: undefined,
        error: err
      });
    });

    it('should distinguish Promise<undefined> from missing value()', async () => {
      const api = behavior.extendCellAPI(ctx);

      const result = await api.fromDeferred({
        value: () => Promise.resolve(undefined)
      });

      expect(result).toEqual({
        loading: false,
        value: undefined,
        error: null
      });
    });

    it('should normalize non-Error promise rejections', async () => {
      const api = behavior.extendCellAPI(ctx);

      let err: any;

      try {
        await api.fromDeferred({
          value: () => Promise.reject({ code: 500 })
        });
      } catch (e) {
        err = e;
      }

      expect(err).toEqual(
        jasmine.objectContaining({
          raw: { code: 500 },
          featureCellKey: 'cell-key'
        })
      );
    });
  });

  // ---------------------------------------------------------------------------
  // LIFECYCLE (NOOP)
  // ---------------------------------------------------------------------------

  it('destroy is noop', async () => {
    behavior.destroy();
    await flushVaultPipeline();

    expect(warnSpy).toHaveBeenCalledWith(
      '[vault]',
      'behavior key - destroy "noop"'
    );
  });

  it('reset is noop', async () => {
    behavior.reset();
    await flushVaultPipeline();

    expect(warnSpy).toHaveBeenCalledWith(
      '[vault]',
      'behavior key - reset "noop"'
    );
  });
});
