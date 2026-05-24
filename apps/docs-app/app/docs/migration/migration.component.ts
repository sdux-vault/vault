import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import {
  BrandNameComponent,
  DiagramComponent,
  ExampleViewerSourceComponent,
  ExampleViewerTabComponent,
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
    MatTabsModule,
    PackageNameComponent
  ],
  templateUrl: './migration.component.html',
  styleUrls: ['../scss/example.scss']
})
export class DocsMigrationComponent extends PipelineRoutingDirective {}
