import { ControllerContext } from '../../contexts/controller.context';
import { ControllerMessageTypes } from '../../types/controller/controller-message.type';
import { ControllerMessageBaseShape } from './controller-message-base.shape';

/** Message shape dispatched to controllers when a pipeline operation succeeds. */
export interface ControllerSuccessMessageShape<
  T
> extends ControllerMessageBaseShape {
  /** Discriminant identifying this as a success message. */
  type: typeof ControllerMessageTypes.Success;

  /** Controller context for the current pipeline operation. */
  ctx: ControllerContext<T>;
}
