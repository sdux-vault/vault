import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StackBlitzExampleComponent } from '../example/stackblitz-example.component';

/**
 * Renders a reusable Try It Live section for a registered StackBlitz example.
 */
@Component({
  selector: 'sdux-stack-blitz-try-it-live',
  standalone: true,
  imports: [RouterModule, StackBlitzExampleComponent],
  templateUrl: './stack-blitz-try-it-live.component.html'
})
export class StackBlitzTryItLiveComponent {
  /** Identifies the registered StackBlitz example displayed by the section. */
  readonly id = input.required<string>();
}
