/**
 * An abstracted method to ensure the full pipeline is working
 *
 * This verifies that the correct 3 employees are in the state.value() after
 * filters and reducers, etc.
 *
 * @param employees The employees to verify
 * @returns void
 */

import { getBankEmployeeData } from '../data/bank-employee.data';
import { getFilteredAndReducedBankEmployeeData } from '../data/bank-employee.filtered-and-reduced.data';

export const verifyFullPipelineEmployees = (employees: unknown): void => {
  expect(employees).toEqual(getFilteredAndReducedBankEmployeeData());
};

export const verifyFullPipelineAfterTaps = (taps: unknown): void => {
  const expected: unknown[] = [];

  [
    'partialArrowAfterTapFunction',
    'partialInlineAfterTapFunction',
    'partialPrivateAfterTapFunction',
    'partialAnonymousAfterTapFunction',
    'partialPureFunctionAfterTap'
  ].forEach((source: string) => {
    expected.push(
      Object({
        value: [
          getFilteredAndReducedBankEmployeeData(0, false),
          getFilteredAndReducedBankEmployeeData(1, false),
          getFilteredAndReducedBankEmployeeData(2, false)
        ],
        source
      })
    );
  });
  expect(taps).toEqual(expected);
};

export const verifyFullPipelineBeforeTaps = (taps: unknown): void => {
  const expected: unknown[] = [];

  [
    'partialArrowBeforeTapFunction',
    'partialInlineBeforeTapFunction',
    'partialPrivateBeforeTapFunction',
    'partialAnonymousBeforeTapFunction',
    'partialPureFunctionBeforeTap'
  ].forEach((source: string) => {
    expected.push(
      Object({
        value: [
          getBankEmployeeData(6, false),
          getBankEmployeeData(7, false),
          getBankEmployeeData(8, false)
        ],
        source
      })
    );
  });
  expect(taps).toEqual(expected);
};
