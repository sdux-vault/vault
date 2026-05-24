import { ControllerType } from '../../types/controller/controller.type';

/** Metadata shape describing a registered controller's static configuration. */
export interface ControllerMetaShape {
  /** Controller category classification. */
  type: ControllerType;

  /** Unique identifier for this controller. */
  key: string;

  /** Whether this controller is critical to pipeline execution. */
  critical?: boolean;

  /** Whether this controller requires consumer-supplied configuration. */
  wantsConfig?: boolean;

  /** Configuration key used to locate controller options in the config registry. */
  configKey?: string;

  /** Whether this controller requires a valid license to operate. */
  needsLicense?: boolean;

  /** License identifier used for license validation. */
  licenseId?: string;
}
