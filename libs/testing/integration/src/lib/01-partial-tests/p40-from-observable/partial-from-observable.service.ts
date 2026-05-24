import { Injectable } from '@angular/core';
import { FeatureCell, injectVault } from '@sdux-vault/angular';
import { Observable, of } from 'rxjs';
import { PrimaryPartialAbstractClass } from '../../structure/services/primary-partial.abstract';
import { BankEmployeeShape } from '../../structure/shapes/bank-employee.shape';

@FeatureCell<BankEmployeeShape[]>('partial-from-observable')
@Injectable({
  providedIn: 'root'
})
export class partialFromObservableService extends PrimaryPartialAbstractClass<
  BankEmployeeShape[]
> {
  constructor() {
    super(injectVault<BankEmployeeShape[]>(partialFromObservableService));
  }

  initialize(): void {
    this.vault.initialize();
  }

  getSource(employees: BankEmployeeShape[]): Observable<BankEmployeeShape[]> {
    return of(employees);
  }
}
