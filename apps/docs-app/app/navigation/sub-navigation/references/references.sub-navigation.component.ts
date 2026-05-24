import { Component, ViewEncapsulation } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NavigationDirective } from '../../directive/navigation.directive';

/**
 *
 * The HTML is generated using the npm run build:reference-menus
 *
 * Sub-navigation component for the “References” section of the SDuX
 * documentation.
 *
 * This component provides a grouped list of links for all core TypeScript
 * models, interfaces, and helper types used throughout the framework. It
 * inherits all shared navigation behavior—layout mode, expansion state, and
 * mobile-aware closing—from `NavigationDirective`.
 *
 * The component uses `ViewEncapsulation.None` to ensure its markup inherits the
 * global navigation styling defined in `navigation.component.scss`.
 */
@Component({
  selector: 'sdux-references-subnavigation',
  standalone: true,
  imports: [MatExpansionModule, RouterLink, RouterLinkActive, MatListModule],
  templateUrl: './references.sub-navigation.component.html',
  styleUrls: ['../../navigation.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ReferencesSubNavigationComponent extends NavigationDirective {}
