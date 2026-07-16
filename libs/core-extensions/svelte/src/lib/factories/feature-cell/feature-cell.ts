import { FeatureCell as CoreFeatureCell } from '@sdux-vault/core';
import { FeatureCellConfig, FeatureCellShape } from '@sdux-vault/engine';
import {
  BehaviorClassContract,
  ControllerClassContract
} from '@sdux-vault/shared';
import { SvelteFeatureCellAdapter } from './svelte-feature-cell.adapter';

/**
 * Svelte FeatureCell factory that augments the core State getter with Svelte
 * reactive effect tracking.
 *
 * This function preserves the core fluent API and returns a Svelte-augmented
 * FeatureCell instance with no mutation-path differences from the core runtime.
 *
 * @param descriptor - Configuration object defining the FeatureCell contract.
 * @param behaviors - Optional list of behavior classes applied to the FeatureCell.
 * @param controllers - Optional list of controller classes applied to the FeatureCell.
 * @returns The Svelte-adapted FeatureCell.
 */
export function FeatureCell<T>(
  descriptor: FeatureCellConfig<T>,
  behaviors: BehaviorClassContract<T>[] = [],
  controllers: ControllerClassContract<T>[] = []
): FeatureCellShape<T> {
  const coreCell = CoreFeatureCell<T>(descriptor, behaviors, controllers);

  return new SvelteFeatureCellAdapter<T>(coreCell).build();
}
