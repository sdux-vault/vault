import { Injectable } from '@angular/core';
import { CacheTTL } from '@sdux-vault/addons';
import { FeatureCell, injectVault } from '@sdux-vault/angular';
import { ResolveTypes } from '@sdux-vault/shared';
import { PrimaryPartialAbstractClass } from '../../structure/services/primary-partial.abstract';
import { BankEmployeeShape } from '../../structure/shapes/bank-employee.shape';

@FeatureCell<BankEmployeeShape[]>('partial-cache')
@Injectable({
  providedIn: 'root'
})
export class PartialCacheService extends PrimaryPartialAbstractClass<
  BankEmployeeShape[]
> {
  constructor() {
    super(injectVault<BankEmployeeShape[]>(PartialCacheService));
  }

  initializeByValue(): void {
    this.vault
      .withStateCache?.({
        ttl: CacheTTL.OneMinute,
        idKey: 'id',
        fetchType: ResolveTypes.Value,
        fetch: this.getByValue
      })
      .initialize();
  }

  initializeByPromise(): void {
    this.vault
      .withStateCache?.({
        ttl: CacheTTL.OneMinute,
        idKey: 'id',
        fetchType: ResolveTypes.Promise,
        fetch: (id: string) => this.getByPromise(id)
      })
      .initialize();
  }

  initializeByObservable(): void {
    this.vault
      .withStateCache?.({
        ttl: CacheTTL.OneMinute,
        fetchType: ResolveTypes.Observable,
        idKey: 'id',
        fetch: this.getByObservable
      })
      .initialize();
  }

  initializeError(): void {
    this.vault
      .withStateCache?.({
        ttl: CacheTTL.OneMinute,
        fetchType: ResolveTypes.Value,
        idKey: 'id',
        fetch: this.getByValue
      })
      .filters([
        (employees) => {
          if (this.isError) {
            this.fetches.push(`filter error`);
            throw new Error('this is the filter error');
          } else {
            this.fetches.push(`filter success`);
            return employees;
          }
        }
      ])
      .initialize();
  }
}
