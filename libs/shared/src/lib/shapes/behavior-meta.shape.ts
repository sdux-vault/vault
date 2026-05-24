import { BehaviorType } from '../types/behavior/behavior.type';
import { ResolveType } from '../types/resolve.type';

/**
 * Metadata shape describing a registered behavior's static configuration.
 */
export interface BehaviorMetaShape {
  /**
   * Pipeline stage in which this behavior participates.
   */
  type: BehaviorType;

  /**
   * Unique identifier for this behavior.
   */
  key: string;

  /**
   * Whether this behavior is critical to pipeline execution.
   */
  critical: boolean;

  /**
   * Optional resolve strategy associated with this behavior.
   */
  resolveType?: ResolveType;

  /**
   * Whether this behavior requires consumer-supplied configuration.
   */
  wantsConfig?: boolean;

  /**
   * Configuration key used to locate behavior options in the config registry.
   */
  configKey?: string;

  /**
   * Whether this behavior requires a valid license to operate.
   */
  needsLicense?: boolean;

  /**
   * License identifier used for license validation.
   */
  licenseId?: string;
}
