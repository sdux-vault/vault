import { VaultLicensePayloadType } from '../../types/vault/vault-license-payload.type';

/**
 * Shape describing a verified Vault license payload surfaced on the
 * global `SDuX` namespace for devtools and runtime consumption.
 */
export interface VaultLicensePayloadShape {
  /** Organization name the license was issued to. */
  organization: string;

  /** Domain the license is scoped to. */
  domain: string;

  /** License tier classification. */
  licenseType: VaultLicensePayloadType;

  /** Unix-epoch millisecond timestamp when the license was issued. */
  issuedAt: number;

  /** Unix-epoch millisecond timestamp when the license expires, or `'forever'` for perpetual licenses. */
  expires: number | 'forever';

  /** Whether the license signature was successfully verified. */
  verified: boolean;
}
