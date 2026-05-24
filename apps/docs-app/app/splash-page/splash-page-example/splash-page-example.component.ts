import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import {
  ExampleViewerSourceComponent,
  ExampleViewerTabComponent
} from '@sdux-vault/ui/web-components';

@Component({
  selector: 'sdux-splash-page-example',
  standalone: true,
  imports: [
    MatIconModule,
    ExampleViewerTabComponent,
    ExampleViewerSourceComponent,
    MatTabsModule
  ],
  templateUrl: './splash-page-example.component.html'
})
export class SplashPageExampleComponent {}
