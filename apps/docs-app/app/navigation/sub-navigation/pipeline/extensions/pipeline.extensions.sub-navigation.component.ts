import { Component, inject, ViewEncapsulation } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SDUX_BRAND_NAME } from '@sdux-vault/ui/web-components';
import { NavigationDirective } from '../../../directive/navigation.directive';

@Component({
  selector: 'sdux-pipeline-extensions-subnavigation',
  standalone: true,
  imports: [MatExpansionModule, RouterLink, RouterLinkActive, MatListModule],
  templateUrl: './pipeline.extensions.sub-navigation.component.html',
  styleUrls: ['../../../navigation.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PipelineExtensionsSubNavigationComponent extends NavigationDirective {
  brandName = inject(SDUX_BRAND_NAME);
}
