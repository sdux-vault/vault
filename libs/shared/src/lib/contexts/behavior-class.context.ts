import { LicensableClassContext } from './licensable-class.context';

/**
 * Context provided to behavior class constructors during instantiation.
 */
export interface BehaviorClassContext extends LicensableClassContext {
  /**
   * Unique identifier for the conductor instance that owns this pipeline.
   *
   * Generated once per page load and shared across all behaviors and
   * controllers within the same conductor.
   */
  readonly conductorId: string;

  /** Key of the FeatureCell this behavior instance operates within. */
  readonly featureCellKey: string;

  /** Optional consumer-supplied configuration for this behavior. */
  readonly behaviorConfig?: unknown;

  /** Optional license payload for behaviors requiring license validation. */
  readonly licensePayload?: unknown;
}
