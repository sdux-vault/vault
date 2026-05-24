import { Injectable } from '@angular/core';
import { FeatureCell, injectVault } from '@sdux-vault/angular';
import { CoreEmitStateCallback, StateSnapshotShape } from '@sdux-vault/shared';
import { BankEmployeeShape } from '../../structure/shapes/bank-employee.shape';
import { PartialStateWithCallbacksAbstractClass } from './partial-state-with-emit-callbacks.abstract';
import { partialPureEmitStateWithCallback } from './partial-state-with-emit-callbacks.pure-callback';

@FeatureCell<BankEmployeeShape[]>('partial-state-with-emit-callbacks')
@Injectable({
  providedIn: 'root'
})
export class PartialStateWithEmitCallbacksService<
  T
> extends PartialStateWithCallbacksAbstractClass<T> {
  constructor() {
    super(injectVault<T>(PartialStateWithEmitCallbacksService));
  }

  initializeSuccessEmitStateCallbacksTest(): void {
    const stateCallbacks: CoreEmitStateCallback<T>[] = [
      /**
       * Inline StateCallback (#1)
       * -------------------------
       * Records the state message and state snapshot directly.
       */
      (snapshot: Readonly<StateSnapshotShape<T>>) => {
        this.states.push(`inline-${snapshot.hasValue}`);
        //eslint-disable-next-line
        this.states.push(JSON.stringify((snapshot as any)?.value?.[0]));
      },

      /**
       * Arrow StateCallback (#2)
       * -------------------------
       * Implemented in the abstract base class.
       */
      this.partialArrowEmitStateCallback,

      /**
       * Bound Class StateCallback (#3)
       * -------------------------------
       * Instance method from the abstract class using explicit binding.
       */
      this.partialBoundEmitStateCallback.bind(this),

      /**
       * Nested StateCallback (#4)
       * -------------------------
       * Demonstrates support for multi-level callback delegation.
       */
      this.partialNestedEmitStateCallback.bind(this),

      /**
       * Pure-Function StateCallback (#5)
       * --------------------------------
       * Factory-generated callback that logs both message and snapshot.
       */
      partialPureEmitStateWithCallback(this.states)
    ];

    // Register and initialize the state callback pipeline within the FeatureCell.
    this.vault.emitStates(stateCallbacks).initialize();
  }

  initializeErrorEmitStateCallbacksTest(): void {
    const stateCallbacks: CoreEmitStateCallback<T>[] = [
      /**
       * Arrow StateCallback (#2)
       * -------------------------
       * Implemented in the abstract base class.
       */

      this.partialArrowEmitStateCallback,

      /**
       * Inline StateCallback (#1)
       * -------------------------
       * Records the state message and state snapshot directly.
       */
      () => {
        throw new Error('this is a emit state callback error');
      },

      /**
       * Bound Class StateCallback (#3)
       * -------------------------------
       * Instance method from the abstract class using explicit binding.
       */
      this.partialBoundEmitStateCallback.bind(this)
    ];

    // Register and initialize the state callback pipeline within the FeatureCell.
    this.vault.emitStates(stateCallbacks).initialize();
  }
}
