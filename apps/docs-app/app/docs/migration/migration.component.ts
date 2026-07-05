import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  BrandNameComponent,
  DiagramComponent,
  ExampleViewerSourceComponent,
  ExampleViewerTabComponent,
  MultiFrameworkExampleComponent,
  PackageNameComponent
} from '@sdux-vault/ui/web-components';
import { PipelineRoutingDirective } from '../pipeline/directives/pipeline-routing.directive';
import { PipelineRelatedTopicComponent } from '../related-topic/related-topic.component';

@Component({
  selector: 'sdux-migration-documentation',
  standalone: true,
  imports: [
    BrandNameComponent,
    RouterModule,
    PipelineRelatedTopicComponent,
    DiagramComponent,
    ExampleViewerSourceComponent,
    ExampleViewerTabComponent,
    MultiFrameworkExampleComponent,
    PackageNameComponent
  ],
  templateUrl: './migration.component.html',
  styleUrls: ['../scss/documentation.scss']
})
export class DocsMigrationComponent extends PipelineRoutingDirective {}
