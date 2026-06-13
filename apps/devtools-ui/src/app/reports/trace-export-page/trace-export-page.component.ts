import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject
} from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { exportTrace } from '@sdux-vault/devtools';
import { DevtoolsLoggingService } from '../../services/devtools-logging.service';
import { DevtoolsRegistryService } from '../../services/registry/devtools-registry.service';
import { CollapsibleSectionComponent } from '../../shared/components/collapsible-section/collapsible-section.component';
import { HelpToggleComponent } from '../../shared/components/help-toggle/help-toggle.component';
import { ResetButtonComponent } from '../../shared/components/reset-button/reset-button.component';
import { UpsellNoticeComponent } from '../../shared/components/upsell-notice/upsell-notice.component';

/**
 * Page component for exporting a Chrome Trace Timeline file.
 *
 * Converts recorded pipeline events into Chrome's trace format
 * and downloads a `.json` file that can be loaded into Chrome
 * DevTools Performance panel or chrome://tracing.
 */
@Component({
  selector: 'sdux-trace-export-page',
  standalone: true,
  imports: [
    CollapsibleSectionComponent,
    HelpToggleComponent,
    MatTabsModule,
    MatTooltipModule,
    ResetButtonComponent,
    UpsellNoticeComponent
  ],
  templateUrl: './trace-export-page.component.html',
  styleUrls: [
    '../scss/reports-common.scss',
    './trace-export-page.component.scss'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TraceExportPageComponent {
  /** Registry service providing license state. */
  #registry = inject(DevtoolsRegistryService);

  /** Logging service providing recorded events. */
  #logging = inject(DevtoolsLoggingService);

  /** Whether the current license enables pro/enterprise features. */
  readonly isLicensed = this.#registry.isLicensed;

  /** Whether there are events available to export. */
  readonly hasEvents = computed(() => this.#logging.totalEvents() > 0);

  /** Total number of recorded events. */
  readonly eventCount = this.#logging.totalEvents;

  /** Number of unique traces across recorded events. */
  readonly traceCount = computed(() => {
    const events = this.#logging.events();
    const traces = new Set(events.map((e) => e.traceId).filter(Boolean));
    return traces.size;
  });

  /**
   * Exports the recorded events as a Chrome Trace Timeline file.
   *
   * @param timeScale - Multiplier for trace timestamps (default: 1).
   */
  downloadTrace(timeScale = 1): void {
    const events = this.#logging.events();

    if (!events.length) {
      return;
    }

    const traceJson = exportTrace(
      events as Parameters<typeof exportTrace>[0],
      timeScale
    );
    const blob = new Blob([traceJson], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `sdux-trace-x${timeScale}-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
  }
}
