import { isolateValue } from '@sdux-vault/shared';
import { BankEmployeeShape } from '../shapes/bank-employee.shape';
import { getBankEmployeeData } from './bank-employee.data';

const Data: BankEmployeeShape[] = [
  getBankEmployeeData(6, false) as BankEmployeeShape,
  getBankEmployeeData(7, false) as BankEmployeeShape,
  getBankEmployeeData(8, false) as BankEmployeeShape
];

// eslint-disable-next-line
export function getFilteredBankEmployeeData(
  index?: number,
  asArray = false
): any {
  if (index !== undefined && index >= 0 && index < Data.length) {
    const item = isolateValue(Data[index]);
    return asArray ? [item] : item;
  }

  return isolateValue(Data);
}
