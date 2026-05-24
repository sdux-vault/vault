import { StateSnapshotShape } from '@sdux-vault/shared';

/**
 * Extended state snapshot used by tap and instrumentation systems.
 *
 * `ExtendedStateSnapshot<T>` builds on the base `StateSnapshot<T>` by
 * adding metadata that describes **where** in the pipeline the snapshot
 * originated.
 *
 * This additional context is useful for:
 * - debugging pipeline behavior,
 * - observing reducer / filter / interceptor transitions,
 * - analytics and developer tooling,
 * - differentiating snapshots emitted at different stages.
 *
 * @typeParam T - The resolved state value type stored by the FeatureCell.
 *
 * @property source - A short identifier describing the origin of the snapshot
 *                    (e.g., `"beforeTap"`, `"afterTap"`, `"resolve"`,
 *                    `"persist"`, or `"orchestrator"`).
 */
export interface ExtendedStateSnapshot<T> extends StateSnapshotShape<T> {
  /** Identifier describing where this snapshot was emitted within the pipeline. */
  source: string;
}
