import { Component, inject, input } from '@angular/core';
import { SDUX_BRAND_NAME } from '../../tokens/brand-name.token';

/**
 * Displays the primary SDUX brand name.
 * This component renders a simple inline label using the injected brand name token.
 */
@Component({
  selector: 'sdux-brand-name',
  standalone: true,
  template: `
    @if (tm()) {
      <span class="brand-name">
        {{ brandName }}<span class="trademark" aria-hidden="true">&trade;</span>
      </span>
    } @else {
      <span class="brand-name">
        {{ brandName }}
      </span>
    }
  `,
  styles: `
    @use 'global' as global;

    .brand-name {
      color: inherit;
      font-size: inherit;
      display: inline;
      font-weight: inherit;
    }
  `
})
export class BrandNameComponent {
  /**
   * Primary SDUX brand name value injected from the runtime token.
   */
  readonly brandName = inject(SDUX_BRAND_NAME);

  /**
   * Whether to display the trademark symbol after the brand name.
   */
  readonly tm = input<boolean>(false);
}
