import { Component } from '@angular/core';
import {
  BrandNameComponent,
  ExampleViewerSourceComponent,
  ExampleViewerTabComponent,
  MultiFrameworkExampleComponent,
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
    MultiFrameworkExampleComponent,
    DevmodeLicensingCommonComponent,
    PipelineRelatedTopicComponent,
    VaultBrandNameComponent
  ],
  templateUrl: './building-custom-controllers.component.html',
  styleUrls: ['../../../scss/documentation.scss']
})
export class PipelineBuildingCustomControllersComponent {}
