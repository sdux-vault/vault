import {
  AfterViewInit,
  Directive,
  ElementRef,
  inject,
  input,
  OnDestroy,
  output
} from '@angular/core';

/**
 * Reports whether the host source pane is taller than its configured height.
 * Each rendered pane is measured once after its initial view has rendered.
 */
@Directive({
  selector: '[sduxSourceOverflow]',
  standalone: true
})
export class SourceOverflowDirective implements AfterViewInit, OnDestroy {
  /** Maximum source-pane height used to determine overflow. */
  readonly maxHeight = input(640, {
    alias: 'sduxSourceOverflowMaxHeight'
  });

  /** Emits the source pane's one-time overflow result. */
  readonly overflowChange = output<boolean>({
    alias: 'sduxSourceOverflowChange'
  });

  /** Reference to the source pane being measured. */
  readonly #elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  /** Observer that waits for the source pane to become visible. */
  #intersectionObserver: IntersectionObserver | null = null;

  /** Records whether the source pane has already been measured. */
  #hasMeasured = false;

  /** Waits until the source pane is visible, then measures it once. */
  ngAfterViewInit(): void {
    /* istanbul ignore if -- defensive for environments without IntersectionObserver */
    if (typeof IntersectionObserver === 'undefined') {
      this.#measureOnce();
      return;
    }

    this.#intersectionObserver = new IntersectionObserver((entries) => {
      if (
        entries.some(
          (entry) => entry.isIntersecting || entry.intersectionRatio > 0
        )
      ) {
        this.#intersectionObserver?.disconnect();
        this.#intersectionObserver = null;
        this.#measureOnce();
      }
    });

    this.#intersectionObserver.observe(this.#elementRef.nativeElement);
  }

  /** Disconnects the visibility observer when the pane is destroyed. */
  ngOnDestroy(): void {
    this.#intersectionObserver?.disconnect();
    this.#intersectionObserver = null;
  }

  /** Measures and reports overflow exactly once for this pane. */
  #measureOnce(): void {
    if (this.#hasMeasured) return;

    this.#hasMeasured = true;

    requestAnimationFrame(() => {
      const isOverflowing =
        this.#elementRef.nativeElement.scrollHeight > this.maxHeight();

      this.overflowChange.emit(isOverflowing);
    });
  }
}
