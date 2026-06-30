import { Component, inject, ViewEncapsulation } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {
  BrandNameService,
  ImageComponent
} from '@sdux-vault/ui/web-components';
import { NavigationDirective } from '../../directive/navigation.directive';

/**
 * Sub-navigation component for the "Licensing" section of the SDuX
 * documentation.
 *
 * Groups purchase, license, trademark, and monetization links under a single
 * collapsible panel. Inherits all shared navigation behavior from
 * `NavigationDirective`.
 */
@Component({
  selector: 'sdux-licensing-subnavigation',
  standalone: true,
  imports: [
    MatExpansionModule,
    RouterLink,
    RouterLinkActive,
    MatListModule,
    ImageComponent
  ],
  templateUrl: './licensing.sub-navigation.component.html',
  styleUrls: ['../../navigation.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LicensingSubNavigationComponent extends NavigationDirective {
  brandNameService = inject(BrandNameService);
  brandName = this.brandNameService.value;
  vaultBrandName = this.brandNameService.vaultValue;
}
