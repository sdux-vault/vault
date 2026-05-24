import { Injectable } from '@angular/core';
import { FeatureCell, injectVault } from '@sdux-vault/angular';
import { PrimaryPartialAbstractClass } from '../../structure/services/primary-partial.abstract';
import { BankEmployeeShape } from '../../structure/shapes/bank-employee.shape';

/**
 * Integration service associated with the feature key
 * `"partial-persist.with-cookie-storage"`.
 *
 * This service extends `MainIntegrationAbstractClass` and provides access
 * to a FeatureCell managing an array of `BankEmployeeShape` values.
 *
 * The underlying FeatureCell instance is created through `injectVault`
 * and initialized during construction.
 */
@FeatureCell<BankEmployeeShape>('partial-persist.with-cookie-storage')
@Injectable({
  providedIn: 'root'
})
export class PartialWithCookieStorageService extends PrimaryPartialAbstractClass<BankEmployeeShape> {
  /**
   * Creates an instance of `PartialWithCookieStorageService` and initializes
   * the associated FeatureCell.
   *
   * The FeatureCell instance is resolved using `injectVault` and passed to
   * the base integration class through `super()`.
   */
  constructor() {
    super(injectVault<BankEmployeeShape>(PartialWithCookieStorageService));
  }

  initialize(): void {
    this.vault.initialize();
  }
}
