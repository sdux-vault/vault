import { Injectable } from '@angular/core';
import { withDistinctUntilChanged } from '@sdux-vault/addons';
import { FeatureCell, injectVault } from '@sdux-vault/angular';
import { BehaviorClassContract } from '@sdux-vault/shared';
import { BankEmployeeShape } from '../../structure/shapes/bank-employee.shape';
import { PartialWithDistinctUntilChangedAbstractClass } from './partial-operator.with-distinct-until-change.abstract';

/**
 * FeatureCell service that applies the `withDistinctUntilChanged` operator
 * to a bank-employee list. This operator prevents downstream updates when
 * the incoming value is structurally identical to the current state.
 *
 * The service extends `partialWithDistinctUntilChangedAbstractClass`, which
 * provides the shared setup and state contract required by this scenario.
 *
 * The FeatureCell is registered under the key
 * `partial-operator-with-distinct-until-changed` and manages a signal-backed
 * array of `BankEmployeeShape` items. Once constructed, the service
 * initializes the FeatureCell pipeline and enables the operator.
 *
 * @typeParam T - The state type managed by this FeatureCell, fixed to
 * `BankEmployeeShape[]` for this implementation.
 */
@FeatureCell<BankEmployeeShape[]>(
  'partial-operator-with-distinct-until-changed'
)
@Injectable({
  providedIn: 'root'
})
export class PartialWithDistinctUntilChangedService extends PartialWithDistinctUntilChangedAbstractClass<
  BankEmployeeShape[]
> {
  /**
   * Creates a new instance of the service and initializes the FeatureCell
   * pipeline with the `withDistinctUntilChanged` operator.
   *
   * The operator is provided through the behavior system and suppresses
   * emissions when the next incoming state is equivalent to the previous
   * one. This helps reduce unnecessary recomputation and UI updates.
   */
  constructor() {
    super(
      injectVault<BankEmployeeShape[]>(PartialWithDistinctUntilChangedService)
    );
  }

  initialize(): void {
    const operators: BehaviorClassContract<BankEmployeeShape[]>[] = [
      withDistinctUntilChanged()
    ];

    this.vault.operators(operators).initialize();
  }

  initializeWithError(): void {
    const operators: BehaviorClassContract<BankEmployeeShape[]>[] = [
      withDistinctUntilChanged(() => {
        throw new Error('this is a distinct until change error');
      })
    ];

    this.vault.operators(operators).initialize();
  }

  initializeWithComparison(): void {
    const operators: BehaviorClassContract<BankEmployeeShape[]>[] = [
      withDistinctUntilChanged((a: BankEmployeeShape[]) => {
        return a[0].id === '1';
      })
    ];

    this.vault.operators(operators).initialize();
  }
}
