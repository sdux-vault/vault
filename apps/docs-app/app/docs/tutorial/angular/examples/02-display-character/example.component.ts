import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ExampleService } from './example.service';
import { StarWarsCharacter } from './star-wars-character.shape';

/**
 * Projects the first committed SDuX-managed character into a template-ready read model.
 * The component reads the service-owned FeatureCell State and derives one display record
 * without taking ownership of Feature State or duplicating SDuX access in the template.
 * **Architectural Boundary:** The component owns only the view projection while the service owns
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
   * Provides the component-facing reactive collection signal from the service-owned FeatureCell.
   * The component never reaches through this service to access the FeatureCell directly.
   */
  readonly #exampleService = inject(ExampleService);

  /**
   * Derives the first committed character from the latest SDuX-managed collection.
   * Returning `null` keeps the template safe before the initial value is available.
   */
  protected character = computed<StarWarsCharacter | null>(() => {
    return this.#exampleService.state.value()?.[0] ?? null;
  });
}
