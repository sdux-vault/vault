import { isolateValue } from '@sdux-vault/shared';
import { BankEmployeeShape } from '../shapes/bank-employee.shape';

/**
 * In-memory dataset of `BankEmployeeShape` records used throughout
 * integration tests, demos, and example FeatureCells.
 *
 * This collection provides realistic employee entries spanning different:
 * - roles (Teller, Manager, Owner, LoanOfficer, Security)
 * - statuses (Active, Vacation, Suspended)
 * - locations (Springfield, Chicago, Naperville, New York)
 * - compensation ranges and hire dates
 *
 * The dataset is intentionally diverse to exercise filters, reducers,
 * merge behaviors, and operator logic across a wide variety of scenarios.
 */
export const Data: BankEmployeeShape[] = [
  {
    id: 'be-001',
    firstName: 'Alice',
    lastName: 'Wells',
    role: 'Teller',
    status: 'Active',
    salary: 48000,
    hireDate: '2018-03-12',
    birthDate: '1992-07-22',
    phoneNumber: '555-201-8899',
    address: {
      street: '101 Maple St',
      city: 'Springfield',
      state: 'IL',
      zip: '62704'
    }
  },
  {
    id: 'be-002',
    firstName: 'Brian',
    lastName: 'Stone',
    role: 'Manager',
    status: 'Vacation',
    salary: 90000,
    hireDate: '2012-09-05',
    birthDate: '1981-04-17',
    phoneNumber: '555-490-3322',
    address: {
      street: '54 Ridgeview Ave',
      city: 'Springfield',
      state: 'IL',
      zip: '62711'
    }
  },
  {
    id: 'be-003',
    firstName: 'Carla',
    lastName: 'Summers',
    role: 'Owner',
    status: 'Active',
    salary: 185000,
    hireDate: '2003-01-20',
    birthDate: '1964-11-30',
    phoneNumber: '555-732-1100',
    address: {
      street: '12 Oak Bend Dr',
      city: 'Chicago',
      state: 'IL',
      zip: '60614'
    }
  },
  {
    id: 'be-004',
    firstName: 'Derek',
    lastName: 'Hughes',
    role: 'LoanOfficer',
    status: 'Suspended',
    salary: 78000,
    hireDate: '2016-06-10',
    birthDate: '1989-02-14',
    phoneNumber: '555-810-4431',
    address: {
      street: '88 Willow Hill Rd',
      city: 'Chicago',
      state: 'IL',
      zip: '60657'
    }
  },
  {
    id: 'be-005',
    firstName: 'Elena',
    lastName: 'Reed',
    role: 'Teller',
    status: 'Active',
    salary: 52000,
    hireDate: '2021-11-01',
    birthDate: '1998-09-05',
    phoneNumber: '555-610-2099',
    address: {
      street: '233 Pinecrest Ln',
      city: 'Naperville',
      state: 'IL',
      zip: '60540'
    }
  },
  {
    id: 'be-006',
    firstName: 'Frank',
    lastName: 'Dalton',
    role: 'Security',
    status: 'Active',
    salary: 43000,
    hireDate: '2019-04-18',
    birthDate: '1974-12-19',
    phoneNumber: '555-673-8832',
    address: {
      street: '789 Forest Glen Dr',
      city: 'Naperville',
      state: 'IL',
      zip: '60565'
    }
  },
  {
    id: 'be-007',
    firstName: 'Nina',
    lastName: 'Castillo',
    role: 'Manager',
    status: 'Active',
    salary: 90000,
    hireDate: '2021-04-10',
    birthDate: '1989-11-20',
    address: {
      street: '501 Madison Ave',
      city: 'New York',
      state: 'NY',
      zip: '10022'
    },
    phoneNumber: '555-444-1212'
  },
  {
    id: 'be-008',
    firstName: 'Oscar',
    lastName: 'Klein',
    role: 'LoanOfficer',
    status: 'Active',
    salary: 110000,
    hireDate: '2020-02-18',
    birthDate: '1992-05-30',
    address: {
      street: '12 West 43rd St',
      city: 'New York',
      state: 'NY',
      zip: '10036'
    },
    phoneNumber: '555-909-8080'
  },
  {
    id: 'be-009',
    firstName: 'Priya',
    lastName: 'Sharma',
    role: 'Owner',
    status: 'Active',
    salary: 160000,
    hireDate: '2023-01-12',
    birthDate: '1985-10-05',
    address: {
      street: '77 Park Ave',
      city: 'New York',
      state: 'NY',
      zip: '10016'
    },
    phoneNumber: '555-333-2323'
  }
];

/**
 * Returns a deep-cloned copy of the in-memory employee dataset.
 *
 * This helper ensures callers cannot mutate the shared `Data` array,
 * preserving consistency across tests and sample FeatureCells.
 *
 * @returns A fresh cloned array of `BankEmployeeShape` records.
 */
export function getInMemoryBankEmployeeData(): BankEmployeeShape[] {
  return isolateValue(Data);
}
