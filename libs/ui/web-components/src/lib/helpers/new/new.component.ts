import { Component } from '@angular/core';

/** Inline badge component that renders a styled new label. */
@Component({
  selector: 'sdux-new',
  standalone: true,
  template: `<span class="new">new</span>`,
  styles: `
    @use 'global' as global;

    .new {
      display: inline;
      background: global.$sdux-success-outline;
      color: global.$sdux-success-base;
      font-weight: global.$font-weight-bold;
      border: 1px solid global.$sdux-success-light;
      border-radius: global.$border-radius-xs;
      font-size: global.$font-size-xxs;
      padding: global.$spacing-xxs;
      padding-left: global.$spacing-sm;
      padding-right: global.$spacing-sm;
    }
  `
})
export class SDuXNewComponent {}
