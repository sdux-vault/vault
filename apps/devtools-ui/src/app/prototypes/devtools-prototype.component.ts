import { AfterViewInit, Component, ElementRef, viewChild } from '@angular/core';
import { EventShape } from '@sdux-vault/shared';

/** Shape representing a timeline containing a sequence of pipeline events. */
interface TimelineShape {
  /** Numeric identifier for the timeline. */
  id: number;
  /** Array of pipeline events within this timeline. */
  events: EventShape[];
}

/**
 * Prototype component for visualizing devtools pipeline timelines.
 *
 * This component renders a scrollable timeline grid of mock pipeline events
 * and supports hover and selection interactions for both timelines and
 * individual events.
 */
@Component({
  selector: 'sdux-devtools-prototype',
  standalone: true,
  imports: [],
  templateUrl: './devtools-prototype.component.html',
  styleUrl: './devtools-prototype.component.scss'
})
export class DevtoolsPrototypeComponent implements AfterViewInit {
  /** Reference to the scrollable timeline container element. */
  timelineContainer =
    viewChild<ElementRef<HTMLDivElement>>('timelineContainer');

  /** Collection of all generated timelines. */
  timelines: TimelineShape[] = [];

  /** Identifier of the currently hovered timeline. */
  hoveredTimelineId: number | null = null;
  /** Identifier of the currently selected timeline. */
  selectedTimelineId: number | null = null;

  /** Identifier of the currently hovered event. */
  hoveredEventId: string | null = null;
  /** Identifier of the currently selected event. */
  selectedEventId: string | null = null;

  /** Populates the timelines array with mock data. */
  constructor() {
    this.timelines = Array.from({ length: 100 }, (_, timeline) => ({
      id: timeline,
      events: Array.from({ length: 50 }, (_, i) => ({
        id: `event-${timeline}-${i}`,
        behaviorKey: `behavior-${i}`,
        cell: `cell-${i}`,
        timestamp: Date.now() + i * 1000,
        name: `name-${i}`,
        type: `lifecycle`,
        boundary: 'start'
      }))
    }));
  }

  /** Scrolls the timeline container to the rightmost position after view initialization. */
  ngAfterViewInit() {
    const el = this.timelineContainer()?.nativeElement;
    el!.scrollLeft = el!.scrollWidth;
  }
  // ─────────────────────────────
  // TIMELINE
  // ─────────────────────────────

  /**
   * Updates the hovered timeline unless a timeline is already selected.
   *
   * @param id - Timeline identifier to hover, or null to clear.
   */
  setHoveredTimeline(id: number | null) {
    if (this.selectedTimelineId !== null) return;
    this.hoveredTimelineId = id;
  }

  /**
   * Selects a timeline and clears all hover and event selections.
   *
   * @param id - Timeline identifier to select.
   */
  selectTimeline(id: number) {
    this.selectedTimelineId = id;
    this.hoveredTimelineId = null;
    this.selectedEventId = null;
    this.hoveredEventId = null;
  }

  // ─────────────────────────────
  // EVENT
  // ─────────────────────────────

  /**
   * Updates the hovered event unless an event is already selected.
   *
   * @param id - Event identifier to hover, or null to clear.
   */
  setHoveredEvent(id: string | null) {
    if (this.selectedEventId !== null) return;
    this.hoveredEventId = id;
  }

  /**
   * Selects an event and clears the hovered event.
   *
   * @param id - Event identifier to select.
   */
  selectEvent(id: string) {
    this.selectedEventId = id;
    this.hoveredEventId = null;
  }

  // ─────────────────────────────
  // ACTIVE GETTERS
  // ─────────────────────────────

  /** Returns the selected timeline identifier, falling back to the hovered one. */
  get activeTimelineId(): number | null {
    return this.selectedTimelineId ?? this.hoveredTimelineId;
  }

  /** Returns the active timeline shape, or null if none is active. */
  get activeTimeline(): TimelineShape | null {
    if (this.activeTimelineId === null) return null;
    return this.timelines.find((t) => t.id === this.activeTimelineId) ?? null;
  }

  /** Returns the selected event identifier, falling back to the hovered one. */
  get activeEventId(): string | null {
    return this.selectedEventId ?? this.hoveredEventId;
  }

  /** Returns the active event shape, or null if none is active. */
  get activeEvent() {
    if (!this.activeTimeline || !this.activeEventId) return null;
    return (
      this.activeTimeline.events.find((e) => e.id === this.activeEventId) ??
      null
    );
  }
}
