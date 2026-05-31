import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  InjectionToken
} from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { EventShape } from '@sdux-vault/shared';
import { DevtoolsMainPipelinePanelComponent } from '../panels/pipeline/main/devtools-main-pipeline-panel.component';
import { DevtoolsService } from '../services/devtools.service';

/**
 * Resolves the extension version from the Chrome manifest API.
 *
 * @returns The manifest version string, or `'dev'` outside the extension.
 */
export function resolveExtensionVersion(): string {
  try {
    return chrome.runtime.getManifest().version;
  } catch {
    return 'dev';
  }
}

/**
 * Injection token providing the extension manifest version string.
 */
export const EXTENSION_VERSION = new InjectionToken<string>(
  'EXTENSION_VERSION',
  { providedIn: 'root', factory: resolveExtensionVersion }
);

/**
 * Root splash-page component for the ngSDuX DevTools application.
 *
 * This component renders the primary tabbed interface for viewing
 * pipeline and queue events emitted by the Vault instrumentation layer.
 * It aggregates DevTools service state and exposes event counts for UI
 * display. It also activates a global insight override to ensure that
 * all monitors emit complete state, payload, queue, and error data.
 *
 * The component is standalone and imports only the minimal panel
 * components needed to render the DevTools interface.
 */
@Component({
  selector: 'sdux-devtools-splash-page',
  standalone: true,
  imports: [
    MatTabsModule,
    MatTooltipModule,
    DevtoolsMainPipelinePanelComponent
  ],
  templateUrl: './devtools-splash-page.component.html',
  styleUrl: './devtools-splash-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DevToolsSplashPageComponent {
  /** Internal service providing access to DevTools event streams. */
  private devtools = inject(DevtoolsService);

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
