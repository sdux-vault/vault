import { Injectable } from '@angular/core';
import { FeatureCell, injectVault } from '@sdux-vault/angular';
import {
  StateSnapshotShape,
  VaultErrorCallback,
  VaultErrorShape
} from '@sdux-vault/shared';
import { BankEmployeeShape } from '../../structure/shapes/bank-employee.shape';
import { PartialErrorServiceAbstractClass } from './partial-error-service.abstract';
import { partialPureErrorServiceCallback } from './partial-error-service.pure-callback';

/**
 * FeatureCell-backed service demonstrating the use of multiple
 * {@link VaultErrorCallback} functions within the error-handling pipeline.
 *
 * This service extends the shared abstract error service and configures
 * a FeatureCell with a sequence of error callbacks. Each callback receives
 * the normalized {@link VaultErrorShape} and an immutable {@link StateSnapshotShape},
 * allowing the implementation to record, log, or inspect failure conditions.
 *
 * The callbacks registered here execute **in the order they are provided**.
 * They do not transform the {@link VaultErrorShape}; they are invoked purely
 * for side-effect observation and diagnostic purposes.
 *
 * @typeParam T - The state type handled by the FeatureCell.
 */
@FeatureCell<BankEmployeeShape[]>('partial-error-with-callbacks')
@Injectable({
  providedIn: 'root'
})
export class partialErrorWithCallbacksService<
  T
> extends PartialErrorServiceAbstractClass<T> {
  /**
   * Constructor initializes the FeatureCell instance and configures
   * the sequence of error callbacks used for diagnostic collection.
   *
   * Each callback appends stringified diagnostic information to the
   * inherited `errors` array. The callbacks demonstrate different
   * authoring patterns:
   *
   * - inline lambda callback
   * - arrow function defined in the abstract class
   * - bound class method callback
   * - nested bound callback
   * - factory-generated pure-function callback
   */
  constructor() {
    super(injectVault<T>(partialErrorWithCallbacksService));

    /**
     * The errorCallback pipeline for the partial feature.
     *
     * ErrorCallbacks execute sequentially:
     *  1. Inline error callback
     *  2. Arrow error callback (abstract class)
     *  3. Bound class callback (abstract class)
     *  4. Nested bound callback
     *  5. Pure-function callback factory
     */
    const errorCallbacks: VaultErrorCallback<T>[] = [
      /**
       * Inline ErrorCallback (#1)
       * -------------------------
       * Records the error message and state snapshot directly.
       */
      (error: VaultErrorShape, state: Readonly<StateSnapshotShape<T>>) => {
        this.errors.push(`inline-${error.message}`);
        this.transformStateError(state);
      },

      /**
       * Arrow ErrorCallback (#2)
       * -------------------------
       * Implemented in the abstract base class.
       */
      this.partialArrowErrorCallback,

      /**
       * Bound Class ErrorCallback (#3)
       * -------------------------------
       * Instance method from the abstract class using explicit binding.
       */
      this.partialBoundErrorCallback.bind(this),

      /**
       * Nested ErrorCallback (#4)
       * -------------------------
       * Demonstrates support for multi-level callback delegation.
       */
      this.partialNestedErrorCallback.bind(this),

      /**
       * Pure-Function ErrorCallback (#5)
       * --------------------------------
       * Factory-generated callback that logs both message and snapshot.
       */
      partialPureErrorServiceCallback(this.errors, this.transformError)
    ];

    // Register and initialize the error callback pipeline within the FeatureCell.
    this.vault
      .errors(errorCallbacks)
      .filters([
        () => {
          throw new Error('this is a filter error');
        }
      ])
      .initialize();
  }
}
