import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  InjectionToken
} from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CellDashboardComponent } from '../reports/cell-dashboard/cell-dashboard.component';
import { DevtoolsAggregateService } from '../services/devtools-aggregate.service';
import { DevtoolsLoggingService } from '../services/devtools-logging.service';
import { DevtoolsRegistryService } from '../services/registry/devtools-registry.service';

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
 * Root splash-page component for the SDuX Vault DevTools application.
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
  imports: [MatTooltipModule, CellDashboardComponent],
  templateUrl: './devtools-splash-page.component.html',
  styleUrl: './devtools-splash-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DevToolsSplashPageComponent {
  /** Internal service providing access to DevTools event streams. */
  private devtools = inject(DevtoolsLoggingService);

  /** Extension manifest version, resolved via injection token. */
  readonly version = inject(EXTENSION_VERSION);

  /**
   * Eagerly injects the aggregate service so it begins buffering
   * pipeline events from application start.
   */
  constructor() {
    // Eagerly instantiate aggregate service so it buffers from app start.
    inject(DevtoolsAggregateService);
    // Eagerly instantiate registry service so config is available immediately.
    inject(DevtoolsRegistryService);
  }

  /** Reactive list of pipeline events used to populate the UI. */
  readonly events = computed(() => this.devtools.events());

  /** Total number of pipeline events currently stored. */
  readonly totalEvents = computed(() => this.events()?.length);
}
