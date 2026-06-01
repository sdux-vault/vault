import { ControllerMessageTypes } from '../../types/controller/controller-message.type';
import { ControllerMessageBaseShape } from './controller-message-base.shape';

/** Message shape dispatched to controllers when a pipeline operation finalizes. */
export interface ControllerFinalizeMessageShape extends ControllerMessageBaseShape {
  /** Discriminant identifying this as a finalize message. */
  type: typeof ControllerMessageTypes.Finalize;
}
