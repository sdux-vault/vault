import { Injectable } from '@angular/core';
import { FeatureCell, injectVault } from '@sdux-vault/angular';
import { PrimaryPartialAbstractClass } from '../../structure/services/primary-partial.abstract';
import { BankEmployeeShape } from '../../structure/shapes/bank-employee.shape';

@FeatureCell<BankEmployeeShape[]>('partial-policy.throttle')
@Injectable({
  providedIn: 'root'
})
export class PartialWithThrottleService extends PrimaryPartialAbstractClass<
  BankEmployeeShape[]
> {
  /**
   * Constructor
   */
  constructor() {
    super(injectVault<BankEmployeeShape[]>(PartialWithThrottleService));
  }

  initialize(): void {
    /**
     * Policy Chain:
     * -------------------
     * 1. withThrottle(1000ms)
     */

    this.vault
      .withThrottle?.({
        millisecondThrottle: 1000
      })
      .initialize();
  }
}
