import {
  BehaviorTypes,
  FilterFunction,
  setVaultLogLevel,
  VAULT_NOOP
} from '@sdux-vault/shared';
import { flushVaultPipeline } from '@sdux-vault/testing-utils';
import { withCoreFilterBehavior } from './with-core-filter.behavior';

describe('Behavior: CoreFilter', () => {
  let behavior: any;

  beforeEach(() => {
    spyOn(console, 'warn');
    spyOn(console, 'error');

    setVaultLogLevel('warn');

    behavior = new withCoreFilterBehavior('behavior key', {} as any);
  });

  afterEach(() => {
    setVaultLogLevel('off');
  });

  it('should have correct default metadata', () => {
    expect(behavior.critical).toBeTrue();
    expect(behavior.type).toBe('filter');
    expect(behavior.key).toBe('behavior key');
  });

  it('should construct via factory and expose correct metadata', () => {
    expect(behavior).toBeTruthy();
    expect(behavior.type).toBe(BehaviorTypes.Filter);
    expect(behavior.key).toBe('behavior key');
  });

  it('should return current unchanged when filter is not a function', () => {
    const current = { count: 5 };
    const result = behavior.applyFilter(current, null as any);

    expect(result).toBe(current); // exact same reference
  });

  it('should apply filter function to current', () => {
    const filter: FilterFunction<number> = (curr) =>
      (curr > 10 ? curr : undefined) as any;

    const result1 = behavior.applyFilter(5, filter);
    const result2 = behavior.applyFilter(20, filter);

    expect(result1).toBe(VAULT_NOOP);
    expect(result2).toBe(20);
  });

  it('should support immutable object filtering', () => {
    const filter: FilterFunction<{ ok: boolean }> = (c) =>
      (c.ok ? c : undefined) as any;

    const current = { ok: true };
    const result = behavior.applyFilter(current, filter);

    expect(result).toEqual({ ok: true });
  });

  it('should support multiple applyFilter calls on same instance', () => {
    const f1: FilterFunction<number> = (x) => (x >= 0 ? x : undefined) as any;
    const f2: FilterFunction<number> = (x) =>
      (x % 2 === 0 ? x : undefined) as any;

    const first = behavior.applyFilter(3, f1); // 3 ok
    const second = behavior.applyFilter(3, f2); // 3 rejected

    expect(first).toBe(3);
    expect(second).toBe(VAULT_NOOP);
  });

  // ADD THESE TESTS BELOW EXISTING ONES

  it('should throw if filter returns a different primitive type', () => {
    const filter = () => 'string' as any;

    expect(() => behavior.applyFilter(123 as any, filter)).toThrowError(
      `[vault] Filter returned a value of incorrect type. Expected "number", got "string".`
    );
  });

  it('should throw if filter returns non-array for array input', () => {
    const filter = () => ({ not: 'array' }) as any;

    expect(() => behavior.applyFilter([1, 2, 3] as any, filter)).toThrowError(
      `[vault] Filter returned non-array for array input.`
    );
  });

  it('should allow array-to-array filtering', () => {
    const filter: FilterFunction<number[]> = (arr) => arr.filter((x) => x > 5);

    const result = behavior.applyFilter([3, 10, 20] as any, filter);

    expect(result).toEqual([10, 20]);
  });

  it('should throw if filter returns null for object input', () => {
    const filter = () => null as any;

    expect(() =>
      behavior.applyFilter({ ok: true } as any, filter)
    ).toThrowError(`[vault] Filter returned invalid object for object input.`);
  });

  it('should throw if filter returns array for object input', () => {
    const filter = () => [1, 2, 3] as any;

    expect(() =>
      behavior.applyFilter({ ok: true } as any, filter)
    ).toThrowError(`[vault] Filter returned invalid object for object input.`);
  });

  it('should allow object-to-object filtering', () => {
    const current = { name: 'Ada', active: true };

    const filter: FilterFunction<typeof current> = (obj) => ({
      ...obj,
      active: false
    });

    const result = behavior.applyFilter(current, filter);

    expect(result).toEqual({ name: 'Ada', active: false });
  });

  it('should support primitive→primitive filters', () => {
    const filter: FilterFunction<number> = (n) => n * 2;

    const result = behavior.applyFilter(5, filter);

    expect(result).toBe(10);
  });

  it('should reject primitive state when filter returns undefined', () => {
    const filter: FilterFunction<number> = () => undefined as any;

    const result = behavior.applyFilter(10, filter);

    expect(result).toBe(VAULT_NOOP);
  });

  it('should reject object state when filter returns undefined', () => {
    const filter: FilterFunction<{ x: number }> = () => undefined as any;

    const result = behavior.applyFilter({ x: 1 }, filter);

    expect(result).toBe(VAULT_NOOP);
  });

  it('should reject array state when filter returns undefined', () => {
    const filter: FilterFunction<number[]> = () => undefined as any;

    const result = behavior.applyFilter([1, 2, 3], filter);

    expect(result).toBe(VAULT_NOOP);
  });

  it('should allow identity filter (return same object type)', () => {
    const obj = { id: 1 };
    const filter: FilterFunction<typeof obj> = (x) => x;

    const result = behavior.applyFilter(obj, filter);

    expect(result).toEqual(obj);
  });

  it('should throw for invalid object return even if key structure differs', () => {
    const filter = () => 999 as any;

    expect(() => behavior.applyFilter({ a: 1 } as any, filter)).toThrowError(
      `[vault] Filter returned invalid object for object input.`
    );
  });

  it('should safely handle undefined current state', () => {
    const filterFn: FilterFunction<any> = jasmine.createSpy('filterFn');

    const result = behavior.applyFilter(undefined, filterFn);

    // Filter rejects entire state automatically
    expect(result).toBeUndefined();

    // The filter function should not have been called
    expect(filterFn).not.toHaveBeenCalled();
  });

  it('should handle the filter throwing an error', async () => {
    const filter: FilterFunction<{ ok: boolean }> = () => {
      throw new Error('an error');
    };

    const current = { ok: true };
    try {
      behavior.applyFilter(current, filter);
      expect('this is an error').toBe('fix me');
    } catch (error: any) {
      expect(error.message).toBe('an error');
    }
  });

  it('should valid destroy is noop', async () => {
    behavior.destroy();
    await flushVaultPipeline();
    // eslint-disable-next-line
    expect(console.warn).toHaveBeenCalledWith(
      '[vault]',
      'behavior key - destroy "noop"'
    );
  });

  it('should valid reset is noop', async () => {
    behavior.reset();
    await flushVaultPipeline();
    // eslint-disable-next-line
    expect(console.warn).toHaveBeenCalledWith(
      '[vault]',
      'behavior key - reset "noop"'
    );
  });
});
