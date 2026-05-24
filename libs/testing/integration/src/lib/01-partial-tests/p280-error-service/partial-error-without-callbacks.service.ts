import { Injectable } from '@angular/core';
import { FeatureCell, injectVault } from '@sdux-vault/angular';
import { BankEmployeeShape } from '../../structure/shapes/bank-employee.shape';
import { PartialErrorServiceAbstractClass } from './partial-error-service.abstract';

/**
 * partialErrorWithoutCallbacksService
 *
 * FeatureCell-backed service demonstrating a configuration in which
 * no {@link ErrorCallback} functions are registered. This service
 * intentionally relies solely on the core Vault error-handling pipeline.
 *
 * When an error occurs—such as one produced by a filter, resolver,
 * reducer, or tap stage—it is normalized into a {@link VaultError}
 * by the core error behavior and exposed to the FeatureCell’s
 * `state.error` signal. Because no explicit error callbacks are
 * registered, no additional diagnostic or side-effect processing
 * occurs during error propagation.
 *
 * This service is useful for validating default error-pipeline
 * behavior and for demonstrating how FeatureCells behave in the
 * absence of callback-based observers.
 *
 * @typeParam T - The state type handled by this FeatureCell instance.
 */
@FeatureCell<BankEmployeeShape[]>('partial-error-without-callbacks')
@Injectable({
  providedIn: 'root'
})
export class PartialErrorWithoutCallbacksService<
  T
> extends PartialErrorServiceAbstractClass<T> {
  /**
   * constructor
   *
   * Constructor initializes the FeatureCell without registering any
   * error callbacks. A filter is configured to throw an error to
   * exercise the default Vault error-handling behavior.
   */
  constructor() {
    super(injectVault<T>(PartialErrorWithoutCallbacksService));
  }

  initialize(): void {
    // Register and initialize the FeatureCell pipeline without error callbacks.
    this.vault
      .filters([
        () => {
          throw new Error('this is a filter error');
        }
      ])
      .initialize();
  }
}
