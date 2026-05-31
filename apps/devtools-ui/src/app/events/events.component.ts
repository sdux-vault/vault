import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal
} from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { EventShape } from '@sdux-vault/shared';
import { DevtoolsService } from '../services/devtools.service';
import { EXTENSION_VERSION } from '../splash-page/devtools-splash-page.component';
import { DevtoolsMainPipelinePanelComponent } from './panels/pipeline/main/devtools-main-pipeline-panel.component';

/**
 * Events component displaying the tabbed event viewer with header,
 * pipeline panels, and empty-state messaging for the DevTools UI.
 */
@Component({
  selector: 'sdux-events',
  standalone: true,
  imports: [
    MatSelectModule,
    MatTabsModule,
    MatTooltipModule,
    DevtoolsMainPipelinePanelComponent
  ],
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventsComponent {
  /** Internal service providing access to DevTools event streams. */
  private devtools: DevtoolsService = inject(DevtoolsService);

  /** Extension manifest version, resolved via injection token. */
  readonly version = inject(EXTENSION_VERSION);

  /** Reactive list of pipeline events used to populate the UI. */
  readonly events = computed(() => this.devtools.events());

  /** Currently selected cell filter. */
  readonly selectedCell = signal('all');

  /** Unique cell names derived from the current events. */
  readonly cellNames = computed(() => {
    const cells = this.events()?.map((e) => e.cell) ?? [];
    return [...new Set(cells)].sort();
  });

  /** Events filtered by the selected cell. */
  readonly filteredEvents = computed(() => {
    const cell = this.selectedCell();
    if (cell === 'all') {
      return this.events();
    }
    return this.events()?.filter((e) => e.cell === cell) ?? [];
  });

  /** Total number of pipeline events currently stored. */
  readonly totalEvents = computed(() => this.filteredEvents()?.length);

  /** Pipeline events filtered to only those with errors. */
  readonly errorEvents = computed(
    () => this.filteredEvents()?.filter((e) => !!e.error) ?? []
  );

  /** Human-readable total state size across all cells (latest event per cell). */
  readonly latestStateSize = computed(() => {
    const events = this.filteredEvents();
    if (!events?.length) {
      return null;
    }
    const latestByCell = new Map<string, EventShape>();
    for (const e of events) {
      if (e.state?.hasValue) {
        latestByCell.set(e.cell, e);
      }
    }
    if (!latestByCell.size) {
      return null;
    }
    let totalBytes = 0;
    for (const e of latestByCell.values()) {
      totalBytes += new Blob([JSON.stringify(e.state!.value)]).size;
    }
    if (totalBytes < 1024) {
      return `${totalBytes} B`;
    }
    if (totalBytes < 1048576) {
      return `${(totalBytes / 1024).toFixed(1)} KB`;
    }
    return `${(totalBytes / 1048576).toFixed(1)} MB`;
  });

  /**
   * Clears the current FeatureCell-backed pipeline event history.
   */
  clearEvents(): void {
    this.selectedCell.set('all');
    this.devtools.clearEvents();
  }

  /**
   * Downloads all pipeline events as a JSON file.
   *
   * @param event - The DOM event to stop propagation on.
   */
  downloadAllEvents(event: Event): void {
    event.stopPropagation();
    this.downloadEvents(this.events(), 'all-events');
  }

  /**
   * Downloads error pipeline events as a JSON file.
   *
   * @param event - The DOM event to stop propagation on.
   */
  downloadErrorEvents(event: Event): void {
    event.stopPropagation();
    this.downloadEvents(this.errorEvents(), 'error-events');
  }

  /**
   * Downloads the provided events as a JSON file.
   *
   * @param events - The event array to serialize.
   * @param filename - The base name for the downloaded file.
   */
  private downloadEvents(events: EventShape[], filename: string): void {
    const blob = new Blob([JSON.stringify(events, null, 2)], {
      type: 'application/json'
    });

    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `sdux-${filename}-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
  }
}
