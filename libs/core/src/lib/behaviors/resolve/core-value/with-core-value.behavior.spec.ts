import {
  BehaviorContext,
  BehaviorTypes,
  setVaultLogLevel,
  VAULT_CLEAR_STATE
} from '@sdux-vault/shared';
import { flushVaultPipeline } from '@sdux-vault/testing-utils';
import { withCoreValueBehavior } from './with-core-value.behavior';

describe('Behavior: CoreValue', () => {
  let behavior: any;
  let ctx: BehaviorContext<any>;
  let warnSpy: any;

  beforeEach(() => {
    warnSpy = spyOn(console, 'warn');

    setVaultLogLevel('warn');

    ctx = {} as unknown as BehaviorContext<any>;

    behavior = new withCoreValueBehavior('behavior key', {} as any);
  });

  afterEach(() => {
    setVaultLogLevel('off');
  });

  it('should have default properties', () => {
    expect(behavior.critical).toBeTrue();
    expect(behavior.type).toBe('resolve');
    expect(behavior.key).toBe('behavior key');
  });

  it('should construct via factory and expose correct metadata', () => {
    expect(withCoreValueBehavior.critical).toBeTrue();
    expect(withCoreValueBehavior.type).toBe(BehaviorTypes.Resolve);
    expect(withCoreValueBehavior.key).toBe('SDUX::Behavior::Core::Value');
    expect(withCoreValueBehavior.resolveType).toBe('value');
    expect((withCoreValueBehavior as any).wantsConfig).toBeFalse();
    expect((withCoreValueBehavior as any).needsLicense).toBeFalse();
    expect((withCoreValueBehavior as any).configKey).toBeUndefined();
    expect(
      (typeof withCoreValueBehavior as any).installFluentApi
    ).toBeUndefined();
  });

  it('should skip when ctx.incoming is null', async () => {
    ctx.incoming = null;
    const result = await behavior.computeResolve(ctx);
    expect(result).toBeUndefined();
  });

  it('should skip when ctx.incoming.value is null', async () => {
    ctx = {
      incoming: {
        value: null
      }
    } as any;
    const result = await behavior.computeResolve(ctx);
    expect(result).toBe(VAULT_CLEAR_STATE);
  });

  it('should skip when ctx.incoming is not an object', async () => {
    ctx.incoming = 'invalid' as any;
    const result = await behavior.computeResolve(ctx);
    expect(result).toBeUndefined();
  });

  it('should skip when ctx.incoming is an HttpResourceRef-like object', async () => {
    // simulate HttpResourceRef shape
    ctx.incoming = {
      value: () => [],
      isLoading: () => false,
      error: () => false,
      hasValue: () => false
    } as any;
    const result = await behavior.computeResolve(ctx);
    expect(result).toBeUndefined();
  });

  it('should return a shallow-cloned array', async () => {
    ctx.incoming = {
      value: [
        { id: 1, name: 'Ada' },
        { id: 2, name: 'Grace' }
      ]
    };
    const result = await behavior.computeResolve(ctx);

    expect(result).toEqual([
      { id: 1, name: 'Ada' },
      { id: 2, name: 'Grace' }
    ]);

    // Should be a new array instance
    expect(result).not.toBe((ctx.incoming as any).value);
  });

  it('should return a shallow-cloned object', async () => {
    ctx.incoming = { value: { id: 1, name: 'Alan' } };
    const result = await behavior.computeResolve(ctx);

    expect(result).toEqual({ id: 1, name: 'Alan' });
    expect(result).not.toBe((ctx.incoming as any).value);
  });

  it('should return primitive values directly', async () => {
    ctx.incoming = { value: 42 };
    const result = await behavior.computeResolve(ctx);
    expect(result).toBe(42);

    ctx.incoming = { value: 'Hello' };
    const result2 = await behavior.computeResolve(ctx);
    expect(result2).toBe('Hello');

    ctx.incoming = { value: true };
    const result3 = await behavior.computeResolve(ctx);
    expect(result3).toBeTrue();
  });

  it('should handle undefined value safely', async () => {
    ctx.incoming = { value: undefined };
    const result = await behavior.computeResolve(ctx);
    expect(result).toBeUndefined();
  });

  it('should handle empty array and empty object', async () => {
    ctx.incoming = { value: [] };
    const arr = await behavior.computeResolve(ctx);
    expect(arr).toEqual([]);

    ctx.incoming = { value: {} };
    const obj = await behavior.computeResolve(ctx);
    expect(obj).toEqual({});
  });

  it('should not mutate the original array or object', async () => {
    const original = [{ id: 1 }];
    ctx.incoming = { value: original };
    const result = await behavior.computeResolve(ctx);

    (result as any[]).push({ id: 2 });
    expect(original).toEqual([{ id: 1 }]);
  });

  it('should handle deeply nested objects shallowly', async () => {
    const original = { id: 1, meta: { nested: true } };
    ctx.incoming = { value: original };
    const result = await behavior.computeResolve(ctx);

    expect(result).toEqual(original);
    expect(result.meta).toBe(original.meta); // shallow clone only
  });

  it('should handle NaN gracefully', async () => {
    ctx.incoming = { value: NaN };
    const result = await behavior.computeResolve(ctx);
    expect(result).toBeNaN();
  });

  it('should valid destroy is noop', async () => {
    behavior.destroy();
    await flushVaultPipeline();
    expect(warnSpy).toHaveBeenCalledWith(
      '[vault]',
      'behavior key - destroy "noop"'
    );
  });

  it('should valid reset is noop', async () => {
    behavior.reset();
    await flushVaultPipeline();
    expect(warnSpy).toHaveBeenCalledWith(
      '[vault]',
      'behavior key - reset "noop"'
    );
  });
});
