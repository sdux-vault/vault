import { Component } from '@angular/core';

/** Inline badge component that renders a styled deprecation label. */
@Component({
  selector: 'sdux-deprecated',
  standalone: true,
  template: `<span class="deprecated">deprecated</span>`,
  styles: `
    @use 'global' as global;

    .deprecated {
      display: inline;
      background: global.$sdux-accent-outline;
      color: global.$sdux-accent-base;
      border: 1px solid global.$sdux-accent-light;
      border-radius: global.$border-radius-xs;
      font-size: global.$font-size-xxs;
      padding: global.$spacing-xxs;
      margin: global.$spacing-sm;
    }
  `
})
export class DeprecatedComponent {}
