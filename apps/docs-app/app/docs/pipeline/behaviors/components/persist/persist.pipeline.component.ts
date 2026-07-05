import { Component, ViewEncapsulation } from '@angular/core';
import { DiagramComponent } from '@sdux-vault/ui/web-components';
import { VaultDataSecurityPersistCommonComponent } from 'apps/docs-app/app/docs/common/data-security-persist.component';
import { VaultPersistBehaviorComparisonCommonComponent } from 'apps/docs-app/app/docs/common/persist/persist-behavior-comparison.component';
import { VaultPersistBehaviorsCommonComponent } from 'apps/docs-app/app/docs/common/persist/persist-behaviors.component';
import { VaultPersistLicensingCommonComponent } from 'apps/docs-app/app/docs/common/persist/persist-licensing.component';
import { PipelineRelatedTopicComponent } from 'apps/docs-app/app/docs/related-topic/related-topic.component';

/**
 * The pipeline persist documentation
 */
@Component({
  selector: 'sdux-pipeline-persist',
  standalone: true,
  imports: [
    DiagramComponent,
    VaultPersistBehaviorsCommonComponent,
    PipelineRelatedTopicComponent,
    VaultDataSecurityPersistCommonComponent,
    VaultPersistBehaviorComparisonCommonComponent,
    VaultPersistLicensingCommonComponent
  ],
  templateUrl: './persist.pipeline.component.html',
  styleUrls: ['../../../../scss/documentation.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PipelinePersistComponent {}
