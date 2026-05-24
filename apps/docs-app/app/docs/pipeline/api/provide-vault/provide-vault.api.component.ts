import { Component, ViewEncapsulation } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import {
  ExampleViewerSourceComponent,
  ExampleViewerTabComponent
} from '@sdux-vault/ui/web-components';
import { VaultConfigCommonComponent } from 'apps/docs-app/app/docs/common/vault/vault-config.component';
import { VaultLogLevelCommonComponent } from 'apps/docs-app/app/docs/common/vault/vault-log-level.component';
import { PipelineRelatedTopicComponent } from 'apps/docs-app/app/docs/related-topic/related-topic.component';

/**
 * The pipeline provide vault documentation
 */
@Component({
  selector: 'sdux-pipeline-provide-vault-api',
  standalone: true,
  imports: [
    ExampleViewerSourceComponent,
    ExampleViewerTabComponent,
    RouterModule,
    PipelineRelatedTopicComponent,
    MatTabsModule,
    VaultConfigCommonComponent,
    VaultLogLevelCommonComponent
  ],
  templateUrl: './provide-vault.api.component.html',
  styleUrls: ['../../../scss/example.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PipelineProvideVaultComponent {}
