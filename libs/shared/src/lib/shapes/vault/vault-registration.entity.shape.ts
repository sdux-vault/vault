import { VaultRegistrationLicenseStatusType } from '../../types/vault/vault-registration-license-status.type';

/** Shape describing a registered behavior or controller entity within a FeatureCell. */
export interface VaultRegistrationEntityShape {
  /** Unique identifier for this entity. */
  key: string;

  /** Entity type classification string. */
  type: string;

  /** Whether this entity is critical to pipeline execution. */
  critical?: boolean;

  /** Whether this entity requires a valid license. */
  needsLicense?: boolean;

  /** Current license validation status for this entity. */
  validLicense?: VaultRegistrationLicenseStatusType;

  /** License identifier associated with this entity. */
  licenseId?: string;
}
