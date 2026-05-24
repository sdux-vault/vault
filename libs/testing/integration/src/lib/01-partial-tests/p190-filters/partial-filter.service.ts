import { Injectable } from '@angular/core';
import { FeatureCell, injectVault } from '@sdux-vault/angular';
import { FilterFunction } from '@sdux-vault/shared';
import { BankEmployeeShape } from '../../structure/shapes/bank-employee.shape';
import { PartialFilterAbstractClass } from './partial-filter.abstract';
import { partialFilterStartDateAfter } from './partial-filter.pure-functions';

/**
 * FeatureCell-driven filtering service for partial bank employee data.
 *
 * This service wires together a **filter pipeline** used for transforming
 * `BankEmployeeShape[]` collections inside an Vault FeatureCell. Filters
 * are executed in sequence (top-to-bottom), with each filter receiving the
 * result of the previous one.
 *
 * The service extends `partialFilterAbstractClass`, which provides a reusable
 * base API for partial-style filter behaviors, including shared helper methods
 * used by bound filters.
 *
 * ## FeatureCell
 * The `@FeatureCell` decorator registers the service as a FeatureCell named:
 *
 * ```
 * partial-filters
 * ```
 *
 * The FeatureCell manages:
 * - pipeline lifecycle (initialize / reset / destroy)
 * - filter execution
 * - state updates and emission
 *
 * ## Filter Chain Overview
 *
 * The constructor installs a sequence of **four distinct filter strategies**:
 *
 * 1. **Inline filter** — only employees with `status = "Active"`.
 * 2. **Arrow function filter** — provided by the base class, selects employees with salary > 80k.
 * 3. **Bound class filter** — also from the base class, filters employees located in `"New York"`.
 * 4. **Standalone pure-function filter** — created via factory (`partialFilterStartDateAfter`)
 *    and filters employees whose employment start date is after a given cutoff.
 *
 * Together, these form a reusable and composable filtering pipeline.
 *
 * ## Example Usage
 * ```ts
 * export class EmployeesComponent {
 *   readonly filteredEmployees$ = this.filterService.state$;
 *
 *   constructor(private filterService: partialFilterService) {}
 *
 *   applyFilters() {
 *     this.filterService.filter();    // triggers the filter pipeline
 *   }
 * }
 * ```
 *
 * @see PartialFilterAbstractClass – Provides reusable shared filters.
 * @see partialFilterStartDateAfter – Standalone pure-function filter factory.
 * @see FeatureCell – Vault decorator for state/pipeline registration.
 */
@FeatureCell<BankEmployeeShape[]>('partial-filters')
@Injectable({
  providedIn: 'root'
})
export class PartialFilterService extends PartialFilterAbstractClass<
  BankEmployeeShape[]
> {
  /**
   * constructor
   */
  constructor() {
    super(injectVault<BankEmployeeShape[]>(PartialFilterService));
  }

  initialize(): void {
    /**
     * The filter pipeline for the partial feature.
     *
     * Filters execute sequentially:
     *  1. Filter active employees
     *  2. Filter high-salary employees
     *  3. Filter employees from New York
     *  4. Filter employees starting after 2020-01-01
     */
    const filters: FilterFunction<BankEmployeeShape[]>[] = [
      /**
       * Inline Filter (#1)
       * -------------------
       * Keeps only employees whose status is `"Active"`.
       */
      (employees) =>
        employees.filter((employee) => employee.status === 'Active'),

      /**
       * Arrow Filter (#2)
       * ------------------
       * High-salary filter implemented in the abstract base class.
       * Keeps employees with salary > 80,000.
       */
      this.partialFilterArrowMethod,

      /**
       * Bound Class Filter (#3)
       * ------------------------
       * Bound instance method from the abstract class.
       * Keeps only employees whose city is `"New York"`.
       */
      this.partialFilterBoundMethod.bind(this),

      /**
       * Pure-Function Filter (#4)
       * --------------------------
       * Factory-generated predicate.
       * Keeps employees who started after a given ISO date.
       */
      partialFilterStartDateAfter('2020-01-01')
    ];

    // Register and initialize the filter pipeline within the FeatureCell.
    this.vault.filters(filters).initialize();
  }

  initializeErrors(): void {
    let filters: FilterFunction<BankEmployeeShape[]>[];

    filters = [
      /**
       * Inline Filter (#1)
       * -------------------
       * Valid filter — keeps only employees with `status = "Active"`.
       */
      (employees) =>
        employees.filter((employee) => employee.status === 'Active'),

      /**
       * ERROR FILTER (#2)
       * -------------------
       * This filter intentionally throws to test Vault's error handling.
       *
       * The error should be:
       * - captured,
       * - wrapped into a ResourceStateError,
       * - surfaced through the FeatureCell's error signal,
       * - prevent subsequent filters from executing.
       */
      () => {
        throw new Error('this is a filter error');
      },

      /**
       * Arrow Filter (#3)
       * -------------------
       * Valid filter (but will never run due to the previous filter throwing).
       * Selects employees with salary > 80,000.
       */
      this.partialFilterArrowMethod
    ];

    // Register filters and initialize the FeatureCell.
    this.vault.filters(filters).initialize();
  }
}
