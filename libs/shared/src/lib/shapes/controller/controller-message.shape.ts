import { ControllerAttemptMessageShape } from './controller-attempt-message.shape';
import { ControllerFailMessageShape } from './controller-fail-message.shape';
import { ControllerFinalizeMessageShape } from './controller-finalize-message.shape';
import { ControllerSuccessMessageShape } from './controller-success-message.shape';

/** Discriminated union of all controller message shapes. */
export type ControllerMessageShape<T> =
  | ControllerAttemptMessageShape<T>
  | ControllerSuccessMessageShape<T>
  | ControllerFailMessageShape<T>
  | ControllerFinalizeMessageShape;
