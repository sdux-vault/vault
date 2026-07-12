import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  BrandNameComponent,
  DiagramComponent,
  FeatureCellBrandNameComponent,
  MultiFrameworkExampleComponent,
  VaultBrandNameComponent
} from '@sdux-vault/ui/web-components';
import { VaultTabSyncLicensingCommonComponent } from 'apps/docs-app/app/docs/common/tab-sync-licensing.component';
import { PipelineRelatedTopicComponent } from 'apps/docs-app/app/docs/related-topic/related-topic.component';
import { NavigationDirective } from '../../../../../navigation/directive/navigation.directive';
import { VaultTabSyncPrivacyCommonComponent } from '../../../../common/tab-sync-privacy.component';
import { StackBlitzTryItLiveComponent } from '../../../../stack-blitz/try-it-live/stack-blitz-try-it-live.component';

/**
 * The pipeline tab synchronization documentation
 */
@Component({
  selector: 'sdux-pipeline-tab-sync-behavior',
  standalone: true,
  imports: [
    DiagramComponent,
    MultiFrameworkExampleComponent,
    RouterModule,
    PipelineRelatedTopicComponent,
    VaultTabSyncLicensingCommonComponent,
    VaultTabSyncPrivacyCommonComponent,
    VaultBrandNameComponent,
    BrandNameComponent,
    FeatureCellBrandNameComponent,
    StackBlitzTryItLiveComponent
  ],
  templateUrl: './tab-sync.pipeline.component.html',
  styleUrls: ['../../../../scss/documentation.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PipelineTabSyncBehaviorComponent extends NavigationDirective {}
