import { Component, inject, ViewEncapsulation } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { BrandNameService } from '@sdux-vault/ui/web-components';
import { NavigationDirective } from '../../directive/navigation.directive';
import { ReferencesSubNavigationComponent } from '../references/references.sub-navigation.component';

/**
 * Sub-navigation component for the "Reference Guides" section of the SDuX
 * documentation.
 *
 * Groups the References sub-navigation, Diagrams, Testing, and Videos links
 * under a single collapsible panel. Inherits all shared navigation behavior
 * from `NavigationDirective`.
 */
@Component({
  selector: 'sdux-reference-guides-subnavigation',
  standalone: true,
  imports: [
    MatExpansionModule,
    RouterLink,
    RouterLinkActive,
    MatListModule,
    ReferencesSubNavigationComponent
  ],
  templateUrl: './reference-guides.sub-navigation.component.html',
  styleUrls: ['../../navigation.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ReferenceGuidesSubNavigationComponent extends NavigationDirective {
  brandNameService = inject(BrandNameService);
  brandName = this.brandNameService.value;
}
