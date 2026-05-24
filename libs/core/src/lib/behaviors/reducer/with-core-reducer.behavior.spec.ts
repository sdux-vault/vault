import {
  BehaviorTypes,
  ReducerFunction,
  setVaultLogLevel
} from '@sdux-vault/shared';
import { flushVaultPipeline } from '@sdux-vault/testing-utils';
import { withCoreReducerBehavior } from './with-core-reducer.behavior';

describe('Behavior: CoreReducerBehavior', () => {
  let behavior: any;

  beforeEach(() => {
    setVaultLogLevel('warn');
    behavior = new withCoreReducerBehavior('behavior key', {} as any);
  });

  afterEach(() => {
    setVaultLogLevel('off');
  });

  it('should have default properties', () => {
    expect(behavior.critical).toBeTrue();
    expect(behavior.type).toBe('reduce');
    expect(behavior.key).toBe('behavior key');
  });

  it('should construct via factory and expose correct metadata', () => {
    expect(withCoreReducerBehavior.critical).toBeTruthy();
    expect(withCoreReducerBehavior.type).toBe(BehaviorTypes.Reduce);
    expect(withCoreReducerBehavior.key).toBe('SDUX::Behavior::Core::Reducer');
  });

  it('should return current unchanged if reducer is not a function', () => {
    const current = { name: 'Ada' };
    const reducer: any = null;

    const result = behavior.applyReducer(current, reducer);
    expect(result).toBe(current); // same reference
  });

  it('should apply reducer function to current value', () => {
    const reducer: ReducerFunction<number> = (current) => current + 1;

    const result = behavior.applyReducer(5, reducer);

    expect(result).toBe(6);
  });

  it('should support object reducers immutably', () => {
    const reducer: ReducerFunction<{ count: number }> = (current) => ({
      ...current,
      count: current.count + 1
    });

    const current = { count: 1 };
    const result = behavior.applyReducer(current, reducer);

    expect(result).toEqual({ count: 2 });
    expect(result).not.toBe(current); // ensure immutability
  });

  it('should support multiple calls on same behavior instance', () => {
    const r1: ReducerFunction<number> = (x) => x * 2;
    const r2: ReducerFunction<number> = (x) => x + 10;

    const mid = behavior.applyReducer(3, r1);
    const final = behavior.applyReducer(mid, r2);

    expect(mid).toBe(6);
    expect(final).toBe(16);
  });

  describe('edge cases', () => {
    // ---------------------------------------------------------------------------
    // 1. Error propagation: reducer throws Error
    // ---------------------------------------------------------------------------
    it('1. should propagate errors thrown by reducer', () => {
      const current = { value: 1 };
      const reducer: ReducerFunction<typeof current> = () => {
        throw new Error('boom');
      };

      expect(() => behavior.applyReducer(current, reducer)).toThrowError(
        'boom'
      );
    });

    // ---------------------------------------------------------------------------
    // 2. Error propagation: reducer throws non-Error (string)
    // ---------------------------------------------------------------------------
    it('2. should propagate non-Error values thrown by reducer (string)', () => {
      const current = { value: 1 };
      const reducer: ReducerFunction<typeof current> = () => {
        throw 'string error' as any;
      };

      expect(() => behavior.applyReducer(current, reducer)).toThrow(
        'string error'
      );
    });

    // ---------------------------------------------------------------------------
    // 3. Reducer returns null (allowed at behavior level)
    // ---------------------------------------------------------------------------
    it('3. should allow reducers to return null', () => {
      const current = { value: 1 };
      const reducer: ReducerFunction<any> = () => null;

      const result = behavior.applyReducer(current, reducer);

      expect(result).toBeNull();
    });

    // ---------------------------------------------------------------------------
    // 4. Reducer returns undefined (passed through as-is)
    // ---------------------------------------------------------------------------
    it('4. should allow reducers to return undefined (behavior passes through)', () => {
      const current = { value: 1 };
      const reducer: ReducerFunction<any> = () => undefined as any;

      const result = behavior.applyReducer(current, reducer);

      expect(result).toBeUndefined();
    });

    // ---------------------------------------------------------------------------
    // 5. Reducer returns value of different runtime type
    //    (behavior does not enforce type at runtime, only forwards)
    // ---------------------------------------------------------------------------
    it('5. should pass through reducer results even if runtime type changes', () => {
      const current = { count: 1 };
      const reducer: ReducerFunction<any> = () => 'not-an-object' as any;

      const result = behavior.applyReducer(current, reducer);

      expect(result).toBe('not-an-object' as any);
    });

    // ---------------------------------------------------------------------------
    // 6. Reducer ignores current and returns a constant
    // ---------------------------------------------------------------------------
    it('6. should support reducers that ignore current value and return constant', () => {
      const current = { value: 123 };
      const reducer: ReducerFunction<{ value: number }> = () => ({
        value: 999
      });

      const result = behavior.applyReducer(current, reducer);

      expect(result).toEqual({ value: 999 });
    });

    // ---------------------------------------------------------------------------
    // 7. Reducer that performs a shallow copy on arrays
    // ---------------------------------------------------------------------------
    it('7. should support reducers that shallow-copy arrays', () => {
      const current = [1, 2, 3];
      const reducer: ReducerFunction<number[]> = (arr) => [...arr];

      const result = behavior.applyReducer(current, reducer);

      expect(result).toEqual([1, 2, 3]);
      expect(result).not.toBe(current); // new reference
    });

    // ---------------------------------------------------------------------------
    // 8. Multiple edge reducers applied sequentially on same behavior instance
    // ---------------------------------------------------------------------------
    it('8. should allow multiple different reducers to be used sequentially', () => {
      const r1: ReducerFunction<number> = (x) => x * 2;
      const r2: ReducerFunction<number> = (x) => x - 3;
      const r3: ReducerFunction<number> = (x) => x / 2;

      const mid1 = behavior.applyReducer(4, r1); // 8
      const mid2 = behavior.applyReducer(mid1, r2); // 5
      const final = behavior.applyReducer(mid2, r3); // 2.5

      expect(mid1).toBe(8);
      expect(mid2).toBe(5);
      expect(final).toBe(2.5);
    });

    // ---------------------------------------------------------------------------
    // 9. Reducer uses external captured variable (closure)
    // ---------------------------------------------------------------------------
    it('9. should support reducers that close over external variables', () => {
      const factor = 3;
      const current = 2;
      const reducer: ReducerFunction<number> = (x) => x * factor;

      const result = behavior.applyReducer(current, reducer);

      expect(result).toBe(6);
    });

    // ---------------------------------------------------------------------------
    // 10. Reducer bound with custom "this" (behavior is agnostic)
    // ---------------------------------------------------------------------------
    it('10. should work with reducers bound to a custom `this` context', () => {
      const context = { factor: 10 };
      function mul(this: any, x: number): number {
        return x * this.factor;
      }

      const boundReducer: ReducerFunction<number> = mul.bind(context);
      const result = behavior.applyReducer(2, boundReducer);

      expect(result).toBe(20);
    });
  });

  it('should valid destroy is noop', async () => {
    spyOn(console, 'warn');
    behavior.destroy();
    await flushVaultPipeline();
    // eslint-disable-next-line
    expect(console.warn).toHaveBeenCalledWith(
      '[vault]',
      'behavior key - destroy "noop"'
    );
  });

  it('should valid reset is noop', async () => {
    spyOn(console, 'warn');
    behavior.reset();
    await flushVaultPipeline();
    // eslint-disable-next-line
    expect(console.warn).toHaveBeenCalledWith(
      '[vault]',
      'behavior key - reset "noop"'
    );
  });
});
