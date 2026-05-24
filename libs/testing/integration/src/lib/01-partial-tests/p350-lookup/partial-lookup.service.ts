import { Injectable } from '@angular/core';
import { FeatureCell, injectVault } from '@sdux-vault/angular';
import { ResolveTypes } from '@sdux-vault/shared';
import { PrimaryPartialAbstractClass } from '../../structure/services/primary-partial.abstract';
import { BankEmployeeShape } from '../../structure/shapes/bank-employee.shape';

@FeatureCell<BankEmployeeShape[]>('partial-lookup')
@Injectable({
  providedIn: 'root'
})
export class PartialLookupService extends PrimaryPartialAbstractClass<
  BankEmployeeShape[]
> {
  constructor() {
    super(injectVault<BankEmployeeShape[]>(PartialLookupService));
  }

  initializeByValue(): void {
    this.vault
      .withLookup?.({
        idKey: 'id',
        fetchType: ResolveTypes.Value,
        fetch: this.getByValue
      })
      .initialize();
  }

  initializeByPromise(): void {
    this.vault
      .withLookup?.({
        idKey: 'id',
        fetchType: ResolveTypes.Promise,
        fetch: (id: string) => this.getByPromise(id)
      })
      .initialize();
  }

  initializeByObservable(): void {
    this.vault
      .withLookup?.({
        idKey: 'id',
        fetchType: ResolveTypes.Observable,
        fetch: this.getByObservable
      })
      .initialize();
  }

  initializeError(): void {
    this.vault
      .withLookup?.({
        idKey: 'id',
        fetchType: ResolveTypes.Value,
        fetch: this.getByValue
      })
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
