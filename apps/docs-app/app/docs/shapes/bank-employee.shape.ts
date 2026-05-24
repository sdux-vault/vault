export interface BankEmployeeShape {
  id: string;
  firstName: string;
  lastName: string;
  fullName?: string;

  role: 'Teller' | 'Manager' | 'Owner' | 'LoanOfficer' | 'Security';
  status: 'Active' | 'Vacation' | 'Suspended';

  salary: number;
  hireDate: string; // ISO: YYYY-MM-DD
  birthDate: string; // ISO: YYYY-MM-DD

  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };

  phoneNumber: string;

  // Derived fields (reducers may populate):
  senior?: boolean;
  isLoanOfficer?: boolean;
  isSecurity?: boolean;
  isActive?: boolean;
}
