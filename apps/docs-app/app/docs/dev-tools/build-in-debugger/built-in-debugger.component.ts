import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import {
  BrandNameComponent,
  DiagramComponent,
  ExampleViewerSourceComponent,
  ExampleViewerTabComponent,
  FeatureCellBrandNameComponent
} from '@sdux-vault/ui/web-components';
import { FeatureCellInsightsConfigCommonComponent } from '../../common/feature-cell/feature-cell-insights-config.component';
import { PipelineRelatedTopicComponent } from '../../related-topic/related-topic.component';

@Component({
  selector: 'sdux-dev-tools-built-in-debugger',
  standalone: true,
  imports: [
    PipelineRelatedTopicComponent,
    BrandNameComponent,
    RouterModule,
    MatTabsModule,
    DiagramComponent,
    FeatureCellBrandNameComponent,
    FeatureCellInsightsConfigCommonComponent,
    ExampleViewerSourceComponent,
    ExampleViewerTabComponent
  ],
  templateUrl: './built-in-debugger.component.html',
  styleUrls: ['../../scss/documentation.scss']
})
export class SDuXDevToolsBuiltInDebuggerComponent {}
