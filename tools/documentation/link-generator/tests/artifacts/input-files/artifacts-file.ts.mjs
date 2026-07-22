export const ARTIFACTS = {
  function: {
    provideFeatureCell: {
      name: 'provideFeatureCell',
      docLink: 'functions'
    },
    Vault: {
      kind: 'function',
      docKind: 'function',
      name: 'Vault',
      project: 'core',
      relativePath: 'projects/core/src/lib/providers/vault/vault.ts',
      docLink: 'functions'
    }
  },
  interface: {
    FeatureCellConfig: {
      name: 'FeatureCellConfig',
      docLink: 'interfaces'
    },
    state: {
      name: 'state',
      docLink: 'interfaces'
    },
    InsightConfig: {
      name: 'insightConfig',
      docLink: 'interfaces'
    }
  },
  behaviors: {
    withDebounce: {
      kind: 'function',
      docKind: 'behavior',
      name: 'withDebounce',
      project: 'addons',
      relativePath:
        'projects/addons/src/lib/behaviors/interceptors/debounce/with-debounce.behavior.ts',
      docLink: 'behaviors'
    }
  },
  controllers: {
    withReplayGlobalErrorController: {
      kind: 'behavior',
      docKind: 'controller',
      name: 'withReplayGlobalErrorController',
      project: 'addons',
      relativePath:
        'projects/addons/src/lib/controllers/replay-global-error/with-replay-global-error.controller.ts',
      docLink: 'controllers'
    }
  }
};
