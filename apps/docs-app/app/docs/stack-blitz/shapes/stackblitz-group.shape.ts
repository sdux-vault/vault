import { StackBlitzExampleShape } from './stackblitz-example.shape';

/**
 * Defines the metadata used to configure a StackBlitz example group.
 */
export interface StackBlitzGroupShape {
  /**
   * Provides the heading displayed for the example group.
   */
  heading: string;

  /**
   * Provides the identifier used to reference the example group.
   */
  id: string;

  /**
   * Provides the description displayed for the example group.
   */
  description: string;

  /**
   * Provides the examples included in the group.
   */
  examples: StackBlitzExampleShape[];
}
