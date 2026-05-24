import { Component, inject } from '@angular/core';
import { SDUX_PACKAGE_NAME } from '../../tokens/package-name.token';

/**
 * Displays the SDUX package name using the injected SDUX_PACKAGE_NAME token.
 */
@Component({
  selector: 'sdux-package-name',
  standalone: true,
  template: ` <span class="package-name">{{ packageName }}</span> `,
  styles: `
    @use 'global' as global;

    .package-name {
      color: inherit;
      font-size: inherit;
      display: inline;
      font-weight: inherit;
    }
  `
})
export class PackageNameComponent {
  /**
   * Primary SDUX package name value injected from the runtime token.
   */
  readonly packageName = inject(SDUX_PACKAGE_NAME);
}
