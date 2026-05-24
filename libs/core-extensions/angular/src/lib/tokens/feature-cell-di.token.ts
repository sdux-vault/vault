// angular/feature-cell-di-tokens.ts
import { InjectionToken } from '@angular/core';
import { DevMode } from '@sdux-vault/shared';
import { FeatureCellShape } from '../shapes/feature-cell.shape';

/**
 * Internal registry mapping FeatureCell keys to Angular injection tokens.
 *
 * This map ensures a one-to-one association between a FeatureCell key and its
 * corresponding InjectionToken instance.
 */
const featureCellTokens = new Map<
  string,
  // eslint-disable-next-line
  InjectionToken<FeatureCellShape<any>>
>();

/**
 * Tracks whether a FeatureCell token has already been requested for injection.
 *
 * This is used to enforce single-injection constraints in non-development modes.
 */
const featureCellTokenRequested = new Map<string, boolean>();

/**
 * Creates or retrieves an Angular InjectionToken for a FeatureCell.
 *
 * This function enforces uniqueness rules for FeatureCell keys and controls
 * whether a token is being created or retrieved based on the `isCreate` flag.
 *
 * @param key - The unique FeatureCell key.
 * @param isCreate - Whether the token is being created or retrieved.
 * @returns The Angular InjectionToken associated with the FeatureCell.
 */
function internalAngularFeatureCellToken<T>(
  key: string,
  isCreate: boolean
): InjectionToken<FeatureCellShape<T>> {
  let token = featureCellTokens.get(key);

  if (isCreate) {
    if (featureCellTokens.has(key)) {
      if (!DevMode.active) {
        throw new Error(
          `[vault] Duplicate FeatureCell key detected: "${key}". ` +
            `Each FeatureCell must have a unique key. Existing token: "${key}"`
        );
      }

      return featureCellTokens.get(key)!;
    }

    token = new InjectionToken<FeatureCellShape<T>>(`FEATURE_CELL:${key}`);
    featureCellTokens.set(key, token);
    return token as InjectionToken<FeatureCellShape<T>>;
  } else {
    if (!featureCellTokens.has(key)) {
      throw new Error(
        `[vault] FeatureCell token not found for key "${key}". You must call provideFeatureCell() before retrieving this FeatureCell.`
      );
    }

    if (featureCellTokenRequested.has(key)) {
      if (!DevMode.active) {
        throw new Error(
          `[vault] FeatureCell "${key}" can only be injected into a single decorated @FeatureCell service.`
        );
      }

      return featureCellTokens.get(key)! as InjectionToken<FeatureCellShape<T>>;
    }

    featureCellTokenRequested.set(key, true);
    return featureCellTokens.get(key)! as InjectionToken<FeatureCellShape<T>>;
  }
}

/**
 * Creates and registers an Angular InjectionToken for a FeatureCell key.
 *
 * @param key - The unique FeatureCell key.
 * @returns The created InjectionToken.
 */
export function createAngularFeatureCellToken<T>(key: string) {
  return internalAngularFeatureCellToken<T>(key, true);
}

/**
 * Retrieves an existing Angular InjectionToken for a FeatureCell key.
 *
 * @param key - The unique FeatureCell key.
 * @returns The existing InjectionToken.
 */
export function getAngularFeatureCellToken<T>(key: string) {
  return internalAngularFeatureCellToken<T>(key, false);
}

/**
 * Resets all FeatureCell token state for development or test isolation.
 *
 * This function clears internal token registries and is only active when
 * development mode is enabled.
 */
export function resetAngularFeatureCellTokenDevMode(): void {
  if (!DevMode.active) return;

  featureCellTokens.clear();
  featureCellTokenRequested.clear();
}
