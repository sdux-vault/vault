import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  ExampleViewerSourceComponent,
  ExampleViewerTabComponent
} from '@sdux-vault/ui/web-components';
import { VaultFeatureCellShapeCommonComponent } from '../../../../docs/common/feature-cell/feature-cell-shape.component';
import { PipelineRelatedTopicComponent } from '../../../../docs/related-topic/related-topic.component';

/**
 * The pipeline injectVault documentation
 */
@Component({
  selector: 'sdux-pipeline-inject-vault-api',
  standalone: true,
  imports: [
    ExampleViewerSourceComponent,
    ExampleViewerTabComponent,
    RouterModule,
    PipelineRelatedTopicComponent,
    VaultFeatureCellShapeCommonComponent
  ],
  templateUrl: './inject-vault.api.component.html',
  styleUrls: ['../../../scss/example.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PipelineInjectVaultComponent {}
