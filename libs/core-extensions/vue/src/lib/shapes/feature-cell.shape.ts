import { FeatureCellBaseShape } from '@sdux-vault/shared';
import { VueFeatureCellContext } from '../context/vue-feature-cell.context';
import { VaultReactiveStateRef } from '../references/vault-reactive-state.reference';

/**
 * Vue-augmented FeatureCell shape that preserves the core fluent API while
 * exposing an explicit reactive State composable.
 */
export interface FeatureCellShape<T>
  extends
    FeatureCellBaseShape<T>,
    VueFeatureCellContext<T>,
    VaultReactiveStateRef<T> {}
