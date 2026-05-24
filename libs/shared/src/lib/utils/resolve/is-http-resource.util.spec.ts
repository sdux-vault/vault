import { isHttpResourceRef } from './is-http-resource.util';

describe('util: isHttpResourceRef', () => {
  // ------------------------------------------------------------------------------------------
  // POSITIVE CASES
  // ------------------------------------------------------------------------------------------

  it('should return true for an object matching the HttpResourceRef shape', () => {
    const ref = {
      value: { id: 1 },
      isLoading: false,
      error: null,
      hasValue: true
    };

    expect(isHttpResourceRef(ref)).toBeTrue();
  });

  it('should return true even if the internal values are undefined', () => {
    const ref = {
      value: undefined,
      isLoading: undefined,
      error: undefined,
      hasValue: undefined
    };

    expect(isHttpResourceRef(ref)).toBeTrue();
  });

  it('should return true regardless of property value types', () => {
    const ref = {
      value: 123,
      isLoading: 'yes',
      error: 'oops',
      hasValue: {}
    };

    expect(isHttpResourceRef(ref)).toBeTrue();
  });

  // ------------------------------------------------------------------------------------------
  // NEGATIVE CASES — NULLISH
  // ------------------------------------------------------------------------------------------

  it('should return false for null', () => {
    expect(isHttpResourceRef(null)).toBeFalse();
  });

  it('should return false for undefined', () => {
    expect(isHttpResourceRef(undefined)).toBeFalse();
  });

  // ------------------------------------------------------------------------------------------
  // NEGATIVE CASES — NON-OBJECTS
  // ------------------------------------------------------------------------------------------

  it('should return false for a string', () => {
    expect(isHttpResourceRef('resource')).toBeFalse();
  });

  it('should return false for a number', () => {
    expect(isHttpResourceRef(42)).toBeFalse();
  });

  it('should return false for a boolean', () => {
    expect(isHttpResourceRef(true)).toBeFalse();
  });

  it('should return false for a function', () => {
    expect(isHttpResourceRef(() => {})).toBeFalse();
  });

  // ------------------------------------------------------------------------------------------
  // NEGATIVE CASES — OBJECTS WITH MISSING KEYS
  // ------------------------------------------------------------------------------------------

  it('should return false when "value" is missing', () => {
    const ref = {
      isLoading: false,
      error: null,
      hasValue: true
    };

    expect(isHttpResourceRef(ref)).toBeFalse();
  });

  it('should return false when "isLoading" is missing', () => {
    const ref = {
      value: {},
      error: null,
      hasValue: true
    };

    expect(isHttpResourceRef(ref)).toBeFalse();
  });

  it('should return false when "error" is missing', () => {
    const ref = {
      value: {},
      isLoading: false,
      hasValue: true
    };

    expect(isHttpResourceRef(ref)).toBeFalse();
  });

  it('should return false when "hasValue" is missing', () => {
    const ref = {
      value: {},
      isLoading: false,
      error: null
    };

    expect(isHttpResourceRef(ref)).toBeFalse();
  });

  // ------------------------------------------------------------------------------------------
  // EDGE CASES
  // ------------------------------------------------------------------------------------------

  it('should return false for an empty object', () => {
    expect(isHttpResourceRef({})).toBeFalse();
  });

  it('should return false for an array', () => {
    expect(isHttpResourceRef([])).toBeFalse();
  });

  it('should return false for an object with similar but incorrect keys', () => {
    const ref = {
      val: {},
      loading: false,
      err: null,
      has: true
    };

    expect(isHttpResourceRef(ref)).toBeFalse();
  });
});
