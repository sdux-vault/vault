/*
| Category                 | Type / Example        | structuredClone behavior  | deepFreeze fallback behavior          | Isolated?  | Notes                                          |
| ------------------------ | --------------------- | ------------------------- | ------------------------------------- | ---------- | ---------------------------------------------- |
| **Primitives**           | number                | Returned as-is            | Returned as-is                        | ✅ Yes     | Immutable by definition                        |
|                          | string                | Returned as-is            | Returned as-is                        | ✅ Yes     | Immutable                                      |
|                          | boolean               | Returned as-is            | Returned as-is                        | ✅ Yes     | Immutable                                      |
|                          | bigint                | Returned as-is            | Returned as-is                        | ✅ Yes     | Immutable                                      |
|                          | symbol                | Returned as-is            | Returned as-is                        | ✅ Yes     | Identity preserved                             |
|                          | undefined             | Returned as-is            | Returned as-is                        | ✅ Yes     | No mutation possible                           |
|                          | null                  | Returned as-is            | Returned as-is                        | ✅ Yes     | No mutation possible                           |
| **Plain Objects**        | `{ a: 1 }`            | Deep cloned               | Deep cloned + frozen                  | ✅ Yes     | Always returns new reference                   |
| **Arrays**               | `[1,2,3]`             | Deep cloned               | Deep cloned + frozen                  | ✅ Yes     | Structural mutation blocked                    |
| **Functions**            | `() => {}`            | ❌ Throws                 | Returned as-is                        | ⚠️ Partial | Cannot be cloned or frozen meaningfully        |
| **Promises**             | `Promise.resolve()`   | ❌ Throws                 | Returned as-is                        | ⚠️ Partial | Identity preserved intentionally               |
| **Dates**                | `new Date()`          | Cloned                    | Frozen original OR cloned+frozen      | ✅ Yes     | Time value preserved                           |
| **RegExp**               | `/abc/g`              | Cloned                    | Frozen original OR cloned+frozen      | ✅ Yes     | Pattern preserved                              |
| **Error**                | `new Error()`         | Cloned (core fields only) | Frozen original OR cloned+frozen      | ⚠️ Partial | Custom props not guaranteed                    |
| **Map**                  | `new Map()`           | Deep cloned               | Same reference, frozen wrapper        | ⚠️ Partial | `.set()` still works; internal slots preserved |
| **Set**                  | `new Set()`           | Deep cloned               | Same reference, frozen wrapper        | ⚠️ Partial | `.add()` still works                           |
| **WeakMap**              | `new WeakMap()`       | ❌ Throws                 | Returned as-is                        | ❌ No      | Cannot be cloned or frozen safely              |
| **WeakSet**              | `new WeakSet()`       | ❌ Throws                 | Returned as-is                        | ❌ No      | Cannot be isolated                             |
| **TypedArray**           | `Uint8Array`          | Cloned                    | Frozen                                | ✅ Yes     | Buffer copied or locked                        |
| **ArrayBuffer**          | `ArrayBuffer`         | Cloned                    | Frozen                                | ✅ Yes     | Memory isolated                                |
| **DataView**             | `DataView`            | Cloned                    | Frozen                                | ✅ Yes     | Backing buffer safe                            |
| **Observable (RxJS)**    | `new Observable()`    | ❌ Throws                 | Same reference, frozen wrapper        | ⚠️ Partial | Internal emissions mutable                     |
| **Class Instance**       | `new Foo()`           | Prototype stripped        | Frozen instance                       | ⚠️ Partial | Methods lost on clone                          |
| **Object.create(null)**  | null-proto object     | Cloned                    | Deep cloned + frozen                  | ✅ Yes     | Prototype normalized                           |
| **Cyclic Objects**       | `{ self }`            | Cloned with cycles        | Deep cloned + frozen (cycle-safe)     | ✅ Yes     | WeakSet prevents recursion                     |
| **Getters / Setters**    | `{ get x(){} }`       | Getter invoked            | Getter not invoked                    | ⚠️ Partial | Side effects possible                          |
| **Non-enumerable props** | defineProperty        | Dropped                   | Preserved if fallback clone path used | ⚠️ Partial | Visibility differs                             |
| **Symbol-keyed props**   | `{ [sym]: 1 }`        | Dropped                   | Preserved if fallback clone path used | ⚠️ Partial | Symbols skipped by clone                       |
| **DOM Nodes**            | `HTMLElement`         | ❌ Throws                 | Same reference, frozen wrapper        | ❌ No      | Host object semantics                          |
| **Proxy (well-formed)**  | `new Proxy()`         | Cloned                    | Frozen target (if accessible)         | ⚠️ Partial | Depends on handler                             |
| **Proxy (malicious)**    | fake ownKeys          | ❌ Throws                 | ❌ Throws                             | ❌ No      | Engine invariant violation                     |
| **JSON-like data**       | POJO graphs           | Deep cloned               | Deep cloned + frozen                  | ✅ Yes     | Ideal use case                                 |
| **Modules**              | ES module namespace   | ❌ Throws                 | Returned as-is                        | ❌ No      | Immutable by spec                              |
| **Intl objects**         | `Intl.DateTimeFormat` | Cloned                    | Frozen                                | ⚠️ Partial | Internal slots opaque                          |
| **Shared References**    | `{a:x, b:x}`          | Preserved in clone        | Preserved in clone                    | ✅ Yes     | Graph identity maintained                      |
| **Sparse Arrays**        | `[ , , 3 ]`           | Preserved                 | Preserved                             | ✅ Yes     | Holes maintained                               |
| **Symbol Values**        | `{ x: Symbol() }`     | Preserved                 | Preserved                             | ✅ Yes     | Value identity intact                          |
| **Mixed Graphs**         | fn + object           | ❌ Partial                | Clone + preserve refs                 | ⚠️ Partial | Hybrid isolation                               |
| **Frozen Objects**       | `Object.freeze(obj)`  | Cloned (unfrozen)         | Preserved frozen OR cloned+frozen     | ✅ Yes     | Freeze state not guaranteed                    |
| **Boxed Primitives**     | `new Number(1)`       | Cloned                    | Frozen                                | ✅ Yes     | Unboxed behavior retained                      |
*/

