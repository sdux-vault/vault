import { VaultErrorNameTypes } from '../types/error/vault-error-name.type';
import { VaultError } from './vault-error';

/**
 * Thrown when an encrypted payload fails AES-GCM integrity verification
 * during decryption, indicating tampered, corrupted, or mismatched key data.
 */
export class VaultEncryptionIntegrityError extends VaultError {
  /** Creates the error with a descriptive integrity-failure message. */
  constructor() {
    const message = `Encrypted snapshot failed integrity verification.

The encrypted payload could not be authenticated during AES-GCM decryption.

Possible causes:

• The stored ciphertext has been tampered with
• The stored initialization vector (IV) was modified
• The encryption key does not match the original key
• The stored payload is corrupted

Vault refuses to restore state from unauthenticated encrypted data.`;

    super(message, VaultErrorNameTypes.EncryptionIntegrity);
  }
}
