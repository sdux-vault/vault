import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  DiagramComponent,
  GenericTabComponent,
  MultiFrameworkExampleComponent,
  SDuXVideoComponent
} from '@sdux-vault/ui/web-components';
import { VaultConfigCommonComponent } from 'apps/docs-app/app/docs/common/vault/vault-config.component';
import { VaultLogLevelCommonComponent } from 'apps/docs-app/app/docs/common/vault/vault-log-level.component';
import { PipelineRelatedTopicComponent } from 'apps/docs-app/app/docs/related-topic/related-topic.component';

/**
 * The pipeline vault documentation
 */
@Component({
  selector: 'sdux-pipeline-vault-api',
  standalone: true,
  imports: [
    MultiFrameworkExampleComponent,
    GenericTabComponent,
    RouterModule,
    PipelineRelatedTopicComponent,
    VaultConfigCommonComponent,
    VaultLogLevelCommonComponent,
    DiagramComponent,
    SDuXVideoComponent
  ],
  templateUrl: './vault.api.component.html',
  styleUrls: ['../../../scss/documentation.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PipelineVaultComponent {}
