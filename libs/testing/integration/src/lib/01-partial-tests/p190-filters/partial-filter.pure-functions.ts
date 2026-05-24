import { BankEmployeeShape } from '../../structure/shapes/bank-employee.shape';

/**
 * Pure standalone filter (#4)
 * Returns a VaultFilterFunction that filters employees hired on/after the cutoff date.
 */
export function partialFilterStartDateAfter(
  cutoff: string
): (current: BankEmployeeShape[]) => BankEmployeeShape[] {
  const cutoffDate = new Date(cutoff);

  return (current: BankEmployeeShape[]): BankEmployeeShape[] => {
    return current.filter(
      (employee: BankEmployeeShape) => new Date(employee.hireDate) >= cutoffDate
    );
  };
}
