import { FeatureCellShape } from '@sdux-vault/angular';
import { PrimaryPartialAbstractClass } from '../../structure/services/primary-partial.abstract';
import { BankEmployeeShape } from '../../structure/shapes/bank-employee.shape';

/**
 * Abstract base used to validate deep object merge semantics.
 *
 * This class intentionally performs a PARTIAL nested update to ensure:
 * - nested objects are merged recursively
 * - unspecified nested keys are preserved
 * - primitive fields overwrite as expected
 */
export class PartialWithObjectDeepMergeAbstractClass<
  T
> extends PrimaryPartialAbstractClass<T> {
  constructor(vault: FeatureCellShape<T>) {
    super(vault);
  }

  /**
   * Initial full state used as the merge base.
   */
  p150GetInitialState(): BankEmployeeShape {
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
   * Partial update intentionally targeting only SOME nested fields.
   *
   * This validates true deep-merge behavior:
   * - address.street is updated
   * - address.city/state/zip are preserved
   */
  p150GetPartialState(): BankEmployeeShape {
    return {
      status: 'Vacation',
      salary: 54000,

      address: {
        street: '900 Oceanview Blvd'
        // city/state/zip intentionally omitted
      },

      phoneNumber: '555-777-8888'
    } as unknown as BankEmployeeShape;
  }
}
