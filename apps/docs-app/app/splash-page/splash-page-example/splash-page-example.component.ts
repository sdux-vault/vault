import { Component } from '@angular/core';
import { MultiFrameworkExampleComponent } from '@sdux-vault/ui/web-components';

@Component({
  selector: 'sdux-splash-page-example',
  standalone: true,
  imports: [MultiFrameworkExampleComponent],
  templateUrl: './splash-page-example.component.html'
})
export class SplashPageExampleComponent {}
