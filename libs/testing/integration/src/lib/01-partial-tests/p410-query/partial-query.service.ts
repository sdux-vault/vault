import { Injectable } from '@angular/core';
import { FeatureCell, injectVault } from '@sdux-vault/angular';
import { PrimaryPartialAbstractClass } from '../../structure/services/primary-partial.abstract';
import { BankEmployeeShape } from '../../structure/shapes/bank-employee.shape';

@FeatureCell<BankEmployeeShape[]>('partial-query')
@Injectable({
  providedIn: 'root'
})
export class PartialQueryService extends PrimaryPartialAbstractClass<
  BankEmployeeShape[]
> {
  constructor() {
    super(injectVault<BankEmployeeShape[]>(PartialQueryService));
  }

  initialize(): void {
    this.vault
      .withQuery?.({
        idKey: 'id'
      })
      .initialize();
  }
}
