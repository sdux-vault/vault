import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  BrandNameComponent,
  ExampleViewerSourceComponent,
  ExampleViewerTabComponent
} from '@sdux-vault/ui/web-components';

@Component({
  selector: 'sdux-global-error-handler',
  imports: [
    BrandNameComponent,
    ExampleViewerSourceComponent,
    ExampleViewerTabComponent,
    RouterModule
  ],
  standalone: true,
  templateUrl: './global-error-handler.component.html',
  styleUrls: ['../scss/example.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GlobalErrorHandlerComponent {}
