import { FeatureCellShape } from '@sdux-vault/angular';
import { ReducerFunction } from '@sdux-vault/shared';
import { PrimaryPartialAbstractClass } from '../../structure/services/primary-partial.abstract';
import { BankEmployeeShape } from '../../structure/shapes/bank-employee.shape';

/**
 * Abstract reducer collection used by the p170 integration test suite.
 *
 * This class provides reusable reducer functions that operate on arrays of
 * `BankEmployeeShape` objects. It is extended by concrete FeatureCell-backed
 * services that register these reducers in different configurations.
 *
 * The reducers included here demonstrate:
 * - arrow-function reducers
 * - bound instance reducers
 * - standalone boolean-derivation reducers
 *
 * The class also exposes helper wrapper methods (`p170ReplaceEmployeesReducers`,
 * `p170MergeEmployeesReducers`) that proxy to the underlying FeatureCell API
 * for use within integration tests.
 *
 * @typeParam T - The state type managed by the parent FeatureCell.
 */
export class PartialReducerAbstractClass<
  T
> extends PrimaryPartialAbstractClass<T> {
  /**
   * The constructor
   * @param vault The injected vault from any classes extending the class
   */
  constructor(vault: FeatureCellShape<T>) {
    super(vault);
  }

  /**
   * Arrow reducer (#2)
   * Adds fullName = "First Last"
   */
  partialReducerArrowMethod: ReducerFunction<BankEmployeeShape[]> = (
    employees: BankEmployeeShape[]
  ): BankEmployeeShape[] => {
    return employees.map((employee: BankEmployeeShape) => {
      employee.fullName = `${employee.firstName} ${employee.lastName}`;
      return employee;
    });
  };

  /**
   * Standalone class reducer (#3)
   * Adds senior flag — true if Manager or Owner
   */
  public partialReducerStandaloneMethod(
    employees: BankEmployeeShape[]
  ): BankEmployeeShape[] {
    return employees.map((employee: BankEmployeeShape) => {
      employee.senior =
        employee.role === 'Manager' || employee.role === 'Owner';
      return employee;
    });
  }

  /**
   * Bound reducer (#4)
   * Adds several derived boolean flags
   */
  public partialReducerBoundMethod(
    employees: BankEmployeeShape[]
  ): BankEmployeeShape[] {
    const isLoanOfficer = (employee: BankEmployeeShape) =>
      employee.role === 'LoanOfficer';
    const isSecurity = (employee: BankEmployeeShape) =>
      employee.role === 'Security';

    return employees.map((employee: BankEmployeeShape) => {
      employee.isLoanOfficer = isLoanOfficer(employee);
      employee.isSecurity = isSecurity(employee);
      employee.isActive = employee.status === 'Active';
      return employee;
    });
  }
}
