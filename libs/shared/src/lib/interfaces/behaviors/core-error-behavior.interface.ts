import { VaultErrorShape } from '../../shapes';
import { BehaviorContract } from './behavior/behavior.interface';

/**
 * Contract for behaviors that normalize raw errors into structured vault errors.
 */
export interface CoreErrorBehaviorContract<T> extends BehaviorContract<T> {
  /**
   * Converts an unknown error value into a normalized vault error shape.
   *
   * @param error - The raw error value captured during execution.
   * @param featureCellKey - The FeatureCell key where the error originated.
   * @returns A normalized vault error representation.
   */
  handleError(error: unknown, featureCellKey: string): VaultErrorShape;
}
