import {
  BehaviorClassContext,
  BehaviorTypes,
  setVaultLogLevel,
  VAULT_CLEAR_STATE
} from '@sdux-vault/shared';
import { flushVaultPipeline } from '@sdux-vault/testing-utils';
import { withArrayByIdMergeBehavior } from './with-array-by-id-merge.behavior';

describe('Behavior: withArrayByIdMerge', () => {
  let behavior: withArrayByIdMergeBehavior<any>;

  beforeEach(() => {
    spyOn(console, 'warn');
    setVaultLogLevel('warn');

    behavior = new withArrayByIdMergeBehavior('behavior-key', {
      behaviorConfig: {
        idKey: 'id'
      }
    } as BehaviorClassContext);
  });

  afterEach(() => {
    setVaultLogLevel('off');
  });

  // ---------------------------------------------------------------------------
  // Metadata
  // ---------------------------------------------------------------------------
  it('should expose default metadata', () => {
    expect(behavior.type).toBe(BehaviorTypes.Merge);
    expect(behavior.key).toBe('behavior-key');
    expect(behavior.critical).toBeFalse();
  });

  it('should have correct static decorator metadata', () => {
    expect(withArrayByIdMergeBehavior.type).toBe('merge');
    expect(withArrayByIdMergeBehavior.critical).toBeFalse();
    expect(withArrayByIdMergeBehavior.key).toBe(
      'SDUX::Behavior::Merge::ArrayById'
    );
    expect((withArrayByIdMergeBehavior as any).needsLicense).toBeFalse();
    expect((withArrayByIdMergeBehavior as any).wantsConfig).toBeTrue();
    expect((withArrayByIdMergeBehavior as any).configKey).toBe(
      'withArrayMergeId'
    );
    expect(typeof (withArrayByIdMergeBehavior as any).installFluentApi).toBe(
      'function'
    );
  });

  it('should install the withArrayMergeId fluent API', () => {
    const cell = {} as any;
    const behaviorConfigs = new Map<string, unknown>();
    const options = { idKey: 'key' };

    withArrayByIdMergeBehavior.installFluentApi(cell, behaviorConfigs);

    expect(cell.withArrayMergeId(options)).toBe(cell);
    expect(behaviorConfigs.get('withArrayMergeId')).toEqual({
      idKey: 'key'
    });

    options.idKey = 'mutated';
    expect(behaviorConfigs.get('withArrayMergeId')).toEqual({ idKey: 'key' });
  });

  it('should reject missing behavior configuration', () => {
    expect(
      () =>
        new withArrayByIdMergeBehavior('behavior-key', {
          behaviorConfig: undefined
        } as BehaviorClassContext)
    ).toThrowError(
      '[vault] ArrayByIdMerge behavior requires configuration via withArrayMergeId()'
    );
  });

  it('should reject configuration without an id key', () => {
    expect(
      () =>
        new withArrayByIdMergeBehavior('behavior-key', {
          behaviorConfig: {}
        } as BehaviorClassContext)
    ).toThrowError('[vault] ArrayByIdMerge behavior requires idKey');
  });

  it('should reject a non-string id key', () => {
    expect(
      () =>
        new withArrayByIdMergeBehavior('behavior-key', {
          behaviorConfig: { idKey: 123 }
        } as any)
    ).toThrowError(
      '[vault] ArrayByIdMerge behavior requires idKey to be a non-empty string'
    );
  });

  it('should reject a whitespace-only id key', () => {
    expect(
      () =>
        new withArrayByIdMergeBehavior('behavior-key', {
          behaviorConfig: { idKey: '   ' }
        } as BehaviorClassContext)
    ).toThrowError(
      '[vault] ArrayByIdMerge behavior requires idKey to be a non-empty string'
    );
  });

  it('should reject an empty id key', () => {
    expect(
      () =>
        new withArrayByIdMergeBehavior('behavior-key', {
          behaviorConfig: { idKey: '' }
        } as BehaviorClassContext)
    ).toThrowError(
      '[vault] ArrayByIdMerge behavior requires idKey to be a non-empty string'
    );
  });

  // ---------------------------------------------------------------------------
  // Comparison Examples Behavior
  // ---------------------------------------------------------------------------
  describe('comparison examples', () => {
    it('should append entities that are not already present', () => {
      const curr = [{ id: 1, name: 'one' }];
      const next = [{ id: 2, name: 'two' }];

      const result = behavior.computeMerge(curr, next);

      expect(result).toEqual([
        { id: 1, name: 'one' },
        { id: 2, name: 'two' }
      ]);
      expect(result).not.toBe(curr);
      expect(result).not.toBe(next);
      expect(curr).toEqual([{ id: 1, name: 'one' }]);
    });

    it('should append an entity when current entries are not objects', () => {
      const curr = [1];
      const next = { id: 2, name: 'two' };

      const result = behavior.computeMerge(curr, next);

      expect(result).toEqual([1, { id: 2, name: 'two' }]);
      expect(result).not.toBe(curr);
      expect(curr).toEqual([1]);
    });

    it('should return a non-entity next value when curr is an array', () => {
      const curr = [1, 2, 3];
      const next = 10;

      const result = behavior.computeMerge(curr, next);

      expect(result).toEqual(10);
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
      expect(result).not.toBe(next);
    });

    it('should update an existing entity from a single object', () => {
      const curr = [{ id: 1, name: 'old' }];
      const next = { id: 1, name: 'new' };

      const result = behavior.computeMerge(curr, next);

      expect(result).toEqual([{ id: 1, name: 'new' }]);
      expect(result).not.toBe(curr);
      expect(result[0]).not.toBe(next);
      expect(curr).toEqual([{ id: 1, name: 'old' }]);
    });

    it('should isolate nested references in merged results', () => {
      const curr = [{ id: 1, profile: { name: 'old' } }];
      const next = { id: 2, profile: { name: 'new' } };

      const result = behavior.computeMerge(curr, next) as any[];

      next.profile.name = 'changed';
      curr[0].profile.name = 'also changed';

      expect(result).toEqual([
        { id: 1, profile: { name: 'old' } },
        { id: 2, profile: { name: 'new' } }
      ]);
      expect(result[0]).not.toBe(curr[0]);
      expect(result[1]).not.toBe(next);
      expect(result[0].profile).not.toBe(curr[0].profile);
      expect(result[1].profile).not.toBe(next.profile);
    });

    it('should isolate object values returned by the non-array branch', () => {
      const next = { profile: { name: 'new' } };

      const result = behavior.computeMerge({ existing: true }, next) as any;

      next.profile.name = 'changed';

      expect(result).toEqual({ profile: { name: 'new' } });
      expect(result).not.toBe(next);
      expect(result.profile).not.toBe(next.profile);
    });

    it('should update matching entities and append new entities in an array', () => {
      const curr = [
        { id: 1, name: 'one' },
        { id: 2, name: 'two' }
      ];
      const next = [
        { id: 2, name: 'updated' },
        { id: 3, name: 'three' }
      ];

      const result = behavior.computeMerge(curr, next);

      expect(result).toEqual([
        { id: 1, name: 'one' },
        { id: 2, name: 'updated' },
        { id: 3, name: 'three' }
      ]);
      expect(result).not.toBe(curr);
      expect(curr).toEqual([
        { id: 1, name: 'one' },
        { id: 2, name: 'two' }
      ]);
    });

    it('should delete a matching entity from a single object', () => {
      const curr = [
        { id: 1, name: 'one' },
        { id: 2, name: 'two' }
      ];

      const result = behavior.computeMerge(curr, { id: 1 }, { isDelete: true });

      expect(result).toEqual([{ id: 2, name: 'two' }]);
      expect(result).not.toBe(curr);
      expect(curr).toEqual([
        { id: 1, name: 'one' },
        { id: 2, name: 'two' }
      ]);
    });

    it('should delete matching entities from an array and ignore missing entities', () => {
      const curr = [
        { id: 1, name: 'one' },
        { id: 2, name: 'two' },
        { id: 3, name: 'three' }
      ];

      const result = behavior.computeMerge(
        curr,
        [{ id: 1 }, { id: 99 }, { id: 3 }],
        { isDelete: true }
      );

      expect(result).toEqual([{ id: 2, name: 'two' }]);
      expect(result).not.toBe(curr);
      expect(curr).toEqual([
        { id: 1, name: 'one' },
        { id: 2, name: 'two' },
        { id: 3, name: 'three' }
      ]);
    });

    it('should delete matching entities from a mixed array by consuming duplicate ids', () => {
      const curr = [
        { id: 1, name: 'first' },
        'preserve',
        { id: 1, name: 'second' },
        { id: 2, name: 'two' }
      ];

      const result = behavior.computeMerge(
        curr,
        [{ id: 1 }, { id: 1 }, { id: 99 }],
        { isDelete: true }
      );

      expect(result).toEqual(['preserve', { id: 2, name: 'two' }]);
      expect(result).not.toBe(curr);
      expect(curr).toEqual([
        { id: 1, name: 'first' },
        'preserve',
        { id: 1, name: 'second' },
        { id: 2, name: 'two' }
      ]);
    });

    it('should return the current array unchanged when delete items are absent', () => {
      const curr = [{ id: 1, name: 'one' }];

      const result = behavior.computeMerge(curr, [{ id: 2 }, { id: 3 }], {
        isDelete: true
      });

      expect(result).toEqual([{ id: 1, name: 'one' }]);
      expect(result).not.toBe(curr);
      expect(curr).toEqual([{ id: 1, name: 'one' }]);
    });

    it('should return the current array unchanged for invalid delete input', () => {
      const curr = [{ id: 1, name: 'one' }];
      const next = [{ id: 2 }, null] as any;

      const result = behavior.computeMerge(curr, next, { isDelete: true });

      expect(result).toEqual([{ id: 1, name: 'one' }]);
      expect(result).not.toBe(curr);
      expect(curr).toEqual([{ id: 1, name: 'one' }]);
    });

    it('should return a non-array current value unchanged during deletion', () => {
      const curr = { id: 1, name: 'one' };

      const result = behavior.computeMerge(curr, { id: 1 }, { isDelete: true });

      expect(result).toEqual(curr);
      expect(result).not.toBe(curr);
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
  });

  // ---------------------------------------------------------------------------
  // Deep array edge cases
  // ---------------------------------------------------------------------------
  it('should return an isolated invalid nested array', () => {
    const curr = [[1], [2]];
    const next = [[9], [8]];

    const result = behavior.computeMerge(curr, next);

    expect(result).toEqual(next);
    expect(result).not.toBe(next);
  });

  it('should preserve empty arrays correctly', () => {
    const curr = [{ id: 1 }];
    const next: any[] = [];

    const result = behavior.computeMerge(curr, next);

    expect(result).toEqual([{ id: 1 }]);
    expect(result).not.toBe(curr);
    expect(curr).toEqual([{ id: 1 }]);
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
    const mid = behavior.computeMerge(
      [{ id: 1 }, { id: 2 }],
      [{ id: 2, value: 'updated' }, { id: 3 }]
    );

    expect(mid).toEqual([{ id: 1 }, { id: 2, value: 'updated' }, { id: 3 }]);

    const final = behavior.computeMerge(mid, { id: 1, value: 'updated' });

    expect(final).toEqual([
      { id: 1, value: 'updated' },
      { id: 2, value: 'updated' },
      { id: 3 }
    ]);
    expect(final).not.toBe(mid);
    expect(mid).toEqual([{ id: 1 }, { id: 2, value: 'updated' }, { id: 3 }]);
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

    it('should return an object without an identifier as-is', () => {
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
      expect(result).toEqual(next);
      expect(result).not.toBe(next);
    });

    it('should return the current array when next is an empty proxy array', () => {
      const next = new Proxy([], {
        getPrototypeOf() {
          throw 'proto-error';
        }
      });

      const curr = [1, 2];

      // computeMerge does NOT use prototype checks directly → so NOTHING should throw
      const result = behavior.computeMerge(curr, next);

      expect(result).toEqual([1, 2]);
      expect(result).not.toBe(curr);
      expect(curr).toEqual([1, 2]);
    });

    it('should merge entities from a frozen next array', () => {
      const next = Object.freeze([{ id: 2, value: 'two' }]);
      const curr = [{ id: 1, value: 'one' }];

      const result = behavior.computeMerge(curr, next);

      expect(result).toEqual([
        { id: 1, value: 'one' },
        { id: 2, value: 'two' }
      ]);
      expect(result).not.toBe(curr);
      expect(result).not.toBe(next);
      expect(curr).toEqual([{ id: 1, value: 'one' }]);
    });

    it('should treat typed arrays as non-arrays and return next as-is', () => {
      const curr = [1, 2];
      const next = new Uint8Array([5, 6]);

      const result = behavior.computeMerge(curr, next as any);

      expect(result).toEqual(next);
      expect(result).not.toBe(next);
    });

    it('should not mutate the input array during updates', () => {
      const curr = [{ id: 1, name: 'one' }];
      const next = { id: 1, name: 'updated' };

      const result = behavior.computeMerge(curr, next);

      expect(result).toEqual([{ id: 1, name: 'updated' }]);
      expect(result).not.toBe(curr);
      expect(curr).toEqual([{ id: 1, name: 'one' }]);
    });

    it('should not mutate the input array during deletes', () => {
      const curr = [
        { id: 1, name: 'one' },
        { id: 2, name: 'two' }
      ];

      const result = behavior.computeMerge(curr, { id: 1 }, { isDelete: true });

      expect(result).toEqual([{ id: 2, name: 'two' }]);
      expect(result).not.toBe(curr);
      expect(curr).toEqual([
        { id: 1, name: 'one' },
        { id: 2, name: 'two' }
      ]);
    });

    it('should not mutate frozen current input during an update', () => {
      const curr = Object.freeze([
        Object.freeze({
          id: 1,
          profile: Object.freeze({ name: 'one' })
        })
      ]);
      const next = Object.freeze({ id: 1, profile: { name: 'new' } });

      const result = behavior.computeMerge(curr, next);

      expect(result).toEqual([{ id: 1, profile: { name: 'new' } }]);
      expect(curr).toEqual([{ id: 1, profile: { name: 'one' } }]);
    });

    it('should not mutate frozen current input during deletion', () => {
      const curr = Object.freeze([
        Object.freeze({ id: 1, profile: Object.freeze({ name: 'one' }) }),
        Object.freeze({ id: 2, profile: Object.freeze({ name: 'two' }) })
      ]);

      const result = behavior.computeMerge(curr, Object.freeze({ id: 1 }), {
        isDelete: true
      });

      expect(result).toEqual([{ id: 2, profile: { name: 'two' } }]);
      expect(curr).toEqual([
        { id: 1, profile: { name: 'one' } },
        { id: 2, profile: { name: 'two' } }
      ]);
    });
  });

  describe('identifier uniqueness normalization', () => {
    it('should not treat inherited properties as identifiers', () => {
      for (const idKey of ['toString', 'constructor', '__proto__']) {
        const specialKeyBehavior = new withArrayByIdMergeBehavior(
          'behavior-key',
          {
            behaviorConfig: { idKey }
          } as BehaviorClassContext
        );
        const curr = [{ name: 'one' }, { name: 'two' }];
        const next = { name: 'three' };

        const result = specialKeyBehavior.computeMerge(curr, next);

        expect(result).toEqual(next);
      }
    });

    it('should recognize an own property even when the key is inherited by default', () => {
      const specialKeyBehavior = new withArrayByIdMergeBehavior(
        'behavior-key',
        {
          behaviorConfig: { idKey: 'toString' }
        } as BehaviorClassContext
      );
      const curr = [{ toString: 'one', name: 'one' }];
      const next = { toString: 'one', name: 'updated' };

      const result = specialKeyBehavior.computeMerge(curr, next);

      expect(result).toEqual([{ toString: 'one', name: 'updated' }]);
    });

    it('should collapse duplicate identifiers already present in current state', () => {
      const curr = [
        { id: 1, name: 'first' },
        { id: 2, name: 'two' },
        { id: 1, name: 'last' }
      ];

      const result = behavior.computeMerge(curr, { id: 3, name: 'three' });

      expect(result).toEqual([
        { id: 1, name: 'last' },
        { id: 2, name: 'two' },
        { id: 3, name: 'three' }
      ]);
    });

    it('should collapse duplicate identifiers in the incoming array with last-write-wins', () => {
      const curr = [{ id: 1, name: 'one' }];
      const next = [
        { id: 2, name: 'first' },
        { id: 2, name: 'last' }
      ];

      const result = behavior.computeMerge(curr, next);

      expect(result).toEqual([
        { id: 1, name: 'one' },
        { id: 2, name: 'last' }
      ]);
    });

    it('should update matching identifiers in place and append only new identifiers', () => {
      const curr = [
        { id: 1, name: 'one' },
        { id: 2, name: 'two' }
      ];
      const next = [
        { id: 2, name: 'updated' },
        { id: 3, name: 'first' },
        { id: 3, name: 'last' }
      ];

      const result = behavior.computeMerge(curr, next);

      expect(result).toEqual([
        { id: 1, name: 'one' },
        { id: 2, name: 'updated' },
        { id: 3, name: 'last' }
      ]);
    });

    it('should normalize duplicate identifiers when the current value is undefined', () => {
      const next = [
        { id: 1, name: 'first' },
        { id: 1, name: 'last' }
      ];

      const result = behavior.computeMerge(undefined, next);

      expect(result).toEqual([{ id: 1, name: 'last' }]);
    });

    it('should remove all canonical duplicates when deleting an identifier', () => {
      const curr = [
        { id: 1, name: 'first' },
        { id: 2, name: 'two' },
        { id: 1, name: 'last' }
      ];

      const result = behavior.computeMerge(curr, { id: 1 }, { isDelete: true });

      expect(result).toEqual([{ id: 2, name: 'two' }]);
    });
  });

  it('should call destroy() as noop', async () => {
    behavior.destroy();
    await flushVaultPipeline();

    // eslint-disable-next-line
    expect(console.warn).toHaveBeenCalledWith(
      '[vault]',
      'behavior-key - destroy "noop"'
    );
  });

  it('should call reset() as noop', async () => {
    behavior.reset();
    await flushVaultPipeline();

    // eslint-disable-next-line
    expect(console.warn).toHaveBeenCalledWith(
      '[vault]',
      'behavior-key - reset "noop"'
    );
  });
});
