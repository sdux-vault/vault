export interface BankEmployeeShape {
  /** Unique employee identifier. */
  id: string;

  /** Employee first name. */
  firstName: string;

  /** Employee last name. */
  lastName: string;

  /** Employee role within the bank (fixed literal union). */
  role: 'Teller' | 'Manager' | 'Owner' | 'LoanOfficer' | 'Security';

  /** Current employment status (fixed literal union). */
  status: 'Active' | 'Vacation' | 'Suspended';

  /** Annual salary value. */
  salary: number;

  /** ISO‐8601 hire date: `YYYY-MM-DD`. */
  hireDate: string;

  /** ISO‐8601 birth date: `YYYY-MM-DD`. */
  birthDate: string;

  /** Structured postal address information. */
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };

  /** Primary contact phone number. */
  phoneNumber: string;

  // ────────────────────────────────────────────
  // Derived / reducer-populated fields
  // ────────────────────────────────────────────

  /** Full name generated from `firstName` and `lastName`. */
  fullName?: string;

  /** Indicates senior status (derived from tenure). */
  senior?: boolean;

  /** True if employee's role matches LoanOfficer. */
  isLoanOfficer?: boolean;

  /** True if employee's role matches Security. */
  isSecurity?: boolean;

  /** Convenience flag for active employment status. */
  isActive?: boolean;
}
