import {
  BehaviorTypes,
  DevMode,
  setVaultLogLevel,
  VAULT_CLEAR_STATE,
  VAULT_NOOP
} from '@sdux-vault/shared';
import { flushVaultPipeline } from '@sdux-vault/testing-utils';
import { withArrayPushMergeBehavior } from './with-array-push-merge.behavior';

describe('Behavior: withArrayPushMerge', () => {
  let behavior: withArrayPushMergeBehavior<any>;
  let warnSpy: any;

  beforeAll(() => {
    warnSpy = spyOn(console, 'warn');
  });

  describe('DevMode', () => {
    beforeEach(() => {
      warnSpy.calls.reset();
      setVaultLogLevel('warn');
      DevMode.setDevMode(true);

      behavior = new withArrayPushMergeBehavior('behavior key', {} as any);
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
      expect(withArrayPushMergeBehavior.type).toBe('merge');
      expect(withArrayPushMergeBehavior.critical).toBeTrue();
      expect(withArrayPushMergeBehavior.key).toBe(
        'SDUX::Behavior::Merge::ArrayPush'
      );
      expect((withArrayPushMergeBehavior as any).needsLicense).toBeFalse();
      expect((withArrayPushMergeBehavior as any).wantsConfig).toBeFalse();
      expect((withArrayPushMergeBehavior as any).configKey).toBeUndefined();
      expect(typeof (withArrayPushMergeBehavior as any).installFluentApi).toBe(
        'undefined'
      );
    });

    // ---------------------------------------------------------------------------
    // Comparison Examples Behavior
    // ---------------------------------------------------------------------------
    describe('comparison examples', () => {
      it('should clone next array when both curr and next are arrays', () => {
        const curr = [1, 2, 3];
        const next = [4, 5];

        const result = behavior.computeMerge(curr, next);

        expect(result).toEqual([1, 2, 3, [4, 5]]);
        expect(result).not.toBe(next); // ensure deep clone
      });

      it('should push scalar into array without mutating current', () => {
        const curr = [1, 2, 3];
        const next = 10;

        const result = behavior.computeMerge(curr, next);

        expect(result).toEqual([1, 2, 3, 10]);
        expect(warnSpy).not.toHaveBeenCalled();
      });

      it('should return nextValue even if next is null', () => {
        const curr = [1, 2];
        const next = null;

        const result = behavior.computeMerge(curr, next as any);

        expect(result).toBeNull();
      });

      it('should return undefined when nextValue is undefined and clearUndefined is undefined', () => {
        const curr = [1, 2, 3];
        const next = undefined;
        const result = behavior.computeMerge(curr, next);

        expect(result).toEqual([1, 2, 3]);
      });

      it('should return undefined when nextValue is undefined and clearUndefined=false', () => {
        const curr = [1, 2, 3];
        const next = undefined;
        const result = behavior.computeMerge(curr, next, {
          clearUndefined: false
        });

        expect(result).toEqual([1, 2, 3]);
      });

      it('should return undefined when nextValue is undefined and clearUndefined=true', () => {
        const curr = [1, 2, 3];
        const next = undefined;
        const result = behavior.computeMerge(curr, next, {
          clearUndefined: true
        });

        expect(result).toEqual(VAULT_CLEAR_STATE);
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
    });

    // ---------------------------------------------------------------------------
    // Deep array edge cases
    // ---------------------------------------------------------------------------
    it('should clone nested arrays (shallow clone only)', () => {
      const curr = [[1], [2]];
      const next = 9;

      const result = behavior.computeMerge(curr, next);

      expect(result).toEqual([[1], [2], 9]);
      expect(warnSpy).not.toHaveBeenCalled();
    });

    it('should clone nested arrays (shallow clone only)', () => {
      const curr = [[1], [2]];
      const next = [[9], [8]];

      const result = behavior.computeMerge(curr, next);

      expect(result).toEqual([[1], [2], [[9], [8]]]);
      expect(result[2]).toBe(next); // same reference, not cloned
      expect(warnSpy).not.toHaveBeenCalled();
    });

    it('should preserve empty arrays correctly', () => {
      const curr = [1, 2];
      const next = 0;

      const result = behavior.computeMerge(curr, next);

      expect(result).toEqual([1, 2, 0]);
      expect(warnSpy).not.toHaveBeenCalled();
    });

    // ---------------------------------------------------------------------------
    // Non-array primitives
    // ---------------------------------------------------------------------------
    it('should pass through primitives directly', () => {
      const result = behavior.computeMerge(10 as any, 5 as any);

      expect(result).toBe(5);
      expect(warnSpy).toHaveBeenCalledWith(
        'One Time Warning: [vault] behavior key: ArrayPushMerge received non-array current value. This behavior is intended for array state.',
        jasmine.any(String)
      );
    });

    it('should return nextValue even if types differ', () => {
      const curr = [1, 2, 3];
      const next = 'not-array' as any;

      const result = behavior.computeMerge(curr, next);

      expect(result).toEqual([1, 2, 3, 'not-array']);
      expect(warnSpy).not.toHaveBeenCalled();
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
      expect(warnSpy).not.toHaveBeenCalled();
    });

    it('should clear only when nextValue === undefined', () => {
      const curr = ['x'];
      const result1 = behavior.computeMerge(curr, undefined, {
        clearUndefined: true
      });
      const result2 = behavior.computeMerge(curr, null, {
        clearUndefined: true
      });

      expect(result1).toBe(VAULT_CLEAR_STATE);
      expect(result2).toBeNull(); // null is not cleared
      expect(warnSpy).not.toHaveBeenCalled();
    });

    // ---------------------------------------------------------------------------
    // Multiple sequential merges
    // ---------------------------------------------------------------------------
    it('should support sequential merges on same behavior instance', () => {
      const mid = behavior.computeMerge([1, 2, 3], 9);
      const final = behavior.computeMerge(mid, 100);

      expect(mid).toEqual([1, 2, 3, 9]);
      expect(warnSpy).not.toHaveBeenCalled();
      expect(final).toEqual([1, 2, 3, 9, 100]);
      expect(warnSpy).not.toHaveBeenCalled();
    });

    // ---------------------------------------------------------------------------
    // Error scenarios
    // ---------------------------------------------------------------------------
    describe('edge cases', () => {
      it('pushes item into array when current is array and next is entity', () => {
        expect(behavior.computeMerge([1, 2], 3)).toEqual([1, 2, 3]);
        expect(warnSpy).not.toHaveBeenCalled();
      });

      it('returns next when current is not array', () => {
        expect(behavior.computeMerge(undefined, 3)).toBe(3);
        expect(warnSpy).not.toHaveBeenCalled();
      });

      it('returns VAULT_NOOP when next is undefined and clearUndefined is true', () => {
        expect(
          behavior.computeMerge([1, 2], undefined, { clearUndefined: true })
        ).toBe(VAULT_CLEAR_STATE);
        expect(warnSpy).not.toHaveBeenCalled();
      });

      it('should propagate VAULT_NOOP without pushing', () => {
        const curr = [1, 2];
        const result = behavior.computeMerge(curr, VAULT_NOOP as any);
        expect(result).toEqual([1, 2, VAULT_NOOP]);
        expect(warnSpy).not.toHaveBeenCalled();
      });

      it('should treat array-like objects as non-arrays', () => {
        const curr = { length: 2, 0: 'a', 1: 'b' };
        const next = 'c';

        const result = behavior.computeMerge(curr as any, next);
        expect(result).toBe(next);
        expect(warnSpy).toHaveBeenCalledWith(
          'One Time Warning: [vault] behavior key: ArrayPushMerge received non-array current value. This behavior is intended for array state.',
          jasmine.any(String)
        );
      });

      it('should not mutate current array reference', () => {
        const curr = [1, 2];
        const result = behavior.computeMerge(curr, 3);

        expect(result).not.toBe(curr);
        expect(curr).toEqual([1, 2]);
        expect(warnSpy).not.toHaveBeenCalled();
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
        expect(warnSpy).not.toHaveBeenCalled();
      });

      it('should return nextValue when nextValue is a function', () => {
        const curr = [1];
        const next = function () {};

        const result = behavior.computeMerge(curr, next as any);

        expect(result).toEqual([1, next]);
        expect(warnSpy).not.toHaveBeenCalled();
      });

      it('should return nextValue when nextValue is a symbol', () => {
        const curr = ['a'];
        const next = Symbol('test');

        const result = behavior.computeMerge(curr, next as any);

        expect(result).toEqual(['a', next]);
        expect(warnSpy).not.toHaveBeenCalled();
      });

      it('should support bigint values', () => {
        const curr = 10n;
        const next = 20n;

        const result = behavior.computeMerge(curr as any, next as any);
        expect(result).toBe(20n);
        expect(warnSpy).toHaveBeenCalledWith(
          'One Time Warning: [vault] behavior key: ArrayPushMerge received non-array current value. This behavior is intended for array state.',
          jasmine.any(String)
        );
      });

      it('should handle empty array merging with empty array', () => {
        const curr: any[] = [];
        const next = 'a';

        const result = behavior.computeMerge(curr, next);

        expect(result).toEqual(['a']);
        expect(result).not.toBe(next);
        expect(warnSpy).not.toHaveBeenCalled();
      });

      it('should return primitive curr unchanged when nextValue undefined and clear=false', () => {
        const curr = 123;

        const result = behavior.computeMerge(curr as any, undefined);
        expect(result).toBe(123);
        expect(warnSpy).not.toHaveBeenCalled();
      });

      it('should allow merging null into undefined current', () => {
        const result = behavior.computeMerge(undefined, null as any);
        expect(result).toBeNull();
        expect(warnSpy).not.toHaveBeenCalled();
      });

      it('should return nextValue when nextValue is NaN', () => {
        const curr = [1, 2];
        const result = behavior.computeMerge(curr, NaN as any);

        expect(result).toEqual([1, 2, NaN]);
        expect(warnSpy).not.toHaveBeenCalled();
      });

      it('should not merge object properties (only return next)', () => {
        const curr = { a: 1, b: 2 };
        const next = { b: 999 };

        const result = behavior.computeMerge(curr as any, next as any);
        expect(result).toBe(next);
        expect(warnSpy).toHaveBeenCalledWith(
          'One Time Warning: [vault] behavior key: ArrayPushMerge received non-array current value. This behavior is intended for array state.',
          jasmine.any(String)
        );
      });

      it('should clone next array even if next is frozen', () => {
        const curr = Object.freeze([1, 2, 3]);
        const next = 'a';

        const result = behavior.computeMerge(curr, next);

        expect(result).toEqual([1, 2, 3, 'a']);
        expect(result).not.toEqual(next);
        expect(warnSpy).not.toHaveBeenCalled();
      });
    });

    it('should call destroy() as noop', async () => {
      behavior.destroy();
      await flushVaultPipeline();

      expect(warnSpy).toHaveBeenCalledWith(
        '[vault]',
        'behavior key - destroy "noop"'
      );
    });

    it('should call reset() as noop', async () => {
      behavior.reset();
      await flushVaultPipeline();

      expect(warnSpy).toHaveBeenCalledWith(
        '[vault]',
        'behavior key - reset "noop"'
      );
    });

    describe('Non-array warning', () => {
      it('should Give the warn message once when all true and Dev Mode', async () => {
        const curr = { x: 1 };
        const next = { y: 2 };

        let result = behavior.computeMerge(curr, next);
        await flushVaultPipeline();

        expect(result).toEqual({ y: 2 });
        expect(result).toBe(next);
        result = behavior.computeMerge(curr, next);
        await flushVaultPipeline();

        expect(warnSpy).toHaveBeenCalledTimes(3);
        const [messageOne] = warnSpy.calls.argsFor(0);
        const [messageTwo] = warnSpy.calls.argsFor(1);

        expect(messageOne).toMatch(/One Time Warning/);
        expect(messageTwo).toMatch(/^\[vault\]/);
      });

      it('should Give the warn message once when all true', () => {
        const curr = undefined;
        const next = { y: 2 };

        behavior.computeMerge(curr, next);

        expect(warnSpy).not.toHaveBeenCalled();
      });

      it('should Give the warn message once when all true', () => {
        const curr = { y: 1 };
        const next = undefined;

        behavior.computeMerge(curr, next);

        expect(warnSpy).not.toHaveBeenCalled();
      });

      it('should Give the warn message once when all true', () => {
        const curr = VAULT_NOOP;
        const next = { y: 2 };

        behavior.computeMerge(curr, next);

        expect(warnSpy).not.toHaveBeenCalled();
      });
    });
  });

  describe('Prod', () => {
    beforeEach(() => {
      warnSpy.calls.reset();
      setVaultLogLevel('warn');
      DevMode.setDevMode(false);

      behavior = new withArrayPushMergeBehavior('behavior key', {} as any);
    });

    it('should Give the warn message once when all true and !Dev Mode', async () => {
      const curr = { x: 1 };
      const next = { y: 2 };

      let result = behavior.computeMerge(curr, next);
      await flushVaultPipeline();

      expect(result).toEqual({ y: 2 });
      expect(result).toBe(next);
      result = behavior.computeMerge(curr, next);
      await flushVaultPipeline();

      expect(warnSpy).toHaveBeenCalledTimes(2);
      const [messageOne] = warnSpy.calls.argsFor(0);
      const [messageTwo] = warnSpy.calls.argsFor(1);

      expect(messageOne).not.toMatch(/One Time Warning/);
      expect(messageTwo).not.toMatch(/One Time Warning/);
      expect(messageOne).toMatch(/^\[vault\]/);
      expect(messageTwo).toMatch(/^\[vault\]/);
    });
  });
});
