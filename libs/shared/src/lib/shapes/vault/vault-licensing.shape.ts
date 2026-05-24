/** Shape representing a license entry registered with the Vault. */
export interface VaultLicensingShape {
  /** Unique identifier for the license. */
  licenseId: string;

  /** Opaque license payload supplied by the consumer. */
  payload: unknown;
}
