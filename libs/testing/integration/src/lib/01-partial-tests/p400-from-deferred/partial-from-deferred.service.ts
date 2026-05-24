import { Injectable } from '@angular/core';
import { FeatureCell, injectVault } from '@sdux-vault/angular';
import { PrimaryPartialAbstractClass } from '../../structure/services/primary-partial.abstract';
import { BankEmployeeShape } from '../../structure/shapes/bank-employee.shape';

@FeatureCell<BankEmployeeShape[]>('partial-from-deferred')
@Injectable({
  providedIn: 'root'
})
export class PartialFromDeferredService extends PrimaryPartialAbstractClass<
  BankEmployeeShape[]
> {
  constructor() {
    super(injectVault<BankEmployeeShape[]>(PartialFromDeferredService));
  }

  async initialize(): Promise<void> {
    await this.vault.initialize();
  }
}
