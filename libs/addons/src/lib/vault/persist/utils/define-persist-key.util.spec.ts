import { definePersistKey } from './define-persist-key.util';

describe('Util: definePersistKey', () => {
  // ──────────────────────────────────────────
  // VALID CASES
  // ──────────────────────────────────────────

  it('should generate a properly formatted persistence key', () => {
    const result = definePersistKey('session', 'user', 'behavior-key');
    expect(result).toBe('vault::session::user::behavior-key');
  });

  it('should lowercase and trim the persistType', () => {
    const result = definePersistKey('  Local  ', 'cart', 'behavior-key');
    expect(result).toBe('vault::local::cart::behavior-key');
  });

  it('should trim the featureCellKey but preserve casing', () => {
    const result = definePersistKey('session', '  UserData  ', 'behavior-key');
    expect(result).toBe('vault::session::UserData::behavior-key');
  });

  it('should trim the behaviorKey but preserve casing', () => {
    const result = definePersistKey(
      'session',
      '  UserData  ',
      ' behavior-key '
    );
    expect(result).toBe('vault::session::UserData::behavior-key');
  });

  // ──────────────────────────────────────────
  // ERROR CASES
  // ──────────────────────────────────────────

  it('should throw an error if featureCellKey is missing', () => {
    expect(() => definePersistKey('session', '', 'behavior-key')).toThrowError(
      '[vault] Invalid featureCellKey for persistence: ""'
    );
  });

  it('should throw an error if featureCellKey is undefined', () => {
    expect(() =>
      definePersistKey('session', undefined as any, 'behavior-key')
    ).toThrowError(
      '[vault] Invalid featureCellKey for persistence: "undefined"'
    );
  });

  it('should throw an error if persistType is missing', () => {
    expect(() => definePersistKey('', 'user', 'behavior-key')).toThrowError(
      '[vault] Invalid persistType for persistence: ""'
    );
  });

  it('should throw an error if persistType is undefined', () => {
    expect(() =>
      definePersistKey(undefined as any, 'user', 'behavior-key')
    ).toThrowError('[vault] Invalid persistType for persistence: "undefined"');
  });

  it('should throw an error if behaviorKey is missing', () => {
    expect(() => definePersistKey('defined', 'user', '')).toThrowError(
      '[vault] Invalid behaviorKey for persistence: ""'
    );
  });

  it('should throw an error if behaviorKey is undefined', () => {
    expect(() =>
      definePersistKey('defined', 'user', undefined as any)
    ).toThrowError('[vault] Invalid behaviorKey for persistence: "undefined"');
  });

  // ──────────────────────────────────────────
  // EDGE CASES
  // ──────────────────────────────────────────

  it('should throw an error if persistType is not a string', () => {
    expect(() =>
      definePersistKey(123 as any, 'user', 'behavior-key')
    ).toThrowError('[vault] Invalid persistType for persistence: "123"');
  });

  it('should throw an error if featureCellKey is not a string', () => {
    expect(() =>
      definePersistKey('session', 42 as any, 'behavior-key')
    ).toThrowError('[vault] Invalid featureCellKey for persistence: "42"');
  });

  it('should throw an error if behavior is not a string', () => {
    expect(() =>
      definePersistKey('session', 'defined', 42 as any)
    ).toThrowError('[vault] Invalid behaviorKey for persistence: "42"');
  });

  it('should handle featureCellKey containing spaces and keep it intact', () => {
    const result = definePersistKey('session', ' user data ', 'behavior-key');
    expect(result).toBe('vault::session::user data::behavior-key');
  });
});
