/**
 * Displays the source code section of an `<sdux-example-viewer>` instance.
 *
 * This component:
 *  - Renders all `<sdux-example-viewer-tab>` children as Angular Material tabs.
 *  - Synchronizes visibility with the ExampleViewerService so examples can
 *    open or close their source panes programmatically.
 *  - Provides a “Copy Source” action for each tab, writing code to the clipboard.
 *  - Shows a success indicator and snack-bar notifications on copy actions.
 *  - Supports mobile layout adjustments through the MobileLayoutService.
 *
 * It is fully signal-driven and updates automatically when:
 *  - new `<sdux-example-viewer-tab>` children appear or disappear
 *  - the parent passes new `displayExamples` or `exampleId` values
 */

import { NgTemplateOutlet } from '@angular/common';
import {
  AfterContentInit,
  Component,
  ContentChildren,
  ElementRef,
  QueryList,
  ViewChildren,
  effect,
  inject,
  input,
  signal
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MobileLayoutService } from '../../services/mobile-layout.service';
import { ExampleViewerTabComponent } from '../example-viewer-tab/example-viewer-source-tab.component';
import { ExampleViewerService } from '../services/example-viewer.service';

/**
 * The component
 */
@Component({
  selector: 'sdux-example-viewer-source',
  standalone: true,
  imports: [MatTabsModule, NgTemplateOutlet, MatTooltipModule, MatIconModule],
  templateUrl: './example-viewer-source.component.html',
  styleUrls: ['./example-viewer-source.component.scss']
})
export class ExampleViewerSourceComponent implements AfterContentInit {
  /**
   * All `<sdux-example-viewer-tab>` elements projected into this component.
   * These represent each source-code panel (HTML, TS, Service, Model, etc.).
   */
  @ContentChildren(ExampleViewerTabComponent)
  tabComponents!: QueryList<ExampleViewerTabComponent>;

  /**
   * All `<code #codeBlock>` elements rendered inside the template, used for
   * extracting text content when the user clicks “Copy Source”.
   */
  @ViewChildren('codeBlock', { read: ElementRef })
  codeBlocks!: QueryList<ElementRef>;

  /**
   * Whether the source code should be in a tab.
   */
  readonly displayTabs = input<boolean>(true);

  /**
   * Whether the copy/paste buttons should be displayed.
   */
  readonly displayCopyPaste = input<boolean>(true);

  /**
   * Whether the source panel should be visible by default.
   * This is passed down from the parent `<sdux-example-viewer>` component.
   */
  readonly displayExamples = input<boolean>(false);

  /**
   * Unique identifier for this example.
   * Used by ExampleViewerService to remember open/closed state across navigation.
   */
  readonly exampleId = input<string>('');

  /**
   * Internal instance of ExampleViewerService.
   * Controls source-viewer visibility state globally.
   */
  #exampleService = inject(ExampleViewerService);

  /**
   * Provides responsive layout helpers for mobile displays.
   */
  mobileLayoutService = inject(MobileLayoutService);

  /**
   * Constructor sets up a reactive effect watching:
   *  - exampleId()
   *  - displayExamples()
   *
   * When either changes, the ExampleViewerService is notified so
   * visibility state is synced across the entire application.
   */
  constructor() {
    effect(() => {
      const id = this.exampleId();
      const visible = this.displayExamples();

      if (id) {
        this.#exampleService.setDefaultVisibility(id, visible);
      }
    });
  }

  /**
   * A reactive list of all discovered tabs.
   * This updates automatically when Angular detects new projected tabs.
   */
  readonly tabs = signal<ExampleViewerTabComponent[]>([]);

  /**
   * Snack bar service used for showing success/error notifications
   * when copying source code to the clipboard.
   */
  private readonly snackBar = inject(MatSnackBar);

  /**
   * AfterContentInit lifecycle:
   * - Captures the initial set of tabs.
   * - Subscribes to future tab changes so dynamic tabs are supported.
   */
  ngAfterContentInit(): void {
    this.tabs.set(this.tabComponents.toArray());
    /* istanbul ignore next */
    this.tabComponents.changes.subscribe(() =>
      this.tabs.set(this.tabComponents.toArray())
    );
  }

  /**
   * Whether the copy icon should display a “success” variant.
   * Automatically resets after a brief timeout when the user copies source code.
   */
  copySuccess = signal(false);

  /**
   * Copies the content of the given code tab to the clipboard.
   *
   * Steps:
   *  1. Extract text from the selected `<code>` element.
   *  2. If nothing exists, show a “Nothing to copy!” snack bar.
   *  3. Otherwise:
   *     - Set `copySuccess` to true for UI feedback.
   *     - Write the text to the clipboard.
   *     - Show a “Source copied!” snack bar.
   *     - Reset success state after 2 seconds.
   *
   * @param index The tab index whose code should be copied.
   */
  copyCode(index: number): void {
    const codeElement = this.codeBlocks.get(index)?.nativeElement as
      | HTMLElement
      | undefined;

    const textToCopy = codeElement?.innerText?.trim() ?? '';

    // Nothing to copy → notify user
    if (!textToCopy) {
      this.snackBar.open('Nothing to copy!', '', {
        duration: 1500,
        verticalPosition: 'top'
      });
      return;
    }

    // Flip UI state
    this.copySuccess.set(true);

    navigator.clipboard.writeText(textToCopy).then(() => {
      // Notify user
      this.snackBar.open('Source copied!', '', {
        duration: 2000,
        verticalPosition: 'top'
      });

      // Reset success indicator
      setTimeout(() => this.copySuccess.set(false), 2000);
    });
  }
}
