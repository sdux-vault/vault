import { VaultErrorNameTypes } from '../types/error/vault-error-name.type';
import {
  VaultErrorUsageKindType,
  VaultErrorUsageKindTypes
} from '../types/error/vault-error-usage-kind.type';
import { VaultError } from './vault-error';

/**
 * Base error for Vault API usage violations detected at runtime.
 */
export class VaultUsageError extends VaultError {
  /**
   * Creates a usage error with the specified message and kind.
   *
   * @param message - Description of the usage violation.
   * @param kind - Usage-kind classification for diagnostics.
   */
  constructor(
    message: string,
    kind: VaultErrorUsageKindType = VaultErrorUsageKindTypes.Usage
  ) {
    super(message, VaultErrorNameTypes.Usage, kind);
  }
}
