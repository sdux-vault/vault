import { Injectable } from '@angular/core';
import { FeatureCell, injectVault } from '@sdux-vault/angular';
import { Observable, of } from 'rxjs';
import { PrimaryPartialAbstractClass } from '../../structure/services/primary-partial.abstract';
import { BankEmployeeShape } from '../../structure/shapes/bank-employee.shape';

@FeatureCell<BankEmployeeShape[]>('partial-observable')
@Injectable({
  providedIn: 'root'
})
export class partialObservableService extends PrimaryPartialAbstractClass<
  BankEmployeeShape[]
> {
  constructor() {
    super(injectVault<BankEmployeeShape[]>(partialObservableService));
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

  getSource(employees: BankEmployeeShape[]): Observable<BankEmployeeShape[]> {
    return of(employees);
  }
}
