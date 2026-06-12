import { Directive, HostListener, output } from '@angular/core';

/**
 * Keyboard navigation directive for previous/next item traversal.
 * Emits `previous` on `j` or `ArrowLeft`, and `next` on `l` or `ArrowRight`.
 * Ignores key events originating from input, textarea, or select elements.
 */
@Directive({
  selector: '[sduxLeftRightNavigation]',
  standalone: true
})
export class LeftRightNavigationDirective {
  /** Emitted when the user presses `j` or `ArrowLeft`. */
  readonly previous = output<void>();

  /** Emitted when the user presses `l` or `ArrowRight`. */
  readonly next = output<void>();

  /** Listens for keydown events on the document. */
  @HostListener('document:keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    const tag = (event.target as HTMLElement)?.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') {
      return;
    }

    switch (event.key) {
      case 'j':
      case 'ArrowLeft':
        this.previous.emit();
        break;
      case 'l':
      case 'ArrowRight':
        this.next.emit();
        break;
    }
  }
}
