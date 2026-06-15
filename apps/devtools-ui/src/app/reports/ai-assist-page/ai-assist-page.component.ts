import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject
} from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import {
  createDebugDump,
  downloadAiAssistFile,
  downloadDebugDump
} from '@sdux-vault/devtools';
import { DevtoolsLoggingService } from '../../services/devtools-logging.service';
import { DevtoolsRegistryService } from '../../services/registry/devtools-registry.service';
import { HeaderSectionComponent } from '../../shared/components/header-section/header-section.component';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';
import { HelpToggleComponent } from '../../shared/components/help-toggle/help-toggle.component';
import { ResetButtonComponent } from '../../shared/components/reset-button/reset-button.component';
import { UpsellNoticeComponent } from '../../shared/components/upsell-notice/upsell-notice.component';

/**
 * Page component for exporting AI-assisted debug analysis files.
 *
 * Provides two downloads: a structured AI analysis prompt template
 * and a debug dump JSON file containing pipeline events, stats,
 * and registry data for comprehensive AI-driven diagnostics.
 */
@Component({
  selector: 'sdux-ai-assist-page',
  standalone: true,
  imports: [
    HeaderSectionComponent,
    EmptyStateComponent,
    HelpToggleComponent,
    MatTooltipModule,
    ResetButtonComponent,
    UpsellNoticeComponent
  ],
  templateUrl: './ai-assist-page.component.html',
  styleUrls: ['../scss/reports-common.scss', './ai-assist-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AiAssistPageComponent {
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

  /** Downloads the AI assist markdown prompt file. */
  downloadAiAssist(): void {
    downloadAiAssistFile();
  }

  /** Downloads the debug dump JSON file. */
  downloadDump(): void {
    const events = this.#logging.events();

    if (!events.length) {
      return;
    }

    const dump = createDebugDump(
      events as Parameters<typeof createDebugDump>[0]
    );
    downloadDebugDump(dump);
  }
}
