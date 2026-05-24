import { Component, ViewEncapsulation } from '@angular/core';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import {
  BrandNameComponent,
  DiagramComponent,
  ExampleViewerSourceComponent,
  ExampleViewerTabComponent
} from '@sdux-vault/ui/web-components';
import { VaultEncryptLicensingCommonComponent } from 'apps/docs-app/app/docs/common/encrypt-licensing.component';
import { PipelineRelatedTopicComponent } from 'apps/docs-app/app/docs/related-topic/related-topic.component';

/**
 * The pipeline encryptAes256 behavior documentation
 */
@Component({
  selector: 'sdux-pipeline-encrypt-aes-256-behavior',
  standalone: true,
  imports: [
    ExampleViewerSourceComponent,
    ExampleViewerTabComponent,
    DiagramComponent,
    PipelineRelatedTopicComponent,
    VaultEncryptLicensingCommonComponent,
    MatTabGroup,
    MatTab,
    BrandNameComponent
  ],
  templateUrl: './aes-256.behavior.component.html',
  styleUrls: ['../../../../../scss/example.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PipelineEncryptAes256BehaviorComponent {}
