import { isPromise } from './is-promise.util';

describe('util: isPromise', () => {
  it('should return true for a native Promise', () => {
    const value = Promise.resolve(123);
    expect(isPromise(value)).toBeTrue();
  });

  it('should return true for an async function return value', async () => {
    async function fn() {
      return 42;
    }

    const value = fn();
    expect(isPromise(value)).toBeTrue();
    await value; // avoid unhandled promise warning
  });

  it('should return true for a thenable object', () => {
    const thenable = {
      then: () => {}
    };

    expect(isPromise(thenable)).toBeTrue();
  });

  it('should return true for a function with a then method', () => {
    const fn: any = () => {};
    fn.then = () => {};

    expect(isPromise(fn)).toBeTrue();
  });

  it('should return false for an object without a then method', () => {
    const value = { foo: 'bar' };
    expect(isPromise(value)).toBeFalse();
  });

  it('should return false for a function without a then method', () => {
    const fn = () => {};
    expect(isPromise(fn)).toBeFalse();
  });

  it('should return false for null', () => {
    expect(isPromise(null)).toBeFalse();
  });

  it('should return false for undefined', () => {
    expect(isPromise(undefined)).toBeFalse();
  });

  it('should return false for primitive values', () => {
    expect(isPromise(0)).toBeFalse();
    expect(isPromise(1)).toBeFalse();
    expect(isPromise('string')).toBeFalse();
    expect(isPromise(true)).toBeFalse();
    expect(isPromise(Symbol('x'))).toBeFalse();
  });

  it('should return false for objects with non-function then property', () => {
    const value = { then: 123 };
    expect(isPromise(value)).toBeFalse();
  });
});
