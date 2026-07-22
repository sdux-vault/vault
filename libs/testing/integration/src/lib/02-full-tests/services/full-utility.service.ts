import { Injectable } from '@angular/core';
import { withDistinctUntilChanged } from '@sdux-vault/addons';
import { FeatureCell, injectVault } from '@sdux-vault/angular';
import {
  BehaviorClassContract,
  FilterFunction,
  InterceptorBehaviorClassContract,
  ReducerFunction
} from '@sdux-vault/shared';
import { PartialWithDistinctUntilChangedAbstractClass } from '../../01-partial-tests/p180-with-distinct-until-change-operator/partial-operator.with-distinct-until-change.abstract';
import { PartialFilterAbstractClass } from '../../01-partial-tests/p190-filters/partial-filter.abstract';
import { partialFilterStartDateAfter } from '../../01-partial-tests/p190-filters/partial-filter.pure-functions';
import { PartialReducerAbstractClass } from '../../01-partial-tests/p200-reducers/partial-reducer.abstract';
import { PrimaryPartialAbstractClass } from '../../structure/services/primary-partial.abstract';
import { BankEmployeeShape } from '../../structure/shapes/bank-employee.shape';

/**
 * FeatureCell providing a mixed utility pipeline composed of:
 *
 * - **Interceptors** (`withDebounce`)
 * - **Operators** (`withDistinctUntilChanged`)
 * - **Filters** (composed from p160 filter utilities and pure functions)
 * - **Reducers** (composed from p170 reducer utilities)
 *
 * Registered under the FeatureCell key:
 *
 * ```
 * full-utility
 * ```
 *
 * This service is used by integration tests to validate end-to-end behavior
 * when multiple behavior types are combined into a single pipeline.
 */
@FeatureCell<BankEmployeeShape[]>('full-utility')
@Injectable({
  providedIn: 'root'
})
export class f0xUtilityService extends PrimaryPartialAbstractClass<
  BankEmployeeShape[]
> {
  /** Shared filter utilities from the p160 filter suite. */
  p160FilterClass: PartialFilterAbstractClass<BankEmployeeShape[]>;

  /** Shared reducer utilities from the p170 reducer suite. */
  p170ReducerClass: PartialReducerAbstractClass<BankEmployeeShape[]>;

  /** Operator utilities used for distinct-until-changed behavior. */
  p150WithDistinctUntilChangedClass: PartialWithDistinctUntilChangedAbstractClass<
    BankEmployeeShape[]
  >;

  /** Constructor */
  constructor() {
    super(injectVault<BankEmployeeShape[]>(f0xUtilityService));

    this.p160FilterClass = new PartialFilterAbstractClass(this.vault);
    this.p170ReducerClass = new PartialReducerAbstractClass(this.vault);
    this.p150WithDistinctUntilChangedClass =
      new PartialWithDistinctUntilChangedAbstractClass(this.vault);
  }

  initialize(): void {
    this.vault
      .interceptors(this.#addIntereptors())
      .operators(this.#addOperators())
      .reducers(this.#addReducers())
      .filters(this.#addFilters())
      .initialize();
  }

  /**
   * Registers operator behaviors for this FeatureCell.
   *
   * Includes:
   * - `withDistinctUntilChanged()` — suppresses repeated identical emissions.
   */
  #addOperators(): BehaviorClassContract<BankEmployeeShape[]>[] {
    return [withDistinctUntilChanged()];
  }

  /**
   * Registers reducer functions used to derive additional employee metadata.
   *
   * Reducers applied:
   * - Adds `isSenior`
   * - Adds `fullName`
   * - Adds boolean type indicator
   */
  #addReducers(): ReducerFunction<BankEmployeeShape[]>[] {
    return [
      (employees) =>
        this.p170ReducerClass.partialReducerStandaloneMethod(employees),
      this.p170ReducerClass.partialReducerArrowMethod,
      this.p170ReducerClass.partialReducerBoundMethod.bind(this)
    ];
  }

  /**
   * Registers filter functions used to narrow or reshape the employee list.
   *
   * Filter chain:
   * 1. Active employees
   * 2. Salary > threshold
   * 3. City-bound filter
   * 4. Start date greater than provided date
   */
  #addFilters(): FilterFunction<BankEmployeeShape[]>[] {
    return [
      (employees) =>
        employees.filter((employee) => employee.status === 'Active'),
      this.p160FilterClass.partialFilterArrowMethod,
      this.p160FilterClass.partialFilterBoundMethod.bind(this),
      partialFilterStartDateAfter('2020-01-01')
    ];
  }

  /**
   * Registers interceptor behaviors for upstream input control.
   *
   * Includes:
   * - `withDebounce(1000)` — delays incoming writes by 1 second.
   */
  #addIntereptors(): InterceptorBehaviorClassContract<BankEmployeeShape[]>[] {
    return [/*withCooldown(1000)*/];
  }
}
