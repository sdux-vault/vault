/*
 * Documentation API Surface of vue
 */

export { Vault } from '@sdux-vault/core';
export { VueFeatureCellAdapter } from './lib/factories/feature-cell/vue-feature-cell.adapter';
export type { VaultReactiveStateRef } from './lib/references/vault-reactive-state.reference';
export type { FeatureCellShape } from './lib/shapes/feature-cell.shape';
import './lib/version/version.register';
