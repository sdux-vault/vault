import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal
} from '@angular/core';
import { Router } from '@angular/router';
import { DevtoolsAggregateService } from '../../services/devtools-aggregate.service';

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
  templateUrl: './load-dump-page.component.html',
  styleUrl: './load-dump-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadDumpPageComponent {
  /** Aggregate service that processes and stores trace data. */
  #aggregate = inject(DevtoolsAggregateService);

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

    this.errorMessage.set('');
    this.loadedFileName.set('');
    this.loadedEventCount.set(0);

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const dump = JSON.parse(reader.result as string);

        if (!dump || !Array.isArray(dump.events) || dump.events.length === 0) {
          this.errorMessage.set(
            'Invalid dump file: missing or empty "events" array.'
          );
          return;
        }

        this.#aggregate.loadDumpEvents(dump.events);
        this.loadedFileName.set(file.name);
        this.loadedEventCount.set(dump.events.length);
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
