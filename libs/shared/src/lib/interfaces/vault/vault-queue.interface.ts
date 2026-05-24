/**
 * Base interface describing the minimal contract for any Vault queue implementation.
 *
 * All custom queue types must implement this interface.
 */
export interface VaultQueueContract {
  /**
   * Enqueues a task to be executed.
   * Implementations may run the task synchronously, asynchronously, or with custom scheduling.
   */
  enqueue(task: () => Promise<void> | void, cellKey: string): void;
}
