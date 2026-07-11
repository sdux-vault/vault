import { FeatureCellBaseShape } from '@sdux-vault/shared';
import { VaultSyncExternalStoreRef } from '../references/vault-sync-external-store.reference';

/**
 * React-augmented FeatureCell shape that preserves the core fluent API while
 * exposing an explicit render-time subscription method.
 */
export interface FeatureCellShape<T>
  extends FeatureCellBaseShape<T>, VaultSyncExternalStoreRef<T> {}
