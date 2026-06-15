import { JsonPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal
} from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { StarWarsService } from './service/star-wars.service';
import { StarWarsShape } from './shape/star-wars.shape';

/**
 * Displays the FeatureCell state and provides action buttons to
 * load, merge, reset, toggle loading, and toggle error states.
 */
@Component({
  selector: 'sdux-star-wars',
  standalone: true,
  imports: [JsonPipe, MatTooltipModule],
  templateUrl: './star-wars.component.html',
  styleUrl: './star-wars.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StarWarsComponent {
  /** Injected FeatureCell service backing the demo state. */
  readonly #example = inject(StarWarsService);

  /** Reactive state signal exposed from the FeatureCell. */
  readonly state = this.#example.state;
  /** Whether the FeatureCell is in a loading state. */
  readonly isLoading = signal(false);
  /** Read-only signal indicating whether the error reducer is active. */
  readonly hasError = this.#example.hasError;

  /** Seed data used to populate the FeatureCell on demand. */
  readonly #sample: StarWarsShape[] = [
    { id: 11, name: 'Luke', lastName: 'Skywalker' },
    { id: 38, name: 'Leia', lastName: 'Organa' },
    { id: 9, name: 'Han', lastName: 'Solo' }
  ];

  /** Pool of additional characters added one per click after the initial load. */
  readonly #extras: StarWarsShape[] = [
    { id: 5, name: 'Darth', lastName: 'Vader', sith: true },
    { id: 8, name: 'Yoda', lastName: '' },
    { id: 4, name: 'Obi-Wan', lastName: 'Kenobi' },
    { id: 6, name: 'Padmé', lastName: 'Amidala' },
    { id: 7, name: 'Mace', lastName: 'Windu' },
    { id: 10, name: 'Ahsoka', lastName: 'Tano' },
    { id: 12, name: 'Din', lastName: 'Djarin' }
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
