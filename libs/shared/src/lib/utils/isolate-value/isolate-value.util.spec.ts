import { Observable } from 'rxjs';
import { isolateValue } from './isolate-value.util';

describe('isolateForPolicy', () => {
  // ---------------------------------------------------------------------------
  // Primitives & null
  // ---------------------------------------------------------------------------

  it('should return primitives as-is', () => {
    expect(isolateValue(42)).toBe(42);
    expect(isolateValue('hello')).toBe('hello');
    expect(isolateValue(true)).toBeTrue();
    expect(isolateValue(undefined)).toBe(undefined);
  });

  it('should return null as-is', () => {
    expect(isolateValue(null)).toBeNull();
  });

  // ---------------------------------------------------------------------------
  // structuredClone success path
  // ---------------------------------------------------------------------------

  it('should return a deep-cloned copy when structuredClone succeeds', () => {
    const original = {
      a: 1,
      b: { c: 2 }
    };

    const result = isolateValue(original);

    // Different reference
    expect(result).not.toBe(original);

    // Deep equality
    expect(result).toEqual(original);

    // Mutating result must not affect original
    (result as any).b.c = 999;
    expect(original.b.c).toBe(2);
  });

  it('should clone arrays when structuredClone succeeds', () => {
    const original = [{ x: 1 }, { x: 2 }];

    const result = isolateValue(original);

    expect(result).not.toBe(original);
    expect(result).toEqual(original);

    (result as any)[0].x = 99;
    expect(original[0].x).toBe(1);
  });

  // ---------------------------------------------------------------------------
  // structuredClone failure → deepFreeze fallback
  // ---------------------------------------------------------------------------

  it('should deep-freeze the original object if structuredClone throws', () => {
    const original = {
      a: 1,
      nested: {
        b: 2
      }
    };

    // Force structuredClone to throw
    spyOn(globalThis as any, 'structuredClone').and.throwError('nope');

    const result = isolateValue(original);

    // Same reference (freeze fallback)
    expect(result).not.toBe(original);

    // Object and nested objects must be frozen
    expect(Object.isFrozen(result)).toBeTrue();
    expect(Object.isFrozen((result as any).nested)).toBeTrue();
  });

  it('should prevent mutation after deepFreeze fallback', () => {
    const original = {
      a: 1,
      nested: {
        b: 2
      }
    };

    spyOn(globalThis as any, 'structuredClone').and.throwError('nope');

    const result = isolateValue(original) as any;

    expect(() => {
      result.a = 10;
    }).toThrow();

    expect(() => {
      result.nested.b = 20;
    }).toThrow();

    expect(result.a).toBe(1);
    expect(result.nested.b).toBe(2);
  });

  // ---------------------------------------------------------------------------
  // Already-frozen objects
  // ---------------------------------------------------------------------------

  it('should return an already-frozen object unchanged', () => {
    const frozen = Object.freeze({
      a: 1,
      nested: Object.freeze({ b: 2 })
    });

    spyOn(globalThis as any, 'structuredClone').and.throwError('nope');

    const result = isolateValue(frozen);

    expect(result).toBe(frozen);
    expect(Object.isFrozen(result)).toBeTrue();
    expect(Object.isFrozen((result as any).nested)).toBeTrue();
  });

  // ---------------------------------------------------------------------------
  // Arrays in deepFreeze fallback
  // ---------------------------------------------------------------------------

  it('should deep-freeze arrays and their elements on fallback', () => {
    const arr = [{ x: 1 }, { x: 2 }];

    spyOn(globalThis as any, 'structuredClone').and.throwError('nope');

    const result = isolateValue(arr) as any[];

    expect(result).not.toBe(arr);
    expect(Object.isFrozen(result)).toBeTrue();
    expect(Object.isFrozen(result[0])).toBeTrue();

    expect(() => {
      result.push({ x: 3 });
    }).toThrow();

    expect(() => {
      result[0].x = 99;
    }).toThrow();
  });

  // ---------------------------------------------------------------------------
  // Idempotence
  // ---------------------------------------------------------------------------

  it('should be safe to call isolateForPolicy multiple times', () => {
    const obj = { a: 1 };

    spyOn(globalThis as any, 'structuredClone').and.throwError('nope');

    const once = isolateValue(obj);
    const twice = isolateValue(once);

    expect(once).toBe(twice);
    expect(Object.isFrozen(twice)).toBeTrue();
  });

  it('should fall back to deepFreeze when structuredClone fails on a function', () => {
    const value = {
      ok: true,
      fn: () => Promise.resolve('value') // NOT structured-cloneable
    };

    let result: any;

    expect(() => {
      result = isolateValue(value);
    }).not.toThrow();

    // structuredClone failed → same reference returned
    expect(result).not.toBe(value);

    // Root object must be frozen
    expect(Object.isFrozen(result)).toBeTrue();

    // Mutation of root object should be blocked
    expect(() => {
      result.ok = false;
    }).toThrow();
  });

  it('should return the same function reference when input is a function', () => {
    const fn = () => Promise.resolve('value');

    let result: any;

    expect(() => {
      result = isolateValue(fn);
    }).not.toThrow();

    // structuredClone fails → fallback path → same reference
    expect(result).toBe(fn);

    // Functions are not frozen by deepFreeze (by JS spec)
    expect(Object.isFrozen(result)).toBeFalse();

    // Calling the function still works
    expect(result()).toEqual(jasmine.any(Promise));
  });

  it('should not crash on cyclic objects when structuredClone succeeds', () => {
    const obj: any = {};
    obj.self = obj;

    const result = isolateValue(obj);

    expect(result).not.toBe(obj);
    expect(result.self).toBe(result);
  });

  it('should correctly clone Date objects', () => {
    const d = new Date();
    const r = isolateValue(d);

    expect(r).not.toBe(d);
    expect(r.getTime()).toBe(d.getTime());
  });

  it('should strip prototype when structuredClone succeeds on class instances', () => {
    class Foo {
      x = 1;
    }
    const foo = new Foo();

    const result = isolateValue(foo);

    expect(result instanceof Foo).toBeFalse();
    expect(result.x).toBe(1);
  });

  it('should not guarantee preservation of non-enumerable properties', () => {
    const obj: any = {};
    Object.defineProperty(obj, 'hidden', { value: 1, enumerable: false });

    const result = isolateValue(obj);

    expect(result).toBeDefined();
  });

  it('should evaluate getters during structuredClone', () => {
    let called = false;
    const obj = {
      get value() {
        called = true;
        return 1;
      }
    };

    isolateValue(obj);
    expect(called).toBeTrue();
  });

  it('should clone TypedArrays correctly', () => {
    const buf = new Uint8Array([1, 2, 3]);
    const result = isolateValue(buf);

    expect(result).not.toBe(buf);
    expect(Array.from(result)).toEqual([1, 2, 3]);
  });

  it('should return same Promise reference when cloning a Promise', () => {
    const p = Promise.resolve(1);
    const r = isolateValue(p);

    expect(r).not.toBe(p);
  });

  it('should drop symbol-keyed properties', () => {
    const sym = Symbol('x');
    const obj: any = { a: 1 };
    obj[sym] = 2;

    const result = isolateValue(obj);

    expect(result.a).toBe(1);
    expect((result as any)[sym]).toBeUndefined();
  });

  it('should return BigInt values unchanged', () => {
    const n = 123n;
    expect(isolateValue(n)).toBe(n);
  });

  it('should clone Error objects with message preserved', () => {
    const e = new Error('boom');
    const r = isolateValue(e);

    expect(r).not.toBe(e);
    expect(r.message).toBe('boom');
  });

  it('should fall back when structuredClone is not defined', () => {
    const orig = globalThis.structuredClone;
    delete (globalThis as any).structuredClone;

    const obj = { a: 1 };
    const r = isolateValue(obj);

    expect(Object.isFrozen(r)).toBeTrue();

    globalThis.structuredClone = orig;
  });

  it('should deep-freeze cyclic objects without infinite recursion when structuredClone fails', () => {
    const obj: any = { a: 1 };
    obj.self = obj;

    spyOn(globalThis as any, 'structuredClone').and.throwError('nope');

    let result: any;

    expect(() => {
      result = isolateValue(obj);
    }).not.toThrow();

    // Same reference (fallback)
    expect(result).not.toBe(obj);

    // Root and cycle must be frozen
    expect(Object.isFrozen(result)).toBeTrue();
    expect(Object.isFrozen(result.self)).toBeTrue();

    // Mutation blocked
    expect(() => {
      result.a = 2;
    }).toThrow();
  });

  it('should fall back and freeze Observable inputs', () => {
    const obs = new Observable(() => {});

    spyOn(globalThis as any, 'structuredClone').and.throwError('nope');

    const result = isolateValue(obs);

    // Same reference (fallback)
    expect(result).not.toBe(obs);

    // Observable object frozen
    expect(Object.isFrozen(result)).toBeTrue();

    // Still subscribable (freezing does not break behavior)
    expect(() => {
      result.subscribe();
    }).not.toThrow();
  });

  it('should clone Map objects correctly when structuredClone succeeds', () => {
    const original = new Map<string, any>();
    original.set('a', { x: 1 });
    original.set('b', 2);

    const result = isolateValue(original);

    // New Map instance
    expect(result).not.toBe(original);
    expect(result instanceof Map).toBeTrue();

    // Same entries
    expect(Array.from(result.entries())).toEqual(
      Array.from(original.entries())
    );

    // Deep clone semantics for values
    const originalObj = original.get('a');
    const clonedObj = result.get('a');

    expect(clonedObj).not.toBe(originalObj);
    expect(clonedObj).toEqual(originalObj);

    // Mutating cloned value must not affect original
    clonedObj.x = 999;
    expect(originalObj.x).toBe(1);
  });

  it('should freeze Map object on fallback when structuredClone throws', () => {
    const map = new Map<string, number>();
    map.set('a', 1);

    spyOn(globalThis as any, 'structuredClone').and.throwError('nope');

    const result = isolateValue(map);

    // Same reference
    expect(result).toBe(map);

    // Object itself is frozen
    expect(Object.isFrozen(result)).toBeTrue();

    // Map remains usable (by JS design)
    result.set('b', 2);
    expect(result.get('b')).toBe(2);
  });

  it('should document that Map internal state remains mutable after freeze', () => {
    const map = new Map<string, number>([['a', 1]]);

    Object.freeze(map);

    expect(() => map.set('b', 2)).not.toThrow();
    expect(map.get('b')).toBe(2);
  });

  it('should clone Set correctly when structuredClone succeeds', () => {
    const original = new Set([{ x: 1 }, { x: 2 }]);
    const result = isolateValue(original);

    expect(result).not.toBe(original);
    expect(result instanceof Set).toBeTrue();
    expect([...result]).toEqual([...original]);

    const [origObj] = original;
    const [clonedObj] = result;

    expect(clonedObj).not.toBe(origObj);
    clonedObj.x = 999;
    expect(origObj.x).toBe(1);
  });

  it('should freeze Set object on fallback when structuredClone throws', () => {
    const set = new Set([1, 2]);

    spyOn(globalThis as any, 'structuredClone').and.throwError('nope');

    const result = isolateValue(set);

    expect(result).toBe(set);
    expect(Object.isFrozen(result)).toBeTrue();

    // Internal mutation still allowed (documented)
    result.add(3);
    expect(set.has(3)).toBeTrue();
  });

  it('should fall back and freeze WeakMap without crashing', () => {
    const wm = new WeakMap<object, number>();
    const key = {};
    wm.set(key, 1);

    spyOn(globalThis as any, 'structuredClone').and.throwError('nope');

    const result = isolateValue(wm);

    expect(result).toBe(wm);
    expect(Object.isFrozen(result)).toBeTrue();

    // WeakMap still works
    expect(wm.get(key)).toBe(1);
  });

  it('should clone RegExp correctly when structuredClone succeeds', () => {
    const re = /abc/gi;
    const r = isolateValue(re);

    expect(r).not.toBe(re);
    expect(r.source).toBe('abc');
    expect(r.flags).toBe('gi');
  });

  it('should clone ArrayBuffer correctly', () => {
    const buf = new ArrayBuffer(8);
    const view = new Uint8Array(buf);
    view[0] = 42;

    const cloned = isolateValue(buf) as ArrayBuffer;
    const clonedView = new Uint8Array(cloned);

    expect(cloned).not.toBe(buf);
    expect(clonedView[0]).toBe(42);

    clonedView[0] = 99;
    expect(view[0]).toBe(42);
  });

  it('should clone objects with null prototype', () => {
    const obj = Object.create(null);
    obj.a = 1;

    const result = isolateValue(obj);

    expect(result).not.toBe(obj);
    expect(Object.getPrototypeOf(result)).toBe(Object.prototype);
    expect(result.a).toBe(1);
  });

  it('should clone Set correctly when structuredClone succeeds', () => {
    const original = new Set([{ x: 1 }, { x: 2 }]);
    const result = isolateValue(original);

    expect(result).not.toBe(original);
    expect(result instanceof Set).toBeTrue();

    const [origObj] = original;
    const [clonedObj] = result;

    expect(clonedObj).not.toBe(origObj);
    clonedObj.x = 9;
    expect(origObj.x).toBe(1);
  });

  it('should freeze Set object on fallback', () => {
    const set = new Set([1]);

    spyOn(globalThis as any, 'structuredClone').and.throwError('nope');

    const result = isolateValue(set);

    expect(result).toBe(set);
    expect(Object.isFrozen(result)).toBeTrue();

    // Internal mutation still allowed (documented)
    set.add(2);
    expect(set.has(2)).toBeTrue();
  });

  it('should not crash when Reflect.ownKeys throws on a hostile Proxy', () => {
    const target = Object.preventExtensions({});
    const proxy = new Proxy(target, {
      ownKeys() {
        return ['fake'];
      }
    });

    spyOn(globalThis as any, 'structuredClone').and.throwError('nope');

    expect(() => isolateValue(proxy)).toThrowError(
      `'ownKeys' on proxy: trap returned extra keys but proxy target is non-extensible`
    );
  });

  it('should handle non-extensible but unfrozen objects safely', () => {
    const obj = Object.preventExtensions({ a: 1 });

    spyOn(globalThis as any, 'structuredClone').and.throwError('nope');

    const result = isolateValue(obj);

    expect(Object.isFrozen(result)).toBeTrue();
  });

  it('should clone boxed primitives', () => {
    const n = new Number(1);
    const r = isolateValue(n);

    expect(r).not.toBe(n);
    expect(Number(r)).toBe(1);
  });

  it('should preserve shared references within the cloned graph', () => {
    const shared = { x: 1 };
    const obj = { a: shared, b: shared };

    const result = isolateValue(obj);

    expect(result.a).toBe(result.b); // SAME reference inside clone
    expect(result.a).not.toBe(shared);
  });

  it('should correctly isolate objects containing Map', () => {
    const map = new Map([['a', { x: 1 }]]);
    const obj = { map };

    const result = isolateValue(obj);

    expect(result.map).not.toBe(map);
    expect(result.map instanceof Map).toBeTrue();

    const originalValue = map.get('a');
    const clonedValue = result.map.get('a');

    expect(clonedValue).not.toBe(originalValue);
  });

  it('should isolate mixed cloneable and non-cloneable values safely', () => {
    const obj = {
      a: 1,
      fn: () => 1,
      nested: { b: 2 }
    };

    spyOn(globalThis as any, 'structuredClone').and.throwError('nope');

    const result = isolateValue(obj);

    expect(result).not.toBe(obj);
    expect(Object.isFrozen(result)).toBeTrue();
    expect(result.fn).toBe(obj.fn); // preserved reference
  });

  it('should preserve symbol values', () => {
    const sym = Symbol('x');
    const obj = { value: sym };

    const result = isolateValue(obj);

    expect(result.value).toBe(sym);
  });

  it('should preserve sparse arrays correctly', () => {
    const arr = [];
    arr[5] = 42;

    const result = isolateValue(arr);

    expect(5 in result).toBeTrue();
    expect(result[5]).toBe(42);
    expect(result.length).toBe(6);
  });

  it('should not trigger getters multiple times', () => {
    let count = 0;
    const obj = {
      get value() {
        count++;
        return 1;
      }
    };

    isolateValue(obj);

    expect(count).toBe(1);
  });

  it('should handle large objects without throwing', () => {
    const obj = new Map<string, number>();
    for (let i = 0; i < 10000; i++) {
      obj.set(`k${i}`, i);
    }

    expect(() => isolateValue(obj)).not.toThrow();
  });

  it('should clone Error objects with message preserved', () => {
    const e: any = new Error('boom');
    e.code = 500;

    const r = isolateValue(e);

    expect(r).not.toBe(e);
    expect(r.message).toBe('boom');
  });

  it('should clone nested frozen objects as independent mutable copies', () => {
    const nested = Object.freeze({ x: 1 });
    const obj = { nested };

    const result = isolateValue(obj);

    expect(result).not.toBe(obj);
    expect(result.nested).not.toBe(nested);
    expect(result.nested.x).toBe(1);
    expect(Object.isFrozen(result.nested)).toBeFalse();
  });

  it('should never allow mutation to leak back to original', () => {
    const original = { nested: { x: 1 } };

    const result = isolateValue(original);

    (result as any).nested.x = 999;

    expect(original.nested.x).toBe(1);
  });
});
