import { FeatureCellShape } from '@sdux-vault/angular';
import { PrimaryPartialAbstractClass } from '../../structure/services/primary-partial.abstract';
import { BankEmployeeShape } from '../../structure/shapes/bank-employee.shape';

/**
 * Abstract class providing predefined initial and partial state examples
 * for exercising shallow object merge behavior.
 *
 * This class is used by merge-focused FeatureCell services to validate
 * that the configured merge behavior (typically a shallow merge) correctly
 * overwrites only top-level fields while preserving or replacing nested
 * structures based on the incoming payload.
 *
 * @typeParam T - The FeatureCell state type, constrained by the concrete service.
 */
export class PartialWithObjectShallowMergeAbstractClass<
  T
> extends PrimaryPartialAbstractClass<T> {
  /**
   * Creates an instance of the abstract shallow-merge integration class.
   *
   * @param vault - The FeatureCell model instance injected by the
   *                concrete FeatureCell service.
   */
  constructor(vault: FeatureCellShape<T>) {
    super(vault);
  }

  /**
   * Returns a full initial `BankEmployeeShape` snapshot used as the
   * baseline for merge operations.
   *
   * This state includes complete root and nested values, including
   * derived fields, enabling comprehensive verification that the
   * shallow merge behavior only updates the fields present in the
   * incoming state during merge operations.
   *
   * @returns A fully populated `BankEmployeeShape` object.
   */
  p140GetInitialState(): BankEmployeeShape {
    return {
      id: 'E-001',
      firstName: 'Sarah',
      lastName: 'Kensington',

      role: 'Teller',
      status: 'Active',

      salary: 52000,
      hireDate: '2020-04-15',
      birthDate: '1991-02-10',

      address: {
        street: '123 Maple St',
        city: 'Riverside',
        state: 'CA',
        zip: '92501'
      },

      phoneNumber: '555-123-9876',

      fullName: 'Sarah Kensington',
      senior: false,
      isLoanOfficer: false,
      isSecurity: false,
      isActive: true
    };
  }

  /**
   * Returns a partial update object used to exercise shallow merge behavior.
   *
   * Only fields included in this snapshot are replaced during a merge
   * operation. Nested objects, such as `address`, are replaced entirely
   * because they are passed as full objects here—demonstrating that
   * shallow merge overwrites nested structures wholesale rather than
   * merging their contents.
   *
   * @returns A partial `BankEmployeeShape` containing fields intended
   *          to overwrite the corresponding fields in the initial state.
   */
  p140GetPartialState(): BankEmployeeShape {
    return {
      status: 'Vacation',
      salary: 54000,

      // This intentionally replaces the entire nested address object
      address: {
        street: '900 Oceanview Blvd',
        city: 'San Diego',
        state: 'CA',
        zip: '92101'
      },

      phoneNumber: '555-777-8888'
      // eslint-disable-next-line
    } as any;
  }
}
