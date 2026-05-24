import { Component, ViewEncapsulation } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { BrandNameComponent } from '@sdux-vault/ui/web-components';
import { NavigationDirective } from '../../directive/navigation.directive';

@Component({
  selector: 'sdux-getting-started-subnavigation',
  standalone: true,
  imports: [
    MatExpansionModule,
    RouterLink,
    RouterLinkActive,
    MatListModule,
    BrandNameComponent
  ],
  templateUrl: './getting-started.sub-navigation.component.html',
  styleUrls: ['../../navigation.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GettingStartedSubNavigationComponent extends NavigationDirective {}
