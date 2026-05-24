import { VaultErrorKindTypes } from '../types/error/vault-error-kind.type';
import { VaultErrorNameTypes } from '../types/error/vault-error-name.type';
import { VaultError } from './vault-error';

describe('Error: Vault', () => {
  it('should create a VaultError with defaults', () => {
    const error = new VaultError('base error');

    expect(error).toBeTruthy();
    expect(error.message).toBe('base error');
    expect(error.name).toBe(VaultErrorNameTypes.VaultError);
    expect(error.kind).toBe(VaultErrorKindTypes.VaultError);
  });

  it('should allow custom name and kind', () => {
    const error = new VaultError(
      'custom error',
      VaultErrorNameTypes.Usage,
      VaultErrorKindTypes.Usage
    );

    expect(error.message).toBe('custom error');
    expect(error.name).toBe(VaultErrorNameTypes.Usage);
    expect(error.kind).toBe(VaultErrorKindTypes.Usage);
  });

  it('should be instance of Error and VaultError', () => {
    const error = new VaultError('instance check');

    expect(error instanceof Error).toBeTrue();
    expect(error instanceof VaultError).toBeTrue();
  });

  it('should preserve prototype chain (ES5-safe)', () => {
    const error = new VaultError('prototype check');

    expect(Object.getPrototypeOf(error)).toBe(VaultError.prototype);
  });

  it('should have a stack trace if supported', () => {
    const error = new VaultError('stack trace');

    // stack is optional across environments, but if present must be string
    if ((error as any).stack) {
      expect(typeof (error as any).stack).toBe('string');
      expect((error as any).stack.length).toBeGreaterThan(0);
    }
  });
});
