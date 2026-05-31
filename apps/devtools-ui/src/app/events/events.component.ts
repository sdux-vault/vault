import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject
} from '@angular/core';
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

  /** Total number of pipeline events currently stored. */
  readonly totalEvents = computed(() => this.events()?.length);

  /** Pipeline events filtered to only those with errors. */
  readonly errorEvents = computed(
    () => this.events()?.filter((e) => !!e.error) ?? []
  );

  /**
   * Clears the current FeatureCell-backed pipeline event history.
   */
  clearEvents(): void {
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
