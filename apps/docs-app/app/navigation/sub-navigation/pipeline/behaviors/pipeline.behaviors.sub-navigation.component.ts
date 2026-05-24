import { Component, ViewEncapsulation } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {
  BrandNameComponent,
  DeprecatedComponent,
  ImageComponent
} from '@sdux-vault/ui/web-components';
import { NavigationDirective } from '../../../directive/navigation.directive';

/**
 * Sub-navigation panel for the "Pipeline" documentation section.
 *
 * This component provides the expandable navigation menu used inside the
 * documentation sidenav for all pipeline-related pages. It inherits all
 * layout, resize-handling, and sidenav-state behavior from
 * `NavigationDirective`, ensuring consistent interaction patterns with the
 * rest of the documentation navigation system.
 *
 * View encapsulation is disabled so that global sidenav styling defined in
 * `navigation.component.scss` applies uniformly to all submenus.
 */
@Component({
  selector: 'sdux-pipeline-behaviors-subnavigation',
  standalone: true,
  imports: [
    MatExpansionModule,
    RouterLink,
    RouterLinkActive,
    MatListModule,
    ImageComponent,
    BrandNameComponent,
    DeprecatedComponent
  ],
  templateUrl: './pipeline.behaviors.sub-navigation.component.html',
  styleUrls: ['../../../navigation.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PipelineBehaviorSubNavigationComponent extends NavigationDirective {}
