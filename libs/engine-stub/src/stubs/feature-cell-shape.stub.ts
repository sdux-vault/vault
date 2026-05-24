import { FeatureCellBaseShape } from '@sdux-vault/shared';
import { VaultStateRef } from './vault.reference.stub';

/**
 * Extends the base FeatureCell shape with a reactive state reference for testing stubs.
 */
export interface FeatureCellShape<T> extends FeatureCellBaseShape<T> {
  /**
   * Reactive reference to the Feature Cell resolved state.
   */
  state: VaultStateRef<T>;
}
