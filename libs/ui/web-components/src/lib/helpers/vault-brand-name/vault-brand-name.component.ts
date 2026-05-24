import { Component, inject, input } from '@angular/core';
import { SDUX_VAULT_BRAND_NAME } from '../../tokens/vault-brand-name.token';

/**
 * Displays the combined SDUX brand name and Vault brand name.
 * This component renders a simple inline label using injected brand name tokens.
 */
@Component({
  selector: 'sdux-vault-brand-name',
  standalone: true,
  template: `
    @if (tm()) {
      <span class="vault-brand-name"
        >{{ vaultBrandName
        }}<span class="trademark" aria-hidden="true">&trade;</span></span
      >
    } @else {
      <span class="vault-brand-name">{{ vaultBrandName }}</span>
    }
  `,
  styles: `
    @use 'global' as global;
    .vault-brand-name {
      color: inherit;
      font-size: inherit;
      display: inline;
      font-weight: inherit;
    }
  `
})
export class VaultBrandNameComponent {
  /**
   * Vault-specific brand name value injected from the runtime token.
   */
  readonly vaultBrandName = inject(SDUX_VAULT_BRAND_NAME);

  /**
   * Whether to display the trademark symbol after the brand name.
   */
  readonly tm = input<boolean>(false);
}
