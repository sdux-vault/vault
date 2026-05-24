import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  BrandNameComponent,
  ExampleViewerSourceComponent,
  ExampleViewerTabComponent,
  VaultBrandNameComponent
} from '@sdux-vault/ui/web-components';
import { PipelineRoutingDirective } from 'apps/docs-app/app/docs/pipeline/directives/pipeline-routing.directive';
import { PipelineRelatedTopicComponent } from 'apps/docs-app/app/docs/related-topic/related-topic.component';

/**
 * The sdux-vault documentation
 */
@Component({
  selector: 'sdux-vault-overview',
  standalone: true,
  imports: [
    PipelineRelatedTopicComponent,
    RouterModule,
    VaultBrandNameComponent,
    BrandNameComponent,
    ExampleViewerSourceComponent,
    ExampleViewerTabComponent
  ],
  templateUrl: './sdux-vault.component.html',
  styleUrls: ['../../scss/example.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SDuXVaultOverviewComponent extends PipelineRoutingDirective {}
