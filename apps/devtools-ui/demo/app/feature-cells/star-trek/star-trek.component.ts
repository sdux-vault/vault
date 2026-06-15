import { JsonPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal
} from '@angular/core';
import { Example, StarTrekExampleService } from './star-trek-example.service';

/**
 * Displays the Star Trek FeatureCell state and provides action buttons to
 * load, merge, reset, toggle loading, and toggle error states.
 */
@Component({
  selector: 'sdux-star-trek',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './star-trek.component.html',
  styleUrl: './star-trek.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StarTrekComponent {
  /** Injected FeatureCell service backing the demo state. */
  readonly #example = inject(StarTrekExampleService);

  /** Reactive state signal exposed from the FeatureCell. */
  readonly state = this.#example.state;
  /** Whether the FeatureCell is in a loading state. */
  readonly isLoading = signal(false);
  /** Read-only signal indicating whether the error reducer is active. */
  readonly hasError = this.#example.hasError;

  /** Seed data used to populate the FeatureCell on demand. */
  readonly #sample: Example[] = [
    { id: 1, name: 'Jean-Luc', lastName: 'Picard' },
    { id: 2, name: 'James T.', lastName: 'Kirk' },
    { id: 13, name: 'Wesley', lastName: 'Crusher' }
  ];

  /** Pool of additional characters added one per click after the initial load. */
  readonly #extras: Example[] = [
    { id: 3, name: 'William', lastName: 'Riker' },
    { id: 4, name: 'Data', lastName: '' },
    { id: 5, name: 'Worf', lastName: '' },
    { id: 6, name: 'Deanna', lastName: 'Troi' },
    { id: 7, name: 'Beverly', lastName: 'Crusher' },
    { id: 8, name: 'Spock', lastName: '' },
    { id: 9, name: 'Nyota', lastName: 'Uhura' }
  ];

  /** Tracks how many extras have been appended. */
  #extrasAdded = 0;

  /** Whether the initial sample has been loaded. */
  #sampleLoaded = false;

  /**
   * First click replaces with sample data.
   * Subsequent clicks merge one additional character (up to 10 total).
   */
  loadSample(): void {
    if (!this.#sampleLoaded) {
      this.#example.replace(this.#sample);
      this.#sampleLoaded = true;
      return;
    }

    const total = this.#sample.length + this.#extrasAdded;
    if (total >= 10) {
      return;
    }

    const next = this.#extras[this.#extrasAdded];
    this.#extrasAdded++;
    this.#example.merge(next);
  }

  /** Resets the FeatureCell to its initial empty state. */
  resetState(): void {
    this.#example.reset();
    this.#sampleLoaded = false;
    this.#extrasAdded = 0;
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
