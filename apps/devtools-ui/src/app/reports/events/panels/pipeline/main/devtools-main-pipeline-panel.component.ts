import { ScrollingModule } from '@angular/cdk/scrolling';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  OnInit,
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
export class DevtoolsMainPipelinePanelComponent implements OnInit {
  /** Destroy reference used to clean up the media query listener. */
  readonly #destroyRef = inject(DestroyRef);

  /** Pipeline events to display, provided by the parent. */
  readonly events = input.required<EventShape[]>();

  /** Virtual scroll item size — 92px in mobile, 40px in desktop. */
  readonly itemSize = signal(40);

  /**
   * Initializes the responsive item-size listener.
   *
   * Reads the current viewport width via a `matchMedia` query and
   * registers a change handler that updates `itemSize` whenever the
   * viewport crosses the 768px breakpoint. The listener is removed
   * automatically when the component is destroyed.
   */
  ngOnInit(): void {
    const mql = window.matchMedia('(max-width: 768px)');
    this.itemSize.set(mql.matches ? 92 : 40);
    const handler = (e: MediaQueryListEvent) =>
      this.itemSize.set(e.matches ? 92 : 40);
    mql.addEventListener('change', handler);
    this.#destroyRef.onDestroy(() =>
      mql.removeEventListener('change', handler)
    );
  }

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
