import { Injectable } from '@angular/core';
import { FeatureCell, injectVault } from '@sdux-vault/angular';
import { PrimaryPartialAbstractClass } from '../../structure/services/primary-partial.abstract';
import { BankEmployeeShape } from '../../structure/shapes/bank-employee.shape';

@FeatureCell<BankEmployeeShape[]>('partial-replay-global-error')
@Injectable({
  providedIn: 'root'
})
export class PartialReplayGlobalErrorService extends PrimaryPartialAbstractClass<
  BankEmployeeShape[]
> {
  constructor() {
    super(injectVault<BankEmployeeShape[]>(PartialReplayGlobalErrorService));
  }

  initialize(): void {
    this.vault
      .filters([
        (state) => {
          if (this.isError) {
            throw new Error('Filter error state');
          } else {
            return state;
          }
        }
      ])
      .initialize();
  }
}
