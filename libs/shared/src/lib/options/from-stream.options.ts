/**
 * Configuration options for stream-based state observation.
 */
export interface FromStreamOptions {
  /**
   * When true (default), any successful `next` clears the error state.
   */
  autoResetError?: boolean;
}
