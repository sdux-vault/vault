import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import {
  BrandNameComponent,
  ExampleViewerSourceComponent,
  ExampleViewerTabComponent,
  FeatureCellBrandNameComponent,
  PackageNameComponent,
  SDuXVideoComponent
} from '@sdux-vault/ui/web-components';
import { TutorialNavigationDirective } from '../../../directive/tutorial-navigation.directive';

@Component({
  selector: 'sdux-angular-welcome-chapter',
  standalone: true,
  imports: [
    RouterModule,
    PackageNameComponent,
    BrandNameComponent,
    FeatureCellBrandNameComponent,
    ExampleViewerSourceComponent,
    ExampleViewerTabComponent,
    MatIconModule,
    MatTooltipModule,
    RouterModule,
    BrandNameComponent,
    SDuXVideoComponent,
    FeatureCellBrandNameComponent,
    PackageNameComponent
  ],
  templateUrl: './angular-welcome.chapter.component.html'
})
export class AngularWelcomeChapterComponent extends TutorialNavigationDirective {
  protected readonly verifiedEnvironment = {
    verifiedOn: '2026-08-06',
    verifiedOnLabel: 'August 6, 2026',
    node: '24 or newer',
    npm: '11 or newer',
    angular: '21',
    sduxAngular: 'latest',
    sduxAddons: 'latest'
  } as const;
}
