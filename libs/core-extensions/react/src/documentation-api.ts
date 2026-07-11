/*
 * Public API Surface of react
 */

export { Vault } from '@sdux-vault/core';
export { ReactFeatureCellAdapter } from './lib/factories/feature-cell/feature.cell.adapter';
export type { VaultSyncExternalStoreRef } from './lib/references/vault-sync-external-store.reference';
export type { FeatureCellShape } from './lib/shapes/feature-cell.shape';
import './lib/version/version.register';
