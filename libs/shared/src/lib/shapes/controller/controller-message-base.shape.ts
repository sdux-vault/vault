import { ControllerMessageType } from '../../types/controller/controller-message.type';

/** Base shape shared by all controller message variants. */
export interface ControllerMessageBaseShape {
  /** Discriminant identifying the message type. */
  type: ControllerMessageType;

  /** Trace identifier linking this message to a pipeline operation. */
  traceId: string;
}
