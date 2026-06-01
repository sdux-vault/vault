import { ControllerContext } from '../../contexts/controller.context';
import { ControllerMessageTypes } from '../../types/controller/controller-message.type';
import { ControllerMessageBaseShape } from './controller-message-base.shape';

/** Message shape dispatched to controllers during a pipeline attempt. */
export interface ControllerAttemptMessageShape<
  T
> extends ControllerMessageBaseShape {
  /** Discriminant identifying this as an attempt message. */
  type: typeof ControllerMessageTypes.Attempt;

  /** Controller context for the current pipeline operation. */
  ctx: ControllerContext<T>;
}
