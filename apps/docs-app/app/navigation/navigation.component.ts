import { Component, inject } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import {
  BrandNameComponent,
  BrandNameService,
  ImageComponent,
  SDuXNewComponent
} from '@sdux-vault/ui/web-components';
import { NavigationDirective } from './directive/navigation.directive';
import { DevToolsSubNavigationComponent } from './sub-navigation/dev-tools/dev-tools.sub-navigation.component';
import { GettingStartedSubNavigationComponent } from './sub-navigation/getting-started/getting-started.sub-navigation.component';
import { LicensingSubNavigationComponent } from './sub-navigation/licensing/licensing.sub-navigation.component';
import { MigrationSubNavigationComponent } from './sub-navigation/migration/migration.sub-navigation.component';
import { PipelineBehaviorSubNavigationComponent } from './sub-navigation/pipeline/behaviors/pipeline.behaviors.sub-navigation.component';
import { PipelineControllersSubNavigationComponent } from './sub-navigation/pipeline/controllers/pipeline.controllers.sub-navigation.component';
import { ExecutionGuaranteeSubNavigationComponent } from './sub-navigation/pipeline/execution-guarantee/execution-guarantee.sub-navigation.component';
import { PipelineExtensionsSubNavigationComponent } from './sub-navigation/pipeline/extensions/pipeline.extensions.sub-navigation.component';
import { PipelineSubNavigationComponent } from './sub-navigation/pipeline/pipeline.sub-navigation.component';
import { ReferenceGuidesSubNavigationComponent } from './sub-navigation/reference-guides/reference-guides.sub-navigation.component';
import { TutorialSubNavigationComponent } from './sub-navigation/tutorial/tutorial.sub-navigation.component';
import { VaultFeatureCellApiSubNavigationComponent } from './sub-navigation/vault-feature-cell-api/vault-feature-cell-api.sub-navigation.component';

/**
 * Root navigation component for the SDuX documentation site.
 *
 * This component defines the primary layout shell for the documentation
 * navigation system, including:
 * - the application sidenav
 * - top-level navigation sections
 * - nested sub-navigation panels
 *
 * All interactive behavior—mobile awareness, expansion state, persistent
 * toggling, and resize handling—is inherited from `NavigationDirective`.
 *
 * The component composes Material navigation modules and delegates all
 * state-management logic to the underlying directive and `NavigationService`.
 */
@Component({
  selector: 'sdux-navigation',
  standalone: true,
  imports: [
    ImageComponent,
    MatExpansionModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    RouterLink,
    MatTooltipModule,
    RouterLinkActive,
    RouterOutlet,
    MigrationSubNavigationComponent,
    PipelineSubNavigationComponent,
    ReferenceGuidesSubNavigationComponent,
    LicensingSubNavigationComponent,
    PipelineBehaviorSubNavigationComponent,
    PipelineControllersSubNavigationComponent,
    VaultFeatureCellApiSubNavigationComponent,
    PipelineExtensionsSubNavigationComponent,
    ExecutionGuaranteeSubNavigationComponent,
    GettingStartedSubNavigationComponent,
    DevToolsSubNavigationComponent,
    SDuXNewComponent,
    BrandNameComponent,
    TutorialSubNavigationComponent
  ],
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent extends NavigationDirective {
  brandNameService = inject(BrandNameService);
  brandName = this.brandNameService.value;
  vaultBrandName = this.brandNameService.vaultValue;
}
