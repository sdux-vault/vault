import { VaultErrorNameTypes } from '../types/error/vault-error-name.type';
import { VaultErrorUsageKindTypes } from '../types/error/vault-error-usage-kind.type';

import { VaultError } from './vault-error';
import { VaultLicenseError } from './vault-error.license';

describe('Error: VaultLicense', () => {
  it('should create a license error with default license kind', () => {
    const error = new VaultLicenseError('license error');

    expect(error.message).toBe('license error');
    expect(error.name).toBe(VaultErrorNameTypes.License);
    expect(error.kind).toBe(VaultErrorUsageKindTypes.License);
  });

  it('should allow a custom license kind', () => {
    const error = new VaultLicenseError(
      'custom license',
      VaultErrorUsageKindTypes.Promise
    );

    expect(error.kind).toBe(VaultErrorUsageKindTypes.Promise);
  });

  it('should be instance of VaultError and VaultLicenseError', () => {
    const error = new VaultLicenseError('instance chain');

    expect(error instanceof Error).toBeTrue();
    expect(error instanceof VaultError).toBeTrue();
    expect(error instanceof VaultLicenseError).toBeTrue();
  });

  it('should preserve prototype chain', () => {
    const error = new VaultLicenseError('prototype chain');

    expect(Object.getPrototypeOf(error)).toBe(VaultLicenseError.prototype);
    expect(Object.getPrototypeOf(VaultLicenseError.prototype)).toBe(
      VaultError.prototype
    );
  });
});
