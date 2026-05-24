import { inject } from '@angular/core';
import { VAULT_METADATA_KEYS } from '../constants/metadata-keys.constant';
import { FeatureCellShape } from '../shapes/feature-cell.shape';
import { getAngularFeatureCellToken } from '../tokens/feature-cell-di.token';

/**
 * injectVault
 * @function injectVault
 * @description
 * Retrieves the strongly-typed vault instance associated with a
 * `@FeatureCell()`-decorated class. This function must be called **inside**
 * the constructor (or instance initializer) of a FeatureCell service.
 *
 * This version uses static metadata written by the FeatureCell decorator:
 *
 *   target[FEATURE_CELL_KEY] = "myCell"
 *   target[FEATURE_CELL_STATE] = null as TState
 *
 * No Reflect metadata is required.
 *
 * @typeParam T - The typed state stored in this FeatureCell.
 *
 * @param featureCellClass - The decorated class whose vault should be injected.
 */
export function injectVault<T>(
  // eslint-disable-next-line
  featureCellClass?: abstract new (...args: any[]) => object
): FeatureCellShape<T> {
  /**
   * The target
   */
  const target = featureCellClass;

  if (!target) {
    throw new Error(
      `injectVault() must be called inside a @FeatureCell()-decorated service and must be given the class reference.`
    );
  }

  /**
   * Read static metadata created by the FeatureCell decorator
   */
  // eslint-disable-next-line
  const key = (target as any)[VAULT_METADATA_KEYS.FEATURE_CELL_KEY];

  if (!key) {
    throw new Error(
      `injectVault() must be called inside a @FeatureCell()-decorated service.`
    );
  }

  /**
   *  Resolve DI token for this FeatureCell
   */
  const token = getAngularFeatureCellToken(key);

  /**
   *  Inject the vault instance
   */
  return inject(token) as FeatureCellShape<T>;
}
