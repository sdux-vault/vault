import { Component, ViewEncapsulation } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import {
  BrandNameComponent,
  PackageNameComponent
} from '@sdux-vault/ui/web-components';
import { PipelineRelatedTopicComponent } from 'apps/docs-app/app/docs/related-topic/related-topic.component';
import { PipelineRoutingDirective } from '../../pipeline/directives/pipeline-routing.directive';

/**
 * The contributors documentation
 */
@Component({
  selector: 'sdux-top-tier-contributors',
  standalone: true,
  imports: [
    RouterModule,
    PipelineRelatedTopicComponent,
    MatTabsModule,
    BrandNameComponent,
    PackageNameComponent
  ],
  templateUrl: './contributors.component.html',
  styleUrls: ['../../scss/example.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SDuXContributorsComponent extends PipelineRoutingDirective {}
