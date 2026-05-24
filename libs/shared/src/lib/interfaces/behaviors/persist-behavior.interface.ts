import { PipelinePersistValue } from '../../types/pipeline/pipeline-persist-value.type';
import { BehaviorContract } from './behavior/behavior.interface';

/**
 * Contract for persistence behaviors that save and restore FeatureCell state.
 */
export interface PersistBehaviorContract<T> extends BehaviorContract<T> {
  /** Identifies this behavior as a persistence behavior. */
  type: 'persist';

  /**
   * Persists the current state snapshot to the configured storage.
   *
   * @param current - The pipeline persist value to store.
   */
  persistState(current: PipelinePersistValue<T>): Promise<void> | void;

  /** Clears the persisted state from storage. */
  clearState(): void;

  /**
   * Loads the previously persisted state from storage.
   *
   * @returns The restored persist value.
   */
  loadState(): PipelinePersistValue<T>;
}
