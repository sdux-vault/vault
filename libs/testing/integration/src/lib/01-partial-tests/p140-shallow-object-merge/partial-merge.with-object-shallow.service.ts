import { Injectable } from '@angular/core';
import { FeatureCell, injectVault } from '@sdux-vault/angular';
import { BankEmployeeShape } from '../../structure/shapes/bank-employee.shape';
import { PartialWithObjectShallowMergeAbstractClass } from './partial-merge.with-object-shallow.abstract';

/**
 * FeatureCell service demonstrating shallow object merge behavior.
 *
 * This service binds a `BankEmployeeShape` FeatureCell to the
 * `withObjectShallowMerge` merge behavior provided by the inherited
 * abstract class. The behavior performs a shallow merge operation,
 * overwriting only the top-level properties present in the incoming
 * state while preserving nested structures unless explicitly replaced.
 *
 * The FeatureCell is initialized on construction, activating the
 * resolve/merge pipeline and enabling state access through the injected
 * vault instance.
 *
 * @see PartialWithObjectShallowMergeAbstractClass
 * @see BankEmployeeShape
 */
@FeatureCell<BankEmployeeShape>('partial-merge.with-object-shallow')
@Injectable({
  providedIn: 'root'
})
export class PartialMergeWithObjectShallowService extends PartialWithObjectShallowMergeAbstractClass<BankEmployeeShape> {
  /**
   * Constructor
   */
  constructor() {
    super(injectVault<BankEmployeeShape>(PartialMergeWithObjectShallowService));
  }

  initialize(): void {
    this.vault.initialize();
  }
}
