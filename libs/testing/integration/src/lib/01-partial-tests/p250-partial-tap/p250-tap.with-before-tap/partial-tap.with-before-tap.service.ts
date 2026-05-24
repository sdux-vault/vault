import { Injectable } from '@angular/core';
import { FeatureCell, injectVault } from '@sdux-vault/angular';
import { BankEmployeeShape } from '../../../structure/shapes/bank-employee.shape';
import { ExtendedStateSnapshot } from '../interfaces/extended-state-snap-shot.interface';
import { PartialTapAbstractClass } from '../partial-tap.abstract';
import { partialPureTapFunction } from '../partial-tap.pure-functions';

/**
 * PartialWithBeforeTapService
 *
 * Integration-test FeatureCell used to validate **before-tap execution
 * semantics** within the SDuX pipeline. This service exercises all
 * supported forms of `TapFunction<T>` when registered through
 * `vault.beforeTaps()`, ensuring that:
 *
 * - Arrow taps execute and preserve lexical `this`
 * - Inline method taps execute correctly
 * - Bound functions work as expected
 * - Nested/private tap invocations propagate through the pipeline
 * - Pure external tap factory functions behave consistently
 * - Anonymous inline tap functions are accepted and executed
 *
 * Each tap enriches the `StateSnapshot<T>` by assigning a `source`
 * property (via `ExtendedStateSnapshot<T>`) so integration tests can
 * assert the exact execution order and confirm that all taps fire
 * before reducers and filters.
 *
 * This class is part of the **p250 Tap Pipeline Integration Suite** and
 * specifically verifies BEFORE-tap behavior (as opposed to after-tap).
 */
@FeatureCell<BankEmployeeShape[]>('partial-with-before-tap')
@Injectable({
  providedIn: 'root'
})
export class PartialWithBeforeTapService extends PartialTapAbstractClass<
  BankEmployeeShape[]
> {
  /**
   * Constructs a FeatureCell configured with a full set of BEFORE-tap
   * test functions. The base class receives `'Before'` as its identifier,
   * allowing each tap to brand its source for later inspection.
   */
  constructor() {
    super(
      injectVault<BankEmployeeShape[]>(PartialWithBeforeTapService),
      'Before'
    );
  }

  async initialize(): Promise<void> {
    await this.vault
      .beforeTaps([
        // 1. Arrow tap
        this.partialArrowTapFunction,

        // 2. Inline instance method (bound)
        this.partialInlineTapFunction.bind(this),

        // 3. Nested/private tap invocation
        this.partialNestedTapFunction.bind(this),

        // 4. Anonymous inline tap function
        (value): void => {
          const extendedTap = { value } as ExtendedStateSnapshot<
            BankEmployeeShape[]
          >;
          extendedTap.source = 'partialAnonymousBeforeTapFunction';
          this.taps.push(extendedTap);
        },

        // 5. Pure functional tap (factory-produced)
        partialPureTapFunction<BankEmployeeShape[]>(
          'partialPureFunctionBeforeTap',
          this.taps
        )
      ])
      .initialize();
  }

  initializeError(): void {
    this.vault
      .beforeTaps([
        this.partialArrowTapFunction,

        // Inline tap used to simulate a runtime failure inside beforeTaps
        (value): void => {
          const extendedTap = { value } as ExtendedStateSnapshot<
            BankEmployeeShape[]
          >;
          extendedTap.source = 'partialAnonymousErrorBeforeTapFunction';
          if (this.isError) {
            delete extendedTap.value;
          }
          this.taps.push(extendedTap);

          if (this.isError) {
            throw new Error('this is the before tap error message');
          }
        },

        partialPureTapFunction<BankEmployeeShape[]>(
          'partialPureFunctionBeforeTap',
          this.taps
        )
      ])
      .initialize();
  }
}
