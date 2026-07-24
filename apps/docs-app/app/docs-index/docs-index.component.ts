import {
  Component,
  inject,
  OnInit,
  signal,
  ViewEncapsulation
} from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { BrandNameComponent } from '@sdux-vault/ui/web-components';
import { PipelineRelatedTopicComponent } from '../docs/related-topic/related-topic.component';
import { NavigationService } from '../navigation/service/navigation.service';
import { DevToolsSubNavigationComponent } from '../navigation/sub-navigation/dev-tools/dev-tools.sub-navigation.component';
import { MigrationSubNavigationComponent } from '../navigation/sub-navigation/migration/migration.sub-navigation.component';
import { PipelineBehaviorSubNavigationComponent } from '../navigation/sub-navigation/pipeline/behaviors/pipeline.behaviors.sub-navigation.component';
import { PipelineControllersSubNavigationComponent } from '../navigation/sub-navigation/pipeline/controllers/pipeline.controllers.sub-navigation.component';
import { PipelineExtensionsSubNavigationComponent } from '../navigation/sub-navigation/pipeline/extensions/pipeline.extensions.sub-navigation.component';
import { PipelineSubNavigationComponent } from '../navigation/sub-navigation/pipeline/pipeline.sub-navigation.component';
import { TutorialSubNavigationComponent } from '../navigation/sub-navigation/tutorial/tutorial.sub-navigation.component';
import { VaultFeatureCellApiSubNavigationComponent } from '../navigation/sub-navigation/vault-feature-cell-api/vault-feature-cell-api.sub-navigation.component';

/**
 * Full-page documentation index that renders all navigation sections as
 * expandable panels. Provides a bookmarkable landing page at /docs with
 * a toggle to expand or collapse all sections simultaneously.
 */
@Component({
  selector: 'sdux-docs-index',
  standalone: true,
  imports: [
    MatExpansionModule,
    MatListModule,
    MatTooltipModule,
    RouterLink,
    RouterLinkActive,
    MigrationSubNavigationComponent,
    VaultFeatureCellApiSubNavigationComponent,
    PipelineSubNavigationComponent,
    PipelineControllersSubNavigationComponent,
    PipelineBehaviorSubNavigationComponent,
    PipelineExtensionsSubNavigationComponent,
    DevToolsSubNavigationComponent,
    PipelineRelatedTopicComponent,
    TutorialSubNavigationComponent,
    BrandNameComponent
  ],
  templateUrl: './docs-index.component.html',
  styleUrls: ['./docs-index.component.scss', '../docs/scss/documentation.scss'],
  encapsulation: ViewEncapsulation.None,
  host: { class: 'docs-index' }
})
export class DocsIndexComponent implements OnInit {
  /** The navigation service used to control the visibility of the navigation panel. */
  protected readonly navigationService = inject(NavigationService);

  /** Controls the expanded state of all navigation panels on the page. */
  readonly allExpanded = signal(true);

  /** Toggles all navigation panels between expanded and collapsed states. */
  toggleAll(): void {
    this.allExpanded.set(!this.allExpanded());
  }

  /** Initializes the component and shows the navigation panel. */
  ngOnInit(): void {
    this.navigationService.show();
  }

  showDocumentation(): void {
    this.navigationService.show();
  }
}
