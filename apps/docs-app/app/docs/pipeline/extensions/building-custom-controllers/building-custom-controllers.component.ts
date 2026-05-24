import { Component } from '@angular/core';
import {
  BrandNameComponent,
  ExampleViewerSourceComponent,
  ExampleViewerTabComponent,
  VaultBrandNameComponent
} from '@sdux-vault/ui/web-components';
import { DevmodeLicensingCommonComponent } from '../../../common/licensing/devmode-licensing.component';
import { PipelineRelatedTopicComponent } from '../../../related-topic/related-topic.component';

@Component({
  selector: 'sdux-building-custom-controllers',
  standalone: true,
  imports: [
    BrandNameComponent,
    ExampleViewerSourceComponent,
    ExampleViewerTabComponent,
    DevmodeLicensingCommonComponent,
    PipelineRelatedTopicComponent,
    VaultBrandNameComponent
  ],
  templateUrl: './building-custom-controllers.component.html',
  styleUrls: ['../../../scss/example.scss']
})
export class PipelineBuildingCustomControllersComponent {}
