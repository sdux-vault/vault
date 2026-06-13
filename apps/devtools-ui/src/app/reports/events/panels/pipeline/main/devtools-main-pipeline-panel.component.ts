import {
  CdkVirtualScrollViewport,
  ScrollingModule
} from '@angular/cdk/scrolling';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  signal,
  viewChild
} from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { EventShape } from '@sdux-vault/shared';
import { EventDetailComponent } from '../../../../../shared/components/event-detail/event-detail.component';
import { DevtoolsPipelineEventComponent } from '../../events/devtools-pipeline-event.component';

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
    MatTooltipModule,
    DevtoolsPipelineEventComponent,
    EventDetailComponent
  ],
  templateUrl: './devtools-main-pipeline-panel.component.html',
  styleUrl: './devtools-main-pipeline-panel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DevtoolsMainPipelinePanelComponent {
  /** Reference to the virtual scroll viewport for programmatic scrolling. */
  readonly viewport = viewChild(CdkVirtualScrollViewport);

  /** Pipeline events to display, provided by the parent. */
  readonly events = input.required<EventShape[]>();

  /** Virtual scroll item size in pixels. */
  readonly itemSize = signal(40);

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

  /** Scrolls the virtual viewport to the top (latest event). */
  scrollToTop(): void {
    this.viewport()?.scrollToIndex(0, 'smooth');
  }
}
