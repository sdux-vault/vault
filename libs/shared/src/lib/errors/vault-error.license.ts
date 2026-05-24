import { VaultErrorNameTypes } from '../types/error/vault-error-name.type';
import {
  VaultErrorUsageKindType,
  VaultErrorUsageKindTypes
} from '../types/error/vault-error-usage-kind.type';
import { VaultError } from './vault-error';

/**
 * Thrown when a behavior or controller fails license validation.
 */
export class VaultLicenseError extends VaultError {
  /**
   * Creates a license validation error.
   *
   * @param message - Description of the license violation.
   * @param kind - Usage-kind classification for diagnostics.
   */
  constructor(
    message: string,
    kind: VaultErrorUsageKindType = VaultErrorUsageKindTypes.License
  ) {
    super(message, VaultErrorNameTypes.License, kind);
  }
}
