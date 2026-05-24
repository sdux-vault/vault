/**
 * Configuration options for the fromStream resolve behavior.
 */
export interface FromStreamOptions {
  /**
   * When true (default), any successful `next` clears the error state.
   */
  autoResetError?: boolean;
}
