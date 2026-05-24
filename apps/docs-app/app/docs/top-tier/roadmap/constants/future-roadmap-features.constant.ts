import { RoadMapShape } from '../shapes/roadmap.shape';

export const FutureRoadMapConstants: RoadMapShape[] = [
  {
    feature: 'IndexedDB Persist',
    type: 'Persist',
    isExtendable: true,
    explanation:
      'Adds a persistence behavior that stores <a href="/docs/references/functions/feature-cell">FeatureCell</a> state in IndexedDB, enabling durable, large-scale client-side storage with support for structured data and asynchronous access.'
  },
  {
    feature: 'Retry Local Cell Failures',
    type: 'Controller',
    isExtendable: true,
    explanation:
      'Introduces a retry behavior that automatically replays failed state resolutions for a <a href="/docs/references/functions/feature-cell">FeatureCell</a> a configurable number of times, with optional backoff strategies.'
  },
  {
    feature: 'withRateLimit',
    type: 'Interceptor',
    isExtendable: true,
    explanation:
      'Limits the maximum number of state updates allowed within a defined time window, preventing excessive writes and protecting downstream consumers.'
  },
  {
    feature: 'withDebounceSync',
    type: 'Interceptor',
    isExtendable: true,
    explanation:
      'Provides a frame-synchronous debounce interceptor that batches rapid updates within the same execution frame without introducing asynchronous delays.'
  },
  {
    feature: 'withAudit',
    isExtendable: true,
    type: 'Option',
    explanation:
      'Buffers state updates and emits only the final value at the end of a configured time window, reducing noisy intermediate emissions.'
  },
  {
    feature: 'withWindowing',
    type: 'Interceptor',
    isExtendable: true,
    explanation:
      'Groups multiple state updates into a single pipeline execution window, producing a single consolidated Snapshot.'
  },
  {
    feature: 'withDistinctUntilChangedCompare',
    type: 'Operator',
    isExtendable: true,
    explanation:
      'Extends distinct-until-changed semantics with a custom comparator, allowing fine-grained control over when state changes should emit.'
  },
  {
    feature: 'State Inspector',
    type: 'DevTools',
    isExtendable: false,
    explanation:
      'Provides a DevTools view for inspecting the current Snapshot state of FeatureCells in real time.'
  },
  {
    feature: 'State Snapshots',
    type: 'DevTools',
    isExtendable: false,
    explanation:
      'Enables inspection and traversal of historical Snapshots at any point in the pipeline lifecycle.'
  },
  {
    feature: 'Vault List Overview',
    type: 'DevTools',
    isExtendable: false,
    explanation:
      'Displays a high-level overview of Vaults and FeatureCells using cards or grid layouts for rapid navigation.'
  },
  {
    feature: 'Timeline View',
    type: 'DevTools',
    isExtendable: false,
    explanation:
      'Visualizes state updates and lifecycle events over time using an interactive timeline.'
  },
  {
    feature: 'Pipeline Stage View',
    type: 'DevTools',
    isExtendable: false,
    explanation:
      'Provides a structured view of pipeline stages, showing how behaviors participate in state resolution.'
  },
  {
    feature: 'Reducer Diff Viewer',
    type: 'DevTools',
    isExtendable: false,
    explanation:
      'Highlights structural differences introduced by reducers between previous and next Snapshots.'
  },
  {
    feature: 'Time Travel Hooks',
    type: 'DevTools',
    isExtendable: true,
    explanation:
      'Introduces lifecycle hooks that allow before, after, and rollback interception for time-travel debugging workflows.'
  },
  {
    feature: 'Time Travel Controls',
    type: 'DevTools',
    isExtendable: false,
    explanation:
      'Adds DevTools controls for navigating backward, forward, and replaying historical state transitions.'
  },
  {
    feature: 'withDedupRequests',
    type: 'Interceptor',
    isExtendable: true,
    explanation:
      'Prevents duplicate concurrent resolutions by deduplicating identical in-flight requests.'
  },
  {
    feature: 'PBKDF2 Password Encryption',
    type: 'Encrypt',
    isExtendable: false,
    explanation:
      'Enables password-protected Vault encryption using PBKDF2 key derivation for secure client-side storage.'
  },
  {
    feature: 'Argon2 Password Encryption',
    type: 'Encrypt',
    isExtendable: false,
    explanation:
      'Provides modern, memory-hard password-based encryption using Argon2 for maximum security.'
  },
  {
    feature: 'connectForm',
    type: 'Resolve',
    isExtendable: true,
    explanation:
      'Synchronizes form value changes directly into <a href="/docs/references/functions/feature-cell">FeatureCell</a> state, enabling declarative form-driven updates.'
  },
  {
    feature: 'withUndoRedo',
    type: 'Controller',
    isExtendable: true,
    explanation:
      'Tracks state history and exposes undo/redo commands for reversible state transitions.'
  },
  {
    feature: 'withLifecycleHooks',
    type: 'Cell Api',
    isExtendable: true,
    explanation:
      'Registers callbacks that observe or react to pipeline lifecycle phases without mutating state.'
  },
  {
    feature: 'Behavior Scheduling',
    type: 'Controller',
    isExtendable: true,
    explanation:
      'Introduces advanced pipeline scheduling features such as priority ordering, parallel execution, conditional activation, and dependency graphs.'
  },
  {
    feature: 'withServerPersist',
    type: 'Persist',
    isExtendable: true,
    explanation:
      'Persists Vault or <a href="/docs/references/functions/feature-cell">FeatureCell</a> state to a remote server, enabling cross-device recovery, synchronization, and centralized storage strategies.'
  },
  {
    feature: 'withPeriodicPersist',
    type: 'Persist',
    isExtendable: true,
    explanation:
      'Automatically persists state at a fixed interval, ensuring periodic durability without requiring explicit update triggers.'
  },
  {
    feature: 'withPersistIf',
    type: 'Option',
    isExtendable: true,
    explanation:
      'Conditionally persists state based on a predicate, allowing fine-grained control over when persistence should occur.'
  },
  {
    feature: 'Unique Append Merge',
    type: 'Merge',
    isExtendable: true,
    explanation:
      'Appends incoming array values while deduplicating entries based on a key or identifier.'
  },
  {
    feature: 'Prefer Incoming Merge',
    type: 'Merge',
    isExtendable: true,
    explanation:
      'Resolves merge conflicts by prioritizing incoming values while preserving missing fields from the current state.'
  },
  {
    feature: 'Timestamp Merge',
    type: 'Merge',
    isExtendable: true,
    explanation:
      'Applies incoming updates only if their timestamp is newer than the current state, preventing stale overwrites.'
  },
  {
    feature: 'Prefer Current Merge',
    type: 'Merge',
    isExtendable: true,
    explanation:
      'Ignores incoming updates when conflicts occur, preserving the existing state as the source of truth.'
  },
  {
    feature: 'Schema Merge',
    type: 'Merge',
    isExtendable: true,
    explanation:
      'Allows merge operations only when incoming values conform to a defined schema.'
  },
  {
    feature: 'Versioned Merge',
    type: 'Merge',
    isExtendable: true,
    explanation:
      'Accepts incoming updates only when their version exceeds the current state version.'
  },
  {
    feature: 'Immutable Merge',
    type: 'Merge',
    isExtendable: true,
    explanation:
      'Performs deep, fully immutable merges with structural sharing to optimize memory usage and change detection.'
  },
  {
    feature: 'Diff/Patch Merge',
    type: 'Merge',
    isExtendable: true,
    explanation:
      'Applies structural diffs or patches to existing state instead of full object replacement.'
  },
  {
    feature: 'Query Retries and Backoff',
    type: 'Controller',
    isExtendable: true,
    explanation:
      'Adds built-in retry strategies with configurable backoff policies for failed queries.'
  },
  {
    feature: 'withInfiniteQuery',
    type: 'Resolve',
    isExtendable: true,
    explanation:
      'Supports infinite scrolling patterns by incrementally fetching additional pages of data.'
  },
  {
    feature: 'withPaginatedQuery',
    type: 'Resolve',
    isExtendable: true,
    explanation:
      'Provides pagination helpers and cursor management for page-based data retrieval.'
  },
  {
    feature: 'withRefetchOnFocus',
    type: 'Resolve',
    isExtendable: true,
    explanation:
      'Automatically refetches query data when the browser tab regains focus.'
  },
  {
    feature: 'withRefetchOnReconnect',
    type: 'Resolve',
    isExtendable: true,
    explanation:
      'Triggers query revalidation when network connectivity is restored.'
  },
  {
    feature: 'Entity CRUD Helpers',
    type: 'Resolve',
    isExtendable: true,
    explanation:
      'Provides standardized add, remove, and update helpers for managing collections of entities.'
  },
  {
    feature: 'selectMany',
    type: 'Selector',
    isExtendable: true,
    explanation:
      'Efficiently selects multiple entities from a collection using a set of identifiers.'
  },
  {
    feature: 'sortBy',
    type: 'Selector',
    isExtendable: true,
    explanation:
      'Sorts entity collections using a field name or custom comparator.'
  },
  {
    feature: 'selectSlice',
    type: 'Selector',
    isExtendable: true,
    explanation:
      'Extracts a slice of an entity collection for pagination or windowed views.'
  },
  {
    feature: 'selectWhere',
    type: 'Selector',
    isExtendable: true,
    explanation: 'Selects entities matching a predicate function.'
  },
  {
    feature: 'groupBy',
    type: 'Selector',
    isExtendable: true,
    explanation:
      'Groups entities by a derived key, producing structured lookup maps.'
  },
  {
    feature: 'withAutoRetry',
    type: 'Controller',
    isExtendable: true,
    explanation:
      'Automatically retries failed updates using configurable backoff and jitter strategies.'
  },
  {
    feature: 'withDirtyBehavior',
    type: 'Resolve',
    isExtendable: true,
    explanation:
      'Tracks deviations from the original state to support dirty-checking and change awareness.'
  },
  {
    feature: 'State Diffing',
    type: 'DevTools',
    isExtendable: false,
    explanation:
      'Produces structural diffs between previous and next Snapshots for analytics and debugging.'
  },
  {
    feature: 'Orchestrator Metrics',
    type: 'DevTools',
    isExtendable: false,
    explanation:
      'Collects performance metrics such as reducer execution time, state size, and pipeline cost.'
  },
  {
    feature: 'withTimeout',
    type: 'Controller',
    isExtendable: true,
    explanation:
      'Fails state updates that exceed a specified execution time limit.'
  },
  {
    feature: 'withGate',
    type: 'Interceptor',
    isExtendable: true,
    explanation:
      'Blocks or allows state updates based on a predicate condition.'
  },
  {
    feature: 'withSuspend',
    type: 'Controller',
    isExtendable: true,
    explanation:
      'Suspends pipeline execution until a condition or external signal resolves.'
  },
  {
    feature: 'withDefaultState',
    type: 'Controller',
    isExtendable: true,
    explanation: 'Restores a default state value when no current state exists.'
  },
  {
    feature: 'withStateChecksum',
    type: 'Option',
    isExtendable: true,
    explanation:
      'Skips emissions when computed checksums indicate no meaningful state change.'
  },
  {
    feature: 'withFreezeState',
    type: 'Controller',
    isExtendable: false,
    explanation:
      'Freezes state objects in development mode to prevent accidental mutation.'
  },
  {
    feature: 'frozenVault',
    type: 'Controller',
    isExtendable: false,
    explanation:
      'Prevents all state updates, effectively placing the Vault into a read-only snapshot mode.'
  }
];
