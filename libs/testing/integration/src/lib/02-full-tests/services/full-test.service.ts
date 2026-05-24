import { Injectable } from '@angular/core';
import {
  AES256BehaviorOptions,
  CacheTTL,
  StepwiseBehaviorOptions,
  WithThrottleControllerOptions
} from '@sdux-vault/addons';
import { FeatureCell, injectVault } from '@sdux-vault/angular';
import { ResolveTypes } from '@sdux-vault/shared';
import { getAdditionalBankEmployeeData } from '../../structure/data/bank-employee.additional.data';
import { PrimaryFullAbstractClass } from '../../structure/services/primary-full.abstract';
import { BankEmployeeShape } from '../../structure/shapes/bank-employee.shape';

@FeatureCell<BankEmployeeShape[]>('full-test')
@Injectable({
  providedIn: 'root'
})
export class FullTestService extends PrimaryFullAbstractClass<
  BankEmployeeShape[]
> {
  #SALT_KEY = Uint8Array.from('vault::aes256::salt');

  constructor() {
    super(injectVault<BankEmployeeShape[]>(FullTestService));
  }

  initialize(): void {
    this.vault
      .operators(this.addOperators())
      .beforeTaps(this.addBeforeTaps())
      .reducers(this.addReducers())
      .afterTaps(this.addAfterTaps())
      .filters(this.addFilters())
      .initialize();
  }

  initializeWithHydration(): void {
    this.vault
      .withThrottle?.({ millisecondThrottle: 1_000 })
      .hydrate(() =>
        Promise.resolve(
          getAdditionalBankEmployeeData(true) as BankEmployeeShape[]
        )
      )
      .operators(this.addOperators())
      .beforeTaps(this.addBeforeTaps())
      .reducers(this.addReducers())
      .afterTaps(this.addAfterTaps())
      .filters(this.addFilters())
      .initialize();
  }

  initializeWithHydrationErrors(): void {
    this.vault
      .hydrate(() => Promise.reject('this is a hydration error'))
      .operators(this.addOperatorErrors())
      .filters(this.addFilterErrors())
      .beforeTaps(this.addBeforeTapErrors())
      .reducers(this.addReducerErrors())
      .beforeTaps(this.addAfterTapErrors())
      .initialize();
  }

  initializeWithStepwise(): void {
    this.vault.withStepwiseResolve!({
      stepwiseCallback: this.partialStepwiseClass.partialStepwiseArrowMethod
    } as StepwiseBehaviorOptions<BankEmployeeShape[]>).withStepwiseFilter!({
      stepwiseCallback: this.partialStepwiseClass.partialStepwiseArrowMethod
    } as StepwiseBehaviorOptions<BankEmployeeShape[]>).withStepwiseReducer!({
      stepwiseCallback: this.partialStepwiseClass.partialStepwiseArrowMethod
    } as StepwiseBehaviorOptions<BankEmployeeShape[]>)
      .reducers(this.addReducers())
      .filters(this.addFilters())
      .initialize();
  }

  initializeWithDelay(): void {
    this.vault
      .withDelay?.({ millisecondDelay: 1_000 })
      .operators(this.addOperators())
      .beforeTaps(this.addBeforeTaps())
      .reducers(this.addReducers())
      .afterTaps(this.addAfterTaps())
      .filters(this.addFilters())
      .initialize();
  }

  initializeWithThrottle(): void {
    this.vault
      .withThrottle?.({ millisecondThrottle: 1_000 })
      .operators(this.addOperators())
      .beforeTaps(this.addBeforeTaps())
      .reducers(this.addReducers())
      .afterTaps(this.addAfterTaps())
      .filters(this.addFilters())
      .initialize();
  }

  initializeStateCache(): void {
    this.vault.withStateCache!({
      ttl: CacheTTL.OneMinute,
      idKey: 'id',
      fetchType: ResolveTypes.Value,
      fetch: this.getByValue
    })
      // .withThrottle?.({ millisecondThrottle: 1_000 } as WithThrottleControllerOptions)
      .operators(this.addOperators())
      .beforeTaps(this.addBeforeTaps())
      .reducers(this.addReducers())
      .afterTaps(this.addAfterTaps())
      .filters(this.addFilters())
      .initialize();
  }

  initializeFromStreamNoFiltersAndReducers(): void {
    this.vault
      .operators(this.addOperators())
      .beforeTaps(this.addBeforeTaps())
      .afterTaps(this.addAfterTaps())
      .initialize();
  }

  initializeNoEncryptionWithErrors(): void {
    this.vault
      .withThrottle?.({ millisecondThrottle: 1_000 })
      .operators(this.addOperatorErrors())
      .beforeTaps(this.addBeforeTapErrors())
      .reducers(this.addReducerErrors())
      .afterTaps(this.addAfterTapErrors())
      .filters(this.addFilterErrors())
      .errors(this.addErrorCallbacks())
      .initialize();
  }

  initializeErrorsWithThrottle(): void {
    this.vault
      .withThrottle?.({ millisecondThrottle: 1_000 })
      .operators(this.addOperatorErrors())
      .filters(this.addFilterErrors())
      .beforeTaps(this.addBeforeTapErrors())
      .reducers(this.addReducerErrors())
      .beforeTaps(this.addAfterTapErrors())
      .initialize();
  }

  initializeSingleFilterErrors(): void {
    this.vault
      .operators(this.addOperators())
      .beforeTaps(this.addBeforeTaps())
      .reducers(this.addReducers())
      .afterTaps(this.addAfterTaps())
      .filters([
        (employees) => {
          if (this.isError) {
            throw new Error(`this is a filter error: ${this.errorCounter++}`);
          }
          {
            return employees;
          }
        }
      ])
      .initialize();
  }

  initializeMaxFailureErrors(): void {
    this.vault.withMaxFailures!({
      maxFailures: 2
    })
      .reducers(this.addReducers())
      .filters([
        (employees) => {
          if (this.isError) {
            throw new Error(`this is a filter error: ${this.errorCounter++}`);
          }
          {
            return employees;
          }
        }
      ])
      .initialize();
  }

  initializeWithEncrypt(): void {
    this.vault.setAes256Secret!({
      aes256Secret: 'the-secret',
      salt: this.#SALT_KEY,
      iterations: 300_000
    } as AES256BehaviorOptions)
      .withThrottle?.({
        millisecondThrottle: 1_000
      } as WithThrottleControllerOptions)
      .operators(this.addOperators())
      .filters(this.addFilters())
      .beforeTaps(this.addBeforeTaps())
      .reducers(this.addReducers())
      .afterTaps(this.addAfterTaps())
      .initialize();
  }

  initializeWithLicensing(): void {
    this.vault.setAes256Secret!({
      aes256Secret: 'the-secret',
      salt: this.#SALT_KEY,
      iterations: 300_000
    } as AES256BehaviorOptions).initialize();
  }

  initializeStateCacheByValue(): void {
    this.vault.withStateCache!({
      ttl: CacheTTL.OneMinute,
      idKey: 'id',
      fetchType: ResolveTypes.Value,
      fetch: this.getByValue
    }).setAes256Secret!({
      aes256Secret: 'the-secret',
      salt: this.#SALT_KEY,
      iterations: 300_000
    } as AES256BehaviorOptions)
      .operators(this.addOperators())
      .filters(this.addFilters())
      .beforeTaps(this.addBeforeTaps())
      .reducers(this.addReducers())
      .afterTaps(this.addAfterTaps())
      .initialize();
  }
}
