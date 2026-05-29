import { JsonPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal
} from '@angular/core';
import { DevToolsSplashPageComponent } from '../../src/app/splash-page/devtools-splash-page.component';
import { DemoExampleService } from './demo-example.service';

/**
 * Demo shell that hosts the DevTools splash page with a real FeatureCell.
 */
@Component({
  selector: 'sdux-devtools-demo',
  standalone: true,
  imports: [DevToolsSplashPageComponent, JsonPipe],
  templateUrl: './demo-app.component.html',
  styleUrl: './demo-app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DemoAppComponent {
  /** Injected FeatureCell service backing the demo state. */
  readonly #example = inject(DemoExampleService);

  /** Reactive state signal exposed from the FeatureCell. */
  readonly state = this.#example.state;
  /** Whether the FeatureCell is in a loading state. */
  readonly isLoading = signal(false);
  /** Read-only signal indicating whether the error reducer is active. */
  readonly hasError = this.#example.hasError;

  /** Seed data used to populate the FeatureCell on demand. */
  readonly sample = [
    { id: 11, name: 'Luke', lastName: 'Skywalker' },
    { id: 38, name: 'Leia', lastName: 'Organa' },
    { id: 9, name: 'Han', lastName: 'Solo' }
  ];

  /** Replaces the FeatureCell state with the sample seed data. */
  loadSample(): void {
    this.#example.replace(this.sample);
  }

  /** Resets the FeatureCell to its initial empty state. */
  resetState(): void {
    this.#example.reset();
  }

  /** Toggles the FeatureCell loading flag on and off. */
  toggleLoading(): void {
    this.isLoading.update((v) => !v);
    this.#example.toggleLoading(this.isLoading());
  }

  /** Toggles the error reducer so the next pipeline cycle throws. */
  toggleError(): void {
    this.#example.toggleError();
  }
}
