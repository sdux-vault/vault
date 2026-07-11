/*
 * Public API Surface of react
 */

export { FeatureCell } from './lib/factories/feature-cell/feature-cell';
export { ReactFeatureCellAdapter } from './lib/factories/feature-cell/feature.cell.adapter';
export { Vault } from '@sdux-vault/core';
export type { VaultSyncExternalStoreRef } from './lib/references/vault-sync-external-store.reference';
export type { FeatureCellShape } from './lib/shapes/feature-cell.shape';
import './lib/version/version.register';
