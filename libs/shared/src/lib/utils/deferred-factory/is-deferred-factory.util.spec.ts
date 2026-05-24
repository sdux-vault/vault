import { isDeferredFactory } from './is-deferred-factory.util';

describe('util: isDeferredFactory', () => {
  it('should return true for an object with a value function', () => {
    const factory = {
      value: () => 123
    };

    expect(isDeferredFactory(factory)).toBeTrue();
  });

  it('should return true when value function returns a Promise', () => {
    const factory = {
      value: () => Promise.resolve(42)
    };

    expect(isDeferredFactory(factory)).toBeTrue();
  });

  it('should return true when value function returns undefined', () => {
    const factory = {
      value: () => undefined
    };

    expect(isDeferredFactory(factory)).toBeTrue();
  });

  it('should return true when additional fields are present', () => {
    const factory = {
      loading: true,
      error: null,
      value: () => 'data'
    };

    expect(isDeferredFactory(factory)).toBeTrue();
  });

  it('should return false for a native Promise', () => {
    const value = Promise.resolve(123);
    expect(isDeferredFactory(value)).toBeFalse();
  });

  it('should return false for an async function', () => {
    async function fn() {
      return 42;
    }

    expect(isDeferredFactory(fn)).toBeFalse();
  });

  it('should return false for a plain function', () => {
    const fn = () => 1;
    expect(isDeferredFactory(fn)).toBeFalse();
  });

  it('should return false for a thenable object', () => {
    const thenable = {
      then: () => {}
    };

    expect(isDeferredFactory(thenable)).toBeFalse();
  });

  it('should return false for an object with value not a function', () => {
    const value = {
      value: 123
    };

    expect(isDeferredFactory(value)).toBeFalse();
  });

  it('should return false for an empty object', () => {
    expect(isDeferredFactory({})).toBeFalse();
  });

  it('should return false for null', () => {
    expect(isDeferredFactory(null)).toBeFalse();
  });

  it('should return false for undefined', () => {
    expect(isDeferredFactory(undefined)).toBeFalse();
  });

  it('should return false for primitive values', () => {
    expect(isDeferredFactory(0)).toBeFalse();
    expect(isDeferredFactory(1)).toBeFalse();
    expect(isDeferredFactory('string')).toBeFalse();
    expect(isDeferredFactory(true)).toBeFalse();
    expect(isDeferredFactory(Symbol('x'))).toBeFalse();
  });
});
