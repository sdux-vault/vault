import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { StarWarsCharacterState } from '../../../examples/star-wars-character.state';
import { ExampleService } from './example.service';

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

  protected character = computed<StarWarsCharacterState | null>(() => {
    return this.#exampleService.state.value()?.[0] ?? null;
  });
}
