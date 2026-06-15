import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HeaderSectionComponent } from '../../../shared/components/header-section/header-section.component';
import { HelpToggleComponent } from '../../../shared/components/help-toggle/help-toggle.component';
import { TimelineZoomControlComponent } from '../../../shared/components/timeline-zoom-control/timeline-zoom-control.component';
import { ExtensionInspectorService } from '../service/extension-inspector.service';

/**
 * Renders N timeline rows — one per trace — showing the selected
 * extension key's stage span within each trace's total duration.
 */
@Component({
  selector: 'sdux-inspector-timeline',
  standalone: true,
  imports: [
    MatIconModule,
    MatTooltipModule,
    HeaderSectionComponent,
    HelpToggleComponent,
    TimelineZoomControlComponent
  ],
  templateUrl: './inspector-timeline.component.html',
  styleUrl: './inspector-timeline.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InspectorTimelineComponent {
  /** Inspector service providing timeline data. */
  readonly inspector = inject(ExtensionInspectorService);

  /** Whether the timeline section is expanded. */
  readonly showTimeline = signal(true);

  /**
   * Selects the execution matching the given trace ID.
   *
   * @param traceId - The trace to select.
   */
  selectRow(traceId: string): void {
    const idx = this.inspector
      .keyDurations()
      .findIndex((d) => d.traceId === traceId);
    if (idx >= 0) {
      this.inspector.selectedExecutionIndex.set(idx);
    }
  }

  /**
   * Whether the given trace is the currently selected execution.
   *
   * @param traceId - The trace to check.
   * @returns True if selected.
   */
  isSelected(traceId: string): boolean {
    const exec = this.inspector.selectedExecution();
    return exec?.traceId === traceId;
  }
}
