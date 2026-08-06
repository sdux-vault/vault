import { Component, ViewEncapsulation } from '@angular/core';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import {
  DiagramComponent,
  ExampleViewerSourceComponent,
  ExampleViewerTabComponent,
  VaultBrandNameComponent
} from '@sdux-vault/ui/web-components';
import { VaultControllerTabSyncCommonComponent } from 'apps/docs-app/app/docs/common/controller/controller-tab-sync.common.component';
import { PipelineRelatedTopicComponent } from 'apps/docs-app/app/docs/related-topic/related-topic.component';
import { NavigationDirective } from '../../../../../navigation/directive/navigation.directive';
import { VaultTabSyncLicensingCommonComponent } from '../../../../common/tab-sync-licensing.component';
import { VaultTabSyncPrivacyCommonComponent } from '../../../../common/tab-sync-privacy.component';
@Component({
  selector: 'sdux-pipeline-tab-sync-controller',
  standalone: true,
  imports: [
    RouterModule,
    DiagramComponent,
    ExampleViewerSourceComponent,
    ExampleViewerTabComponent,
    PipelineRelatedTopicComponent,
    VaultTabSyncLicensingCommonComponent,
    VaultTabSyncPrivacyCommonComponent,
    MatTab,
    MatTabGroup,
    VaultBrandNameComponent,
    VaultControllerTabSyncCommonComponent
  ],
  templateUrl: './tab-sync.pipeline.component.html',
  styleUrls: ['../../../../scss/documentation.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PipelineTabSyncControllerComponent extends NavigationDirective {}
