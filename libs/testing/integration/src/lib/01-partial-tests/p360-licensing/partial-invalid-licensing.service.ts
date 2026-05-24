import { Injectable } from '@angular/core';
import { FeatureCell, injectVault } from '@sdux-vault/angular';
import { PrimaryPartialAbstractClass } from '../../structure/services/primary-partial.abstract';
import { BankEmployeeShape } from '../../structure/shapes/bank-employee.shape';

@FeatureCell<BankEmployeeShape[]>('partial-invalid-licensing')
@Injectable({
  providedIn: 'root'
})
export class PartialInvalidLicensingService extends PrimaryPartialAbstractClass<
  BankEmployeeShape[]
> {
  constructor() {
    super(injectVault<BankEmployeeShape[]>(PartialInvalidLicensingService));
  }

  initialize(): void {
    this.vault.initialize();
  }
}
