import { Injectable } from '@angular/core';
import { FeatureCell, injectVault } from '@sdux-vault/angular';
import { ReducerFunction } from '@sdux-vault/shared';
import { BankEmployeeShape } from '../../structure/shapes/bank-employee.shape';
import { PartialReducerAbstractClass } from './partial-reducer.abstract';
import { partialReducerPureFunction } from './partial-reducer.pure-functions';

/**
 * FeatureCell-backed reducer service used in the p170 integration test suite.
 *
 * This service registers a chain of reducers that operate on an array of
 * `BankEmployeeShape` objects. It extends `p170ReducerAbstractClass`, which
 * provides reusable reducer methods exercised by the tests.
 *
 * The registered reducers collectively demonstrate:
 * - inline reducers
 * - arrow function reducers
 * - bound class reducers
 * - pure-function reducers
 *
 * The service initializes its reducer pipeline upon construction.
 *
 * @typeParam T - The array element type for the employee state.
 */
@FeatureCell<BankEmployeeShape[]>('partial-reducers')
@Injectable({
  providedIn: 'root'
})
export class PartialReducerService extends PartialReducerAbstractClass<
  BankEmployeeShape[]
> {
  /**
   * Constructor
   *
   * Creates a new reducer service and registers a composed reducer chain
   * on the underlying FeatureCell vault instance.
   */
  constructor() {
    super(injectVault<BankEmployeeShape[]>(PartialReducerService));
  }

  initialize(): void {
    /**
     * Reducer Chain:
     * 1. Inline reducer  → addSeniorp170Reducer
     * 2. Arrow reducer   → addFullNamep170Reducer
     * 3. Bound reducer   → addTypeBooleanp170Reducer
     */
    const reducers: ReducerFunction<BankEmployeeShape[]>[] = [
      // Inline reducer (#1)
      (employees) => this.partialReducerStandaloneMethod(employees),

      // Arrow reducer (#2)
      this.partialReducerArrowMethod,

      // pure function
      partialReducerPureFunction,

      // Bound class reducer (#3)
      this.partialReducerBoundMethod.bind(this)
    ];

    this.vault.reducers(reducers).initialize();
  }

  initializeError(): void {
    let reducers: ReducerFunction<BankEmployeeShape[]>[];

    reducers = [
      // Inline reducer (#1)
      (employees) => this.partialReducerStandaloneMethod(employees),

      // Reducer that deliberately throws
      () => {
        throw new Error('this is a reducer error');
      },

      // Standalone class reducer (#4) using `.bind(this)`
      this.partialReducerBoundMethod.bind(this)
    ];

    this.vault.reducers(reducers).initialize();
  }
}
