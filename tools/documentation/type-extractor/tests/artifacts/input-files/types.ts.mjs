export const TYPES = `
import { BankEmployeeModel } from '../models/bank-employee.model';

/**
 * In-memory dataset of 'BankEmployeeModel' records used throughout
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
export const Data: BankEmployeeModel[] = [
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
  }
];

export function getBankEmployeeData(index?: number, asArray = false): BankEmployeeModel | BankEmployeeModel[] {
  if (index !== undefined && index >= 0 && index < Data.length) {
    const item = structuredClone(Data[index]);
    return asArray ? [item] : item;
  }

  return structuredClone(Data);
}


import { BankEmployeeModel } from '../../structure/models/bank-employee.model';

/**
 * Pure standalone filter (#4)
 * Returns a VaultFilterFunction that filters employees hired on/after the cutoff date.
 */
export function filterStartDateAfterP02(cutoff: string): (current: BankEmployeeModel[]) => BankEmployeeModel[] {
  const cutoffDate = new Date(cutoff);

  return (current: BankEmployeeModel[]): BankEmployeeModel[] => {
    return current.filter((employee: BankEmployeeModel) => new Date(employee.hireDate) >= cutoffDate);
  };
}

export interface BankEmployeeModel {
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

export const FEATURE_CELL_REGISTRY = new InjectionToken<Array<{ key: string; token: unknown }>>(
  'FEATURE_CELL_REGISTRY',
  {
    providedIn: 'root',
    factory: () => {
      throw new Error('[vault] Missing root Vault configuration. Did you forget to call provideVault()?');
    }
  }
);


export type LogLevel = 'off' | 'error' | 'warn' | 'log' | 'debug';


export function FeatureCell<TState>(key: string) {
  return function <T extends new (...args: any[]) => {}>(target: T) {
    (target as any)[VAULT_METADATA_KEYS.FEATURE_CELL_KEY] = key;

    (target as any)[VAULT_METADATA_KEYS.FEATURE_CELL_STATE] = null as unknown as TState;
  };
}

export function injectVault<T>(
  // eslint-disable-next-line
  featureCellClass?: abstract new (...args: any[]) => object
): FeatureCellModel<T> {
}

export interface BehaviorInit {
  initializeBehaviors<T>(injector: Injector, factories: Array<BehaviorClass<T>>): Behavior<T>[];
  applyBehaviorExtensions<T>(cell: FeatureCellModel<T>): void;
}

export type LicenseTier = 'production' | 'basic' | 'development' | 'free';

export type PublicKeyTier = 'production' | 'basic' | 'development';

export const UserStatuses = {
  Active: 'active',
  Inactive: 'inactive',
  Suspended: 'suspended',
  UnderInvestigation: 'under-investigation',
  InProgress: 'in-progress',
  Error: 'error'
} as const;

export type UserStatus = (typeof UserStatuses)[keyof typeof UserStatuses];

export { A, B, C, UserStatus }


export const isVaultContinue = <T>(current: FinalState<T>): boolean => {
  return current === VAULT_CONTINUE;
};

export const isNull = (current: unknown): current is null => current === null;

export const isVaultClearState = function<T>(current: FinalState<T>): boolean {
  return current === VAULT_CLEAR_STATE;
};

export const isFunctionNoType = function(current: FinalState<T>): boolean {
  return current === VAULT_CLEAR_STATE;
};

export const loadState = async (id: string): Promise<State> => {
  return fetchState(id);
};

export const loadState2 = async function (id: string): Promise<State> {
  return fetchState(id);
};

export const isDefined = value => value !== undefined;

export const mapper=<T>(value:T)=>value;

export function parse1(value: string): number;
export function parse2(value: number): string;
export function parse3(value: any): any {
  return value;
}

export const CACHE_TTL = 60_000;
export const OPTIONS = { retry: true };
export const FLAG = true;

export const value = (() => compute())();

export const fn = ((value: number) => value * 2) as (v: number) => number;

export const withDefault = (x = 1): number => x;

export const multi =
  <T>(
    value: T
  ): T =>
    value;
`;
