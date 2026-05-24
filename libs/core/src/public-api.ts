import './extensions';
export * from './extensions';

import './lib/version/version.register';

export { withObjectShallowMergeBehavior } from './lib/behaviors/merge/object/with-object-shallow-merge.behavior';
export type { FromStreamOptions } from './lib/behaviors/resolve/from-stream/options/from-stream.options';
export { withTabSyncStateBehavior } from './lib/behaviors/vault/with-tab-sync-state/with-tab-sync-state.behavior';
export { withTabSyncController } from './lib/controllers/vault/tab-sync/with-tab-sync.controller';
export { FeatureCell } from './lib/factories/feature-cell/feature-cell';
export { Vault } from './lib/factories/vault/vault';
