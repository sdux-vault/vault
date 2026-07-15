/*
 * Public API Surface of vue
 */

export { FeatureCell } from './lib/factories/feature-cell/feature-cell';
export { VueFeatureCellAdapter } from './lib/factories/feature-cell/vue-feature-cell.adapter';
export { Vault } from '@sdux-vault/core';
export type { VaultReactiveStateRef } from './lib/references/vault-reactive-state.reference';
export type { FeatureCellShape } from './lib/shapes/feature-cell.shape';
import './lib/version/version.register';
