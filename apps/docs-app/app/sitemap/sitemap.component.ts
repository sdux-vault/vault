import { Component, ViewEncapsulation } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { RouterLink } from '@angular/router';
import { BrandNameComponent } from '@sdux-vault/ui/web-components';
import { BLOG_ENTRIES } from '../blog/blog-index/constants/blog-entries.constant';
import { DevToolsSubNavigationComponent } from '../navigation/sub-navigation/dev-tools/dev-tools.sub-navigation.component';
import { GettingStartedSubNavigationComponent } from '../navigation/sub-navigation/getting-started/getting-started.sub-navigation.component';
import { LicensingSubNavigationComponent } from '../navigation/sub-navigation/licensing/licensing.sub-navigation.component';
import { MigrationSubNavigationComponent } from '../navigation/sub-navigation/migration/migration.sub-navigation.component';
import { PipelineBehaviorSubNavigationComponent } from '../navigation/sub-navigation/pipeline/behaviors/pipeline.behaviors.sub-navigation.component';
import { PipelineControllersSubNavigationComponent } from '../navigation/sub-navigation/pipeline/controllers/pipeline.controllers.sub-navigation.component';
import { ExecutionGuaranteeSubNavigationComponent } from '../navigation/sub-navigation/pipeline/execution-guarantee/execution-guarantee.sub-navigation.component';
import { PipelineExtensionsSubNavigationComponent } from '../navigation/sub-navigation/pipeline/extensions/pipeline.extensions.sub-navigation.component';
import { PipelineSubNavigationComponent } from '../navigation/sub-navigation/pipeline/pipeline.sub-navigation.component';
import { ReferenceGuidesSubNavigationComponent } from '../navigation/sub-navigation/reference-guides/reference-guides.sub-navigation.component';
import { ReferencesSubNavigationComponent } from '../navigation/sub-navigation/references/references.sub-navigation.component';
import { StackBlitzExamplesSubNavigationComponent } from '../navigation/sub-navigation/stackblitz-examples/stackblitz-examples.sub-navigation.component';
import { VaultFeatureCellApiSubNavigationComponent } from '../navigation/sub-navigation/vault-feature-cell-api/vault-feature-cell-api.sub-navigation.component';

/**
 * Full-page HTML sitemap for SEO crawlability.
 *
 * Renders every navigation section in a flat, always-expanded layout
 * with grouped headings and plain links. Gives search engines a single
 * page to discover every route without requiring JS interaction.
 */
@Component({
  selector: 'sdux-sitemap',
  standalone: true,
  imports: [
    MatExpansionModule,
    MatListModule,
    RouterLink,
    BrandNameComponent,
    DevToolsSubNavigationComponent,
    ExecutionGuaranteeSubNavigationComponent,
    GettingStartedSubNavigationComponent,
    LicensingSubNavigationComponent,
    MigrationSubNavigationComponent,
    PipelineBehaviorSubNavigationComponent,
    PipelineControllersSubNavigationComponent,
    PipelineExtensionsSubNavigationComponent,
    PipelineSubNavigationComponent,
    ReferenceGuidesSubNavigationComponent,
    ReferencesSubNavigationComponent,
    StackBlitzExamplesSubNavigationComponent,
    VaultFeatureCellApiSubNavigationComponent
  ],
  templateUrl: './sitemap.component.html',
  styleUrls: ['./sitemap.component.scss', '../docs/scss/documentation.scss'],
  encapsulation: ViewEncapsulation.None,
  host: { class: 'sdux-sitemap' }
})
export class SitemapComponent {
  readonly blogEntries = [...BLOG_ENTRIES]
    .filter((entry) => entry.active)
    .sort((a, b) => b.date.localeCompare(a.date));
}
