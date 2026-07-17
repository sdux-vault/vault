import { BlogEntry } from '../shapes/blog-entry.shape';

export const BLOG_ENTRIES: readonly BlogEntry[] = [
  {
    slug: 'testing-state-3-steps',
    title: "Testing State Is 3 Steps. That's It.",
    date: '2026-06-11',
    readingTime: 4,
    active: true
  },
  {
    slug: 'ai-assisted-debugging',
    title: 'AI-Assisted Debugging Reports',
    date: '2026-06-10',
    readingTime: 4,
    active: true
  },
  {
    slug: 'one-engine-every-framework',
    title: 'One State Engine. Every Framework.',
    date: '2026-06-09',
    readingTime: 3,
    active: true
  },
  {
    slug: 'circuit-breaker-state-pipeline',
    title: 'Circuit Breaker Pattern, Built Into Your State Pipeline',
    date: '2026-06-08',
    readingTime: 4,
    active: true
  },
  {
    slug: 'pipeline-anatomy',
    title: 'Pipeline Anatomy — What Happens When You Update State',
    date: '2026-06-06',
    readingTime: 8,
    active: true
  },
  {
    slug: 'atomic-deterministic-updates',
    title: 'Your State Updates Are Atomic and Deterministic',
    date: '2026-06-06',
    readingTime: 5,
    active: true
  },
  {
    slug: 'mutation-bugs-eliminated',
    title: 'Mutation Bugs? Eliminated by Architecture',
    date: '2026-06-06',
    readingTime: 5,
    active: true
  },
  {
    slug: 'what-is-sdux-vault',
    title:
      'What Is SDuX Vault? A Pipeline-Based State Engine for Every Framework',
    date: '2026-06-01',
    readingTime: 6,
    active: true
  },
  {
    slug: 'welcome',
    title: 'Welcome to the SDuX Vault Blog',
    date: '2026-06-01',
    readingTime: 3,
    active: true
  },
  {
    slug: 'controllers-dont-touch-your-data',
    title: "Controllers Don't Touch Your Data",
    date: '2026-06-12',
    readingTime: 3,
    active: true
  },
  {
    slug: 'tab-sync-state',
    title: 'Open a New Tab. State Is Already There.',
    date: '2026-06-12',
    readingTime: 4,
    active: true
  },
  {
    slug: 'redux-broke-my-trust',
    title: 'I Built a State Engine Because Redux Broke My Trust',
    date: '2026-06-16',
    readingTime: 8,
    active: true
  },
  {
    slug: 'featurecells-changed-how-i-think-about-state-ownership',
    title: 'FeatureCells™ Changed How I Think About State Ownership',
    date: '2026-06-17',
    readingTime: 5,
    active: true
  },
  {
    slug: 'one-runtime-every-framework-zero-dependencies',
    title: 'SDuX Vault™ 1.0 — One Runtime, Every Framework, Zero Dependencies',
    date: '2026-06-18',
    readingTime: 5,
    active: true
  },
  {
    slug: 'redux-pattern-sdux-vault-contract',
    title: 'Redux Gave You a Pattern — SDuX Vault™ 1.0 Gives You a Contract',
    date: '2026-06-19',
    readingTime: 9,
    active: true
  },
  {
    slug: 'from-redux-to-sdux-vault',
    title:
      "From Redux to SDuX Vault — A Migration Guide That Doesn't Ask You to Rewrite Everything",
    date: '2026-06-22',
    readingTime: 10,
    active: true
  },
  {
    slug: 'global-store-shared-dependency',
    title:
      'Global Store Is a Shared Dependency — Why Scoped State Ownership Wins',
    date: '2026-06-23',
    readingTime: 6,
    active: true
  },
  {
    slug: 'actions-are-ceremony',
    title: 'Actions Are Ceremony — What Happens When You Remove Them',
    date: '2026-06-24',
    readingTime: 6,
    active: true
  },
  {
    slug: 'global-dispatch-broadcasts-scoped-updates-dont',
    title: "Global Dispatch Broadcasts to Everything — Scoped Updates Don't",
    date: '2026-06-25',
    readingTime: 6,
    active: true
  },
  {
    slug: 'your-redux-reducers-already-work-in-sdux-vault',
    title: 'Your Redux Reducers Already Work in SDuX Vault',
    date: '2026-06-26',
    readingTime: 6,
    active: true
  },
  {
    slug: 'react-tab-sync-subscribe-before-initialize',
    title: 'React + Tab Sync: Render the Initial Snapshot Correctly',
    date: '2026-06-27',
    readingTime: 3,
    active: true
  },
  {
    slug: 'reducers-cant-change-after-init',
    title: "Reducers That Can't Change After Init — Why That's a Feature",
    date: '2026-06-29',
    readingTime: 6,
    active: true
  },
  {
    slug: 'pipeline-overview-video',
    title: 'Introducing the SDuX Vault Pipeline Video',
    date: '2026-06-30',
    readingTime: 2,
    active: true
  },
  {
    slug: 'effects-without-middleware',
    title:
      'Effects Without Middleware — How Pipeline Stages Replace Thunks and Sagas',
    date: '2026-07-01',
    readingTime: 9,
    active: true
  },
  {
    slug: 'selectors-without-a-global-tree',
    title: 'Selectors Without a Global Tree — Scoped State Access That Scales',
    date: '2026-07-02',
    readingTime: 6,
    active: true
  },
  {
    slug: 'no-createstore-no-combinereducers-no-provider',
    title:
      'No createStore, No combineReducers, No Provider — Setting Up State in 3 Lines',
    date: '2026-07-07',
    readingTime: 4,
    active: true
  },
  {
    slug: 'components-without-connect-or-useselector',
    title:
      'Components Without connect() or useSelector — Direct State Injection',
    date: '2026-07-08',
    readingTime: 5,
    active: true
  },
  {
    slug: 'testing-without-mock-stores',
    title: 'Testing Without Mock Stores — act, settle, assert',
    date: '2026-07-09',
    readingTime: 7,
    active: true
  },
  {
    slug: 'redux-and-sdux-vault-side-by-side',
    title: 'Redux and SDuX Vault Can Run Side by Side — Indefinitely',
    date: '2026-07-10',
    readingTime: 6,
    active: true
  },
  {
    slug: 'the-mental-model-shift',
    title:
      'The Mental Model Shift — From “What Action Happened” to “What State Should Exist”',
    date: '2026-07-11',
    readingTime: 8,
    active: true
  },
  {
    slug: 'no-middleware-registration-order',
    title:
      'No Middleware Registration Order — Pipeline Stages That Always Execute the Same Way',
    date: '2026-07-13',
    readingTime: 7,
    active: true
  },
  {
    slug: 'atomic-state-commitment',
    title: 'Atomic State Commitment — Why Components Never See Partial Updates',
    date: '2026-07-14',
    readingTime: 7,
    active: true
  },
  {
    slug: 'what-transfers-directly-from-redux',
    title:
      'What Transfers Directly from Redux — Pure Functions, State Shapes, and Immutability',
    date: '2026-07-15',
    readingTime: 5,
    active: true
  },
  {
    slug: 'state-management-in-vue-without-a-store',
    title: 'State Management in Vue Without a Store',
    date: '2026-07-16',
    readingTime: 6,
    active: true
  },
  {
    slug: 'plain-typescript-zero-magic',
    title:
      "Plain TypeScript, Zero Magic — What 'No Hidden Runtime Behavior' Actually Means",
    date: '2026-07-17',
    readingTime: 6,
    active: true
  },
  {
    slug: 'the-boilerplate-audit',
    title:
      'The Boilerplate Audit — Counting the Files Redux Requires for One Feature',
    date: '2026-07-18',
    readingTime: 6,
    active: false
  }
];
