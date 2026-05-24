import {
  CoreEmitStateCallback,
  setVaultLogLevel,
  VAULT_NOOP
} from '@sdux-vault/shared';
import { flushVaultPipeline } from '@sdux-vault/testing-utils';
import { withCoreEmitStateBehavior } from './with-core-emit-state.behavior';

describe('Behavior: CoreEmitState', () => {
  let behavior: any;
  let warnSpy: any;
  let errorSpy: any;

  beforeEach(() => {
    warnSpy = spyOn(console, 'warn');
    errorSpy = spyOn(console, 'error');

    setVaultLogLevel('warn');

    behavior = new withCoreEmitStateBehavior('behavior key', {} as any);
  });

  afterEach(() => {
    setVaultLogLevel('off');
  });

  it('should have correct default metadata', () => {
    expect(behavior.critical).toBeTrue();
    expect(behavior.type).toBe('coreEmitState');
    expect(behavior.key).toBe('behavior key');
  });

  it('should construct via factory and expose correct metadata', () => {
    expect(withCoreEmitStateBehavior.critical).toBeTrue();
    expect(withCoreEmitStateBehavior.type).toBe('coreEmitState');
    expect(withCoreEmitStateBehavior.key).toBe(
      'SDUX::Behavior::Core::EmitState'
    );
  });

  it('should return current unchanged when emitState is not a function', async () => {
    const current = { count: 5 };
    const result = behavior.emitState(current, null as any);
    await flushVaultPipeline();

    expect(result).toBe(VAULT_NOOP);
    expect(warnSpy).not.toHaveBeenCalled();
    expect(errorSpy).not.toHaveBeenCalled();
  });

  it('should apply emitState function to current', async () => {
    const results: any = [];
    const emitState: CoreEmitStateCallback<any> = (state) => {
      results.push(state);
    };

    const result1 = behavior.emitState(Object({ value: 5 }), emitState);
    await flushVaultPipeline();
    const result2 = behavior.emitState(Object({ value: 20 }), emitState);
    await flushVaultPipeline();

    expect(result1).toBeUndefined();
    expect(result2).toBeUndefined();
    expect(results).toEqual([Object({ value: 5 }), Object({ value: 20 })]);

    expect(warnSpy).not.toHaveBeenCalled();
    expect(errorSpy).not.toHaveBeenCalled();
  });

  it('should handle an error', async () => {
    const emitState: CoreEmitStateCallback<any> = () => {
      throw new Error('this is a emitState error');
    };

    expect(behavior.emitState(Object({ value: 5 }), emitState)).toBe(
      VAULT_NOOP
    );
    await flushVaultPipeline();

    expect(warnSpy).not.toHaveBeenCalled();
    expect(errorSpy).toHaveBeenCalledWith(
      '[vault]',
      'behavior key emitState execution failed',
      jasmine.any(String)
    );
  });

  it('should valid destroy is noop', async () => {
    behavior.destroy();
    await flushVaultPipeline();
    expect(warnSpy).toHaveBeenCalledWith(
      '[vault]',
      'behavior key - destroy "noop"'
    );
    expect(errorSpy).not.toHaveBeenCalled();
  });

  it('should valid reset is noop', async () => {
    behavior.reset();
    await flushVaultPipeline();
    expect(warnSpy).toHaveBeenCalledWith(
      '[vault]',
      'behavior key - reset "noop"'
    );
    expect(errorSpy).not.toHaveBeenCalled();
  });
});
