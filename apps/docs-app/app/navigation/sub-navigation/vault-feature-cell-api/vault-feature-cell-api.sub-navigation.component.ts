import { Component, ViewEncapsulation } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NavigationDirective } from '../../directive/navigation.directive';

@Component({
  selector: 'sdux-vault-feature-cell-api-subnavigation',
  standalone: true,
  imports: [MatExpansionModule, RouterLink, RouterLinkActive, MatListModule],
  templateUrl: './vault-feature-cell-api.sub-navigation.component.html',
  styleUrls: ['../../navigation.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VaultFeatureCellApiSubNavigationComponent extends NavigationDirective {}
