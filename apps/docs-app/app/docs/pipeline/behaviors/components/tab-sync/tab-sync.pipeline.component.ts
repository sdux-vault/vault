import { Component, ViewEncapsulation } from '@angular/core';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import {
  BrandNameComponent,
  DiagramComponent,
  ExampleViewerSourceComponent,
  ExampleViewerTabComponent,
  FeatureCellBrandNameComponent,
  VaultBrandNameComponent
} from '@sdux-vault/ui/web-components';
import { VaultTabSyncLicensingCommonComponent } from 'apps/docs-app/app/docs/common/tab-sync-licensing.component';
import { PipelineRelatedTopicComponent } from 'apps/docs-app/app/docs/related-topic/related-topic.component';
import { NavigationDirective } from '../../../../../navigation/directive/navigation.directive';
import { VaultTabSyncPrivacyCommonComponent } from '../../../../common/tab-sync-privacy.component';

/**
 * The pipeline tab synchronization documentation
 */
@Component({
  selector: 'sdux-pipeline-tab-sync-behavior',
  standalone: true,
  imports: [
    DiagramComponent,
    ExampleViewerSourceComponent,
    ExampleViewerTabComponent,
    RouterModule,
    PipelineRelatedTopicComponent,
    VaultTabSyncLicensingCommonComponent,
    VaultTabSyncPrivacyCommonComponent,
    MatTabGroup,
    MatTab,
    VaultBrandNameComponent,
    BrandNameComponent,
    FeatureCellBrandNameComponent
  ],
  templateUrl: './tab-sync.pipeline.component.html',
  styleUrls: ['../../../../scss/example.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PipelineTabSyncBehaviorComponent extends NavigationDirective {}
