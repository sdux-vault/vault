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
  }
  // Blog posts are lazy-loaded by slug.
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
