import { Component, ViewEncapsulation } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {
  BrandNameComponent,
  ImageComponent
} from '@sdux-vault/ui/web-components';
import { NavigationDirective } from '../../../directive/navigation.directive';

@Component({
  selector: 'sdux-pipeline-controllers-subnavigation',
  standalone: true,
  imports: [
    MatExpansionModule,
    RouterLink,
    RouterLinkActive,
    MatListModule,
    BrandNameComponent,
    ImageComponent
  ],
  templateUrl: './pipeline.controllers.sub-navigation.component.html',
  styleUrls: ['../../../navigation.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PipelineControllersSubNavigationComponent extends NavigationDirective {}
