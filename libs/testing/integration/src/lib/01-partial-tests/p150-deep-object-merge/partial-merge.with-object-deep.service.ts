import { Injectable } from '@angular/core';
import { FeatureCell, injectVault } from '@sdux-vault/angular';
import { BankEmployeeShape } from '../../structure/shapes/bank-employee.shape';
import { PartialWithObjectDeepMergeAbstractClass } from './partial-merge.with-object-deep.abstract';

@FeatureCell<BankEmployeeShape>('partial-merge.with-object-deep')
@Injectable({
  providedIn: 'root'
})
export class PartialMergeWithObjectDeepService extends PartialWithObjectDeepMergeAbstractClass<BankEmployeeShape> {
  /**
   * Constructor
   */
  constructor() {
    super(injectVault<BankEmployeeShape>(PartialMergeWithObjectDeepService));
  }

  initialize(): void {
    this.vault.initialize();
  }
}
