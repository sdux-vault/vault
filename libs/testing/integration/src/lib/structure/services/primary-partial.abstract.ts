import { httpResource, HttpResourceRef } from '@angular/common/http';
import { inject, Injector } from '@angular/core';
import { FeatureCellShape, VaultSignalStateRef } from '@sdux-vault/angular';
import {
  DeferredFactory,
  DeferredType,
  StateInputType,
  VaultErrorService
} from '@sdux-vault/shared';
import { Observable, of, throwError } from 'rxjs';
import { getBankEmployeeData } from '../data/bank-employee.data';
import { BankEmployeeShape } from '../shapes/bank-employee.shape';

/**
 * Abstract base class for integration test services used in the p170 suite.
 *
 * This class exposes a FeatureCell-backed vault instance and provides
 * convenience wrappers for `replaceState()` and `mergeState()` used in
 * reducer-focused integration tests. Subclasses may call these methods to
 * update state without repeating boilerplate.
 *
 * @typeParam T - The FeatureCell state type managed by the test integration class.
 */
export abstract class PrimaryPartialAbstractClass<T> {
  static readonly HTTP_RESOURCE_URL = '/api/test/bank-employees';

  isError = false;
  fetches: string[] = [];
  globalError = VaultErrorService();
  errorCounter = 1;
  readonly injector = inject(Injector);

  /**
   * Creates a new integration test helper with access to the underlying vault.
   *
   * @param vault - The FeatureCellModel instance backing this integration class.
   */
  constructor(readonly vault: FeatureCellShape<T>) {}

  clearGlobalErrors(): void {
    this.globalError.clear();
  }

  getByValue = (id: string): StateInputType<BankEmployeeShape[]> => {
    const idFound = this.fetches.includes(id);
    this.fetches.push(id);
    return {
      value: (getBankEmployeeData() as BankEmployeeShape[]).filter(
        (employee: BankEmployeeShape) => {
          if (employee.id === id) {
            this.fetches.push(`found - ${id}${idFound ? ' auto-fetch' : ''}`);
            return employee;
          }

          return;
        }
      )
    };
  };

  getByObservable = (id: string): Observable<BankEmployeeShape[]> => {
    const idFound = this.fetches.includes(id);
    this.fetches.push(id);
    if (this.isError) {
      this.fetches.push(`error - ${id}`);
      return throwError(() => new Error('This is the reject error'));
    } else {
      return of(
        (getBankEmployeeData() as BankEmployeeShape[]).filter(
          (employee: BankEmployeeShape) => {
            if (employee.id === id) {
              this.fetches.push(`found - ${id}${idFound ? ' auto-fetch' : ''}`);
              return employee;
            }

            return;
          }
        )
      );
    }
  };

  getByPromise = async (id: string): Promise<BankEmployeeShape[]> => {
    const idFound = this.fetches.includes(id);
    this.fetches.push(id);
    if (this.isError) {
      this.fetches.push(`error - ${id}`);
      return Promise.reject(new Error('This is the reject error'));
    } else {
      return Promise.resolve(
        (getBankEmployeeData() as BankEmployeeShape[]).filter(
          (employee: BankEmployeeShape) => {
            if (employee.id === id) {
              this.fetches.push(`found - ${id}${idFound ? ' auto-fetch' : ''}`);
              return employee;
            }

            return;
          }
        )
      );
    }
  };

  /**
   * Returns a reference to the vault's `state` signal.
   *
   * This provides direct read access to the FeatureCell state for test assertions.
   *
   * @returns A `VaultSignalStateRef` providing access to the current state snapshot.
   */
  getState(): VaultSignalStateRef<T> {
    return this.vault.state;
  }

  formatPromiseInputAsDeferred(value: unknown): DeferredType<T> {
    return (() => Promise.resolve(value)) as DeferredType<T>;
  }

  formatPromiseInputAsValue(value: unknown): DeferredFactory<T> {
    return {
      value: () => Promise.resolve(value)
    } as DeferredFactory<T>;
  }

  formatPromiseInputAsValueReject(value: unknown): DeferredFactory<T> {
    return {
      value: () => Promise.reject(value)
    } as DeferredFactory<T>;
  }

  /**
   * Creates a real HttpResourceRef backed by Angular's httpResource.
   *
   * Use HttpTestingController in the test to flush the response with data
   * or an error status.
   *
   * @param url - The test endpoint URL. Defaults to HTTP_RESOURCE_URL.
   * @returns A live HttpResourceRef that is waiting for an HTTP response.
   */
  createHttpResourceRef(
    url = PrimaryPartialAbstractClass.HTTP_RESOURCE_URL
  ): HttpResourceRef<BankEmployeeShape[] | undefined> {
    return httpResource<BankEmployeeShape[]>(() => url, {
      injector: this.injector
    });
  }

  /**
   * Merges the next state into the current FeatureCell state.
   *
   * If the caller does not supply values:
   * - `previous` defaults to the current vault state
   * - `next` defaults to `getBankEmployeeData()`
   *
   * This method performs an array spread merge, assuming `T` is an array type
   * in all integration test scenarios.
   *
   * @param next - Optional incoming state to merge. Defaults to test fixture data.
   * @param previous - Optional current state to merge into. Defaults to vault state.
   */
  mergeState(next?: T, options?: unknown): void {
    if (next === null) {
      next = undefined;
    } else {
      next = next ?? (getBankEmployeeData() as T);
    }

    this.vault.mergeState(
      {
        loading: false,
        value: next,
        error: null
      },
      options
    );
  }

  setError(): void {
    this.isError = true;
  }

  unsetError(): void {
    this.isError = false;
  }
}
