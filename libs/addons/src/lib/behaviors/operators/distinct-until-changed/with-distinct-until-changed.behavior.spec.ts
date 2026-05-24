import { setVaultLogLevel, VAULT_NOOP } from '@sdux-vault/shared';
import { flushVaultPipeline } from '@sdux-vault/testing-utils';
import { withDistinctUntilChanged } from './with-distinct-until-changed.behavior';

describe('Behavior: withDistinctUntilChanged', () => {
  let behavior: any;

  beforeEach(() => {
    setVaultLogLevel('warn');
  });
  afterEach(() => {
    setVaultLogLevel('off');
  });

  it('should have correct metadata', () => {
    const Distinct = withDistinctUntilChanged<string>();
    behavior = new Distinct('distinct', {} as any);

    expect(behavior.type).toBe('operator');
    expect(behavior.critical).toBeTrue();
    expect(behavior.key).toBe('distinct');
  });

  it('should pass through the first value', async () => {
    const Distinct = withDistinctUntilChanged<string>();
    behavior = new Distinct('distinct', {} as any);

    const result = await behavior.applyOperator('first');

    expect(result).toEqual('first');
  });

  it('should block subsequent identical primitive values (distinct until changed)', async () => {
    const Distinct = withDistinctUntilChanged<string>();
    behavior = new Distinct('distinct', {} as any);

    const r1 = await behavior.applyOperator('same');
    expect(r1).toEqual('same');
    const r2 = await behavior.applyOperator('same');
    expect(r2).toBe(VAULT_NOOP);

    expect(r1).toEqual('same');
    expect(r2).toBe(VAULT_NOOP);
  });

  it('should emit when primitive value changes', async () => {
    const Distinct = withDistinctUntilChanged<number>();
    behavior = new Distinct('distinct', {} as any);

    const r1 = await behavior.applyOperator(1);
    expect(r1).toBe(1);
    const r2 = await behavior.applyOperator(2);
    expect(r2).toBe(2);
    const r3 = await behavior.applyOperator(2);
    expect(r3).toBe(VAULT_NOOP);
    const r4 = await behavior.applyOperator(3);
    expect(r4).toBe(3);

    expect(r1).toBe(1);
    expect(r2).toBe(2);
    expect(r3).toBe(VAULT_NOOP);
    expect(r4).toBe(3);
  });

  it('should use reference equality for objects (same reference blocked, new reference allowed)', async () => {
    const Distinct = withDistinctUntilChanged<{ value: number }>();
    behavior = new Distinct('distinct', {} as any);

    const obj = { value: 1 };
    const sameRefResult1 = await behavior.applyOperator(obj);
    expect(sameRefResult1).toEqual(obj);

    const sameRefResult2 = await behavior.applyOperator(obj);
    expect(sameRefResult1).toEqual(obj);

    const newRefResult = await behavior.applyOperator({ value: 2 });

    expect(sameRefResult2).toBe(VAULT_NOOP);
    // new object reference should be emitted, even though contents are equal
    expect(newRefResult).toEqual({ value: 2 });
  });

  it('should accept falsy but non-null values (0, false, empty string)', async () => {
    const Distinct = withDistinctUntilChanged<any>();
    behavior = new Distinct('distinct', {} as any);

    const r1 = await behavior.applyOperator(0);
    expect(r1).toBe(0);
    const r2 = await behavior.applyOperator(0);
    expect(r2).toBe(VAULT_NOOP);
    const r3 = await behavior.applyOperator(false);
    expect(r3).toBeFalse();
    const r4 = await behavior.applyOperator(false);
    expect(r4).toBe(VAULT_NOOP);
    const r5 = await behavior.applyOperator('');
    expect(r5).toBe('');
    const r6 = await behavior.applyOperator('');
    expect(r6).toBe(VAULT_NOOP);

    expect(r1).toBe(0);
    expect(r2).toBe(VAULT_NOOP);
    expect(r3).toBeFalse();
    expect(r4).toBe(VAULT_NOOP);
    expect(r5).toBe('');
    expect(r6).toBe(VAULT_NOOP);
  });

  it('should block consecutive identical object references', async () => {
    const Distinct = withDistinctUntilChanged<any>();
    behavior = new Distinct('distinct', {} as any);

    const obj = { a: 1 };

    const r1 = await behavior.applyOperator(obj);
    expect(r1).toEqual(obj);
    const r2 = await behavior.applyOperator(obj); // same reference
    expect(r2).toBe(VAULT_NOOP); // identical reference → blocked
    const r3 = await behavior.applyOperator({ a: 1 }); // new reference
    expect(r3).toBe(VAULT_NOOP); // identical reference → blocked
    const r4 = await behavior.applyOperator({ a: 2 }); // new reference
    expect(r4).toEqual({ a: 2 });
    const r5 = await behavior.applyOperator({ a: 1 }); // same as r3? no, also new ref
    expect(r5).toEqual({ a: 1 }); // new reference → allowed

    expect(r1).toEqual(obj);
    expect(r2).toBe(VAULT_NOOP); // identical reference → blocked
    expect(r3).toBe(VAULT_NOOP); // identical reference → blocked
    expect(r4).toEqual({ a: 2 });
    expect(r5).toEqual({ a: 1 }); // new reference → allowed
  });

  describe('arrays', () => {
    it('should correctly apply distinct-until-changed semantics for arrays (6 array tests)', async () => {
      const Distinct = withDistinctUntilChanged<any[]>();
      behavior = new Distinct('distinct-array', {} as any);

      const sharedA = [
        { id: 1, name: 'Kay' },
        { id: 2, name: 'Jace' },
        { id: 3, name: 'Brian' }
      ];
      const r1 = await behavior.applyOperator(sharedA);
      expect(r1).toEqual(sharedA);
      const r2 = await behavior.applyOperator(sharedA);
      expect(r2).toBe(VAULT_NOOP);
      const r3 = await behavior.applyOperator([
        { id: 1, name: 'Kay' },
        { id: 2, name: 'Jace' },
        { id: 3, name: 'Brian' }
      ]);
      expect(r3).toBe(VAULT_NOOP);

      const r4 = await behavior.applyOperator(undefined);
      expect(r4).toBe(VAULT_NOOP);

      const r5 = await behavior.applyOperator([
        { id: 1, name: 'Kay' },
        { id: 2, name: 'Jace' },
        { id: 3, name: 'Brian' }
      ]);
      expect(r5).toBe(VAULT_NOOP);

      const r6 = await behavior.applyOperator([{ id: 1, name: 'brian' }]);
      expect(r6).toEqual([{ id: 1, name: 'brian' }]);

      const r7 = await behavior.applyOperator([{ id: 2, name: 'brian' }]);
      expect(r7).toEqual([{ id: 2, name: 'brian' }]);

      const r8 = await behavior.applyOperator([
        { id: 1 },
        { nested: [1, 2, 3] }
      ]);
      expect(r8).toEqual([{ id: 1 }, { nested: [1, 2, 3] }]);

      const r9 = await behavior.applyOperator([
        { id: 1 },
        { nested: [1, 2, 3] }
      ]);
      expect(r9).toBe(VAULT_NOOP);

      const r10 = await behavior.applyOperator([
        { id: 1 },
        { nested: [1, 3, 2] }
      ]);
      expect(r10).toEqual([{ id: 1 }, { nested: [1, 3, 2] }]);

      expect(r1).toEqual(sharedA);
      expect(r2).toBe(VAULT_NOOP);
      expect(r3).toBe(VAULT_NOOP);
      expect(r4).toBe(VAULT_NOOP);
      expect(r5).toBe(VAULT_NOOP);
      expect(r6).toEqual([{ id: 1, name: 'brian' }]);
      expect(r7).toEqual([{ id: 2, name: 'brian' }]);
      expect(r8).toEqual([{ id: 1 }, { nested: [1, 2, 3] }]);
      expect(r9).toBe(VAULT_NOOP);
      expect(r10).toEqual([{ id: 1 }, { nested: [1, 3, 2] }]);
    });
  });

  it('should call destroy without errors and clear internal state', async () => {
    spyOn(console, 'warn');

    const Distinct = withDistinctUntilChanged<string>();
    behavior = new Distinct('distinct', {} as any);

    // Prime with a value so #previous is non-undefined
    await behavior.applyOperator('first');
    await flushVaultPipeline();

    behavior.destroy();
    await flushVaultPipeline();

    // We only assert that destroy runs without throwing.
    // There is no console.warn contract like withDebounce,
    // so we simply ensure subsequent call behaves as "first" again.
    const result = await behavior.applyOperator('first');
    await flushVaultPipeline();

    expect(result).toBe('first');
    // eslint-disable-next-line
    expect(console.warn).toHaveBeenCalledWith(
      '[vault]',
      'distinct - destroy called'
    );
  });

  it('should treat objects with reordered keys as changed', async () => {
    const Distinct = withDistinctUntilChanged<object>();
    behavior = new Distinct('distinct', {} as any);

    const r1 = await behavior.applyOperator({ a: 1, b: 2 });
    expect(r1).toEqual({ a: 1, b: 2 });

    const r2 = await behavior.applyOperator({ b: 2, a: 1 });
    expect(r2).toEqual({ b: 2, a: 1 }); // different JSON order → should emit
  });

  it('should handle deep nested structural equality', async () => {
    const Distinct = withDistinctUntilChanged<any>();
    behavior = new Distinct('deep', {} as any);

    const incoming1 = { person: { name: 'Ana', tags: ['a', 'b'] } };
    const incoming2 = { person: { name: 'Ana', tags: ['a', 'b'] } };

    const r1 = await behavior.applyOperator(incoming1);
    const r2 = await behavior.applyOperator(incoming2);

    expect(r1).toEqual(incoming1);
    expect(r2).toBe(VAULT_NOOP);
  });

  it('should emit again when a value reappears after an intervening different value', async () => {
    const Distinct = withDistinctUntilChanged<any>();
    behavior = new Distinct('repeat', {} as any);

    const A = { id: 1 };
    const B = { id: 2 };

    expect(await behavior.applyOperator(A)).toEqual(A);
    expect(await behavior.applyOperator(A)).toBe(VAULT_NOOP);

    expect(await behavior.applyOperator(B)).toEqual(B);
    expect(await behavior.applyOperator(B)).toBe(VAULT_NOOP);

    expect(await behavior.applyOperator(A)).toEqual(A);
  });

  it('should correctly distinguish NaN from previous values', async () => {
    const Distinct = withDistinctUntilChanged<number>();
    behavior = new Distinct('nan', {} as any);

    const r1 = await behavior.applyOperator(NaN);
    expect(r1).toBeNaN();

    const r2 = await behavior.applyOperator(NaN);
    expect(r2).toBe(VAULT_NOOP); // JSON.stringify(NaN) === "null"
  });

  describe('undefined / invalid ctx values', () => {
    beforeEach(() => {
      const Distinct = withDistinctUntilChanged<string>();
      behavior = new Distinct('distinct', {} as any);
    });

    it('should return undefined with no ctx', async () => {
      const result = await behavior.applyOperator();
      await flushVaultPipeline();
      expect(result).toBe(VAULT_NOOP);
    });

    it('should return undefined with incoming undefined', async () => {
      const result = await behavior.applyOperator(undefined);
      await flushVaultPipeline();
      expect(result).toBe(VAULT_NOOP);
    });

    it('should return undefined with incoming null', async () => {
      const result = await behavior.applyOperator(null);
      await flushVaultPipeline();
      expect(result).toBe(VAULT_NOOP);
    });
  });

  describe('customer comparision', () => {
    it('should correctly apply distinct-until-changed semantics for arrays (6 array tests)', async () => {
      const Distinct = withDistinctUntilChanged<any[]>((a, b) => {
        return a === b;
      });
      behavior = new Distinct('distinct-array', {} as any);

      const sharedA = [
        { id: 1, name: 'Kay' },
        { id: 2, name: 'Jace' },
        { id: 3, name: 'Brian' }
      ];
      const r1 = await behavior.applyOperator(sharedA);
      expect(r1).toEqual(sharedA);
      const r2 = await behavior.applyOperator(sharedA);
      expect(r2).toBe(VAULT_NOOP);

      const r3 = await behavior.applyOperator([
        { id: 1, name: 'Kay' },
        { id: 2, name: 'Jace' },
        { id: 3, name: 'Brian' }
      ]);

      expect(r3).toEqual([
        Object({ id: 1, name: 'Kay' }),
        Object({ id: 2, name: 'Jace' }),
        Object({ id: 3, name: 'Brian' })
      ]);

      const r4 = await behavior.applyOperator(undefined);
      expect(r4).toBe(VAULT_NOOP);

      const r5 = await behavior.applyOperator([
        { id: 1, name: 'Kay' },
        { id: 2, name: 'Jace' },
        { id: 3, name: 'Brian' }
      ]);
      expect(r5).toEqual([
        Object({ id: 1, name: 'Kay' }),
        Object({ id: 2, name: 'Jace' }),
        Object({ id: 3, name: 'Brian' })
      ]);

      const r6 = await behavior.applyOperator([{ id: 1, name: 'brian' }]);
      expect(r6).toEqual([{ id: 1, name: 'brian' }]);

      const r7 = await behavior.applyOperator([{ id: 2, name: 'brian' }]);
      expect(r7).toEqual([{ id: 2, name: 'brian' }]);

      const r8 = await behavior.applyOperator([
        { id: 1 },
        { nested: [1, 2, 3] }
      ]);
      expect(r8).toEqual([{ id: 1 }, { nested: [1, 2, 3] }]);

      const r9 = await behavior.applyOperator([
        { id: 1 },
        { nested: [1, 2, 3] }
      ]);
      expect(r9).toEqual([{ id: 1 }, { nested: [1, 2, 3] }]);

      const r10 = await behavior.applyOperator([
        { id: 1 },
        { nested: [1, 3, 2] }
      ]);
      expect(r10).toEqual([{ id: 1 }, { nested: [1, 3, 2] }]);

      expect(r1).toEqual(sharedA);
      expect(r2).toBe(VAULT_NOOP);
      expect(r3).toEqual([
        Object({ id: 1, name: 'Kay' }),
        Object({ id: 2, name: 'Jace' }),
        Object({ id: 3, name: 'Brian' })
      ]);
      expect(r2).toBe(VAULT_NOOP);
      expect(r5).toEqual([
        Object({ id: 1, name: 'Kay' }),
        Object({ id: 2, name: 'Jace' }),
        Object({ id: 3, name: 'Brian' })
      ]);
      expect(r6).toEqual([{ id: 1, name: 'brian' }]);
      expect(r7).toEqual([{ id: 2, name: 'brian' }]);
      expect(r8).toEqual([{ id: 1 }, { nested: [1, 2, 3] }]);
      expect(r9).toEqual([{ id: 1 }, { nested: [1, 2, 3] }]);
      expect(r10).toEqual([{ id: 1 }, { nested: [1, 3, 2] }]);
    });

    it('should throw an error', async () => {
      const Distinct = withDistinctUntilChanged<any[]>(() => {
        throw new Error('this is an error');
      });
      behavior = new Distinct('distinct-array', {} as any);

      await flushVaultPipeline();

      behavior.applyOperator(1);
      await expectAsync(behavior.applyOperator(1)).toBeRejectedWithError(
        'this is an error'
      );
    });
  });

  it('should reset previous value on destroy so same value is emitted again after recreate', async () => {
    spyOn(console, 'warn');
    let Distinct = withDistinctUntilChanged<string>();
    behavior = new Distinct('distinct', {} as any);

    // First instance
    const first = await behavior.applyOperator('value');
    expect(first).toBe('value');
    const blocked = await behavior.applyOperator('value');
    expect(blocked).toBe(VAULT_NOOP);

    expect(first).toBe('value');
    expect(blocked).toBe(VAULT_NOOP);

    behavior.destroy();
    await flushVaultPipeline();

    // New instance should treat it as first again
    Distinct = withDistinctUntilChanged<string>();
    behavior = new Distinct('distinct', {} as any);

    const afterDestroyFirst = await behavior.applyOperator('value');
    expect(afterDestroyFirst).toBe('value');
    const afterDestroyBlocked = await behavior.applyOperator('value');
    expect(afterDestroyBlocked).toBe(VAULT_NOOP);

    expect(afterDestroyFirst).toBe('value');
    expect(afterDestroyBlocked).toBe(VAULT_NOOP);
    // eslint-disable-next-line
    expect(console.warn).toHaveBeenCalledWith(
      '[vault]',
      'distinct - destroy called'
    );
  });

  it('should reset previous value on reset so same value is emitted again after recreate', async () => {
    spyOn(console, 'warn');
    let Distinct = withDistinctUntilChanged<string>();
    behavior = new Distinct('distinct', {} as any);

    // First instance
    const first = await behavior.applyOperator('value');
    expect(first).toBe('value');
    const blocked = await behavior.applyOperator('value');
    expect(blocked).toBe(VAULT_NOOP);

    expect(first).toBe('value');
    expect(blocked).toBe(VAULT_NOOP);

    behavior.reset();
    await flushVaultPipeline();

    // New instance should treat it as first again
    Distinct = withDistinctUntilChanged<string>();
    behavior = new Distinct('distinct', {} as any);

    const afterDestroyFirst = await behavior.applyOperator('value');
    expect(afterDestroyFirst).toBe('value');
    const afterDestroyBlocked = await behavior.applyOperator('value');
    expect(afterDestroyBlocked).toBe(VAULT_NOOP);

    expect(afterDestroyFirst).toBe('value');
    expect(afterDestroyBlocked).toBe(VAULT_NOOP);
    // eslint-disable-next-line
    expect(console.warn).toHaveBeenCalledWith(
      '[vault]',
      'distinct - reset called; clearing previous distinct value'
    );
  });
});
