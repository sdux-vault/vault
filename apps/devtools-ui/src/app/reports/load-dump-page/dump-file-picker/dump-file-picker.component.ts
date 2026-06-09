import {
  ChangeDetectionStrategy,
  Component,
  inject,
  output,
  signal
} from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { EventShape } from '@sdux-vault/shared';
import { ConfirmDialogService } from '../../../services/confirm-dialog/confirm-dialog.service';
import { DevtoolsAggregateService } from '../../../services/devtools-aggregate.service';
import { DevtoolsLoggingService } from '../../../services/devtools-logging.service';

/** Shape emitted after a successful file load. */
export interface DumpFileLoadedEvent {
  /** Name of the loaded file. */
  fileName: string;
  /** Number of events loaded from the file. */
  eventCount: number;
}

/**
 * Standalone file picker component for selecting and loading JSON debug dump files.
 * Handles file reading, parsing, validation, confirmation, and feeding events
 * to the aggregate service.
 */
@Component({
  selector: 'sdux-dump-file-picker',
  standalone: true,
  imports: [MatTooltipModule],
  templateUrl: './dump-file-picker.component.html',
  styleUrl: './dump-file-picker.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DumpFilePickerComponent {
  /** Aggregate service that processes and stores trace data. */
  #aggregate = inject(DevtoolsAggregateService);

  /** Logging service that stores raw pipeline event history. */
  #logging = inject(DevtoolsLoggingService);

  /** Confirmation dialog service for destructive action prompts. */
  #confirmDialog = inject(ConfirmDialogService);

  /** User-facing error message when the file is invalid. */
  readonly errorMessage = signal<string>('');

  /** Emits after a file is successfully loaded. */
  readonly fileLoaded = output<DumpFileLoadedEvent>();

  /**
   * Handles the file input change event.
   * Shows a confirmation dialog, then reads and processes the file.
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
          events = raw.flatMap(
            (trace: { events: EventShape[] }) => trace.events
          );
        } else if (!Array.isArray(raw) && Array.isArray(raw?.events)) {
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
        this.fileLoaded.emit({
          fileName: file.name,
          eventCount: events.length
        });
      } catch {
        this.errorMessage.set('Failed to parse file. Ensure it is valid JSON.');
      }
    };
    reader.readAsText(file);
  }
}
