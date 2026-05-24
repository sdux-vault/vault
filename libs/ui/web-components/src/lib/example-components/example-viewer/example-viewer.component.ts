import { Component, computed, inject, input } from '@angular/core';
import { ExampleViewerBodyComponent } from '../example-viewer-body/example-viewer-body.component';
import { ExampleViewerHeaderComponent } from '../example-viewer-header/example-viewer-header.component';
import { ExampleViewerService } from '../services/example-viewer.service';

/**
 * ExampleViewerComponent
 * ----------------------
 * A wrapper component used in documentation pages to display
 * interactive examples along with an optional header and source-code
 * viewer toggle. The expanded/visibility state is delegated to the
 * shared `ExampleViewerService`, allowing multiple example viewers to
 * coordinate visibility state by ID.
 *
 * Inputs
 * ------
 * • `title` — Main heading for the example
 * • `subTitle` — Secondary descriptive text
 * • `exampleId` — Unique identifier used to track source visibility
 *
 * Behavior
 * --------
 * The component does not own any state itself. Instead, it requests a
 * visibility signal from `ExampleViewerService` based on `exampleId`.
 * When the corresponding header component toggles visibility, the
 * shared service updates the signal, and this component recomputes
 * the `sourceVisible` value, which the template uses to show or hide
 * the source-code section.
 */
@Component({
  selector: 'sdux-example-viewer',
  standalone: true,
  imports: [ExampleViewerBodyComponent, ExampleViewerHeaderComponent],
  templateUrl: './example-viewer.component.html',
  styleUrls: ['./example-viewer.component.scss']
})
export class ExampleViewerComponent {
  /** Title text displayed in the header. */
  readonly title = input<string>('');

  /** Optional subtitle displayed below the main title. */
  readonly subTitle = input<string>('');

  /** Unique ID used to retrieve a visibility signal from the service. */
  readonly exampleId = input<string>('');

  /** Shared service used to manage visibility state across examples. */
  private readonly service = inject(ExampleViewerService);

  /**
   * Computed signal that returns `true` when this example’s
   * source block should be visible.
   */
  readonly sourceVisible = computed(() => {
    const id = this.exampleId();
    if (!id) return false;
    return this.service.getVisibilitySignal(id)();
  });
}
