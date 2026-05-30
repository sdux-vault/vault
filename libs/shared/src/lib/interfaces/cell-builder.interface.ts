import { CoreEmitStateCallback } from '../types/callback/core-emit-state-callback.type';
import { TapCallback } from '../types/callback/tap-callback.type';
import { VaultErrorCallback } from '../types/callback/vault-error-callback.type';
import { FilterFunction } from '../types/function/filter-function.type';
import { ReducerFunction } from '../types/function/reducer-function.type';
import { DeferredType } from '../types/state/deferred.type';
import { FeatureCellExtension } from './behaviors/feature-cell-extension.interface';
import { FeatureCellFluentApi } from './behaviors/feature-cell-fluent-api.interface';
import { InterceptorBehaviorClassContract } from './behaviors/interceptor/interceptor-behavior-class.interface';
import { OperatorsBehaviorClassContract } from './behaviors/operator/operator-behavior-class.interface';

/**
 * Defines the builder contract used to configure and initialize a FeatureCell.
 * This interface exposes the fluent configuration surface for registering behaviors, callbacks, and operators prior to activation.
 */
export interface CellBuilderContract<T>
  extends FeatureCellExtension<T>,
    FeatureCellFluentApi<T> {
  /**
   * Registers functions executed during the "after tap" stage.
   *
   * @param afterTaps - Tap functions invoked after reducers.
   * @returns The same builder instance for fluent chaining.
   */
  afterTaps(afterTaps: TapCallback<T>[]): this;

  /**
   * Registers functions executed during the "before tap" stage.
   *
   * @param beforeTaps - Tap functions invoked before reducers.
   * @returns The same builder instance for fluent chaining.
   */
  beforeTaps(beforeTaps: TapCallback<T>[]): this;

  /**
   * Map of behavior configuration values keyed by behavior configuration identifiers.
   */
  behaviorConfigs: Map<string, unknown>;
  /**
   * Registers emitState functions executed during the emitState stage.
   *
   * @param emitStates - EmitState callbacks invoked during state changes.
   * @returns The builder instance for fluent chaining.
   */
  emitStates(emitStates: CoreEmitStateCallback<T>[]): this;

  /**
   * Registers error functions to run during the error stage.
   *
   * @param errors - Error functions that may block or transform values.
   * @returns The same builder instance for fluent chaining.
   */
  errors(errors: VaultErrorCallback<T>[]): this;

  /**
   * Registers filter functions to run during the filter stage.
   *
   * @param filters - Filter functions that may block or transform values.
   * @returns The same builder instance for fluent chaining.
   */
  filters(filters: FilterFunction<T>[]): this;

  /**
   * Registers a deferred hydration source for the FeatureCell.
   *
   * @param incoming - Deferred value used to hydrate the cell state.
   * @returns The builder instance for fluent chaining.
   */
  hydrate(incoming: DeferredType<T>): this;

  /**
   * Finalizes the builder configuration and activates the FeatureCell.
   */
  initialize(): void;

  /**
   * Registers interceptor behaviors that preprocess incoming state before resolve.
   *
   * @param interceptors - Interceptor behavior classes.
   * @returns The same builder instance for fluent chaining.
   */
  interceptors(interceptors: InterceptorBehaviorClassContract<T>[]): this;

  /**
   * Registers operator behaviors executed prior to filtering.
   *
   * @param operators - Operator behavior classes that may transform or block updates.
   * @returns The same builder instance for fluent chaining.
   */
  operators(operators: OperatorsBehaviorClassContract<T>[]): this;

  /**
   * Registers a sequence of reducer functions to run during the reducer stage.
   *
   * @param reducers - Ordered reducer functions applied to the working state.
   * @returns The same builder instance for fluent chaining.
   */
  reducers(reducers: ReducerFunction<T>[]): this;
}
