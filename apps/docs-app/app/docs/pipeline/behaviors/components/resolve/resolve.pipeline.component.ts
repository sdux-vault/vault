import { Component, ViewEncapsulation } from '@angular/core';
import { DiagramComponent } from '@sdux-vault/ui/web-components';
import { VaultResolveBehaviorCommonComponent } from 'apps/docs-app/app/docs/common/resolve/resolve-behaviors.common.component';
import { ResolveInputMechanismCommonComponent } from 'apps/docs-app/app/docs/common/resolve/resolve-input-mechanism.common.component';
import { StateInputTypeCommonComponent } from 'apps/docs-app/app/docs/common/state/state-input-type.component';
import { PipelineRelatedTopicComponent } from 'apps/docs-app/app/docs/related-topic/related-topic.component';
/**
 * The pipeline resolve documentation
 */
@Component({
  selector: 'sdux-pipeline-resolve',
  standalone: true,
  imports: [
    VaultResolveBehaviorCommonComponent,
    DiagramComponent,
    StateInputTypeCommonComponent,
    PipelineRelatedTopicComponent,
    ResolveInputMechanismCommonComponent
  ],
  templateUrl: './resolve.pipeline.component.html',
  styleUrls: ['../../../../scss/example.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PipelineResolveComponent {}
