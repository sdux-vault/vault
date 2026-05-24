/*
 * Public API Surface of angular
 */

export { FeatureCell } from './lib/decorators/feature-cell.decorator';
export { injectVault } from './lib/injectors/feature-vault.injector';
export { provideFeatureCell } from './lib/providers/feature-cell/provide-feature-cell.provider';
export { provideVault } from './lib/providers/vault/provide-vault.provider';
export type { VaultSignalStateRef } from './lib/references/vault-signal.reference';
export type { FeatureCellShape } from './lib/shapes/feature-cell.shape';
export { resetAngularFeatureCellTokenDevMode } from './lib/tokens/feature-cell-di.token';
export { provideVaultTesting } from './testing/provide-vault-testing';
import './lib/version/version.register';
