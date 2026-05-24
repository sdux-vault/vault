import { BehaviorContext } from '../../../contexts/behavior.context';
import { InterceptorStateType } from '../../../types/interceptor-state.type';
import { BehaviorContract } from '../behavior/behavior.interface';

/**
 * Contract for interceptor behaviors that preprocess incoming state before resolve.
 */
export interface InterceptorBehaviorContract<T> extends BehaviorContract<T> {
  /**
   * Applies the interceptor logic for the incoming state packet.
   *
   * @param ctx - The behavior execution context for the current pipeline operation.
   * @returns A transformed state value, or undefined when no modification is necessary.
   */
  applyInterceptor(ctx: BehaviorContext<T>): Promise<InterceptorStateType<T>>;
}
