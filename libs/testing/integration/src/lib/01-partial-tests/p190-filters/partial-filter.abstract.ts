import { FeatureCellShape } from '@sdux-vault/angular';
import { FilterFunction } from '@sdux-vault/shared';
import { getAdditionalBankEmployeeData } from '../../structure/data/bank-employee.additional.data';
import { PrimaryPartialAbstractClass } from '../../structure/services/primary-partial.abstract';
import { BankEmployeeShape } from '../../structure/shapes/bank-employee.shape';

/**
 * partialFilterAbstractClass
 */
export class PartialFilterAbstractClass<
  T
> extends PrimaryPartialAbstractClass<T> {
  /**
   * constructior
   * @param vault The Feature cell
   */
  constructor(vault: FeatureCellShape<T>) {
    super(vault);
  }

  /**
   * Arrow Filter (#1)
   * Includes employees with salary > 80,000
   */
  readonly partialFilterArrowMethod: FilterFunction<BankEmployeeShape[]> = (
    current: BankEmployeeShape[]
  ): BankEmployeeShape[] => {
    return current.filter(
      (employee: BankEmployeeShape) => employee.salary > 80000
    );
  };

  /**
   * Bound class filter (#3)
   * Includes employees whose city is "New York".
   */
  public partialFilterBoundMethod(
    employees: BankEmployeeShape[]
  ): BankEmployeeShape[] {
    return employees.filter(
      (employee: BankEmployeeShape) => employee.address.city === 'New York'
    );
  }

  /**
   * Abstracted merge() → used in integration tests
   */
  public p190MergeEmployeesFilters(): void {
    this.vault.mergeState({
      value: getAdditionalBankEmployeeData(true) as T,
      error: null,
      loading: false
    });
  }
}
