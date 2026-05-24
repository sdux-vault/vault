import { Component, inject, input } from '@angular/core';
import { SDUX_FEATURE_CELL_BRAND_NAME } from '../../tokens/feature-cell-brand-name.token';

/** Inline component that renders the FeatureCell brand name with an optional trademark symbol. */
@Component({
  selector: 'sdux-feature-cell',
  standalone: true,
  template: `
    @if (tm()) {
      <span class="feature-cell-brand-name">
        {{ featureCell
        }}<span class="trademark" aria-hidden="true">&trade;</span>
      </span>
    } @else {
      <span class="feature-cell-brand-name">
        {{ featureCell }}
      </span>
    }
  `,
  styles: `
    @use 'global' as global;

    .feature-cell-brand-name {
      color: inherit;
      font-size: inherit;
      display: inline;
      font-weight: inherit;
    }
  `
})
export class FeatureCellBrandNameComponent {
  /** Injected FeatureCell brand name string. */
  readonly featureCell = inject(SDUX_FEATURE_CELL_BRAND_NAME);

  /** Whether to display the trademark symbol. */
  readonly tm = input<boolean>(false);
}
