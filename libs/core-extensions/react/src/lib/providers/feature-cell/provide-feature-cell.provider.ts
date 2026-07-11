import { FeatureCell as CoreFeatureCell } from '@sdux-vault/core';
import { FeatureCellConfig } from '@sdux-vault/engine';
import {
  BehaviorClassContract,
  ControllerClassContract
} from '@sdux-vault/shared';
import { FeatureCellShape } from '../../shapes/feature-cell.shape';
import { ReactFeatureCellAdapter } from './feature.cell.adapter';

/**
 * React FeatureCell factory that wraps the core FeatureCell with an explicit
 * `useSyncExternalStore()` render-time subscription bridge.
 *
 * This function preserves the core fluent API and returns a React-augmented
 * FeatureCell instance with no mutation-path differences from the core runtime.
 *
 * @param descriptor - Configuration object defining the FeatureCell contract.
 * @param behaviors - Optional list of behavior classes applied to the FeatureCell.
 * @param controllers - Optional list of controller classes applied to the FeatureCell.
 * @returns The React-adapted FeatureCell.
 */
export function FeatureCell<T>(
  descriptor: FeatureCellConfig<T>,
  behaviors: BehaviorClassContract<T>[] = [],
  controllers: ControllerClassContract<T>[] = []
): FeatureCellShape<T> {
  const coreCell = CoreFeatureCell(descriptor, behaviors, controllers);

  return new ReactFeatureCellAdapter(coreCell).build();
}
