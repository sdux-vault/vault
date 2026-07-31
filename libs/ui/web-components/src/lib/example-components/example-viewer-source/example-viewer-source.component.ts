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
  AfterViewInit,
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
import { FrameworkSelectorComponent } from '../framework-selector/framework-selector.component';
import { ExampleViewerService } from '../services/example-viewer.service';

/**
 * The component
 */
@Component({
  selector: 'sdux-example-viewer-source',
  standalone: true,
  imports: [
    MatTabsModule,
    NgTemplateOutlet,
    MatTooltipModule,
    MatIconModule,
    FrameworkSelectorComponent
  ],
  templateUrl: './example-viewer-source.component.html',
  styleUrls: ['./example-viewer-source.component.scss']
})
export class ExampleViewerSourceComponent
  implements AfterContentInit, AfterViewInit
{
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
   * All rendered source pane `<pre>` containers.
   * These are measured to decide whether the max-height cap should apply.
   */
  @ViewChildren('sourcePane', { read: ElementRef })
  sourcePanes!: QueryList<ElementRef<HTMLElement>>;

  /**
   * Whether the source code should be in a tab.
   */
  readonly displayTabs = input<boolean>(true);

  /**
   * Default vertical size cap for long source panes.
   * Source taller than this value starts collapsed and can be expanded per tab.
   */
  readonly sourcePaneMaxHeight = input<number>(640);

  /**
   * Whether the copy/paste buttons should be displayed.
   */
  readonly displayCopyPaste = input<boolean>(true);

  /**
   * Whether the framework selector globe icon should be displayed.
   */
  readonly showFrameworkSelector = input<boolean>(false);

  /**
   * Framework labels available for the framework selector menu.
   */
  readonly availableFrameworks = input<string[]>([]);

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
   * Tracks which source panes exceed the configured height threshold.
   */
  readonly overflowingTabs = signal<Record<number, boolean>>({});

  /**
   * Tracks whether a given source pane is expanded to its full height.
   */
  readonly expandedTabs = signal<Record<number, boolean>>({});

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
   * Measures rendered code panes once the view exists and whenever the set of
   * code panes changes.
   */
  ngAfterViewInit(): void {
    this.scheduleOverflowMeasurement();
    /* istanbul ignore next */
    this.sourcePanes.changes.subscribe(() =>
      this.scheduleOverflowMeasurement()
    );
  }

  /**
   * Whether the copy icon should display a “success” variant.
   * Automatically resets after a brief timeout when the user copies source code.
   */
  copySuccess = signal(false);

  /**
   * Returns true when the source pane at the given index exceeds the default height cap.
   * @param index - Source pane index.
   * @returns Whether the pane should support expand/collapse behavior.
   */
  isSourceOverflowing(index: number): boolean {
    return this.overflowingTabs()[index] ?? false;
  }

  /**
   * Returns true when the source pane at the given index is expanded to full height.
   * @param index - Source pane index.
   * @returns Whether the pane is currently expanded.
   */
  isSourceExpanded(index: number): boolean {
    return this.expandedTabs()[index] ?? false;
  }

  /**
   * Returns true when the source pane should be rendered with the default height cap.
   * @param index - Source pane index.
   * @returns Whether the source pane should render in collapsed mode.
   */
  isSourceCollapsed(index: number): boolean {
    return this.isSourceOverflowing(index) && !this.isSourceExpanded(index);
  }

  /**
   * Expands or collapses a source pane while leaving other tabs unchanged.
   * @param index - Source pane index.
   */
  toggleSourceExpansion(index: number): void {
    this.expandedTabs.update((state) => ({
      ...state,
      [index]: !this.isSourceExpanded(index)
    }));
  }

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
      HTMLElement | undefined;

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

  /**
   * Schedules a layout pass so pane heights are measured after Angular and Prism have rendered content.
   */
  private scheduleOverflowMeasurement(): void {
    requestAnimationFrame(() => this.updateOverflowState());
  }

  /**
   * Records whether each source pane exceeds the configured max-height.
   */
  private updateOverflowState(): void {
    const maxHeight = this.sourcePaneMaxHeight();
    const nextState = this.sourcePanes
      .toArray()
      .reduce<Record<number, boolean>>((overflowMap, paneRef, index) => {
        overflowMap[index] = paneRef.nativeElement.scrollHeight > maxHeight;
        return overflowMap;
      }, {});

    this.overflowingTabs.set(nextState);
    this.expandedTabs.update((state) => {
      const nextExpandedState = { ...state };

      Object.entries(nextExpandedState).forEach(([indexKey]) => {
        const index = Number(indexKey);

        if (!nextState[index]) {
          delete nextExpandedState[index];
        }
      });

      return nextExpandedState;
    });
  }
}
