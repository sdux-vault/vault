/**
 * Minimal context contract shared by any class that participates
 * in Vault license validation (behaviors and controllers).
 */
export interface LicensableClassContext {
  /** Key identifying the FeatureCell subject to license validation. */
  readonly featureCellKey: string;

  /** Optional license payload provided during FeatureCell registration. */
  readonly licensePayload?: unknown;
}
