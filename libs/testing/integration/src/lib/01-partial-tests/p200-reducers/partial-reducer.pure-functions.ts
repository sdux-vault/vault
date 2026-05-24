import { BankEmployeeShape } from '../../structure/shapes/bank-employee.shape';

/**
 * Computes several derived boolean flags for each employee in the list.
 *
 * This pure helper function is used in reducer-focused integration tests
 * within the p170 test suite. It augments each `BankEmployeeShape` with:
 *
 * - `isLoanOfficer` — `true` when the employee’s role is `"LoanOfficer"`
 * - `isSecurity` — `true` when the role is `"Security"`
 * - `isActive` — `true` when the status is `"Active"`
 *
 * The function does not mutate the input array and always returns a new array.
 *
 * @param employees - The list of employee models to transform.
 * @returns A new array where each entry contains the derived flags.
 */
export const partialReducerPureFunction = (employees: BankEmployeeShape[]) => {
  return employees.map((employee: BankEmployeeShape) => ({
    ...employee,
    isLoanOfficer: employee.role === 'LoanOfficer',
    isSecurity: employee.role === 'Security',
    isActive: employee.status === 'Active'
  }));
};
