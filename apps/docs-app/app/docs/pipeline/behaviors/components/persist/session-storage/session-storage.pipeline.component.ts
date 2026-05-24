import { Component, ViewEncapsulation } from '@angular/core';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import {
  DiagramComponent,
  ExampleViewerSourceComponent,
  ExampleViewerTabComponent
} from '@sdux-vault/ui/web-components';
import { VaultDataSecurityPersistCommonComponent } from 'apps/docs-app/app/docs/common/data-security-persist.component';
import { VaultPersistBehaviorComparisonCommonComponent } from 'apps/docs-app/app/docs/common/persist/persist-behavior-comparison.component';
import { VaultPersistBehaviorsCommonComponent } from 'apps/docs-app/app/docs/common/persist/persist-behaviors.component';
import { VaultPersistLicensingCommonComponent } from 'apps/docs-app/app/docs/common/persist/persist-licensing.component';
import { PipelineRelatedTopicComponent } from 'apps/docs-app/app/docs/related-topic/related-topic.component';

/**
 * The pipeline session storage persist documentation
 */
@Component({
  selector: 'sdux-pipeline-session-storage-persist',
  standalone: true,
  imports: [
    DiagramComponent,
    VaultPersistBehaviorsCommonComponent,
    PipelineRelatedTopicComponent,
    MatTab,
    ExampleViewerSourceComponent,
    ExampleViewerTabComponent,
    MatTabGroup,
    VaultDataSecurityPersistCommonComponent,
    VaultPersistBehaviorComparisonCommonComponent,
    VaultPersistLicensingCommonComponent
  ],
  templateUrl: './session-storage.pipeline.component.html',
  styleUrls: ['../../../../../scss/example.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PipelineSessionStoragePersistComponent {}
