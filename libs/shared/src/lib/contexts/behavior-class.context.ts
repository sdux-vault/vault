import { LicensableClassContext } from './licensable-class.context';

/**
 * Context provided to behavior class constructors during instantiation.
 */
export interface BehaviorClassContext extends LicensableClassContext {
  /** Key of the FeatureCell this behavior instance operates within. */
  readonly featureCellKey: string;

  /** Optional consumer-supplied configuration for this behavior. */
  readonly behaviorConfig?: unknown;

  /** Optional license payload for behaviors requiring license validation. */
  readonly licensePayload?: unknown;
}
