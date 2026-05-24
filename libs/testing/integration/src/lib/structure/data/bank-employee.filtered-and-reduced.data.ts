import { isolateValue } from '@sdux-vault/shared';
import { BankEmployeeShape } from '../shapes/bank-employee.shape';
import { getBankEmployeeData } from './bank-employee.data';

const Data: BankEmployeeShape[] = [
  {
    ...(getBankEmployeeData(6, false) as BankEmployeeShape),
    senior: true,
    fullName: 'Nina Castillo',
    isLoanOfficer: false,
    isSecurity: false,
    isActive: true
  },
  {
    ...(getBankEmployeeData(7, false) as BankEmployeeShape),
    senior: false,
    fullName: 'Oscar Klein',
    isLoanOfficer: true,
    isSecurity: false,
    isActive: true
  },
  {
    ...(getBankEmployeeData(8, false) as BankEmployeeShape),
    senior: true,
    fullName: 'Priya Sharma',
    isLoanOfficer: false,
    isSecurity: false,
    isActive: true
  }
];

// eslint-disable-next-line
export function getFilteredAndReducedBankEmployeeData(
  index?: number,
  asArray = false
): any {
  if (index !== undefined && index >= 0 && index < Data.length) {
    const item = isolateValue(Data[index]);
    return asArray ? [item] : item;
  }

  return isolateValue(Data);
}
