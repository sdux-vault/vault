import { Injectable } from '@angular/core';
import { FeatureCell, injectVault } from '@sdux-vault/angular';
import { PrimaryPartialAbstractClass } from '../../structure/services/primary-partial.abstract';
import { BankEmployeeShape } from '../../structure/shapes/bank-employee.shape';

@FeatureCell<BankEmployeeShape>('partial-merge.with-array-push')
@Injectable({
  providedIn: 'root'
})
export class partialMergeWithArrayPushService extends PrimaryPartialAbstractClass<BankEmployeeShape> {
  /**
   * Constructor
   */
  constructor() {
    super(injectVault<BankEmployeeShape>(partialMergeWithArrayPushService));

    // Initialize the FeatureCell using the default merge behavior.
    this.vault.initialize();
  }
}
