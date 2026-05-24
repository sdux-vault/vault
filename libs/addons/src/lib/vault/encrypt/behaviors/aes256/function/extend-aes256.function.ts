import { FeatureCellBaseShape } from '@sdux-vault/shared';
import { AES256BehaviorOptions } from '../options/aes256-behavior.options';

/**
 * Extends a Feature Cell instance with AES-256 encryption-related function placeholders.
 * This function augments the provided Feature Cell with encryption-related APIs that are expected to be replaced by an installed behavior at build time.
 *
 *
 * @param cell Feature Cell instance to be extended with AES-256 encryption functions.
 */
export function extendAes256EncryptFunction<T>(cell: FeatureCellBaseShape<T>) {
  cell.setAes256Secret = function (_options: AES256BehaviorOptions) {
    // buildtime behavior will replace this implementation
    throw new Error('[vault] withAes256Encrypt() behavior not installed');
  };

  cell.generateSalt = function (_length = 16): Uint8Array {
    throw new Error('[vault] withAes256Encrypt() behavior not installed');
  };
}
