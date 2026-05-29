import { ScrollingModule } from '@angular/cdk/scrolling';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject
} from '@angular/core';
import { DevtoolsService } from '../../../services/devtools.service';
import { DevtoolsPipelineEventComponent } from '../../events/pipeline/devtools-pipeline-event.component';

/**
 * Main DevTools panel for displaying the pipeline execution history.
 *
 * This component renders the ordered list of pipeline events emitted by
 * all FeatureCells, excluding DevTools-internal telemetry. It delegates
 * state sourcing to `VaultDevtoolsService` and exposes read-only computed
 * signals for template binding.
 *
 * The panel itself contains no business logic; it is purely presentational
 * and updates reactively as the underlying event stream changes.
 */
@Component({
  selector: 'sdux-devtools-main-pipeline-panel',
  standalone: true,
  imports: [ScrollingModule, DevtoolsPipelineEventComponent],
  templateUrl: './devtools-main-pipeline-panel.component.html',
  styleUrl: './devtools-main-pipeline-panel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DevtoolsMainPipelinePanelComponent {
  /** Injected DevTools state provider. */
  private devtools = inject(DevtoolsService);

  /**
   * Reactive list of all pipeline events emitted by FeatureCells.
   * Automatically updates as the DevTools service receives new telemetry.
   */
  readonly events = computed(() => this.devtools.events());

  /** Total number of pipeline events emitted so far. */
  readonly totalEvents = this.devtools.totalEvents;

  /** Tracks which event IDs have their details expanded. */
  readonly expandedIds = new Set<string | number>();

  /**
   * Track-by function for virtual scroll item identity.
   *
   * @param _index - Item index in the virtual list.
   * @param event - The pipeline event instance.
   * @returns The unique event identifier.
   */
  trackById(_index: number, event: { id: string | number }): string | number {
    return event.id;
  }

  /**
   * Toggles the expanded state for a given event.
   *
   * @param id - The event identifier.
   * @param open - Whether the details are now open.
   */
  toggleExpanded(id: string | number, open: boolean): void {
    if (open) {
      this.expandedIds.add(id);
    } else {
      this.expandedIds.delete(id);
    }
  }
}
