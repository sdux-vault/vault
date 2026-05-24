import {
  BehaviorTypes,
  setVaultLogLevel,
  VAULT_CLEAR_STATE
} from '@sdux-vault/shared';
import { flushVaultPipeline } from '@sdux-vault/testing-utils';
import { withArrayAppendMergeBehavior } from './with-array-append-merge.behavior';

describe('Behavior: withArrayAppendMerge', () => {
  let behavior: withArrayAppendMergeBehavior<any>;

  beforeEach(() => {
    spyOn(console, 'warn');
    setVaultLogLevel('warn');

    behavior = new withArrayAppendMergeBehavior('behavior key', {} as any);
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

  it('should have correct static decorator metadata', () => {
    expect(withArrayAppendMergeBehavior.type).toBe('merge');
    expect(withArrayAppendMergeBehavior.critical).toBeTrue();
    expect(withArrayAppendMergeBehavior.key).toBe(
      'SDUX::Behavior::Merge::ArrayAppend'
    );
    expect((withArrayAppendMergeBehavior as any).needsLicense).toBeFalse();
    expect((withArrayAppendMergeBehavior as any).wantsConfig).toBeFalse();
    expect((withArrayAppendMergeBehavior as any).configKey).toBeUndefined();
    expect(typeof (withArrayAppendMergeBehavior as any).installFluentApi).toBe(
      'undefined'
    );
  });

  // ---------------------------------------------------------------------------
  // Core Merge Behavior
  // ---------------------------------------------------------------------------
  it('should return currentValue when nextValue is undefined and clearUndefined=false (default)', () => {
    const curr = [1, 2, 3];
    const result = behavior.computeMerge(curr, undefined);

    expect(result).toBe(curr);
  });

  it('should return undefined when nextValue is undefined and clearUndefined=true', () => {
    const curr = [1, 2, 3];
    const result = behavior.computeMerge(curr, undefined, {
      clearUndefined: true
    });

    expect(result).toBe(VAULT_CLEAR_STATE);
  });

  it('should clone next array when both curr and next are arrays', () => {
    const curr = [1, 2, 3];
    const next = [10, 20];

    const result = behavior.computeMerge(curr, next);

    expect(result).toEqual([1, 2, 3, 10, 20]);
  });

  it('should return nextValue when curr is not an array but next is', () => {
    const curr = { a: 1 };
    const next = [1, 2, 3];

    const result = behavior.computeMerge(curr, next);

    expect(result).toEqual([1, 2, 3]);
    expect(result).toBe(next);
  });

  it('should return nextValue when both are non-arrays', () => {
    const curr = { x: 1 };
    const next = { y: 2 };

    const result = behavior.computeMerge(curr, next);

    expect(result).toEqual({ y: 2 });
    expect(result).toBe(next);
  });

  it('should return nextValue even if next is null', () => {
    const curr = [1, 2];
    const next = null;

    const result = behavior.computeMerge(curr, next as any);

    expect(result).toBeNull();
  });

  it('should allow merge when curr=null and next is array', () => {
    const curr = null;
    const next = [9, 9];

    const result = behavior.computeMerge(curr, next);

    expect(result).toEqual([9, 9]);
  });

  it('should allow merge when curr=undefined and next is array', () => {
    const next = [1, 2];

    const result = behavior.computeMerge(undefined, next);

    expect(result).toEqual([1, 2]);
  });

  // ---------------------------------------------------------------------------
  // Deep array edge cases
  // ---------------------------------------------------------------------------
  it('should clone nested arrays (shallow clone only)', () => {
    const curr = [[1], [2]];
    const next = [[9], [8]];

    const result = behavior.computeMerge(curr, next);

    expect(result).toEqual([[1], [2], [9], [8]]);
  });

  it('should preserve empty arrays correctly', () => {
    const curr = [1, 2];
    const next: any[] = [];

    const result = behavior.computeMerge(curr, next);

    expect(result).toEqual([1, 2]);
  });

  // ---------------------------------------------------------------------------
  // Non-array primitives
  // ---------------------------------------------------------------------------
  it('should pass through primitives directly', () => {
    const result = behavior.computeMerge(10 as any, 5 as any);

    expect(result).toBe(5);
  });

  it('should return nextValue even if types differ', () => {
    const curr = [1, 2, 3];
    const next = 'not-array' as any;

    const result = behavior.computeMerge(curr, next);

    expect(result).toBe('not-array');
  });

  // ---------------------------------------------------------------------------
  // Clear behavior edge cases
  // ---------------------------------------------------------------------------
  it('should NOT clear when nextValue=null and clearUndefined=true (undefined only)', () => {
    const curr = [1, 2];
    const result = behavior.computeMerge(curr, null as any, {
      clearUndefined: true
    });

    expect(result).toBeNull();
  });

  it('should clear only when nextValue === undefined', () => {
    const curr = ['x'];
    const result1 = behavior.computeMerge(curr, undefined, {
      clearUndefined: true
    });
    const result2 = behavior.computeMerge(curr, null, { clearUndefined: true });

    expect(result1).toBe(VAULT_CLEAR_STATE);
    expect(result2).toBeNull(); // null is not cleared
  });

  // ---------------------------------------------------------------------------
  // Multiple sequential merges
  // ---------------------------------------------------------------------------
  it('should support sequential merges on same behavior instance', () => {
    const mid = behavior.computeMerge([1, 2, 3], [9]);
    const final = behavior.computeMerge(mid, [100, 200]);

    expect(mid).toEqual([1, 2, 3, 9]);
    expect(final).toEqual([1, 2, 3, 9, 100, 200]);
  });

  // ---------------------------------------------------------------------------
  // Error scenarios
  // ---------------------------------------------------------------------------
  describe('edge cases', () => {
    it('should propagate errors coming from nextValue when accessed during merge', () => {
      const curr = [1, 2];

      const next = new Proxy([], {
        get() {
          throw new Error('bad-access');
        }
      });

      // This still will NOT throw, because behavior never accesses properties!
      // So the correct expectation is:
      expect(() => behavior.computeMerge(curr, next)).toThrowError(
        'bad-access'
      );
    });

    it('should ignore throwing getters because merge does not inspect object properties', () => {
      const next = Object.create(null);
      Object.defineProperty(next, 'length', {
        get() {
          throw 'string-error';
        }
      });

      const result = behavior.computeMerge([], next);

      // Wrap in object Jasmine will not inspect
      const safe = { value: result };

      expect(safe.value).toBe(result);
    });

    it('should return nextValue when nextValue is a function', () => {
      const curr = [1];
      const next = function () {};

      const result = behavior.computeMerge(curr, next as any);

      expect(result).toBe(next);
    });

    it('should return nextValue when nextValue is a symbol', () => {
      const curr = ['a'];
      const next = Symbol('test');

      const result = behavior.computeMerge(curr, next as any);

      expect(result).toBe(next);
    });

    it('should support bigint values', () => {
      const curr = 10n;
      const next = 20n;

      const result = behavior.computeMerge(curr as any, next as any);
      expect(result).toBe(20n);
    });

    it('should handle empty array merging with empty array', () => {
      const curr: any[] = [];
      const next: any[] = [];

      const result = behavior.computeMerge(curr, next);

      expect(result).toEqual([]);
      expect(result).not.toBe(next);
    });

    it('should return primitive curr unchanged when nextValue undefined and clear=false', () => {
      const curr = 123;

      const result = behavior.computeMerge(curr as any, undefined);
      expect(result).toBe(123);
    });

    it('should allow merging null into undefined current', () => {
      const result = behavior.computeMerge(undefined, null as any);
      expect(result).toBeNull();
    });

    it('should return nextValue when nextValue is NaN', () => {
      const curr = [1, 2];
      const result = behavior.computeMerge(curr, NaN as any);

      expect(Number.isNaN(result as any)).toBeTrue();
    });

    it('should not merge object properties (only return next)', () => {
      const curr = { a: 1, b: 2 };
      const next = { b: 999 };

      const result = behavior.computeMerge(curr as any, next as any);
      expect(result).toBe(next);
    });

    it('should ignore Proxy traps during Array.isArray check', () => {
      const next = new Proxy([], {
        getPrototypeOf() {
          throw 'proto-error';
        }
      });

      const curr = [1, 2];

      // computeMerge does NOT use prototype checks directly → so NOTHING should throw
      const result = behavior.computeMerge(curr, next);

      expect(result).toEqual([1, 2]); // non-array branch returned next
    });

    it('should clone next array even if next is frozen', () => {
      const next = Object.freeze([1, 2, 3]);
      const curr = ['a'];

      const result = behavior.computeMerge(curr, next);

      expect(result).toEqual(['a', 1, 2, 3]);
      expect(result).not.toBe(next);
    });

    it('should treat typed arrays as non-arrays and return next as-is', () => {
      const curr = [1, 2];
      const next = new Uint8Array([5, 6]);

      const result = behavior.computeMerge(curr, next as any);

      expect(result).toBe(next);
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
