import { Routes } from '@angular/router';

export const blogRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./blog-index/blog-index.component').then(
        (m) => m.BlogIndexComponent
      )
  },
  {
    path: 'welcome',
    data: { category: 'blogs', type: 'welcome' },
    loadComponent: () =>
      import('./posts/2026-06-01-welcome/welcome.component').then(
        (m) => m.BlogWelcomeComponent
      )
  },
  {
    path: 'what-is-sdux-vault',
    data: { category: 'blogs', type: 'what-is-sdux-vault' },
    loadComponent: () =>
      import('./posts/2026-06-01-what-is-sdux-vault/what-is-sdux-vault.component').then(
        (m) => m.BlogWhatIsSduxVaultComponent
      )
  },
  {
    path: 'mutation-bugs-eliminated',
    data: { category: 'blogs', type: 'mutation-bugs-eliminated' },
    loadComponent: () =>
      import('./posts/2026-06-06-mutation-bugs-eliminated/mutation-bugs-eliminated.component').then(
        (m) => m.BlogMutationBugsEliminatedComponent
      )
  },
  {
    path: 'atomic-deterministic-updates',
    data: { category: 'blogs', type: 'atomic-deterministic-updates' },
    loadComponent: () =>
      import('./posts/2026-06-06-atomic-deterministic-updates/atomic-deterministic-updates.component').then(
        (m) => m.BlogAtomicDeterministicUpdatesComponent
      )
  },
  {
    path: 'pipeline-anatomy',
    data: { category: 'blogs', type: 'pipeline-anatomy' },
    loadComponent: () =>
      import('./posts/2026-06-06-pipeline-anatomy/pipeline-anatomy.component').then(
        (m) => m.BlogPipelineAnatomyComponent
      )
  },
  {
    path: 'circuit-breaker-state-pipeline',
    data: { category: 'blogs', type: 'circuit-breaker-state-pipeline' },
    loadComponent: () =>
      import('./posts/2026-06-08-circuit-breaker-state-pipeline/circuit-breaker-state-pipeline.component').then(
        (m) => m.BlogCircuitBreakerStatePipelineComponent
      )
  },
  {
    path: 'one-engine-every-framework',
    data: { category: 'blogs', type: 'one-engine-every-framework' },
    loadComponent: () =>
      import('./posts/2026-06-09-one-engine-every-framework/one-engine-every-framework.component').then(
        (m) => m.BlogOneEngineEveryFrameworkComponent
      )
  },
  {
    path: 'ai-assisted-debugging',
    data: { category: 'blogs', type: 'ai-assisted-debugging' },
    loadComponent: () =>
      import('./posts/2026-06-10-ai-assisted-debugging/ai-assisted-debugging.component').then(
        (m) => m.BlogAiAssistedDebuggingComponent
      )
  },
  {
    path: 'testing-state-3-steps',
    data: { category: 'blogs', type: 'testing-state-3-steps' },
    loadComponent: () =>
      import('./posts/2026-06-11-testing-state-3-steps/testing-state-3-steps.component').then(
        (m) => m.BlogTestingState3StepsComponent
      )
  },
  {
    path: 'controllers-dont-touch-your-data',
    data: { category: 'blogs', type: 'controllers-dont-touch-your-data' },
    loadComponent: () =>
      import('./posts/2026-06-12-controllers-dont-touch-your-data/controllers-dont-touch-your-data.component').then(
        (m) => m.BlogControllersDontTouchYourDataComponent
      )
  },
  {
    path: 'tab-sync-state',
    data: { category: 'blogs', type: 'tab-sync-state' },
    loadComponent: () =>
      import('./posts/2026-06-12-tab-sync-state/tab-sync-state.component').then(
        (m) => m.BlogTabSyncStateComponent
      )
  },
  {
    path: 'redux-broke-my-trust',
    data: { category: 'blogs', type: 'redux-broke-my-trust' },
    loadComponent: () =>
      import('./posts/2026-06-16-redux-broke-my-trust/redux-broke-my-trust.component').then(
        (m) => m.BlogReduxBrokeMyTrustComponent
      )
  },
  {
    path: 'featurecells-changed-how-i-think-about-state-ownership',
    data: {
      category: 'blogs',
      type: 'featurecells-changed-how-i-think-about-state-ownership'
    },
    loadComponent: () =>
      import('./posts/2026-06-17-featurecells-changed-how-i-think-about-state-ownership/featurecells-changed-how-i-think-about-state-ownership.component').then(
        (m) => m.BlogFeaturecellsChangedHowIThinkAboutStateOwnershipComponent
      )
  },
  {
    path: 'one-runtime-every-framework-zero-dependencies',
    data: {
      category: 'blogs',
      type: 'one-runtime-every-framework-zero-dependencies'
    },
    loadComponent: () =>
      import('./posts/2026-06-18-one-runtime-every-framework-zero-dependencies/one-runtime-every-framework-zero-dependencies.component').then(
        (m) => m.BlogOneRuntimeEveryFrameworkZeroDependenciesComponent
      )
  },
  {
    path: 'redux-pattern-sdux-vault-contract',
    data: { category: 'blogs', type: 'redux-pattern-sdux-vault-contract' },
    loadComponent: () =>
      import('./posts/2026-06-19-redux-pattern-sdux-vault-contract/redux-pattern-sdux-vault-contract.component').then(
        (m) => m.BlogReduxPatternSduxVaultContractComponent
      )
  },
  {
    path: 'from-redux-to-sdux-vault',
    data: { category: 'blogs', type: 'from-redux-to-sdux-vault' },
    loadComponent: () =>
      import('./posts/2026-06-22-from-redux-to-sdux-vault/from-redux-to-sdux-vault.component').then(
        (m) => m.BlogFromReduxToSduxVaultComponent
      )
  },
  {
    path: 'global-store-shared-dependency',
    data: { category: 'blogs', type: 'global-store-shared-dependency' },
    loadComponent: () =>
      import('./posts/2026-06-23-global-store-shared-dependency/global-store-shared-dependency.component').then(
        (m) => m.BlogGlobalStoreSharedDependencyComponent
      )
  },
  {
    path: 'actions-are-ceremony',
    data: { category: 'blogs', type: 'actions-are-ceremony' },
    loadComponent: () =>
      import('./posts/2026-06-24-actions-are-ceremony/actions-are-ceremony.component').then(
        (m) => m.BlogActionsAreCeremonyComponent
      )
  },
  {
    path: 'global-dispatch-broadcasts-scoped-updates-dont',
    data: {
      category: 'blogs',
      type: 'global-dispatch-broadcasts-scoped-updates-dont'
    },
    loadComponent: () =>
      import('./posts/2026-06-25-global-dispatch-broadcasts-scoped-updates-dont/global-dispatch-broadcasts-scoped-updates-dont.component').then(
        (m) => m.BlogGlobalDispatchBroadcastsScopedUpdatesDontComponent
      )
  },
  {
    path: 'your-redux-reducers-already-work-in-sdux-vault',
    data: {
      category: 'blogs',
      type: 'your-redux-reducers-already-work-in-sdux-vault'
    },
    loadComponent: () =>
      import('./posts/2026-06-26-your-redux-reducers-already-work-in-sdux-vault/your-redux-reducers-already-work-in-sdux-vault.component').then(
        (m) => m.BlogYourReduxReducersAlreadyWorkInSduxVaultComponent
      )
  },
  {
    path: 'react-tab-sync-subscribe-before-initialize',
    data: {
      category: 'blogs',
      type: 'react-tab-sync-subscribe-before-initialize'
    },
    loadComponent: () =>
      import('./posts/2026-06-27-react-tab-sync-subscribe-before-initialize/react-tab-sync-subscribe-before-initialize.component').then(
        (m) => m.BlogReactTabSyncSubscribeBeforeInitializeComponent
      )
  },
  {
    path: 'reducers-cant-change-after-init',
    data: {
      category: 'blogs',
      type: 'reducers-cant-change-after-init'
    },
    loadComponent: () =>
      import('./posts/2026-06-29-reducers-cant-change-after-init/reducers-cant-change-after-init.component').then(
        (m) => m.BlogReducersCantChangeAfterInitComponent
      )
  },
  {
    path: 'pipeline-overview-video',
    data: {
      category: 'blogs',
      type: 'pipeline-overview-video'
    },
    loadComponent: () =>
      import('./posts/2026-06-30-pipeline-overview-video/pipeline-overview-video.component').then(
        (m) => m.BlogPipelineOverviewVideoComponent
      )
  },
  {
    path: 'effects-without-middleware',
    data: {
      category: 'blogs',
      type: 'effects-without-middleware'
    },
    loadComponent: () =>
      import('./posts/2026-07-01-effects-without-middleware/effects-without-middleware.component').then(
        (m) => m.BlogEffectsWithoutMiddlewareComponent
      )
  },
  {
    path: 'selectors-without-a-global-tree',
    data: {
      category: 'blogs',
      type: 'selectors-without-a-global-tree'
    },
    loadComponent: () =>
      import('./posts/2026-07-02-selectors-without-a-global-tree/selectors-without-a-global-tree.component').then(
        (m) => m.BlogSelectorsWithoutAGlobalTreeComponent
      )
  },
  {
    path: 'no-createstore-no-combinereducers-no-provider',
    data: {
      category: 'blogs',
      type: 'no-createstore-no-combinereducers-no-provider'
    },
    loadComponent: () =>
      import('./posts/2026-07-07-no-createstore-no-combinereducers-no-provider/no-createstore-no-combinereducers-no-provider.component').then(
        (m) => m.BlogNoCreatestoreNoCombinereducersNoProviderComponent
      )
  },
  {
    path: 'components-without-connect-or-useselector',
    data: {
      category: 'blogs',
      type: 'components-without-connect-or-useselector'
    },
    loadComponent: () =>
      import('./posts/2026-07-08-components-without-connect-or-useselector/components-without-connect-or-useselector.component').then(
        (m) => m.BlogComponentsWithoutConnectOrUseselectorComponent
      )
  },
  {
    path: 'testing-without-mock-stores',
    data: { category: 'blogs', type: 'testing-without-mock-stores' },
    loadComponent: () =>
      import('./posts/2026-07-09-testing-without-mock-stores/testing-without-mock-stores.component').then(
        (m) => m.BlogTestingWithoutMockStoresComponent
      )
  },
  {
    path: 'redux-and-sdux-vault-side-by-side',
    data: { category: 'blogs', type: 'redux-and-sdux-vault-side-by-side' },
    loadComponent: () =>
      import('./posts/2026-07-10-redux-and-sdux-vault-side-by-side/redux-and-sdux-vault-side-by-side.component').then(
        (m) => m.BlogReduxAndSduxVaultSideBySideComponent
      )
  },
  {
    path: 'the-mental-model-shift',
    data: { category: 'blogs', type: 'the-mental-model-shift' },
    loadComponent: () =>
      import('./posts/2026-07-10-the-mental-model-shift/the-mental-model-shift.component').then(
        (m) => m.BlogTheMentalModelShiftComponent
      )
  },
  {
    path: 'no-middleware-registration-order',
    data: { category: 'blogs', type: 'no-middleware-registration-order' },
    loadComponent: () =>
      import('./posts/2026-07-13-no-middleware-registration-order/no-middleware-registration-order.component').then(
        (m) => m.BlogNoMiddlewareRegistrationOrderComponent
      )
  },
  {
    path: 'atomic-state-commitment',
    data: { category: 'blogs', type: 'atomic-state-commitment' },
    loadComponent: () =>
      import('./posts/2026-07-14-atomic-state-commitment/atomic-state-commitment.component').then(
        (m) => m.BlogAtomicStateCommitmentComponent
      )
  },
  {
    path: 'what-transfers-directly-from-redux',
    data: { category: 'blogs', type: 'what-transfers-directly-from-redux' },
    loadComponent: () =>
      import('./posts/2026-07-15-what-transfers-directly-from-redux/what-transfers-directly-from-redux.component').then(
        (m) => m.BlogWhatTransfersDirectlyFromReduxComponent
      )
  },
  {
    path: 'state-management-in-vue-without-a-store',
    data: {
      category: 'blogs',
      type: 'state-management-in-vue-without-a-store'
    },
    loadComponent: () =>
      import('./posts/2026-07-16-state-management-in-vue-without-a-store/state-management-in-vue-without-a-store.component').then(
        (m) => m.BlogStateManagementInVueWithoutAStoreComponent
      )
  },
  {
    path: 'plain-typescript-zero-magic',
    data: { category: 'blogs', type: 'plain-typescript-zero-magic' },
    loadComponent: () =>
      import('./posts/2026-07-17-plain-typescript-zero-magic/plain-typescript-zero-magic.component').then(
        (m) => m.BlogPlainTypescriptZeroMagicComponent
      )
  },
  {
    path: 'the-boilerplate-audit',
    data: { category: 'blogs', type: 'the-boilerplate-audit' },
    loadComponent: () =>
      import('./posts/2026-07-18-the-boilerplate-audit/the-boilerplate-audit.component').then(
        (m) => m.BlogTheBoilerplateAuditComponent
      )
  },
  {
    path: 'fluent-api-predictable-state-interaction',
    data: {
      category: 'blogs',
      type: 'fluent-api-predictable-state-interaction'
    },
    loadComponent: () =>
      import('./posts/2026-07-20-fluent-api-predictable-state-interaction/fluent-api-predictable-state-interaction.component').then(
        (m) => m.BlogFluentApiPredictableStateInteractionComponent
      )
  }
  // Add new entries here when a post is created by the write-blog-post prompt.
  //
  // Example:
  // {
  //   path: 'pipeline-anatomy',
  //   loadComponent: () =>
  //     import('./posts/2026-06-02-pipeline-anatomy/pipeline-anatomy.component')
  //       .then(m => m.BlogPipelineAnatomyComponent),
  // },
];
