import { Component, ViewEncapsulation } from '@angular/core';
import { DiagramComponent } from '@sdux-vault/ui/web-components';
import { VaultEncryptLicensingCommonComponent } from 'apps/docs-app/app/docs/common/encrypt-licensing.component';
import { PipelineRelatedTopicComponent } from 'apps/docs-app/app/docs/related-topic/related-topic.component';

/**
 * The pipeline encrypt documentation
 */
@Component({
  selector: 'sdux-pipeline-encrypt-behavior',
  standalone: true,
  imports: [
    DiagramComponent,
    PipelineRelatedTopicComponent,
    VaultEncryptLicensingCommonComponent
  ],
  templateUrl: './encrypt.pipeline.component.html',
  styleUrls: ['../../../../scss/example.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PipelineEncryptBehaviorComponent {}
