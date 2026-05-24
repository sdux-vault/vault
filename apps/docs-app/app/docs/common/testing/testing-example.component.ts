import { Component, computed, input, ViewEncapsulation } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import {
  ExampleViewerSourceComponent,
  ExampleViewerTabComponent
} from '@sdux-vault/ui/web-components';

@Component({
  selector: 'sdux-testing-example-common',
  standalone: true,
  templateUrl: `./testing-example.component.html`,
  styleUrls: ['../../scss/example.scss'],
  imports: [
    MatTabsModule,
    ExampleViewerSourceComponent,
    ExampleViewerTabComponent
  ],
  encapsulation: ViewEncapsulation.None
})
export class VaultTestingExampleCommonComponent {
  type = input<string>('all');

  isAngular = computed(() => {
    return this.type() === 'all' || this.type() === 'angular';
  });

  isReact = computed(() => {
    return (
      this.type() === 'all' ||
      this.type() === 'react' ||
      this.type() === 'typescript'
    );
  });

  isVue = computed(() => {
    return (
      this.type() === 'all' ||
      this.type() === 'vue' ||
      this.type() === 'typescript'
    );
  });
}
