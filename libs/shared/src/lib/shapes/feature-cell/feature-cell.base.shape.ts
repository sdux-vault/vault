import { Observable } from 'rxjs';
import { FeatureCellExtension } from '../../interfaces/behaviors/feature-cell-extension.interface';
import { FeatureCellFluentApi } from '../../interfaces/behaviors/feature-cell-fluent-api.interface';
import { InterceptorBehaviorClassContract } from '../../interfaces/behaviors/interceptor/interceptor-behavior-class.interface';
import { OperatorsBehaviorClassContract } from '../../interfaces/behaviors/operator/operator-behavior-class.interface';
import { StateEmitSnapshotShape } from '../../shapes/state/state-emit-snapshot.shape';
import { CoreEmitStateCallback } from '../../types/callback/core-emit-state-callback.type';
import { TapCallback } from '../../types/callback/tap-callback.type';
import { VaultErrorCallback } from '../../types/callback/vault-error-callback.type';
import { FilterFunction } from '../../types/function/filter-function.type';
import { ReducerFunction } from '../../types/function/reducer-function.type';
import { DeferredType } from '../../types/state/deferred.type';
import { StateInputType } from '../../types/state/state-input.type';

/**
 * Defines the public base contract for a FeatureCell instance.
 *
 * FeatureCellBaseShape describes the builder, lifecycle, and state update
 * surface required to configure, initialize, and interact with a FeatureCell.
 */
export interface FeatureCellBaseShape<T>
  extends FeatureCellExtension<T>,
    FeatureCellFluentApi<T> {
  /**
   * Registers tap functions executed during the "after tap" stage.
   *
   * @param afterTaps - Functions invoked after the reducer stage.
   * @returns The builder instance for fluent chaining.
   */
  afterTaps(afterTaps: TapCallback<T>[]): this;

  /**
   * Registers tap functions executed during the "before tap" stage.
   *
   * @param beforeTaps - Functions invoked before the reducer stage.
   * @returns The builder instance for fluent chaining.
   */
  beforeTaps(beforeTaps: TapCallback<T>[]): this;

  /**
   * Performs cleanup and teardown of the FeatureCell.
   * Called automatically when the cell's hosting provider is destroyed.
   */
  destroy(): void;

  /**
   * Observable that emits when the FeatureCell has been destroyed.
   */
  destroyed$?: Observable<void>;

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
   * @param errors - Error functions applied to the upstream snapshot.
   * @returns The builder instance for fluent chaining.
   */
  errors(errors: VaultErrorCallback<T>[]): this;

  /**
   * Registers filter functions to run during the filter stage.
   *
   * @param filters - Filter functions applied to the upstream snapshot.
   * @returns The builder instance for fluent chaining.
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
   * Finalizes builder configuration and activates the FeatureCell.
   *
   * @returns The builder instance, or a Promise resolving once initialization completes.
   */
  initialize(): this | void;

  /**
   * Registers interceptor behaviors executed prior to resolve.
   *
   * @param interceptors - Interceptor behavior classes.
   * @returns The builder instance for fluent chaining.
   */
  interceptors(interceptors: InterceptorBehaviorClassContract<T>[]): this;

  /**
   * Unique identifier assigned to the FeatureCell.
   */
  readonly key: string;

  /**
   * Performs a merge-style state update using the configured merge behavior.
   *
   * @param incoming - Structured state input to be merged.
   * @param options - Optional merge behavior configuration.
   */
  mergeState(incoming: StateInputType<T>, options?: unknown): void;

  /**
   * Registers operator behaviors executed before filters.
   *
   * @param operators - Operator behavior classes.
   * @returns The builder instance for fluent chaining.
   */
  operators(operators: OperatorsBehaviorClassContract<T>[]): this;

  /**
   * Registers reducer functions executed during the reducer stage.
   *
   * @param reducers - Reducer functions that transform the working state.
   * @returns The builder instance for fluent chaining.
   */
  reducers(reducers: ReducerFunction<T>[]): this;

  /**
   * Performs a replace-style state update that fully replaces the current state.
   *
   * @param incoming - Structured state input to replace the current state.
   * @param options - Optional merge behavior configuration.
   */
  replaceState(incoming: StateInputType<T>, options?: unknown): void;

  /**
   * Resets the FeatureCell to its initial state.
   */
  reset(): void;

  /**
   * Observable that emits when the FeatureCell has been reset.
   */
  reset$?: Observable<void>;

  /**
   * Observable that emits state snapshots whenever the FeatureCell state changes.
   */
  state$: Observable<StateEmitSnapshotShape<T>>;

  /**
   * Dev-mode testing hook that resolves once all pending pipeline activity has settled.
   */
  vaultSettled?: () => Promise<void>;
}
