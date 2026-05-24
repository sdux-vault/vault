import { withDistinctUntilChanged } from '@sdux-vault/addons';
import { FeatureCellShape } from '@sdux-vault/angular';
import {
  BehaviorClassContract,
  FilterFunction,
  ReducerFunction,
  StateSnapshotShape,
  TapCallback,
  VaultErrorCallback,
  VaultErrorShape
} from '@sdux-vault/shared';
import { PartialWithDistinctUntilChangedAbstractClass } from '../../01-partial-tests/p180-with-distinct-until-change-operator/partial-operator.with-distinct-until-change.abstract';
import { PartialFilterAbstractClass } from '../../01-partial-tests/p190-filters/partial-filter.abstract';
import { partialFilterStartDateAfter } from '../../01-partial-tests/p190-filters/partial-filter.pure-functions';
import { PartialReducerAbstractClass } from '../../01-partial-tests/p200-reducers/partial-reducer.abstract';
import { ExtendedStateSnapshot } from '../../01-partial-tests/p250-partial-tap/interfaces/extended-state-snap-shot.interface';
import { PartialTapAbstractClass } from '../../01-partial-tests/p250-partial-tap/partial-tap.abstract';
import { partialPureTapFunction } from '../../01-partial-tests/p250-partial-tap/partial-tap.pure-functions';
import { PartialErrorServiceAbstractClass } from '../../01-partial-tests/p280-error-service/partial-error-service.abstract';
import { partialPureErrorServiceCallback } from '../../01-partial-tests/p280-error-service/partial-error-service.pure-callback';
import { PartialStepwiseAbstractClass } from '../../01-partial-tests/p370-stepwise/partial-stepwise.abstract';
import { BankEmployeeShape } from '../shapes/bank-employee.shape';
import { PrimaryPartialAbstractClass } from './primary-partial.abstract';

/**
 * PrimaryFullAbstractClass
 * ------------------------
 * Abstract base class for full-pipeline FeatureCell integrations used in
 * higher-level test flows and scenario compositions.
 *
 * This class extends `PrimaryPartialAbstractClass` and represents the
 * **complete integration layer** for a FeatureCell, including support for
 * reducers, filters, operators, and interceptors.
 *
 * Concrete subclasses supply a typed `FeatureCellModel<T>` and use
 * the inherited helpers provided by the partial/primary abstractions to
 * register pipeline behaviors during construction.
 *
 * Responsibilities
 * ----------------
 * - Provides the foundation for fully configured FeatureCell pipelines.
 * - Ensures that concrete implementations have access to all shared reducer,
 *   filter, and operator utility classes.
 * - Acts as the final abstract layer before concrete integration test
 *   services derive from it.
 *
 * @typeParam T - The state type managed by the FeatureCell instance.
 */
export abstract class PrimaryFullAbstractClass<
  T
