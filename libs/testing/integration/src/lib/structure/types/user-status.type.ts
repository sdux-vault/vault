export const UserStatusTypes = {
  Active: 'active',
  Inactive: 'inactive',
  Suspended: 'suspended',
  UnderInvestigation: 'under-investigation',
  InProgress: 'in-progress',
  Error: 'error'
} as const;

export type UserStatusType =
  (typeof UserStatusTypes)[keyof typeof UserStatusTypes];
