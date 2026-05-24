// vault-behavior.decorator.ts
import { CONTROLLER_META } from '../constants/controller-meta.constant';
import { ControllerMetaShape } from '../shapes/controller/controller-meta.shape';

/**
 * Class decorator that attaches controller metadata to the target class.
 *
 * @param meta - The controller metadata shape to apply.
 * @returns A class decorator function.
 */
export function VaultController(meta: ControllerMetaShape) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function (target: any) {
    // Attach full metadata for the orchestrator
    target[CONTROLLER_META] = meta;

    // Also mirror some fields onto static props for convenience
    if (meta.type !== undefined) {
      target.type = meta.type;
    }
    if (meta.key !== undefined) {
      target.key = meta.key;
    }
    if (meta.critical !== undefined) {
      target.critical = meta.critical;
    }
    if (meta.wantsConfig !== undefined) {
      target.wantsConfig = meta.wantsConfig;
    } else {
      target.wantsConfig = false;
    }

    if (meta.configKey !== undefined) {
      target.configKey = meta.configKey;
    }

    if (meta.needsLicense !== undefined) {
      target.needsLicense = meta.needsLicense;
    } else {
      target.needsLicense = false;
    }

    if (meta.licenseId !== undefined) {
      target.licenseId = meta.licenseId;
    }
  };
}
