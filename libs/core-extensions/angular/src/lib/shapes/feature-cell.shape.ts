import { FeatureCellBaseShape } from '@sdux-vault/shared';
import { VaultSignalStateRef } from '../references/vault-signal.reference';

/**
 * Angular-augmented FeatureCell shape that exposes reactive signal-based state.
 *
 * This interface extends the core FeatureCellBaseShape by adding a `state`
 * property that provides signal references for loading, value, error, and
 * derived state visibility.
 */
export interface FeatureCellShape<T> extends FeatureCellBaseShape<T> {
  /**
   * Reactive signal-based reference to the FeatureCell's resolved state.
   */
  state: VaultSignalStateRef<T>;
}
