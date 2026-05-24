import { VaultErrorKindTypes } from '../types/error/vault-error-kind.type';
import { VaultErrorNameTypes } from '../types/error/vault-error-name.type';
import { VaultError } from './vault-error';
import { VaultEncryptionIntegrityError } from './vault-error.encryption-integrity';

describe('Error: VaultEncryptionIntegrity', () => {
  it('should create a license error with default license kind', () => {
    const error = new VaultEncryptionIntegrityError();

    expect(error.message.replace(/\n/g, '')).toBe(
      'Encrypted snapshot failed integrity verification.The encrypted payload could not be authenticated during AES-GCM decryption.Possible causes:• The stored ciphertext has been tampered with• The stored initialization vector (IV) was modified• The encryption key does not match the original key• The stored payload is corruptedVault refuses to restore state from unauthenticated encrypted data.'
    );
    expect(error.name).toBe(VaultErrorNameTypes.EncryptionIntegrity);
    expect(error.kind).toBe(VaultErrorKindTypes.VaultError);
  });

  it('should be instance of VaultError and VaultEncryptionError', () => {
    const error = new VaultEncryptionIntegrityError();

    expect(error instanceof Error).toBeTrue();
    expect(error instanceof VaultError).toBeTrue();
    expect(error instanceof VaultEncryptionIntegrityError).toBeTrue();
  });

  it('should preserve prototype chain', () => {
    const error = new VaultEncryptionIntegrityError();

    expect(Object.getPrototypeOf(error)).toBe(
      VaultEncryptionIntegrityError.prototype
    );
    expect(Object.getPrototypeOf(VaultEncryptionIntegrityError.prototype)).toBe(
      VaultError.prototype
    );
  });
});
