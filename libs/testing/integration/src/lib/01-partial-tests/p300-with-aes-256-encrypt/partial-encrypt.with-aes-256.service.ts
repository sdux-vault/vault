import { Injectable } from '@angular/core';
import { AES256BehaviorOptions } from '@sdux-vault/addons';
import { FeatureCell, injectVault } from '@sdux-vault/angular';
import { PrimaryPartialAbstractClass } from '../../structure/services/primary-partial.abstract';
import { BankEmployeeShape } from '../../structure/shapes/bank-employee.shape';

/**
 * Integration service associated with the feature key
 * `"partial-encrypt.with-aes-256"`.
 *
 * This service extends `MainIntegrationAbstractClass` and provides access
 * to a FeatureCell managing an array of `BankEmployeeShape` values.
 *
 * The underlying FeatureCell instance is created through `injectVault`
 * and initialized during construction.
 */
@FeatureCell<BankEmployeeShape[]>('partial-encrypt.with-aes-256')
@Injectable({
  providedIn: 'root'
})
export class PartialWithAES256EncryptService extends PrimaryPartialAbstractClass<
  BankEmployeeShape[]
> {
  #SALT_KEY = Uint8Array.from('vault::aes256::salt');

  /**
   * Creates an instance of `partialWithAES256EncryptState` and initializes
   * the associated FeatureCell.
   *
   * The FeatureCell instance is resolved using `injectVault` and passed to
   * the base integration class through `super()`.
   */
  constructor() {
    super(injectVault<BankEmployeeShape[]>(PartialWithAES256EncryptService));
  }

  initialize(): void {
    this.vault.setAes256Secret!({
      aes256Secret: 'the-secret',
      salt: this.#SALT_KEY,
      iterations: 300_000
    } as AES256BehaviorOptions).initialize();
  }

  initializeError(): void {
    this.vault.initialize();
  }
}
