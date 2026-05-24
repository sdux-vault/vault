import { Injectable } from '@angular/core';
import { FeatureCell, injectVault } from '@sdux-vault/angular';
import { PrimaryPartialAbstractClass } from '../../structure/services/primary-partial.abstract';
import { BankEmployeeShape } from '../../structure/shapes/bank-employee.shape';

@FeatureCell<BankEmployeeShape[]>('partial-from-stream')
@Injectable({
  providedIn: 'root'
})
export class partialFromStreamService extends PrimaryPartialAbstractClass<
  BankEmployeeShape[]
> {
  hasError = false;
  constructor() {
    super(injectVault<BankEmployeeShape[]>(partialFromStreamService));
  }

  initialize(): void {
    this.vault.initialize();
  }

  initializeErrors(): void {
    this.vault
      .filters([
        (employees) => {
          if (this.hasError) {
            throw new Error('this is a filter error');
          }
          {
            return employees;
          }
        }
      ])
      .initialize();
  }
}
