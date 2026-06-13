import {
  defineControllerKey,
  validateControllerKey
} from './define-controller-key.util';

describe('Util: defineControllerKey', () => {
  it('should generate a valid key in the canonical format', () => {
    const key = defineControllerKey('Core', 'State');
    expect(key).toBe('SDUX::Controller::Core::State');
  });

  it('should work with other domains and names', () => {
    const key = defineControllerKey('Persist', 'LocalStorage');
    expect(key).toBe('SDUX::Controller::Persist::LocalStorage');
  });

  it('should be deterministic for the same input', () => {
    const keyA = defineControllerKey('DevTools', 'Telemetry');
    const keyB = defineControllerKey('DevTools', 'Telemetry');
    expect(keyA).toBe(keyB);
  });
});

describe('validateControllerKey', () => {
  it('should accept valid Vault keys', () => {
    const validKeys = [
      'SDUX::Controller::Core::Value',
      'SDUX::Controller::Persistence::LocalStorage',
      'SDUX::Controller::DevTools::Telemetry',
      'SDUX::Controller::Encryption::AES256',
      'SDUX::Controller::Test::MockController'
    ];

    validKeys.forEach((key) => {
      expect(validateControllerKey(key))
        .withContext(`Key ${key} should be valid`)
        .toBeTrue();
    });
  });

  it('should reject keys missing the Vault prefix', () => {
    expect(validateControllerKey('Vault::Core::Resolve')).toBeFalse();
  });

  it('should reject keys missing domain or controller', () => {
    expect(validateControllerKey('SDUX::Core')).toBeFalse();
    expect(validateControllerKey('SDUX::::Set')).toBeFalse();
  });

  it('should reject lowercase or malformed domain/controller segments', () => {
    expect(validateControllerKey('SDUX::Core::State')).toBeFalse();
    expect(validateControllerKey('SDUX::Core::State')).toBeFalse();
    expect(validateControllerKey('SDUX::Core::State')).toBeFalse();
  });

  it('should reject non-string input', () => {
    expect(validateControllerKey(null as any)).toBeFalse();
    expect(validateControllerKey(undefined as any)).toBeFalse();
    expect(validateControllerKey(42 as any)).toBeFalse();
  });
});
