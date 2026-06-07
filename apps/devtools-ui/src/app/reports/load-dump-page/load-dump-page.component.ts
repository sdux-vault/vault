import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal
} from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { EventShape } from '@sdux-vault/shared';
import { ConfirmDialogService } from '../../services/confirm-dialog/confirm-dialog.service';
import { DevtoolsAggregateService } from '../../services/devtools-aggregate.service';
import { DevtoolsLoggingService } from '../../services/devtools-logging.service';
import { DevtoolsRegistryService } from '../../services/registry/devtools-registry.service';
import { UpsellNoticeComponent } from '../../shared/upsell-notice/upsell-notice.component';

/**
 * Page component for loading an exported debug dump file.
 *
 * Accepts a JSON file via the native file picker, extracts the
 * `events` array, and replays them through the aggregate service
 * so the rest of the DevTools UI can render the dump data.
 */
@Component({
  selector: 'sdux-load-dump-page',
  standalone: true,
  imports: [MatTooltipModule, UpsellNoticeComponent],
  templateUrl: './load-dump-page.component.html',
  styleUrls: ['../scss/reports-common.scss', './load-dump-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadDumpPageComponent {
  /** Aggregate service that processes and stores trace data. */
  #aggregate = inject(DevtoolsAggregateService);

  /** Logging service that stores raw pipeline event history. */
  #logging = inject(DevtoolsLoggingService);

  /** Registry service providing license state. */
  #registry = inject(DevtoolsRegistryService);

  /** Whether the current license enables pro/enterprise features. */
  readonly isLicensed = this.#registry.isLicensed;

  /** Confirmation dialog service for destructive action prompts. */
  #confirmDialog = inject(ConfirmDialogService);

  /** Router for navigating after a successful load. */
  #router = inject(Router);

  /** User-facing error message when the file is invalid. */
  readonly errorMessage = signal<string>('');

  /** Name of the successfully loaded file. */
  readonly loadedFileName = signal<string>('');

  /** Number of events loaded from the dump. */
  readonly loadedEventCount = signal<number>(0);

  /**
   * Handles the file input change event.
   * Reads the selected JSON file, validates it, extracts the events
   * array, and feeds it to the aggregate service.
   *
   * @param event - The native input change event.
   */
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    this.#confirmDialog
      .confirm({
        title: 'Replace Current Data',
        message:
          'Loading a dump file will delete all current traces and events. This cannot be undone.',
        confirmLabel: 'Load File',
        cancelLabel: 'Cancel'
      })
      .subscribe((confirmed) => {
        if (confirmed) {
          this.#loadFile(file);
        } else {
          input.value = '';
        }
      });
  }

  /**
   * Reads and processes the selected dump file after user confirmation.
   *
   * @param file - The JSON dump file to load.
   */
  #loadFile(file: File): void {
    this.errorMessage.set('');
    this.loadedFileName.set('');
    this.loadedEventCount.set(0);

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const raw = JSON.parse(reader.result as string);
        let events: EventShape[];

        if (
          Array.isArray(raw) &&
          raw.length > 0 &&
          raw[0].traceId &&
          raw[0].events
        ) {
          // Trace export format (sdux-traces-*.json): flatten nested events
          events = raw.flatMap(
            (trace: { events: EventShape[] }) => trace.events
          );
        } else if (!Array.isArray(raw) && Array.isArray(raw?.events)) {
          // Debug dump format (sdux-debug-*.json): extract top-level events
          events = raw.events;
        } else {
          this.errorMessage.set(
            'Unsupported file format. Expected a trace export or debug dump file.'
          );
          return;
        }

        if (events.length === 0) {
          this.errorMessage.set('File contains no events.');
          return;
        }

        this.#aggregate.clearTraces();
        this.#logging.clearEvents();
        this.#aggregate.loadDumpEvents(events);
        this.loadedFileName.set(file.name);
        this.loadedEventCount.set(events.length);
      } catch {
        this.errorMessage.set('Failed to parse file. Ensure it is valid JSON.');
      }
    };
    reader.readAsText(file);
  }

  /**
   * Navigates to the Trace Detail view after loading a dump.
   */
  navigateToTraceDetail(): void {
    this.#router.navigate(['/reports/trace-detail']);
  }
}
