import { HttpResourceRef } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { FeatureCell, injectVault } from '@sdux-vault/angular';
import { PrimaryPartialAbstractClass } from '../../structure/services/primary-partial.abstract';
import { BankEmployeeShape } from '../../structure/shapes/bank-employee.shape';

@FeatureCell<BankEmployeeShape[]>('partial-http-resource')
@Injectable({
  providedIn: 'root'
})
export class partialHttpResourceService extends PrimaryPartialAbstractClass<
  BankEmployeeShape[]
> {
  constructor() {
    super(injectVault<BankEmployeeShape[]>(partialHttpResourceService));
  }

  initialize(): void {
    this.vault.initialize();
  }

  /**
   * Creates a mock HttpResourceRef that emits the provided value.
   */
  createMockHttpResourceRef(
    data: unknown
  ): HttpResourceRef<BankEmployeeShape[]> {
    return {
      value: signal(data),
      isLoading: signal(false),
      error: signal(undefined),
      status: signal(4),
      headers: signal(undefined),
      hasValue: () => true,
      reload: () => true,
      destroy: () => {},
      request: signal(undefined)
    } as unknown as HttpResourceRef<BankEmployeeShape[]>;
  }

  /**
   * Creates a mock HttpResourceRef that simulates an error state.
   */
  createMockHttpResourceRefError(
    error: Error
  ): HttpResourceRef<BankEmployeeShape[]> {
    return {
      value: signal(undefined),
      isLoading: signal(false),
      error: signal(error),
      status: signal(5),
      headers: signal(undefined),
      hasValue: () => false,
      reload: () => true,
      destroy: () => {},
      request: signal(undefined)
    } as unknown as HttpResourceRef<BankEmployeeShape[]>;
  }
}
