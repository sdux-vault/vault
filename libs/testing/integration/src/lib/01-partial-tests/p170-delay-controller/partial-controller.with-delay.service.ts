import { Injectable } from '@angular/core';
import { FeatureCell, injectVault } from '@sdux-vault/angular';
import { PrimaryPartialAbstractClass } from '../../structure/services/primary-partial.abstract';
import { BankEmployeeShape } from '../../structure/shapes/bank-employee.shape';

@FeatureCell<BankEmployeeShape[]>('partial-controller.delay')
@Injectable({
  providedIn: 'root'
})
export class PartialWithDelayService extends PrimaryPartialAbstractClass<
  BankEmployeeShape[]
> {
  /**
   * Constructor
   */
  constructor() {
    super(injectVault<BankEmployeeShape[]>(PartialWithDelayService));
  }

  initialize(): void {
    /**
     * Controller Chain:
     * -------------------
     * 1. Delay(1000ms)
     */

    this.vault.withDelay?.({ millisecondDelay: 1_000 }).initialize();
  }
}
