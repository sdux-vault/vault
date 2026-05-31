import { ScrollingModule } from '@angular/cdk/scrolling';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  signal
} from '@angular/core';
import { EventShape } from '@sdux-vault/shared';
import { DevtoolsPipelineEventDetailComponent } from '../../events/pipeline/detail/devtools-pipeline-event-detail.component';
import { DevtoolsPipelineEventComponent } from '../../events/pipeline/devtools-pipeline-event.component';

/**
 * Main DevTools panel for displaying the pipeline execution history.
 *
 * Uses a master-detail layout: the left pane contains a virtual-scrolled
 * list of fixed-height event rows; the right pane displays the full detail
 * breakdown of the currently selected event.
 *
 * The panel itself contains no business logic; it is purely presentational
 * and updates reactively as the underlying event stream changes.
 */
@Component({
  selector: 'sdux-devtools-main-pipeline-panel',
  standalone: true,
  imports: [
    ScrollingModule,
    DevtoolsPipelineEventComponent,
    DevtoolsPipelineEventDetailComponent
  ],
  templateUrl: './devtools-main-pipeline-panel.component.html',
  styleUrl: './devtools-main-pipeline-panel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DevtoolsMainPipelinePanelComponent {
  /** Pipeline events to display, provided by the parent. */
  readonly events = input.required<EventShape[]>();

  /**
   * Reactive reversed list of pipeline events for display.
   * Automatically updates as the input changes.
   */
  readonly reversedEvents = computed(() => [...this.events()].reverse());

  /** Total number of pipeline events. */
  readonly totalEvents = computed(() => this.events().length);

  /** The currently selected event for the detail panel. */
  readonly selectedEvent = signal<EventShape | null>(null);

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
   * Selects an event to display in the detail panel.
   *
   * @param event - The pipeline event to select.
   */
  selectEvent(event: EventShape): void {
    this.selectedEvent.set(event);
  }

  /** Closes the detail panel by clearing the selection. */
  closeDetail(): void {
    this.selectedEvent.set(null);
  }
}
