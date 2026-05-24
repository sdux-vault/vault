import { BehaviorContext } from '../../../contexts/behavior.context';
import { FeatureCellExtensionContext } from '../../../contexts/feature-cell-extension.context';
import { FeatureCellBaseShape } from '../../../shapes/feature-cell/feature-cell.base.shape';

import { BehaviorType } from '../../../types/behavior/behavior.type';

/** Function signature for behavior extension methods added to the FeatureCell. */
// eslint-disable-next-line
export type BehaviorExtFunction = (...args: any[]) => unknown;

/**
 * A map of extension function names to their implementation functions.
 * Behaviors may return these objects to expose additional APIs on the
 * FeatureCell instance. Keys correspond to method names added to the
 * cell’s public API surface.
 */
export type BehaviorExtension = Partial<Record<string, BehaviorExtFunction>>;

/**
 * Base interface implemented by all behavior types in the Vault pipeline.
 *
 * Behaviors participate in specific pipeline stages based on their declared
 * BehaviorType, and may optionally expose additional FeatureCell APIs through
 * the extendCellAPI hook.
 */
export interface BehaviorContract<
  T = unknown,
  E extends BehaviorExtension = BehaviorExtension
> {
  /**
   * Pipeline classification for this behavior used to determine execution order.
   */
  readonly type: BehaviorType;

  /**
   * Unique identifier assigned to this behavior instance.
   */
  readonly key: string;

  /**
   * Whether this behavior is critical for pipeline error handling.
   */
  readonly critical: boolean;

  /**
   * Extension function names this behavior is permitted to override.
   */
  allowOverride?: string[];

  /**
   * Extends the FeatureCell with additional APIs backed by this behavior.
   *
   * @param ctx - Extension context used to observe state and merge updates.
   * @returns The extension API surface, or void if no extensions are provided.
   */
  extendCellAPI?(ctx: FeatureCellExtensionContext<T>): E | void;

  /**
   * Teardown hook invoked when the behavior instance is destroyed.
   *
   * @param ctx - Pipeline behavior context.
   */
  destroy(ctx?: BehaviorContext<T>): void;

  /**
   * Resets the behavior to its initial state.
   *
   * @param ctx - Pipeline behavior context.
   */
  reset(ctx?: BehaviorContext<T>): void;

  /**
   * Installs fluent configuration APIs onto a FeatureCell instance.
   *
   * @param cell - FeatureCell instance to augment.
   * @param behaviorConfigs - Registry used to store behavior configuration.
   */
  installFluentApi?: <T>(
    cell: FeatureCellBaseShape<T>,
    behaviorConfigs: Map<string, unknown>
  ) => void;
}
