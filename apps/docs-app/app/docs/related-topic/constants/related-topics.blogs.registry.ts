import { RelatedTopicCategoryShape } from 'apps/docs-app/app/docs/related-topic/shapes/related-topic-category.shape';

export const RELATED_TOPICS_BLOGS_REGISTRY: RelatedTopicCategoryShape = {
  baseRoute: '/blog',
  baseDisplay: 'All Blog Posts',
  title: 'SDuX Vault Blog — Insights on State Management',
  description:
    'Read blog posts covering SDuX Vault state management patterns, pipeline architecture, and best practices.',

  globals: ['core'],

  globalCross: ['behavior', 'controller'],

  cross: ['stackblitz', 'welcome'],

  items: [
    {
      link: '/blog/testing-state-3-steps',
      display: "Testing State Is 3 Steps. That's It."
    },
    {
      link: '/blog/ai-assisted-debugging',
      display: 'AI-Assisted Debugging Reports',
      title: 'AI-Assisted Debugging Reports — SDuX Vault Blog',
      description:
        'Learn how SDuX Vault generates AI-assisted debugging reports to accelerate pipeline troubleshooting.'
    },
    {
      link: '/blog/one-engine-every-framework',
      display: 'One State Engine. Every Framework.',
      title: 'One State Engine. Every Framework. — SDuX Vault Blog',
      description:
        'Discover how SDuX Vault provides a single state engine that works across Angular, React, Vue, and Svelte.'
    },
    {
      link: '/blog/circuit-breaker-state-pipeline',
      display: 'Circuit Breaker Pattern, Built Into Your State Pipeline',
      title:
        'Circuit Breaker Pattern, Built Into Your State Pipeline — SDuX Vault Blog',
      description:
        'Explore how SDuX Vault implements the circuit breaker pattern directly in the state pipeline.'
    },
    {
      link: '/blog/pipeline-anatomy',
      display: 'Pipeline Anatomy — What Happens When You Update State',
      title:
        'Pipeline Anatomy — What Happens When You Update State — SDuX Vault Blog',
      description:
        'Walk through the anatomy of a SDuX Vault pipeline execution from state update to emission.'
    },
    {
      link: '/blog/atomic-deterministic-updates',
      display: 'Your State Updates Are Atomic and Deterministic',
      title:
        'Your State Updates Are Atomic and Deterministic — SDuX Vault Blog',
      description:
        'Understand how SDuX Vault guarantees atomic and deterministic state updates in every pipeline execution.'
    },
    {
      link: '/blog/mutation-bugs-eliminated',
      display: 'Mutation Bugs? Eliminated by Architecture',
      title: 'Mutation Bugs? Eliminated by Architecture — SDuX Vault Blog',
      description:
        'Learn how SDuX Vault eliminates mutation bugs through architectural immutability guarantees.'
    },
    {
      link: '/blog/welcome',
      display: 'Welcome to the SDuX Vault Blog',
      title: 'Welcome to the SDuX Vault Blog',
      description:
        'An introduction to the SDuX Vault blog covering state management insights and best practices.'
    },
    {
      link: '/blog/what-is-sdux-vault',
      display: 'What Is SDuX Vault?',
      title: 'What Is SDuX Vault? — SDuX Vault Blog',
      description:
        'A high-level introduction to SDuX Vault and its approach to modern state management.'
    },
    {
      link: '/blog/controllers-dont-touch-your-data',
      display: "Controllers Don't Touch Your Data"
    },
    {
      link: '/blog/tab-sync-state',
      display: 'Open a New Tab. State Is Already There.',
      title: 'Open a New Tab. State Is Already There. — SDuX Vault Blog',
      description:
        'See how SDuX Vault synchronizes state across browser tabs automatically with zero configuration.'
    },
    {
      link: '/blog/redux-broke-my-trust',
      display: 'I Built a State Engine Because Redux Broke My Trust',
      title:
        'I Built a State Engine Because Redux Broke My Trust — SDuX Vault Blog',
      description:
        'Learn why SDuX Vault was built from scratch — deterministic pipelines, ordered execution, and zero ambiguity in state management.'
    },
    {
      link: '/blog/featurecells-changed-how-i-think-about-state-ownership',
      display: 'FeatureCells™ Changed How I Think About State Ownership',
      title:
        'FeatureCells Changed How I Think About State Ownership — SDuX Vault Blog',
      description:
        'Explore how FeatureCells provide isolated typed state, scoped pipelines, and lifecycle-aware boundaries that scale with your team.'
    },
    {
      link: '/blog/one-runtime-every-framework-zero-dependencies',
      display:
        'SDuX Vault™ 1.0.0 — One Runtime, Every Framework, Zero Dependencies',
      title:
        'SDuX Vault 1.0.0 — One Runtime, Every Framework — SDuX Vault Blog',
      description:
        'Learn how SDuX Vault 1.0.0 delivers a pure TypeScript state engine with first-class Angular, React, Vue, and Node bindings — zero dependencies.'
    },
    {
      link: '/blog/redux-pattern-sdux-vault-contract',
      display:
        'Redux Gave You a Pattern — SDuX Vault™ 1.0.0 Gives You a Contract',
      title:
        'Redux Gave You a Pattern — SDuX Vault Gives a Contract — SDuX Vault Blog',
      description:
        'Explore how SDuX Vault replaces Redux conventions with architectural contracts — ordered execution, scoped ownership, and deterministic testing.'
    },
    {
      link: '/blog/from-redux-to-sdux-vault',
      display: 'From Redux to SDuX Vault — A Migration Guide',
      title: 'From Redux to SDuX Vault — Migration Guide — SDuX Vault Blog',
      description:
        'Learn how to migrate from Redux to SDuX Vault incrementally — run both side by side, map concepts, and adopt feature by feature without rewriting.'
    },
    {
      link: '/blog/global-store-shared-dependency',
      display:
        'Global Store Is a Shared Dependency — Why Scoped State Ownership Wins',
      title: 'Global Store vs Scoped State Ownership — SDuX Vault Blog',
      description:
        'Understand why global stores become coupling vectors at team scale and how scoped FeatureCell ownership eliminates cross-team state coordination.'
    },
    {
      link: '/blog/actions-are-ceremony',
      display: 'Actions Are Ceremony — What Happens When You Remove Them',
      title:
        'Actions Are Ceremony — What Happens When You Remove Them — SDuX Vault Blog',
      description:
        'Learn how SDuX Vault eliminates Redux action boilerplate with direct state intent via mergeState and replaceState on the owning FeatureCell.'
    },
    {
      link: '/blog/global-dispatch-broadcasts-scoped-updates-dont',
      display:
        "Global Dispatch Broadcasts to Everything — Scoped Updates Don't",
      title: 'Global Dispatch Broadcasts to Everything — SDuX Vault Blog',
      description:
        'Understand why Redux dispatch broadcasts to every reducer and how SDuX Vault scoped updates target only the owning FeatureCell with zero wasted evaluation.'
    },
    {
      link: '/blog/your-redux-reducers-already-work-in-sdux-vault',
      display: 'Your Redux Reducers Already Work in SDuX Vault',
      title: 'Your Redux Reducers Already Work in SDuX Vault — SDuX Vault Blog',
      description:
        'Learn how pure Redux reducers work as SDuX Vault reducer behaviors with zero modification — register declaratively and preserve execution guarantees.'
    },
    {
      link: '/blog/react-tab-sync-subscribe-before-initialize',
      display: 'React + Tab Sync: Subscribe Before Initialize',
      title: 'React Tab Sync Subscribe Before Initialize — SDuX Vault Blog',
      description:
        'Learn why React requires subscribing to state before calling initialize() when using Tab Sync, and how to fix the silent missed-snapshot issue.'
    },
    {
      link: '/blog/reducers-cant-change-after-init',
      display: "Reducers That Can't Change After Init — Why That's a Feature",
      title: "Reducers That Can't Change After Init — SDuX Vault Blog",
      description:
        'Understand why SDuX Vault locks the pipeline after initialize() and how sealed execution eliminates dynamic reducer bugs that surface in production.'
    },
    {
      link: '/blog/pipeline-overview-video',
      display: 'Introducing the SDuX Vault Pipeline Video',
      title: 'Introducing the SDuX Vault Pipeline Video — SDuX Vault Blog',
      description:
        'Watch the first SDuX Vault video — a complete walkthrough of the deterministic pipeline architecture, all 10 stages, and the atomic execution guarantees.'
    },
    {
      link: '/blog/effects-without-middleware',
      display:
        'Effects Without Middleware — How Pipeline Stages Replace Thunks and Sagas',
      title: 'Effects Without Middleware — SDuX Vault Blog',
      description:
        'Learn how SDuX Vault resolves async inputs through pipeline stages instead of middleware — no thunks, no sagas, no dispatch chains.'
    },
    {
      link: '/blog/selectors-without-a-global-tree',
      display:
        'Selectors Without a Global Tree — Scoped State Access That Scales',
      title: 'Selectors Without a Global Tree — SDuX Vault Blog',
      description:
        'Learn how SDuX Vault scopes state access to the owning FeatureCell — no global tree, no selector coupling, no cascade failures when the store restructures.'
    },
    {
      link: '/blog/no-createstore-no-combinereducers-no-provider',
      display:
        'No createStore, No combineReducers, No Provider — Setting Up State in 3 Lines',
      title:
        'No createStore, No combineReducers, No Provider — SDuX Vault Blog',
      description:
        'Learn how SDuX Vault replaces Redux store ceremony with two function calls — no root reducer, no Provider wrapper, no middleware composition.'
    }
  ]
};
