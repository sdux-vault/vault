import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  BrandNameComponent,
  GenericTabComponent,
  MultiFrameworkExampleComponent
} from '@sdux-vault/ui/web-components';
import { PipelineRelatedTopicComponent } from '../../related-topic/related-topic.component';

@Component({
  selector: 'sdux-dev-tools-vault-monitor',
  standalone: true,
  imports: [
    PipelineRelatedTopicComponent,
    BrandNameComponent,
    RouterModule,
    MultiFrameworkExampleComponent,
    GenericTabComponent
  ],
  templateUrl: './vault-monitor.component.html',
  styleUrls: ['../../scss/documentation.scss']
})
export class SDuXDevToolsVaultMonitorComponent {}
