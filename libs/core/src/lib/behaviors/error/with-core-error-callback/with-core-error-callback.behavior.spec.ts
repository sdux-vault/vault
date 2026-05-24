import {
  BehaviorTypes,
  setVaultLogLevel,
  VaultErrorShape
} from '@sdux-vault/shared';
import { flushVaultPipeline } from '@sdux-vault/testing-utils';
import { withCoreErrorCallbackBehavior } from './with-core-error-callback.behavior';

describe('Behavior: withCoreErrorCallbackBehavior', () => {
  let behavior: withCoreErrorCallbackBehavior<any>;
  let warnSpy: any;

  beforeEach(() => {
    warnSpy = spyOn(console, 'warn');
    setVaultLogLevel('warn');

    behavior = new withCoreErrorCallbackBehavior('behavior key', {} as any);
  });

  afterEach(() => {
    setVaultLogLevel('off');
  });

  // ---------------------------------------------------------------------------
  // METADATA
  // ---------------------------------------------------------------------------

  it('should have correct default metadata', () => {
    expect(behavior.critical).toBeTrue();
    expect(behavior.type).toBe(BehaviorTypes.CoreErrorCallback);
    expect(behavior.key).toBe('behavior key');
  });

  it('should apply metadata from @VaultBehavior to the class', () => {
    expect((withCoreErrorCallbackBehavior as any).type).toBe(
      BehaviorTypes.CoreErrorCallback
    );
    expect((withCoreErrorCallbackBehavior as any).key).toContain(
      'SDUX::Behavior::Core::ErrorCallback'
    );
    expect((withCoreErrorCallbackBehavior as any).critical).toBeTrue();
  });

  // ---------------------------------------------------------------------------
  // handleError BEHAVIOR
  // ---------------------------------------------------------------------------

  it('should warn when callback is not a function', async () => {
    const current: VaultErrorShape = {
      message: 'err',
      featureCellKey: 'cell key',
      raw: 'err',
      timestamp: Date.now()
    };

    const state = { foo: 123 } as any;
    const result = behavior.callbackError(current, state, null as any);

    await flushVaultPipeline();

    expect(await result).toBeUndefined();
    expect(warnSpy).toHaveBeenCalledWith(
      '[vault]',
      `behavior key handleError skipped - "null" is not a function.`
    );
  });

  it('should call callback with current ResourceStateError and state snapshot', async () => {
    const current: VaultErrorShape = {
      message: 'msg',
      featureCellKey: 'cell key',
      raw: 'raw',
      timestamp: Date.now()
    };

    const state = { count: 42 } as any;
    const cb = jasmine.createSpy('cb');

    const result = behavior.callbackError(current, state, cb);

    expect(cb).toHaveBeenCalledWith(current, state);
    expect(await result).toBeUndefined();
  });

  it('should catch and warn when callback throws', async () => {
    const current: VaultErrorShape = {
      message: 'x',
      featureCellKey: 'cell key',
      raw: 'x',
      timestamp: Date.now()
    };

    const state = { ok: true } as any;
    const cb = () => {
      throw new Error('callback failure');
    };

    const result = behavior.callbackError(current, state, cb);
    await flushVaultPipeline();

    expect(await result).toBeUndefined();
    expect(warnSpy).toHaveBeenCalledWith(
      '[vault]',
      `behavior key oldschoolCallback threw: Error: callback failure`
    );
  });

  it('should always return VAULT_NOOP regardless of callback results', async () => {
    const current: VaultErrorShape = {
      message: 'err',
      featureCellKey: 'cell key',
      raw: 'raw',
      timestamp: Date.now()
    };
    const state = { value: 1 } as any;
    const cb = jasmine.createSpy('cb').and.returnValue('anything');

    const result = behavior.callbackError(current, state, cb);

    expect(await result).toBeUndefined();
  });

  it('should not break if callback is undefined', async () => {
    const current: VaultErrorShape = {
      message: 'msg',
      featureCellKey: 'cell key',
      raw: 'raw',
      timestamp: Date.now()
    };
    const state = { foo: true } as any;

    const result = behavior.callbackError(current, state, undefined as any);
    await flushVaultPipeline();

    expect(await result).toBeUndefined();
    expect(warnSpy).toHaveBeenCalledWith(
      '[vault]',
      `behavior key handleError skipped - "undefined" is not a function.`
    );
  });

  // ---------------------------------------------------------------------------
  // LIFECYCLE HOOKS
  // ---------------------------------------------------------------------------

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
