import { SDuXShape } from '../public-api';

/**
 * Extends the global Window object with optional SDuX monitoring and DevTools references.
 * This declaration defines the global attachment points used to expose runtime singletons.
 */
declare global {
  /** Augments the global Window with an optional SDuX runtime attachment point. */
  interface Window {
    /**
     * Optional container for globally exposed SDuX runtime instances.
     */
    sdux?: SDuXShape;
  }

  /**
   * Optional global reference to SDuX runtime instances.
   */
  var sdux: SDuXShape | undefined;
}

export {};
