import { Component, inject, input, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { WINDOW } from '../../tokens/window.token';
import { ExampleViewerService } from '../services/example-viewer.service';

/**
 * -----------------------------------------------------------------------------
 * SDuX ExampleViewerHeaderComponent
 * -----------------------------------------------------------------------------
 *
 * Header component used by <sdux-example-viewer>.
 *
 * Responsibilities:
 *  • Display example title & subtitle
 *  • Provide “copy link” functionality
 *  • Provide “toggle source panel” icon button
 *
 * Inputs:
 *  • title      → string shown as main heading
 *  • subTitle   → optional secondary label
 *  • exampleId  → DOM anchor used for deep linking (#example-id)
 *
 * Behavior:
 *  • isOpen()   → signal controlling whether the source panel is visible
 *  • toggleSource() updates state and notifies ExampleViewerService
 *  • copyLink() copies fully-qualified deep-link URL to clipboard
 *
 * Notes:
 *  • input() creates readonly input signals — updated via Angular bindings.
 *  • ExampleViewerService coordinates global “which viewer is open”.
 */
@Component({
  selector: 'sdux-example-viewer-header',
  standalone: true,
  imports: [MatIconModule, MatTooltipModule],
  templateUrl: './example-viewer-header.component.html',
  styleUrls: ['./example-viewer-header.component.scss']
})
export class ExampleViewerHeaderComponent {
  /**
   * Title displayed in the header.
   * Readonly signal — set via Angular input binding.
   */
  readonly title = input<string>('');

  /**
   * Optional subtitle displayed beneath/next to the title.
   */
  readonly subTitle = input<string>('');

  /**
   * Unique ID used to generate deep-link URLs.
   * Example: https://example.com/docs/page#example-id
   */
  readonly exampleId = input<string>('');

  /**
   * Shared coordination service for toggling example source panes.
   */
  private readonly exampleViewer = inject(ExampleViewerService);

  /**
   * Injected Window reference for testability and SSR safety.
   */
  private readonly window = inject(WINDOW);

  /**
   * Local open/closed UI state for the source viewer toggle.
   */
  readonly isOpen = signal<boolean>(false);

  /**
   * Tracks whether the "copy" action recently succeeded.
   *
   * When true:
   *  - The link icon in the header temporarily changes to a success checkmark.
   *  - This state automatically resets after 2 seconds.
   *
   * This UI signal provides lightweight, transient feedback without requiring
   * additional components, observers, or change-detection complexity.
   */
  copySuccess = signal(false);

  /**
   * Copies a deep-linkable URL for the current example to the clipboard.
   *
   * Behavior:
   *  1. Builds a direct URL using the current window location and example ID.
   *  2. Writes the URL to the user's clipboard using the Clipboard API.
   *  3. Sets `copySuccess` to `true`, triggering the UI to display a success icon.
   *  4. After 2 seconds, resets `copySuccess` back to `false`, restoring the
   *     default link icon.
   *
   * This provides an unobtrusive “copied” confirmation to the user with minimal
   * UI overhead.
   */
  copyLink(): void {
    const loc = this.window?.location;
    /* istanbul ignore next -- defensive SSR fallback when window is undefined */
    const url = `${loc?.origin ?? ''}${loc?.pathname ?? ''}#${this.exampleId()}`;
    navigator.clipboard.writeText(url);

    // Temporarily show the success icon
    this.copySuccess.set(true);

    // Restore original icon after brief confirmation window
    setTimeout(() => this.copySuccess.set(false), 2000);
  }

  /**
   * Toggles the source panel visibility.
   *
   * 1. Flips local open/closed state
   * 2. Notifies ExampleViewerService so only one viewer stays open at a time
   */
  toggleSource(): void {
    this.isOpen.update((value) => !value);
    this.exampleViewer.toggle(this.exampleId());
  }
}
