import {
  BehaviorTypes,
  setVaultLogLevel,
  VAULT_CLEAR_STATE
} from '@sdux-vault/shared';
import { flushVaultPipeline } from '@sdux-vault/testing-utils';
import { withObjectDeepMergeBehavior } from './with-object-deep-merge.behavior';

describe('Behavior: withObjectDeepMergeBehavior', () => {
  let behavior: withObjectDeepMergeBehavior<any>;

  beforeEach(() => {
    spyOn(console, 'warn');
    setVaultLogLevel('warn');

    behavior = new withObjectDeepMergeBehavior('behavior key', {} as any);
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

  it('should have default decorator properties', () => {
    expect(withObjectDeepMergeBehavior.critical).toBeTrue();
    expect(withObjectDeepMergeBehavior.type).toBe('merge');
    expect(withObjectDeepMergeBehavior.key).toBe('SDUX::Behavior::Merge::Deep');
    expect((withObjectDeepMergeBehavior as any).needsLicense).toBeFalse();
    expect((withObjectDeepMergeBehavior as any).wantsConfig).toBeFalse();
    expect((withObjectDeepMergeBehavior as any).configKey).toBeUndefined();
    expect(typeof (withObjectDeepMergeBehavior as any).installFluentApi).toBe(
      'undefined'
    );
  });

  // ---------------------------------------------------------------------------
  // Undefined merge behavior
  // ---------------------------------------------------------------------------
  it('should preserve currentValue when nextValue is undefined and clearUndefined=false', () => {
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

  // ---------------------------------------------------------------------------
  // Non-object merges (primitives, arrays, nulls)
  // ---------------------------------------------------------------------------
  it('should return nextValue when current is null', () => {
    const result = behavior.computeMerge(null as any, { a: 1 });

    expect(result).toEqual({ a: 1 });
  });

  it('should return nextValue when nextValue is null', () => {
    const curr = { a: 1 };
    const result = behavior.computeMerge(curr, null as any);

    expect(result).toBeNull();
  });

  it('should return nextValue when either value is an array', () => {
    const curr = { a: 1 };
    const next = [1, 2];

    const result = behavior.computeMerge(curr, next as any);

    expect(result).toEqual([1, 2]);
  });

  it('should return primitives directly', () => {
    const curr = { a: 1 };
    const next = 99 as any;

    const result = behavior.computeMerge(curr, next);

    expect(result).toBe(99);
  });

  // ---------------------------------------------------------------------------
  // Deep merge behavior
  // ---------------------------------------------------------------------------
  it('should deep merge nested objects', () => {
    const curr = {
      profile: {
        name: 'Alice',
        details: {
          age: 30,
          city: 'NYC'
        }
      }
    };

    const next = {
      profile: {
        details: {
          age: 31
        }
      }
    };

    const result = behavior.computeMerge(curr, next);

    expect(result).toEqual({
      profile: {
        name: 'Alice',
        details: {
          age: 31,
          city: 'NYC'
        }
      }
    });
  });

  it('should not share nested object references from target in the merged output', () => {
    const curr = {
      unchanged: { deep: { value: 'original' } },
      merged: { a: 1 }
    };

    const next = {
      merged: { b: 2 }
    };

    const result = behavior.computeMerge(curr, next);

    expect(result).toEqual({
      unchanged: { deep: { value: 'original' } },
      merged: { a: 1, b: 2 }
    });

    // Mutating the result must not corrupt the original target
    result.unchanged.deep.value = 'CORRUPTED';
    expect(curr.unchanged.deep.value).toBe('original');
  });

  it('should override primitive values during deep merge', () => {
    const curr = { a: 1, b: { c: 2 } };
    const next = { a: 100 };

    const result = behavior.computeMerge(curr, next);

    expect(result).toEqual({ a: 100, b: { c: 2 } });
  });

  it('should deep merge multiple nested levels', () => {
    const curr = { x: { y: { z: 1 } } };
    const next = { x: { y: { k: 2 } } };

    const result = behavior.computeMerge(curr, next);

    expect(result).toEqual({ x: { y: { z: 1, k: 2 } } });
  });

  // ---------------------------------------------------------------------------
  // stripNulls
  // ---------------------------------------------------------------------------
  it('should remove null properties when stripNulls=true', () => {
    const curr = { a: 1, b: { c: 3 } };
    const next = { b: { c: null, d: 4 }, e: null };

    const result = behavior.computeMerge(curr, next, { stripNulls: true });

    expect(result).toEqual({
      a: 1,
      b: { d: 4 }
    });
  });

  it('should preserve nulls when stripNulls=false', () => {
    const curr = { a: 1 };
    const next = { a: null };

    const result = behavior.computeMerge(curr, next, { stripNulls: false });

    expect(result).toEqual({ a: null });
  });

  // ---------------------------------------------------------------------------
  // Sequential deep merges
  // ---------------------------------------------------------------------------
  it('should support sequential deep merges', () => {
    const first = behavior.computeMerge(
      { user: { name: 'Ada', roles: ['admin'] } },
      { user: { roles: ['admin', 'dev'] } }
    );

    const second = behavior.computeMerge(first, { user: { active: true } });

    expect(second).toEqual({
      user: {
        name: 'Ada',
        roles: ['admin', 'dev'],
        active: true
      }
    });
  });

  describe('Builder ', () => {
    it('should support builder deep merges', () => {
      const initialState = Object({});

      const updateOne = Object({
        currentStep: 1,
        stateInput: {
          framework: 'frame work'
        },
        stageInstances: []
      });

      const updateTwo = Object({
        stateInput: {
          framework: 'frame work',
          shapeName: 'shape name',
          primitive: 'object',
          initialValue: '{'
        },
        bahaviorInstances: [
          {
            behaviorId: 'withBehaviorId',
            selected: false,
            status: 'active',
            index: 0
          }
        ]
      });

      const updateTwoA = Object({
        currentStep: 2
      });

      const updateThree = Object({
        stageInstances: [
          {
            stageId: 'withReplayGlobalErrorController',
            selected: true,
            status: 'abstain',
            index: 0
          },
          {
            stageId: 'withCoreFromStreamBehavior',
            selected: null,
            status: 'inactive',
            index: 2
          }
        ]
      });

      const updateThreeA = Object({
        currentStep: 1
      });

      const updateFour = Object({
        currentStep: 4,
        stageInstances: [
          {
            stageId: 'withReplayGlobalErrorController',
            selected: false,
            status: 'abstain',
            index: 0
          },
          {
            stageId: 'interceptor',
            selected: true,
            status: 'inactive',
            index: 1
          },
          {
            stageId: 'withCoreFromStreamBehavior',
            selected: null,
            status: 'inactive',
            index: 2
          }
        ]
      });

      const initial = behavior.computeMerge(initialState, updateOne);

      expect(initial).toEqual(
        Object({
          currentStep: 1,
          stateInput: Object({ framework: 'frame work' }),
          stageInstances: []
        })
      );

      const first = behavior.computeMerge(initial, updateTwo);
      expect(first).toEqual(
        Object({
          currentStep: 1,
          stateInput: Object({
            framework: 'frame work',
            shapeName: 'shape name',
            primitive: 'object',
            initialValue: '{'
          }),
          stageInstances: [],
          bahaviorInstances: [
            Object({
              behaviorId: 'withBehaviorId',
              selected: false,
              status: 'active',
              index: 0
            })
          ]
        })
      );

      const second = behavior.computeMerge(first, updateTwo);
      expect(second).toEqual(
        Object({
          currentStep: 1,
          stateInput: Object({
            framework: 'frame work',
            shapeName: 'shape name',
            primitive: 'object',
            initialValue: '{'
          }),
          stageInstances: [],
          bahaviorInstances: [
            Object({
              behaviorId: 'withBehaviorId',
              selected: false,
              status: 'active',
              index: 0
            })
          ]
        })
      );

      const secondA = behavior.computeMerge(second, updateTwoA);
      expect(secondA).toEqual(
        Object({
          currentStep: 2,
          stateInput: Object({
            framework: 'frame work',
            shapeName: 'shape name',
            primitive: 'object',
            initialValue: '{'
          }),
          stageInstances: [],
          bahaviorInstances: [
            Object({
              behaviorId: 'withBehaviorId',
              selected: false,
              status: 'active',
              index: 0
            })
          ]
        })
      );

      const third = behavior.computeMerge(secondA, updateThree);
      expect(third).toEqual(
        Object({
          currentStep: 2,
          stateInput: Object({
            framework: 'frame work',
            shapeName: 'shape name',
            primitive: 'object',
            initialValue: '{'
          }),
          stageInstances: [
            {
              stageId: 'withReplayGlobalErrorController',
              selected: true,
              status: 'abstain',
              index: 0
            },
            {
              stageId: 'withCoreFromStreamBehavior',
              selected: null,
              status: 'inactive',
              index: 2
            }
          ],
          bahaviorInstances: [
            Object({
              behaviorId: 'withBehaviorId',
              selected: false,
              status: 'active',
              index: 0
            })
          ]
        })
      );

      const thirdA = behavior.computeMerge(third, updateThreeA);
      expect(thirdA).toEqual(
        Object({
          currentStep: 1,
          stateInput: Object({
            framework: 'frame work',
            shapeName: 'shape name',
            primitive: 'object',
            initialValue: '{'
          }),
          stageInstances: [
            {
              stageId: 'withReplayGlobalErrorController',
              selected: true,
              status: 'abstain',
              index: 0
            },
            {
              stageId: 'withCoreFromStreamBehavior',
              selected: null,
              status: 'inactive',
              index: 2
            }
          ],
          bahaviorInstances: [
            Object({
              behaviorId: 'withBehaviorId',
              selected: false,
              status: 'active',
              index: 0
            })
          ]
        })
      );

      const fourth = behavior.computeMerge(thirdA, updateFour);
      expect(fourth).toEqual(
        Object({
          currentStep: 4,
          stateInput: Object({
            framework: 'frame work',
            shapeName: 'shape name',
            primitive: 'object',
            initialValue: '{'
          }),
          stageInstances: [
            {
              stageId: 'withReplayGlobalErrorController',
              selected: false,
              status: 'abstain',
              index: 0
            },
            {
              stageId: 'interceptor',
              selected: true,
              status: 'inactive',
              index: 1
            },
            {
              stageId: 'withCoreFromStreamBehavior',
              selected: null,
              status: 'inactive',
              index: 2
            }
          ],
          bahaviorInstances: [
            Object({
              behaviorId: 'withBehaviorId',
              selected: false,
              status: 'active',
              index: 0
            })
          ]
        })
      );
    });
  });

  // ---------------------------------------------------------------------------
  // Error handling edge cases
  // ---------------------------------------------------------------------------

  describe('edge cases', () => {
    it('should propagate getter errors if nextValue throws during key iteration', () => {
      const next = new Proxy(
        {},
        {
          ownKeys() {
            throw new Error('bad-ownKeys');
          }
        }
      );

      expect(() => behavior.computeMerge({}, next)).toThrowError('bad-ownKeys');
    });

    it('should not invoke getters on nested properties unless accessed', () => {
      const curr = { a: 1 };

      const next = Object.create(null);
      Object.defineProperty(next, 'b', {
        get() {
          throw new Error('not-accessed');
        },
        enumerable: true
      });

      // deep merge will access "b", so getter *is* invoked
      expect(() => behavior.computeMerge(curr, next)).toThrowError(
        'not-accessed'
      );
    });

    it('should treat Date objects as primitives and return next', () => {
      const curr = { a: new Date(2020, 1, 1) };
      const next = { a: new Date(2021, 1, 1) };

      const result = behavior.computeMerge(curr, next);
      expect(result).toEqual(next);
    });

    it('should treat RegExp objects as primitives and return next', () => {
      const curr = { r: /abc/ };
      const next = { r: /xyz/ };

      const result = behavior.computeMerge(curr, next);
      expect(result).toEqual(next);
    });

    it('should treat class instances as primitives and return next', () => {
      class Person {
        constructor(public name: string) {}
      }

      const curr = { p: new Person('Ada') };
      const next = { p: new Person('Grace') };

      const result = behavior.computeMerge(curr, next);
      expect(result).toEqual(next);
    });

    it('should ignore non-enumerable properties on nextValue', () => {
      const curr = { a: 1 };
      const next = {};

      Object.defineProperty(next, 'hidden', {
        value: 42,
        enumerable: false
      });

      const result = behavior.computeMerge(curr, next);
      expect(result).toEqual({ a: 1 }); // hidden ignored
    });

    it('should ignore symbol keys during deep merge', () => {
      const sym = Symbol('secret');

      const curr = { a: 1 };
      const next: any = { a: 2 };
      next[sym] = 99;

      const result = behavior.computeMerge(curr, next);

      expect(result).toEqual({ a: 2 });
      expect((result as any)[sym]).toBeUndefined();
    });

    it('should deep merge into empty current object', () => {
      const curr = {};
      const next = { nested: { x: 1 } };

      const result = behavior.computeMerge(curr, next);

      expect(result).toEqual({ nested: { x: 1 } });
    });

    it('should replace arrays instead of merging them in deep merge', () => {
      const curr = { a: { list: [1, 2] } };
      const next = { a: { list: [3] } };

      const result = behavior.computeMerge(curr, next);

      expect(result).toEqual({ a: { list: [3] } });
    });

    it('should remove nested empty objects when stripNulls=true', () => {
      const curr = { a: { x: 1 } };
      const next = { a: { x: null } };

      const result = behavior.computeMerge(curr, next, { stripNulls: true });

      expect(result).toEqual({}); // because a becomes empty → removed
    });

    it('should preserve empty objects when stripNulls=false', () => {
      const curr = { a: { x: 1 } };
      const next = { a: { x: null } };

      const result = behavior.computeMerge(curr, next, { stripNulls: false });

      expect(result).toEqual({ a: { x: null } });
    });

    it('should propagate errors from nested getters during deep merge', () => {
      const curr = { a: { b: 1 } };
      const next = { a: {} };

      Object.defineProperty(next.a, 'b', {
        get() {
          throw new Error('nested-error');
        },
        enumerable: true
      });

      expect(() => behavior.computeMerge(curr, next)).toThrowError(
        'nested-error'
      );
    });

    it('should not mutate current or next objects', () => {
      const curr = { a: { x: 1 } };
      const next = { a: { y: 2 } };

      const result = behavior.computeMerge(curr, next);

      expect(curr).toEqual({ a: { x: 1 } }); // unchanged
      expect(next).toEqual({ a: { y: 2 } }); // unchanged
      expect(result).not.toBe(curr);
      expect(result).not.toBe(next);
    });

    it('should not strip nulls inside arrays (arrays are returned as-is)', () => {
      const curr = { a: [1, null, 3] };
      const next = { a: [null] };

      const result = behavior.computeMerge(curr, next, { stripNulls: true });

      expect(result).toEqual({ a: [null] }); // arrays bypass stripNulls
    });

    it('should call destroy() as noop and warn', async () => {
      behavior.destroy();
      await flushVaultPipeline();

      // eslint-disable-next-line
      expect(console.warn).toHaveBeenCalledWith(
        '[vault]',
        'behavior key - destroy "noop"'
      );
    });

    it('should call reset() as noop and warn', async () => {
      behavior.reset();
      await flushVaultPipeline();

      // eslint-disable-next-line
      expect(console.warn).toHaveBeenCalledWith(
        '[vault]',
        'behavior key - reset "noop"'
      );
    });
  });
});