> extends PrimaryPartialAbstractClass<T> {
  partialStepwiseClass: PartialStepwiseAbstractClass<T>;

  /** Operator utilities shared across operator integration tests. */
  partialWithDistinctUntilChangedAbstract: PartialWithDistinctUntilChangedAbstractClass<T>;

  /** Filter utilities shared with other integration test cells. */
  partialFilterAbstract: PartialFilterAbstractClass<T>;

  /** Reducer utilities shared with other test flows. */
  partialReducerAbstract: PartialReducerAbstractClass<T>;

  /** Tap utilities shared across beforeTap integration tests. */
  partialBeforeTapAbstract: PartialTapAbstractClass<T>;

  /** Tap utilities shared across afterTap integration tests. */
  partialAfterTapAbstract: PartialTapAbstractClass<T>;

  /** Error Service utilities shared across Error Service integration tests. */
  partialErrorAbstract: PartialErrorServiceAbstractClass<T>;

  /**
   * Constructs a full-pipeline FeatureCell with interceptors, operators,
   * filters, and reducers.
   */
  constructor(vault: FeatureCellShape<T>) {
    super(vault);

    this.partialWithDistinctUntilChangedAbstract =
      new PartialWithDistinctUntilChangedAbstractClass(this.vault);
    this.partialFilterAbstract = new PartialFilterAbstractClass(this.vault);
    this.partialReducerAbstract = new PartialReducerAbstractClass(this.vault);
    this.partialBeforeTapAbstract = new PartialTapAbstractClass(
      this.vault,
      'Before'
    );
    this.partialAfterTapAbstract = new PartialTapAbstractClass(
      this.vault,
      'After'
    );
    this.partialErrorAbstract = new PartialErrorServiceAbstractClass(
      this.vault
    );
    this.partialStepwiseClass = new PartialStepwiseAbstractClass(this.vault);
  }

  /**
   * Registers operator behaviors for the pipeline.
   *
   * Currently includes:
   * - `withDistinctUntilChanged()` — suppress consecutive identical emissions.
   *
   * @returns Array of operator behavior classes.
   */
  protected addOperators(): BehaviorClassContract<T>[] {
    return [withDistinctUntilChanged()];
  }

  /**
   * Registers operator behaviors that intentionally throw errors.
   *
   * This helper is used exclusively in integration tests to verify that
   * error propagation inside the **operator stage** behaves correctly.
   *
   * The returned operator list contains one behavior:
   *
   * - `withDistinctUntilChanged(() => { throw ... })`
   *   Forces an exception during execution of the distinct-until-changed
   *   comparison callback, allowing the pipeline to confirm that errors
   *   are surfaced through the orchestrator and recorded by the monitor.
   *
   * @returns An array containing a single operator behavior that always throws.
   */
  protected addOperatorErrors(): BehaviorClassContract<T>[] {
    return [
      withDistinctUntilChanged(() => {
        throw new Error('this is a distinct until change error');
      })
    ];
  }

  /**
   * Registers reducer functions.
   *
   * Reducer chain:
   * 1. Adds `isSenior` derived flag
   * 2. Adds `fullName`
   * 3. Adds boolean type flag (bound class method)
   *
   * @returns Reducer functions in evaluation order.
   */
  protected addReducers(): ReducerFunction<T>[] {
    return [
      (employees) =>
        this.partialReducerAbstract.partialReducerStandaloneMethod(
          employees as BankEmployeeShape[]
        ),
      //eslint-disable-next-line
      this.partialReducerAbstract.partialReducerArrowMethod as any,
      this.partialReducerAbstract.partialReducerBoundMethod.bind(this)
    ];
  }

  /**
   * Registers reducer functions that intentionally throw errors.
   *
   * This helper validates **reducer-stage error handling**, ensuring that
   * the orchestrator:
   *  - catches reducer failures,
   *  - reports them to the monitor,
   *  - and preserves pipeline stability.
   *
   * Only a single reducer is returned, and it always throws when invoked.
   *
   * @returns A reducer list containing one reducer that throws immediately.
   */
  protected addReducerErrors(): ReducerFunction<T>[] {
    return [
      () => {
        throw new Error('this is a reducer error');
      }
    ];
  }

  /**
   * Registers filter behaviors.
   *
   * Filter chain:
   * 1. Inline: active status
   * 2. Salary filter
   * 3. City-bound filter
   * 4. Date-after filter (pure function)
   *
   * @returns Filter functions in execution order.
   */
  protected addFilters(): FilterFunction<T>[] {
    return [
      (employees: BankEmployeeShape[]) =>
        employees.filter((employee) => employee.status === 'Active'),
      //eslint-disable-next-line
      this.partialFilterAbstract.partialFilterArrowMethod as any,
      this.partialFilterAbstract.partialFilterBoundMethod.bind(this),
      partialFilterStartDateAfter('2020-01-01')
    ];
  }

  /**
   * Registers filter functions that intentionally throw errors.
   *
   * Used to validate **filter-stage error handling**, this helper ensures
   * SDuX correctly captures filter failures and emits the appropriate
   * error lifecycle events without corrupting FeatureCell state.
   *
   * @returns A filter list containing one filter that always throws.
   */
  protected addFilterErrors(): FilterFunction<T>[] {
    return [
      () => {
        throw new Error('this is a filter error');
      }
    ];
  }

  /**
   * Registers beforeTap behaviors.
   *
   * @returns BeforeTap functions.
   */
  protected addBeforeTaps(): TapCallback<T>[] {
    return [
      this.partialBeforeTapAbstract.partialArrowTapFunction,
      this.partialBeforeTapAbstract.partialInlineTapFunction.bind(
        this.partialBeforeTapAbstract
      ),
      this.partialBeforeTapAbstract.partialNestedTapFunction.bind(
        this.partialBeforeTapAbstract
      ),
      (value): void => {
        const extendedTap = { value } as ExtendedStateSnapshot<T>;
        extendedTap.source = 'partialAnonymousBeforeTapFunction';
        this.partialBeforeTapAbstract.taps.push(extendedTap);
      },
      partialPureTapFunction<T>(
        'partialPureFunctionBeforeTap',
        this.partialBeforeTapAbstract.taps
      )
    ];
  }

  /**
   * Registers before-tap functions that intentionally throw errors.
   *
   * This helper verifies SDuX's behavior when a **beforeTap** callback
   * throws during tap execution. The test ensures that:
   *
   * - the tap is still recorded prior to throwing,
   * - the monitor emits an error event,
   * - and pipeline flow continues according to contract.
   *
   * A single tap is registered.
   * It both records its invocation and immediately throws an error.
   *
   * @returns A list containing one error-throwing beforeTap function.
   */
  protected addBeforeTapErrors(): TapCallback<T>[] {
    return [
      (value): void => {
        const extendedTap = { value } as ExtendedStateSnapshot<T>;
        extendedTap.source = 'partialAnonymousErrorBeforeTapFunction';
        this.partialBeforeTapAbstract.taps.push(extendedTap);
        throw new Error('this is the before tap error message');
      }
    ];
  }

  /**
   * Registers afterTap behaviors.
   *
   * @returns afterTap functions.
   */
  protected addAfterTaps(): TapCallback<T>[] {
    return [
      this.partialAfterTapAbstract.partialArrowTapFunction,
      this.partialAfterTapAbstract.partialInlineTapFunction.bind(
        this.partialAfterTapAbstract
      ),
      this.partialAfterTapAbstract.partialNestedTapFunction.bind(
        this.partialAfterTapAbstract
      ),
      (value): void => {
        const extendedTap = { value } as ExtendedStateSnapshot<T>;
        extendedTap.source = 'partialAnonymousAfterTapFunction';
        this.partialAfterTapAbstract.taps.push(extendedTap);
      },
      partialPureTapFunction<T>(
        'partialPureFunctionAfterTap',
        this.partialAfterTapAbstract.taps
      )
    ];
  }

  /**
   * Registers after-tap functions that intentionally throw errors.
   *
   * This helper verifies SDuX's behavior when a **afterTap** callback
   * throws during tap execution. The test ensures that:
   *
   * - the tap is still recorded prior to throwing,
   * - the monitor emits an error event,
   * - and pipeline flow continues according to contract.
   *
   * A single tap is registered.
   * It both records its invocation and immediately throws an error.
   *
   * @returns A list containing one error-throwing afterTap function.
   */
  protected addAfterTapErrors(): TapCallback<T>[] {
    return [
      (value): void => {
        const extendedTap = { value } as ExtendedStateSnapshot<T>;
        extendedTap.source = 'partialAnonymousErrorAfterTapFunction';
        this.partialAfterTapAbstract.taps.push(extendedTap);
        throw new Error('this is the after tap error message');
      }
    ];
  }

  /**
   * Registers a sequence of error callback functions used to validate SDuX's
   * error-handling pipeline behavior.
   *
   * This helper constructs a predictable set of {@link VaultErrorCallback}
   * functions that are invoked when an error is emitted by the pipeline.
   *
   * These callbacks collectively verify that SDuX:
   * - correctly forwards the normalized {@link VaultErrorShape} into each callback,
   * - passes the immutable {@link StateSnapshotShape} associated with the failure,
   * - preserves execution order across inline, arrow, bound, and nested callbacks,
   * - and records results without altering pipeline flow.
   *
   * The callback list intentionally includes multiple callback types:
   *
   * 1. **Inline callback** — records the error message and captured state.
   * 2. **Arrow callback** — defined in the abstract base class.
   * 3. **Bound callback** — instance method bound to the abstract class context.
   * 4. **Nested callback** — deep method call chain defined in the abstract class.
   * 5. **Pure callback (factory-generated)** — produces a callback that serializes
   *    the error and state for verification.
   *
   * These callbacks are used exclusively in integration tests to assert the
   * correctness and stability of SDuX's error callback semantics.
   *
   * @returns An ordered list of error callback functions executed by the pipeline.
   */
  protected addErrorCallbacks(): VaultErrorCallback<T>[] {
    return [
      (error: VaultErrorShape, state: Readonly<StateSnapshotShape<T>>) => {
        this.partialErrorAbstract.errors.push(`inline-${error.message}`);
        this.partialErrorAbstract.transformStateError(state);
      },

      this.partialErrorAbstract.partialArrowErrorCallback,

      this.partialErrorAbstract.partialBoundErrorCallback.bind(
        this.partialErrorAbstract
      ),
      this.partialErrorAbstract.partialNestedErrorCallback.bind(
        this.partialErrorAbstract
      ),

      partialPureErrorServiceCallback(
        this.partialErrorAbstract.errors,
        this.partialErrorAbstract.transformError
      )
    ];
  }
}
