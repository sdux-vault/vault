import { Injectable } from '@angular/core';
import { FeatureCell, injectVault } from '@sdux-vault/angular';
import { PrimaryPartialAbstractClass } from '../../structure/services/primary-partial.abstract';
import { BankEmployeeShape } from '../../structure/shapes/bank-employee.shape';

@FeatureCell<BankEmployeeShape[]>('partial-core-behavior-license')
@Injectable({
  providedIn: 'root'
})
export class PartialCoreBehaviorLicenseService extends PrimaryPartialAbstractClass<
  BankEmployeeShape[]
> {
  /**
   * Constructs the Resolve(Value) integration service.
   */
  constructor() {
    super(injectVault<BankEmployeeShape[]>(PartialCoreBehaviorLicenseService));
  }

  initialize(): void {
    this.vault.initialize();
  }
}
