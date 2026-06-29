import { Component, TemplateRef, ViewChild, input } from '@angular/core';

/**
 * Wrapper component for a generic tab within `<sdux-multi-framework-example>`.
 *
 * Place this as a child of the multi-framework-example component to add
 * an additional tab with custom content (e.g., "Angular with Effects").
 */
@Component({
  selector: 'sdux-generic-tab',
  standalone: true,
  template: `
    <ng-template #content>
      <ng-content />
    </ng-template>
  `
})
export class GenericTabComponent {
  /** Label displayed on the tab. */
  readonly label = input.required<string>();

  /** Whether this tab is inserted alphabetically among the other tabs. Defaults to true. */
  readonly alphabetized = input<boolean>(true);

  /** Explicit 0-based position index for this tab. Overrides alphabetized when provided. */
  readonly order = input<number | undefined>(undefined);

  /** Reference to the projected content template. */
  @ViewChild('content', { static: true }) template!: TemplateRef<unknown>;
}
