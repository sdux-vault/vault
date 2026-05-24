import { safeStringify } from './safe-stringify.util';

describe('safeStringify', () => {
  it('should stringify normal objects', () => {
    const obj = { a: 1, b: 'text' };
    const json = safeStringify(obj);

    expect(json).toContain('"a": 1');
    expect(json).toContain('"b": "text"');
  });

  it('should pretty-print with 2 spaces', () => {
    const obj = { x: 1 };
    const json = safeStringify(obj);

    // Expect newline + two spaces before property
    expect(json).toContain('\n  "x": 1');
  });

  it('should return "[Function]" for functions', () => {
    const fn = () => {};
    const wrapped = { fn };

    const json = safeStringify(wrapped);

    expect(json).toContain('"fn": "[Function]"');
  });

  it('should serialize Error to message + stack', () => {
    const err = new Error('Boom!');
    const json = safeStringify({ err });

    expect(json).toContain('"message": "Boom!"');
    expect(json).toContain('"stack"');
  });

  it('should convert Map to array entries', () => {
    const map = new Map([
      ['a', 1],
      ['b', 2]
    ]);

    const json = safeStringify({ map });

    // Should output as: { "map": [["a", 1], ["b", 2]] }
    expect(json).toContain(`"map": [\n      [\n        "a",\n        1`);
    expect(json).toContain(`"b"`);
  });

  it('should convert Set to array values', () => {
    const set = new Set([1, 2, 3]);

    const json = safeStringify({ set });

    expect(json).toContain(`"set": [\n      1,\n      2,\n      3`);
  });

  it('should safely handle circular references', () => {
    const obj: any = { name: 'test' };
    obj.self = obj;

    const json = safeStringify(obj);

    expect(json).toContain('[Circular]');
  });

  it('should handle arrays normally', () => {
    const json = safeStringify([1, 2, 3]);
    expect(json).toContain('[\n  1,\n  2,\n  3\n]');
  });

  it('should handle primitives', () => {
    expect(safeStringify(5)).toBe('5');
    expect(safeStringify('test')).toBe('"test"');
    expect(safeStringify(true)).toBe('true');
    expect(safeStringify(null)).toBe('null');
  });

  it('should return "[unserializable]" if JSON.stringify throws', () => {
    const bad = {
      toJSON() {
        throw new Error('bad');
      }
    };

    const json = safeStringify(bad);
    expect(json).toBe('[unserializable]');
  });

  it('should ensure non-serializable values inside objects become "[Circular]"', () => {
    const obj: any = { a: {} };
    obj.a.ref = obj; // circular nested

    const json = safeStringify(obj);

    expect(json).toContain('[Circular]');
  });
});
