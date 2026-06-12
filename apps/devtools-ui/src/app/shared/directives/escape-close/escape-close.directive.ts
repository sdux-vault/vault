import { Directive, HostListener, output } from '@angular/core';

/**
 * Keyboard shortcut directive that emits on `Escape` key press.
 * Intended for close/back buttons on detail panels.
 * Ignores key events originating from input, textarea, or select elements.
 */
@Directive({
  selector: '[sduxEscapeClose]',
  standalone: true
})
export class EscapeCloseDirective {
  /** Emitted when the user presses `Escape`. */
  readonly escapeClose = output<void>();

  /** Listens for keydown events on the document. */
  @HostListener('document:keydown.escape', ['$event'])
  onEscape(event: Event): void {
    const tag = (event.target as HTMLElement)?.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') {
      return;
    }

    this.escapeClose.emit();
  }
}
