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
 * Coordinates the reactive character editor presented by this tutorial example.
 * It consumes the service's computed character collection and keeps selection, form,
 * confirmation, and feedback state in Angular signals.
 * Computed signals derive the selected character and mode-specific labels for the template.
 * User actions delegate collection changes to `ExampleService`, then reactive state refreshes the view.
 * **Architectural Boundary:** The component owns presentation state while the service owns
 * FeatureCell access and character collection mutations.
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
   * Resolves a picker value to a known character and opens that character in edit mode.
   * Unknown identities are ignored so stale or invalid option values cannot disturb the editor.
   * @param value - Character identity received from the select element.
   * @returns Nothing; selection, form, and feedback signals are updated in place.
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
