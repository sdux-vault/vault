import { ControllerContext } from '../../contexts/controller.context';
import { ControllerMessageTypes } from '../../types/controller/controller-message.type';
import { VaultErrorShape } from '../vault-error.shape';
import { ControllerMessageBaseShape } from './controller-message-base.shape';

/** Message shape dispatched to controllers when a pipeline operation fails. */
export interface ControllerFailMessageShape<
  T
> extends ControllerMessageBaseShape {
  /** Discriminant identifying this as a failure message. */
  type: typeof ControllerMessageTypes.Failure;

  /** Controller context for the current pipeline operation. */
  ctx: ControllerContext<T>;

  /** Error that caused the pipeline failure. */
  error: VaultErrorShape | unknown;
}
