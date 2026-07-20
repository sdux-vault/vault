import { BehaviorType, BehaviorTypes } from '../types/behavior/behavior.type';
import { ResolveType } from '../types/resolve.type';

/** Metadata shared by every registered behavior. */
interface BehaviorMetaBaseShape {
  /** Unique identifier for this behavior. */
  key: string;

  /** Whether this behavior is critical to pipeline execution. */
  critical: boolean;

  /** Whether this behavior requires consumer-supplied configuration. */
  wantsConfig?: boolean;

  /** Configuration key used to locate behavior options in the config registry. */
  configKey?: string;

  /** Whether this behavior requires a valid license to operate. */
  needsLicense?: boolean;

  /** License identifier used for license validation. */
  licenseId?: string;
}

/** Metadata for a behavior that participates in the Resolve pipeline stage. */
interface ResolveBehaviorMetaShape extends BehaviorMetaBaseShape {
  /** Identifies this behavior as a Resolve-stage participant. */
  type: typeof BehaviorTypes.Resolve;

  /** Resolve strategy handled by this behavior. */
  resolveType: ResolveType;
}

/** Metadata for every behavior outside the Resolve pipeline stage. */
interface NonResolveBehaviorMetaShape extends BehaviorMetaBaseShape {
  /** Identifies the non-Resolve stage or extension category. */
  type: Exclude<BehaviorType, typeof BehaviorTypes.Resolve>;

  /** Resolve strategies are valid only for Resolve-stage behaviors. */
  resolveType?: never;
}

/**
 * Metadata describing a registered behavior's static configuration.
 * The behavior type discriminates whether `resolveType` is required or forbidden.
 */
export type BehaviorMetaShape =
  ResolveBehaviorMetaShape | NonResolveBehaviorMetaShape;
