// vault-behavior.decorator.ts
import { BEHAVIOR_META } from '../constants/behavior-meta.constant';
import { BehaviorMetaShape } from '../shapes/behavior-meta.shape';

/**
 * Decorator that registers a class as an Vault behavior.
 *
 * The `VaultBehavior` decorator attaches the provided `BehaviorMeta`
 * definition to the target constructor, making the behavior discoverable by
 * the orchestrator during pipeline initialization. Metadata fields such as
 * `type`, `key`, and `critical` are also mirrored onto static properties of
 * the decorated class to support lightweight runtime introspection.
 *
 * This decorator does not modify method logic or structure; it only assigns
 * metadata required for orchestrator classification and behavior lifecycle
 * management.
 *
 * @param meta - Metadata describing the behavior’s category, unique key, and
 *               criticality within the pipeline.
 * @returns A class decorator that applies behavior metadata to the target.
 */
export function VaultBehavior(meta: BehaviorMetaShape) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function (target: any) {
    // Attach full metadata for the orchestrator
    target[BEHAVIOR_META] = meta;

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

    if (meta.resolveType !== undefined) {
      target.resolveType = meta.resolveType;
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
