/**
 * Strongly-typed set of all supported user role values.
 *
 * Declared as a `const` object to preserve literal string types, ensuring
 * compile-time safety when assigning or comparing user roles.
 */
export const UserRoleTypes = {
  Teller: 'teller',
  Manager: 'manager',
  Owner: 'owner',
  LoanOfficer: 'loan-officer',
  Customer: 'customer',
  Robber: 'robber',
  Police: 'police'
} as const;

/**
 * Union type representing all valid user role string values.
 *
 * Equivalent to:
 * `'teller' | 'manager' | 'owner' | 'loan-officer' | 'customer' | 'robber' | 'police'`.
 */
export type UserRoleType = (typeof UserRoleTypes)[keyof typeof UserRoleTypes];
