import { Component, inject, input } from '@angular/core';
import { SDUX_PACKAGE_NAME } from '../../tokens/package-name.token';

/**
 * Displays the SDUX package name using the injected SDUX_PACKAGE_NAME token.
 */
@Component({
  selector: 'sdux-package-name',
  standalone: true,
  template: `
    <span class="package-name">{{ packageName }}{{ getPackage() }}</span>
  `,
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
  /** Optional package name "addons | core". */
  readonly package = input<string>();

  /**
   * Builds the optional package suffix displayed after the primary package name.
   * @returns A slash-prefixed package name when the input is provided, otherwise an empty string.
   */
  getPackage(): string {
    const packageName = this.package();

    return packageName ? `/${packageName}` : '';
  }

  /**
   * Primary SDUX package name value injected from the runtime token.
   */
  readonly packageName = inject(SDUX_PACKAGE_NAME);
}
