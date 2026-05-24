import { Injectable } from '@angular/core';
import { FeatureCell, injectVault } from '@sdux-vault/angular';
import { FilterFunction } from '@sdux-vault/shared';
import { PrimaryPartialAbstractClass } from '../../structure/services/primary-partial.abstract';
import { BankEmployeeShape } from '../../structure/shapes/bank-employee.shape';

@FeatureCell<BankEmployeeShape[]>('partial-interceptor.global-error-pause')
@Injectable({
  providedIn: 'root'
})
export class PartialWithGlobalErrorPauseService extends PrimaryPartialAbstractClass<
  BankEmployeeShape[]
> {
  /**
   * Constructor
   */
  constructor() {
    super(injectVault<BankEmployeeShape[]>(PartialWithGlobalErrorPauseService));
  }

  initialize(): void {
    const filters: FilterFunction<BankEmployeeShape[]>[] = [
      (employees) => {
        if (this.isError) {
          throw new Error('this is an error state');
        }
        return employees;
      }
    ];

    this.vault.filters(filters).initialize();
  }
}
