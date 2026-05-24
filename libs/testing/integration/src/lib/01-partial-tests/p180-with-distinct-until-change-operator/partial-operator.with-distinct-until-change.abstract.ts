import { FeatureCellShape } from '@sdux-vault/angular';
import { isolateValue } from '@sdux-vault/shared';
import { getBankEmployeeData } from '../../structure/data/bank-employee.data';
import { PrimaryPartialAbstractClass } from '../../structure/services/primary-partial.abstract';

/**
 * Abstract class used by integration tests to exercise the
 * withDistinctUntilChanged operator against the unified BankEmployeeShape.
 *
 * All datasets are bank-employee–only and crafted to create:
 * - equal sequences     → should NOT emit
 * - changed sequences   → should emit
 * - merge variations    → should test block vs allow
 */
export class PartialWithDistinctUntilChangedAbstractClass<
  T
> extends PrimaryPartialAbstractClass<T> {
  /** Precomputed banker sets used for merge tests */
  readonly #bankersData: T[];

  /** Constructor */
  constructor(vault: FeatureCellShape<T>) {
    super(vault);

    // Using three stable, deeply-distinct employees
    this.#bankersData = [
      getBankEmployeeData(0, false) as T,
      getBankEmployeeData(2, false) as T,
      getBankEmployeeData(4, false) as T
    ];
  }

  /**
   * Replace the state repeatedly with a sequence where:
   *  - some values are IDENTICAL (should NOT emit)
   *  - some values differ by small fields (should emit)
   */
  p180ReplaceBankers(): void {
    const seq = [
      getBankEmployeeData(0, false) as T,
      getBankEmployeeData(0, false) as T, // identical → block
      getBankEmployeeData(1, false) as T, // new → emit
      getBankEmployeeData(1, false) as T, // identical → block
      getBankEmployeeData(3, false) as T // new → emit
    ];

    this.vault.replaceState(seq as T);
  }

  /**
   * Pre-load the vault with a stable set of bankers
   * that will be used as the merge baseline.
   */
  p180ReplaceBankersForMerge(): void {
    this.vault.replaceState(this.#bankersData as T);
  }

  /**
   * Merge with a banker list that is IDENTICAL to the existing list.
   * withDistinctUntilChanged should block this emission.
   */
  p180MergeBankers(): void {
    this.vault.mergeState({
      loading: false,
      value: this.#bankersData as T,
      error: null
    });
  }

  /**
   * Merge with a banker list containing an additional employee.
   * The operator should allow this emission.
   */
  p180MergeBankersSecond(): void {
    const next = isolateValue(this.#bankersData);
    next.push(getBankEmployeeData(5, false) as T);

    this.vault.mergeState({
      loading: false,
      value: next as T,
      error: null
    });
  }
}
