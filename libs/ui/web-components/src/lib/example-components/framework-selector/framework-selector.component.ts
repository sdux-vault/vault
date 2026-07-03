import { Component, inject, input } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FrameworkPreferenceService } from '../../services/framework-preference.service';

/**
 * Small inline button that opens a menu to select a preferred framework.
 *
 * When a framework is selected, all MultiFrameworkExampleComponent instances
 * on the page auto-switch to that tab via the shared FrameworkPreferenceService.
 */
@Component({
  selector: 'sdux-framework-selector',
  standalone: true,
  imports: [MatIconModule, MatMenuModule, MatTooltipModule, MatDividerModule],
  template: `
    <button
      type="button"
      class="framework-selector-btn"
      [matMenuTriggerFor]="menu"
      aria-label="Select preferred framework"
      matTooltip="Select preferred framework">
      <mat-icon>language</mat-icon>
    </button>

    <mat-menu #menu="matMenu">
      @for (label of availableFrameworks(); track label) {
        <button type="button" mat-menu-item (click)="select(label)">
          @if (preferenceService.preferred() === label) {
            <mat-icon>check</mat-icon>
          }
          {{ label }}
        </button>
      }
      <mat-divider />
      <button type="button" mat-menu-item (click)="reset()">
        <mat-icon>restart_alt</mat-icon>
        Show all (reset)
      </button>
    </mat-menu>
  `,
  styles: `
    @use 'global' as global;

    .framework-selector-btn {
      @include global.sdux-icon-button(36px);
      margin: global.$spacing-sm;
    }
  `
})
export class FrameworkSelectorComponent {
  /** Injected framework preference service used to read and write the selection. */
  readonly preferenceService = inject(FrameworkPreferenceService);

  /** Ordered list of framework labels rendered in the selection menu. */
  readonly availableFrameworks = input<string[]>([
    'Angular',
    'Bun',
    'Deno',
    'Node.js',
    'React',
    'Solid',
    'Svelte',
    'Vanilla JS',
    'Vue',
    'Web Components'
  ]);

  /**
   * Sets the preferred framework globally.
   *
   * @param label - The framework tab label to prefer.
   */
  select(label: string): void {
    this.preferenceService.set(label);
  }

  /**
   * Clears the framework preference, restoring all tabs.
   */
  reset(): void {
    this.preferenceService.reset();
  }
}
