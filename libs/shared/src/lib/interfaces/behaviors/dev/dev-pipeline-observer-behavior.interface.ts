import { VaultErrorShape } from '../../../shapes/vault-error.shape';
import { BehaviorContract } from '../behavior/behavior.interface';

/**
 * Behavior contract for observing pipeline execution events in development mode.
 *
 * This interface defines the lifecycle hooks and notification methods used by
 * a dev-only pipeline observer behavior to track execution boundaries and
 * propagate success or error signals associated with a FeatureCell run.
 */
export interface DevPipelineObserverBehaviorContract extends BehaviorContract {
  /**
   * Signals the start of a pipeline execution cycle.
   */
  beginRun(): void;

  /**
   * Emits a successful pipeline completion event for a FeatureCell.
   *
   * @param cellKey - The unique key of the FeatureCell that completed successfully.
   */
  emitSuccess(cellKey: string): void;

  /**
   * Emits a pipeline error event for a FeatureCell.
   *
   * @param cellKey - The unique key of the FeatureCell that encountered an error.
   * @param error - The normalized error associated with the failed execution.
   */
  emitError(cellKey: string, error: VaultErrorShape): void;
}
