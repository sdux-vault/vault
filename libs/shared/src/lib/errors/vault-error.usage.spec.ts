import { VaultErrorNameTypes } from '../types/error/vault-error-name.type';
import { VaultErrorUsageKindTypes } from '../types/error/vault-error-usage-kind.type';
import { VaultError } from './vault-error';
import { VaultUsageError } from './vault-error.usage';

describe('Error: VaultUsage', () => {
  it('should create a usage error with default usage kind', () => {
    const error = new VaultUsageError('usage error');

    expect(error.message).toBe('usage error');
    expect(error.name).toBe(VaultErrorNameTypes.Usage);
    expect(error.kind).toBe(VaultErrorUsageKindTypes.Usage);
  });

  it('should allow a custom usage kind', () => {
    const error = new VaultUsageError(
      'custom usage',
      VaultErrorUsageKindTypes.Promise
    );

    expect(error.kind).toBe(VaultErrorUsageKindTypes.Promise);
  });

  it('should be instance of VaultError and VaultUsageError', () => {
    const error = new VaultUsageError('instance chain');

    expect(error instanceof Error).toBeTrue();
    expect(error instanceof VaultError).toBeTrue();
    expect(error instanceof VaultUsageError).toBeTrue();
  });

  it('should preserve prototype chain', () => {
    const error = new VaultUsageError('prototype chain');

    expect(Object.getPrototypeOf(error)).toBe(VaultUsageError.prototype);
    expect(Object.getPrototypeOf(VaultUsageError.prototype)).toBe(
      VaultError.prototype
    );
  });
});
