import { EventShape } from '@sdux-vault/shared';

/**
 * Defines the shape of a Devtools message representing a pipeline event.
 * This interface provides a discriminated message contract used to transport pipeline events to Devtools consumers.
 *
 */
export interface DevtoolsPipelineMessageShape {
  /**
   * Discriminator identifying the message as a pipeline event.
   */
  type: 'VAULT_PIPELINE_EVENT';

  /**
   * The associated pipeline event payload.
   */
  event: EventShape;
}
