import {
  defineBehaviorKey,
  validateBehaviorKey
} from './define-behavior-key.util';

describe('Util: defineBehaviorKey', () => {
  it('should generate a valid key in the canonical format', () => {
    const key = defineBehaviorKey('Core', 'State');
    expect(key).toBe('SDUX::Behavior::Core::State');
  });

  it('should work with other domains and names', () => {
    const key = defineBehaviorKey('Persist', 'LocalStorage');
    expect(key).toBe('SDUX::Behavior::Persist::LocalStorage');
  });

  it('should be deterministic for the same input', () => {
    const keyA = defineBehaviorKey('DevTools', 'Telemetry');
    const keyB = defineBehaviorKey('DevTools', 'Telemetry');
    expect(keyA).toBe(keyB);
  });
});

describe('validateBehaviorKey', () => {
  it('should accept valid NgVault keys', () => {
    const validKeys = [
      'SDUX::Behavior::Core::Value',
      'SDUX::Behavior::Persistence::LocalStorage',
      'SDUX::Behavior::DevTools::Telemetry',
      'SDUX::Behavior::Encryption::AES256',
      'SDUX::Behavior::Test::MockBehavior'
    ];

    validKeys.forEach((key) => {
      expect(validateBehaviorKey(key))
        .withContext(`Key ${key} should be valid`)
        .toBeTrue();
    });
  });

  it('should reject keys missing the NgVault prefix', () => {
    expect(validateBehaviorKey('Vault::Core::Resolve')).toBeFalse();
  });

  it('should reject keys missing domain or behavior', () => {
    expect(validateBehaviorKey('SDUX::Core')).toBeFalse();
    expect(validateBehaviorKey('SDUX::::Set')).toBeFalse();
  });

  it('should reject lowercase or malformed domain/behavior segments', () => {
    expect(validateBehaviorKey('SDUX::Core::State')).toBeFalse();
    expect(validateBehaviorKey('SDUX::Core::State')).toBeFalse();
    expect(validateBehaviorKey('SDUX::Core::State')).toBeFalse();
  });

  it('should reject non-string input', () => {
    expect(validateBehaviorKey(null as any)).toBeFalse();
    expect(validateBehaviorKey(undefined as any)).toBeFalse();
    expect(validateBehaviorKey(42 as any)).toBeFalse();
  });
});
