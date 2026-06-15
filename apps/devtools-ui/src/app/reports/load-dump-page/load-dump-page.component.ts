import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal
} from '@angular/core';
import { Router } from '@angular/router';
import { DevtoolsRegistryService } from '../../services/registry/devtools-registry.service';
import { HeaderSectionComponent } from '../../shared/components/header-section/header-section.component';
import { HelpToggleComponent } from '../../shared/components/help-toggle/help-toggle.component';
import { UpsellNoticeComponent } from '../../shared/components/upsell-notice/upsell-notice.component';
import {
  DumpFilePickerComponent,
  type DumpFileLoadedEvent
} from './dump-file-picker/dump-file-picker.component';

/**
 * Page component for loading an exported debug dump file.
 *
 * Delegates file selection, parsing, and loading to the
 * DumpFilePickerComponent. Displays success state and provides
 * navigation to the Trace Detail view after loading.
 */
@Component({
  selector: 'sdux-load-dump-page',
  standalone: true,
  imports: [
    HeaderSectionComponent,
    DumpFilePickerComponent,
    HelpToggleComponent,
    UpsellNoticeComponent
  ],
  templateUrl: './load-dump-page.component.html',
  styleUrls: ['../scss/reports-common.scss', './load-dump-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadDumpPageComponent {
  /** Registry service providing license state. */
  #registry = inject(DevtoolsRegistryService);

  /** Whether the current license enables pro/enterprise features. */
  readonly isLicensed = this.#registry.isLicensed;

  /** Router for navigating after a successful load. */
  #router = inject(Router);

  /** Name of the successfully loaded file. */
  readonly loadedFileName = signal<string>('');

  /** Number of events loaded from the dump. */
  readonly loadedEventCount = signal<number>(0);

  /**
   * Handles the fileLoaded event from the dump file picker.
   *
   * @param event - The load result containing file name and event count.
   */
  onFileLoaded(event: DumpFileLoadedEvent): void {
    this.loadedFileName.set(event.fileName);
    this.loadedEventCount.set(event.eventCount);
  }

  /**
   * Navigates to the Trace Detail view after loading a dump.
   */
  navigateToTraceDetail(): void {
    this.#router.navigate(['/reports/trace-detail']);
  }
}
