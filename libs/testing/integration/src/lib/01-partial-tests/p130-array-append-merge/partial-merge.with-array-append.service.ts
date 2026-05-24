import { Injectable } from '@angular/core';
import { FeatureCell, injectVault } from '@sdux-vault/angular';
import { PrimaryPartialAbstractClass } from '../../structure/services/primary-partial.abstract';
import { BankEmployeeShape } from '../../structure/shapes/bank-employee.shape';

/**
 * FeatureCell configured to use the **default Array Append Merge** strategy.
 *
 * This service registers a FeatureCell under the key:
 *
 * ```
 * partial-merge.with-array-append
 * ```
 *
 * and relies on Vault’s built-in **Array Append Merge behavior**, which is
 * applied automatically when no custom merge strategy is provided.
 *
 * ## Default Merge Strategy
 *
 * Because no merge behavior is explicitly configured here, the FeatureCell
 * falls back to Vault’s **core merge pipeline**, which selects the
 * `ArrayAppendMerge` behavior for array-based state:
 *
 * - When both current and incoming values are arrays:
 *
 *   ```
 *   next = [...current, ...incoming]
 *   ```
 *
 * - When types differ, the incoming value simply replaces the current value.
 *
 * This behavior is ideal for FeatureCells whose state represents:
 *
 * - lists of domain models (e.g., employees)
 * - aggregated event streams
 * - paginated or chunked API responses
 *
 * It enables pipeline operations such as:
 *
 * - appending new employees to an existing list
 * - incremental loading
 * - merging results from long-polling or multi-step integrations
 *
 * ## Integration Layer
 *
 * `p130MergeWithArrayAppendService` extends `MainIntegrationAbstractClass`,
 * which provides higher-level utilities for loading, syncing, and transforming
 * remote employee data. Because merge customization is not required here, the
 * service only calls:
 *
 * ```ts
 * this.vault.initialize();
 * ```
 *
 * allowing default merge, resolve, operator, reducer, and persist behaviors
 * to activate automatically.
 *
 * ## Example Usage
 *
 * ```ts
 * service.vault.mergeState({ value: [ { id: 1 }, { id: 2 } ] });
 * service.vault.mergeState({ value: [ { id: 3 } ] });
 *
 * // Result → [ { id: 1 }, { id: 2 }, { id: 3 } ]
 * ```
 *
 * @see ArrayAppendMergeBehavior – Default merge strategy for array states.
 * @see FeatureCell – Registers the state container with Vault.
 * @see PrimaryPartialAbstractClass – Common state-handling integration base class.
 */
@FeatureCell<BankEmployeeShape[]>('partial-merge.with-array-append')
@Injectable({
  providedIn: 'root'
})
export class PartialMergeWithArrayAppendService extends PrimaryPartialAbstractClass<
  BankEmployeeShape[]
> {
  /**
   * Constructor
   */
  constructor() {
    super(injectVault<BankEmployeeShape[]>(PartialMergeWithArrayAppendService));
  }

  initialize(): void {
    // Initialize the FeatureCell using the default merge behavior.
    this.vault.initialize();
  }
}
