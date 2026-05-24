export const ARTIFACTS = {
  class: {
    ValueResolveExampleComponent: {
      kind: 'class',
      name: 'ValueResolveExampleComponent',
      project: 'core',
      relativePath: 'projects/core/src/lib/dir_one/dir_one_file_one.ts',
      docLink: 'classes'
    }
  },

  behaviors: {
    withAes256EncryptBehavior: {
      kind: 'behavior',
      docKind: 'behavior',
      name: 'withAes256EncryptBehavior',
      project: 'encrypt',
      relativePath:
        'projects/encrypt/src/lib/behaviors/aes256/with-aes256-encrypt.behavior.ts',
      docLink: 'behaviors'
    },
    withArrayAppendMergeBehavior: {
      kind: 'behavior',
      docKind: 'behavior',
      name: 'withArrayAppendMergeBehavior',
      project: 'addons',
      relativePath:
        'projects/addons/src/lib/behaviors/merge/array/array-append-merge/with-array-append-merge.behavior.ts',
      docLink: 'behaviors'
    },
    withCookieStoragePersistBehavior: {
      kind: 'behavior',
      docKind: 'behavior',
      name: 'withCookieStoragePersistBehavior',
      project: 'persist',
      relativePath:
        'projects/persist/src/lib/behaviors/cookie-storage/with-cookie-storage-persist.behavior.ts',
      docLink: 'behaviors'
    }
  },
  interface: {
    BankEmployeeModel: {
      kind: 'interface',
      name: 'BankEmployeeModel',
      project: 'core',
      relativePath: 'projects/core/src/lib/file_three.ts',
      docLink: 'interfaces'
    },
    NoDocLink: {
      kind: 'interface',
      name: 'NoDockLink',
      project: 'core',
      relativePath: 'projects/core/src/lib/file_three.ts'
    }
  }
};
