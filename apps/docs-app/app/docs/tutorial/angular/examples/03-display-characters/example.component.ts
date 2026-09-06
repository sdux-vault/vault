import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ExampleService } from './example.service';
import { StarWarsCharacter } from './star-wars-character.shape';

/**
 * Projects SDuX-managed character State into template-ready selection data.
 * The component reads the service-owned FeatureCell State, keeps only the selected
 * character identity locally, and derives the displayed record from that identity.
 * **Architectural Boundary:** The component owns presentation state while the service owns
 * FeatureCell access and committed collection State.
 */
@Component({
  selector: 'sdux-star-wars-character-example',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleComponent {
  /**
   * Provides the component-facing character use cases and reactive collection signal.
   * The component never reaches through this service to access the FeatureCell directly.
   */
  readonly #exampleService = inject(ExampleService);

  /**
   * Projects the current FeatureCell value into a read-only Angular computed signal.
   * The empty-array fallback gives templates a stable collection before a value is available.
   */
  readonly characters = computed<readonly StarWarsCharacter[]>(
    () => this.#exampleService.state.value() ?? []
  );

  /** Holds the identity currently selected by the character picker, or `null` when none is selected. */
  protected readonly selectedCharacterId = signal<number | null>(null);

  /**
   * Resolves the selected identity against the latest reactive character collection.
   * Returning `null` keeps the template safe when the character was removed or never existed.
   */
  protected readonly selectedCharacter = computed(() => {
    const selectedId = this.selectedCharacterId();
    return this.characters().find(({ id }) => id === selectedId) ?? null;
  });

  /**
   * Resolves a picker value to a known character identity in the current SDuX-managed collection.
   * Unknown identities are ignored so stale or invalid option values cannot change the displayed State.
   * @param value - Character identity received from the select element.
   * @returns Nothing; the selected identity signal is updated in place.
   */
  protected selectCharacter(value: string): void {
    const character =
      this.characters().find((character) => character.id === Number(value)) ??
      null;

    if (!character) {
      return;
    }

    this.selectedCharacterId.set(character.id);
  }
}
