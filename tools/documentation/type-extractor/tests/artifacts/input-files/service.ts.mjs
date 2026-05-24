export const SERVICE = `
/**
 * Runtime-safe registry of all ngVault behavior types.
 *
 * This object acts as an enum substitute without introducing JavaScript enum
 * overhead. Values are string literals preserved at runtime and suitable for
 * switch statements, comparisons, and pipeline classification. The structure
 * is fully tree-shakable and safely inferable by TypeScript.
 */

import { Injectable } from '@angular/core';
import { FeatureCell, injectVault } from '@sdux/angular';
import { VaultSignalStateRef } from '@sdux/angular';
import { getInMemoryBankEmployeeData } from 'src/app/docs/data/bank-employee.data';
import { BankEmployeeModel } from 'src/app/docs/models/bank-employee.model';

@FeatureCell<BankEmployeeModel[]>('value-resolve')
@Injectable({
  providedIn: 'root'
})
export class ValueResolveService {
  protected readonly vault = injectVault<BankEmployeeModel[]>(ValueResolveService);
  private data = getInMemoryBankEmployeeData();

  state(): VaultSignalStateRef<BankEmployeeModel[]> {
    return this.vault.state;
  }

  constructor() {
    this.vault.initialize();
  }

  resetData() {
    this.vault.reset();
  }

  loadData(): void {
    this.replaceData();
  }

  replaceData(): void {
    const state = this.vault.state;

    if (!state.hasValue() && !state.isLoading()) {
      this.vault.replaceState({ loading: true, error: null });

      this.vault.replaceState({
        loading: false,
        value: this.data,
        error: null
      });
    }
  }

  mergeData(): void {
    const state = this.vault.state;

    if (!state.isLoading()) {
      this.vault.replaceState({ loading: true, error: null });
      const prevState = state.value() as BankEmployeeModel[];

      this.vault.mergeState({
        loading: false,
        value: [...prevState, ...this.data],
        error: null
      });
    }
  }
}


/**
 * Cookie-based persistence behavior for NgVault.
 *
 * This behavior serializes state into document.cookie using a
 * feature-scoped cookie key. Cookies are limited to ~4096 bytes,
 * therefore a hard safety threshold of **4000 bytes** is enforced.
 *
 * Behaviors of type Persist plug into the **persist** stage of
 * the pipeline and are responsible for reading/writing the final
 * reduced state to/from long-term storage.
 *
 * @typeParam T The type of state being persisted.
 */
@VaultBehavior({
  type: BehaviorTypes.Persist,
  key: defineBehaviorKey('Core', 'CookieStoragePersist'),
  critical: false
})
export class withCookieStoragePersistBehavior<T> implements PersistBehavior<T> {
}
`;
