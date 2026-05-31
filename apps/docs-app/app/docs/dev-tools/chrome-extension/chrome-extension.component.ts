import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import {
  BrandNameComponent,
  DiagramComponent,
  FeatureCellBrandNameComponent
} from '@sdux-vault/ui/web-components';
import { PipelineRelatedTopicComponent } from '../../related-topic/related-topic.component';

@Component({
  selector: 'sdux-dev-tools-chrome-extension',
  standalone: true,
  imports: [
    PipelineRelatedTopicComponent,
    BrandNameComponent,
    RouterModule,
    MatTabsModule,
    DiagramComponent,
    FeatureCellBrandNameComponent
  ],
  templateUrl: './chrome-extension.component.html',
  styleUrls: ['../../scss/example.scss']
})
export class SDuXDevToolsChromeExtensionComponent {}
