import { Injectable } from '@angular/core';
import { AES256BehaviorOptions } from '@sdux-vault/addons';
import { FeatureCell, injectVault } from '@sdux-vault/angular';
import { PrimaryFullAbstractClass } from '../../structure/services/primary-full.abstract';
import { BankEmployeeShape } from '../../structure/shapes/bank-employee.shape';

@FeatureCell<BankEmployeeShape[]>('full-test-with-encrypted-error-callback')
@Injectable({
  providedIn: 'root'
})
export class fullTestWithEncryptedErrorCallbacksErrorService extends PrimaryFullAbstractClass<
  BankEmployeeShape[]
> {
  /**
   * Constructor
   */
  constructor() {
    super(
      injectVault<BankEmployeeShape[]>(
        fullTestWithEncryptedErrorCallbacksErrorService
      )
    );
  }

  initialize(): void {
    this.vault.setAes256Secret!({
      aes256Secret: 'the-secret',
      salt: this.vault.generateSalt!(16),
      iterations: 300_000
    } as AES256BehaviorOptions)
      .withThrottle?.({ millisecondThrottle: 1_000 })
      .operators(this.addOperatorErrors())
      .filters(this.addFilterErrors())
      .beforeTaps(this.addBeforeTapErrors())
      .reducers(this.addReducerErrors())
      .beforeTaps(this.addAfterTapErrors())
      .errors(this.addErrorCallbacks())
      .initialize();
  }
}
