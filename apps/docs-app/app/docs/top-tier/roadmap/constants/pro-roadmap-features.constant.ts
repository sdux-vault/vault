import { RoadMapShape } from '../shapes/roadmap.shape';

export const ProLicenseRoadMapConstants: RoadMapShape[] = [
  {
    feature: 'Local Storage',
    type: 'Behavior',
    isExtendable: true,
    package: '@sdux-vault/persist',
    behavior:
      '<a href="/docs/pipeline/addons/persist/with-local-storage-persist-behavior">withLocalStoragePersistBehavior</a>'
  },
  {
    feature: 'Session Storage',
    type: 'Behavior',
    isExtendable: true,
    package: '@sdux-vault/persist',
    behavior:
      '<a href="/docs/pipeline/addons/persist/with-session-storage-persist-behavior">withSessionStoragePersistBehavior</a>'
  },
  {
    feature: 'Cookie Storage',
    type: 'Behavior',
    isExtendable: true,
    package: '@sdux-vault/persist',
    behavior:
      '<a href="/docs/pipeline/addons/persist/with-cookie-storage-persist-behavior">withCookieStoragePersistBehavior</a>'
  },
  {
    feature: 'Aes256 Encryption',
    type: 'Behavior',
    isExtendable: true,
    package: '@sdux-vault/addons',
    behavior: 'withAes256EncryptionBehavior'
  },
  {
    feature: 'Cross Tab Sync Behavior',
    type: 'Behavior',
    isExtendable: false,
    behavior: 'withCrossTabSyncBehavior',
    explanation:
      'Synchronizes <a href="/docs/references/functions/feature-cell">FeatureCell</a> state across multiple browser tabs using shared storage or messaging channels.'
  },
  {
    feature: 'Cross Tab Sync Controller',
    type: 'Controller',
    isExtendable: false,
    behavior: 'withCrossTabSyncController',
    explanation:
      'Synchronizes <a href="/docs/references/functions/feature-cell">FeatureCell</a> state across multiple browser tabs using shared storage or messaging channels.'
  }
];
