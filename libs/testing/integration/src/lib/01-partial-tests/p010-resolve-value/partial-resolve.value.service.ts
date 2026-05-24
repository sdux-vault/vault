import { Injectable } from '@angular/core';
import { FeatureCell, injectVault } from '@sdux-vault/angular';
import { PrimaryPartialAbstractClass } from '../../structure/services/primary-partial.abstract';
import { BankEmployeeShape } from '../../structure/shapes/bank-employee.shape';

/**
 * FeatureCell configured to resolve plain `{ loading, error, value }` envelopes.
 *
 *
 * The behavior:
 * - updates `isLoading`, `error`, and `value` signal references
 * - handles cloning of arrays and objects for purity
 * - returns primitives directly
 * - skips invalid envelopes or HttpResourceRefs
 *
 * Because no custom resolve behaviors are registered here, the FeatureCell
 * uses the built-in **withCoreResolveBehavior**, making this service the
 * canonical example for *plain value resolution* in integration tests
 * and tutorial flows.
 *
 * ## Integration Layer
 *
 * Like all integration test services in this suite, the class extends
 * `MainIntegrationAbstractClass`, which provides utilities for preparing,
 * merging, and simulating remote employee data updates.
 *
 * @see withCoreResolveBehavior — default resolve behavior for plain state packets.
 * @see FeatureCell — registers the state container within Vault.
 * @see PrimaryPartialAbstractClass — shared integration-base for example services.
 */
@FeatureCell<BankEmployeeShape[]>('partial-resolve.value')
@Injectable({
  providedIn: 'root'
})
export class PartialResolveValueService extends PrimaryPartialAbstractClass<
  BankEmployeeShape[]
> {
  /**
   * Constructs the Resolve(Value) integration service.
   */
  constructor() {
    super(injectVault<BankEmployeeShape[]>(PartialResolveValueService));
  }

  initialize(): void {
    this.vault.initialize();
  }
}
