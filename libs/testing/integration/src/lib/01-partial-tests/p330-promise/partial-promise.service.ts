import { Injectable } from '@angular/core';
import { FeatureCell, injectVault } from '@sdux-vault/angular';
import { PrimaryPartialAbstractClass } from '../../structure/services/primary-partial.abstract';
import { BankEmployeeShape } from '../../structure/shapes/bank-employee.shape';

@FeatureCell<BankEmployeeShape[]>('partial-promise')
@Injectable({
  providedIn: 'root'
})
export class partialPromiseService extends PrimaryPartialAbstractClass<
  BankEmployeeShape[]
> {
  constructor() {
    super(injectVault<BankEmployeeShape[]>(partialPromiseService));
  }

  initialize(): void {
    this.vault.initialize();
  }

  initializeError(): void {
    this.vault
      .filters([
        (employees) => {
          if (this.isError) {
            throw new Error('this is the filter error');
          } else {
            return employees;
          }
        }
      ])
      .initialize();
  }
}
