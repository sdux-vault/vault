import {
  BehaviorTypes,
  setVaultLogLevel,
  VAULT_CLEAR_STATE
} from '@sdux-vault/shared';
import { flushVaultPipeline } from '@sdux-vault/testing-utils';
import { withObjectShallowMergeBehavior } from './with-object-shallow-merge.behavior';

describe('Behavior: withObjectShallowMerge', () => {
  let behavior: withObjectShallowMergeBehavior<any>;

  beforeEach(() => {
    spyOn(console, 'warn');

    setVaultLogLevel('warn');

    behavior = new withObjectShallowMergeBehavior('behavior key', {} as any);
  });

  afterEach(() => {
    setVaultLogLevel('off');
  });

  // ---------------------------------------------------------------------------
  // Metadata
  // ---------------------------------------------------------------------------
  it('should expose default metadata', () => {
    expect(behavior.type).toBe(BehaviorTypes.Merge);
    expect(behavior.key).toBe('behavior key');
    expect(behavior.critical).toBeTrue();
  });

  it('should expose correct static metadata', () => {
    expect(withObjectShallowMergeBehavior.type).toBe('merge');
    expect(withObjectShallowMergeBehavior.critical).toBeTrue();
    expect(withObjectShallowMergeBehavior.key).toBe(
      'SDUX::Behavior::Core::ObjectMerge'
    );
    expect((withObjectShallowMergeBehavior as any).wantsConfig).toBeFalse();
    expect((withObjectShallowMergeBehavior as any).needsLicense).toBeFalse();
    expect((withObjectShallowMergeBehavior as any).configKey).toBeUndefined();
    expect(
      typeof (withObjectShallowMergeBehavior as any).installFluentApi
    ).toBe('undefined');
  });

  // ---------------------------------------------------------------------------
  // Core Shallow Merge Behavior
  // ---------------------------------------------------------------------------
  it('should return currentValue when nextValue is undefined and clearUndefined=false (default)', () => {
    const curr = { a: 1 };
    const result = behavior.computeMerge(curr, undefined);

    expect(result).toBe(curr);
  });

  it('should return undefined when nextValue is undefined and clearUndefined=true', () => {
    const curr = { a: 1 };
    const result = behavior.computeMerge(curr, undefined, {
      clearUndefined: true
    });

    expect(result).toBe(VAULT_CLEAR_STATE);
  });

  it('should shallow merge curr & next when both are non-array objects', () => {
    const curr = { a: 1, b: 2 };
    const next = { b: 999, c: 5 };

    const result = behavior.computeMerge(curr, next);

    expect(result).toEqual({ a: 1, b: 999, c: 5 });
    expect(result).not.toBe(curr);
    expect(result).not.toBe(next);
  });

  it('should treat arrays as non-object and return next as-is', () => {
    const curr = { a: 1 };
    const next = [1, 2, 3];

    const result = behavior.computeMerge(curr, next);

    expect(result).toBe(next);
  });

  it('should treat curr=null and next object → return next', () => {
    const curr = null;
    const next = { x: 10 };

    const result = behavior.computeMerge(curr, next);

    expect(result).toBe(next);
  });

  it('should treat next=null → return null', () => {
    const curr = { a: 1 };
    const next = null;

    const result = behavior.computeMerge(curr, next);

    expect(result).toBeNull();
  });

  // ---------------------------------------------------------------------------
  // Shallow merge restrictions
  // ---------------------------------------------------------------------------
  it('should NOT deep merge nested objects (shallow only)', () => {
    const curr = { a: { x: 1 }, b: 2 };
    const next = { a: { y: 9 } };

    const result = behavior.computeMerge(curr, next);

    expect(result).toEqual({ a: { y: 9 }, b: 2 });
    expect(result.a).toBe(next.a); // shallow replace
  });

  // ---------------------------------------------------------------------------
  // Primitive behaviors
  // ---------------------------------------------------------------------------
  it('should pass through primitives directly', () => {
    const result = behavior.computeMerge(10 as any, 5 as any);
    expect(result).toBe(5);
  });

  it('should return nextValue even if types differ', () => {
    const curr = { a: 1 };
    const next = 'not-object' as any;

    const result = behavior.computeMerge(curr, next);
    expect(result).toBe('not-object');
  });

  it('should support bigint values', () => {
    const curr = 10n;
    const next = 20n;

    const result = behavior.computeMerge(curr as any, next as any);
    expect(result).toBe(20n);
  });

  it('should return nextValue when nextValue is NaN', () => {
    const curr = { a: 1 };
    const result = behavior.computeMerge(curr, NaN as any);

    expect(Number.isNaN(result as any)).toBeTrue();
  });

  it('should return nextValue when nextValue is a function', () => {
    const curr = { a: 1 };
    const next = function () {};

    const result = behavior.computeMerge(curr, next as any);
    expect(result).toBe(next);
  });

  it('should return nextValue when nextValue is a symbol', () => {
    const curr = { a: 1 };
    const next = Symbol('test');

    const result = behavior.computeMerge(curr, next as any);
    expect(result).toBe(next);
  });

  // ---------------------------------------------------------------------------
  // clearUndefined behavior
  // ---------------------------------------------------------------------------
  it('should NOT clear when nextValue=null and clearUndefined=true (undefined only)', () => {
    const curr = { a: 1 };
    const result = behavior.computeMerge(curr, null as any, {
      clearUndefined: true
    });

    expect(result).toBeNull();
  });

  it('should clear only when nextValue === undefined', () => {
    const curr = { x: 1 };
    const result1 = behavior.computeMerge(curr, undefined, {
      clearUndefined: true
    });
    const result2 = behavior.computeMerge(curr, null, { clearUndefined: true });

    expect(result1).toBe(VAULT_CLEAR_STATE);
    expect(result2).toBeNull();
  });

  // ---------------------------------------------------------------------------
  // Sequential merges
  // ---------------------------------------------------------------------------
  it('should support sequential merges on same instance', () => {
    const mid = behavior.computeMerge({ a: 1 }, { b: 2 });
    const final = behavior.computeMerge(mid, { c: 3 });

    expect(mid).toEqual({ a: 1, b: 2 });
    expect(final).toEqual({ a: 1, b: 2, c: 3 });
  });

  // ---------------------------------------------------------------------------
  // Error scenarios
  // ---------------------------------------------------------------------------
  describe('edge cases', () => {
    it('should NOT trigger proxy getters during shallow merge (no property access)', () => {
      const curr = { a: 1 };

      const next = new Proxy(
        {},
        {
          get() {
            throw new Error('bad-access');
          }
        }
      );

      // Should NOT throw because no property is accessed
      expect(() => behavior.computeMerge(curr, next)).not.toThrow();

      // Shallow merge produces { a: 1 }
      const result = behavior.computeMerge(curr, next);
      expect(result).toEqual({ a: 1 });
    });

    it('should ignore getters when not accessing properties (shallow merge)', () => {
      const curr = { x: 1 };

      const next = Object.create(null);
      Object.defineProperty(next, 'boom', {
        get() {
          throw 'string-error';
        }
      });

      // computeMerge does NOT evaluate `boom`
      const result = behavior.computeMerge(curr, next);

      // Should shallow-merge (but next contributes no enumerable props)
      expect(result).toEqual({ x: 1 });

      // Ensure NO exception occurred
      expect(() => result).not.toThrow();
    });

    it('should treat typed arrays as plain objects and shallow-merge properties', () => {
      const curr = { a: 1 };
      const next = new Uint8Array([1, 2]); // indexes become keys

      const result = behavior.computeMerge(curr, next as any);

      expect(result).toEqual({ a: 1, 0: 1, 1: 2 });
      expect(result).not.toBe(next);
    });

    it('should handle frozen objects and shallow merge', () => {
      const curr = Object.freeze({ a: 1 });
      const next = Object.freeze({ b: 2 });

      const result = behavior.computeMerge(curr, next);

      expect(result).toEqual({ a: 1, b: 2 });
      expect(Object.isFrozen(result)).toBeFalse();
    });

    it('should bypass merge when curr is primitive', () => {
      const result = behavior.computeMerge(123 as any, { x: 1 });
      expect(result).toEqual({ x: 1 });
    });

    it('should bypass merge when next is primitive', () => {
      const curr = { a: 1 };
      const result = behavior.computeMerge(curr, 99 as any);

      expect(result).toBe(99);
    });
  });

  it('should call destroy() as noop', async () => {
    behavior.destroy();
    await flushVaultPipeline();

    // eslint-disable-next-line
    expect(console.warn).toHaveBeenCalledWith(
      '[vault]',
      'behavior key - destroy "noop"'
    );
  });

  it('should call reset() as noop', async () => {
    behavior.reset();
    await flushVaultPipeline();

    // eslint-disable-next-line
    expect(console.warn).toHaveBeenCalledWith(
      '[vault]',
      'behavior key - reset "noop"'
    );
  });
});
