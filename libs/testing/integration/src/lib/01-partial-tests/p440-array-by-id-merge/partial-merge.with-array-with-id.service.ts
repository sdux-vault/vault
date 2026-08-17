import { Injectable } from '@angular/core';
import { FeatureCell, injectVault } from '@sdux-vault/angular';
import { PrimaryPartialAbstractClass } from '../../structure/services/primary-partial.abstract';
import { BankEmployeeShape } from '../../structure/shapes/bank-employee.shape';

/**
 * FeatureCell configured to use the **Array By Id Merge** strategy.
 *
 * This service registers a FeatureCell under the key:
 *
 * ```
 * partial-merge.with-array-with-id
 * ```
 */
@FeatureCell<BankEmployeeShape[]>('partial-merge.with-array-by-id')
@Injectable({
  providedIn: 'root'
})
export class PartialMergeWithArrayWithIdService extends PrimaryPartialAbstractClass<
  BankEmployeeShape[]
> {
  /**
   * Constructor
   */
  constructor() {
    super(injectVault<BankEmployeeShape[]>(PartialMergeWithArrayWithIdService));
  }

  initialize(): void {
    // Initialize the FeatureCell using the default merge behavior.
    this.vault.withArrayMergeId?.({ idKey: 'id' });
    this.vault.initialize();
  }
}
