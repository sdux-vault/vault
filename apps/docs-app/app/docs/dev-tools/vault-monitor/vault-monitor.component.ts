import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import {
  BrandNameComponent,
  ExampleViewerSourceComponent,
  ExampleViewerTabComponent
} from '@sdux-vault/ui/web-components';
import { PipelineRelatedTopicComponent } from '../../related-topic/related-topic.component';

@Component({
  selector: 'sdux-dev-tools-vault-monitor',
  standalone: true,
  imports: [
    PipelineRelatedTopicComponent,
    BrandNameComponent,
    RouterModule,
    MatTabsModule,
    ExampleViewerSourceComponent,
    ExampleViewerTabComponent
  ],
  templateUrl: './vault-monitor.component.html',
  styleUrls: ['../../scss/example.scss']
})
export class SDuXDevToolsVaultMonitorComponent {}