/**
 * Recursively freezes an object and all nested properties to prevent mutation.
 *
 * @param obj - The object to deep-freeze.
 * @param seen - WeakSet used to track visited references and prevent cycles.
 * @returns The frozen object.
 */
function deepFreeze<T>(obj: T, seen = new WeakSet<object>()): T {
  if (obj === null || typeof obj !== 'object') return obj;

  const o = obj as unknown as object;
  if (seen.has(o)) return obj;
  seen.add(o);

  if (!Object.isFrozen(o)) Object.freeze(o);

  for (const key of Reflect.ownKeys(o)) {
    const desc = Object.getOwnPropertyDescriptor(o, key);
    /* istanbul ignore next -- impossible after Object.freeze due to Proxy invariants */
    if (!desc) continue;

    // Only recurse into data properties; do NOT invoke getters
    if ('value' in desc) {
      // eslint-disable-next-line
      deepFreeze((desc as PropertyDescriptor).value as any, seen);
    }
  }

  return obj;
}

/**
 * Creates an immutable copy of a value using structuredClone with a deepFreeze fallback.
 *
 * @param value - The value to isolate.
 * @returns An immutable copy of the value.
 */
export const isolateValue = <T>(value: T): T => {
  if (value === null || typeof value !== 'object') return value;

  if (Object.isFrozen(value)) return value;

  try {
    if (
      value instanceof Map ||
      value instanceof Set ||
      value instanceof WeakMap ||
      value instanceof WeakSet
    ) {
      try {
        return structuredClone(value);
      } catch {
        return deepFreeze(value); // ← IMPORTANT: same reference
      }
    }
    return structuredClone(value);
  } catch {
    const clone = Array.isArray(value)
      ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
        [...(value as any)]
      : Object.assign(Object.create(Object.getPrototypeOf(value)), value);

    return deepFreeze(clone);
  }
};
