import { isolateValue } from '@sdux-vault/shared';
import { BankEmployeeShape } from '../shapes/bank-employee.shape';

const AdditionalOnData: BankEmployeeShape[] = [
  Object({
    id: 'be-999',
    firstName: 'Victor',
    lastName: 'Ramirez',
    role: 'Manager', // Passes: leadership, senior, non-security filters
    status: 'Active', // Passes: active-status inline filter
    salary: 120000, // Passes: > 80k arrow filter
    hireDate: '2022-06-15', // Passes: startDateAfter('2020-01-01') pure function filter
    birthDate: '1988-09-21',
    address: {
      city: 'New York', // Passes: bound filter (city === 'New York')
      state: 'NY',
      zip: '10001'
    },
    phoneNumber: '(212) 555-9012'
  })
];

export function getAdditionalBankEmployeeData(
  asArray = false
): BankEmployeeShape | BankEmployeeShape[] {
  const item = isolateValue(AdditionalOnData[0]);
  return asArray ? [item] : item;
}
