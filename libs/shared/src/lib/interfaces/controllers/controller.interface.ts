import type { Observable } from 'rxjs';
import { ControllerMessageShape } from '../../shapes/controller/controller-message.shape';
import { FeatureCellBaseShape } from '../../shapes/feature-cell/feature-cell.base.shape';
import { ControllerVote } from '../../types/controller/controller-vote.type';
import { ControllerType } from '../../types/controller/controller.type';

/** Instance-side contract that all controllers must implement. */
export interface ControllerContract<T = unknown> {
  /** Controller category classification. */
  readonly type: ControllerType;

  /** Unique identifier for this controller instance. */
  readonly key: string;

  /** Whether errors from this controller halt the pipeline. */
  readonly critical: boolean;

  /**
   * Processes an incoming controller message and returns a vote.
   *
   * @param msg - The controller message to evaluate.
   * @returns An observable emitting the controller vote or void.
   */
  handleMessage(
    msg: ControllerMessageShape<T>
  ): Observable<ControllerVote | void>;

  /** Tears down the controller and releases resources. */
  destroy(): void;

  /** Resets the controller to its initial state. */
  reset(): void;

  /**
   * Optional hook that installs a fluent API onto the FeatureCell.
   *
   * @param cell - The FeatureCell shape to extend.
   * @param behaviorConfigs - Map of behavior configuration entries.
   */
  installFluentApi?: <T>(
    cell: FeatureCellBaseShape<T>,
    behaviorConfigs: Map<string, unknown>
  ) => void;
}
