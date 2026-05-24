import { Injectable, inject } from '@angular/core';
import { SDUX_BRAND_NAME } from '../tokens/brand-name.token';
import { SDUX_VAULT_BRAND_NAME } from '../tokens/vault-brand-name.token';

/**
 * Provides access to the configured SDuX brand name and vault brand name tokens.
 */
@Injectable({
  providedIn: 'root'
})
export class BrandNameService {
  /**
   * Resolved brand name string injected from the SDUX_BRAND_NAME token.
   */
  readonly #brandName = inject(SDUX_BRAND_NAME);

  /**
   * Resolved vault brand name string injected from the SDUX_VAULT_BRAND_NAME token.
   */
  readonly #vaultBrandName = inject(SDUX_VAULT_BRAND_NAME);

  /**
   * Returns the configured brand name.
   */
  get value(): string {
    return this.#brandName;
  }

  /**
   * Returns the configured vault brand name.
   */
  get vaultValue(): string {
    return this.#vaultBrandName;
  }
}
