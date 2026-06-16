import {
  Directive,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  Renderer2
} from '@angular/core';

/**
 * Attribute directive that detects vertical overflow on its host element
 * and renders a floating "See More" pill at the bottom of the container.
 *
 * The directive auto-detects overflow by comparing `scrollHeight` to
 * `clientHeight` using a `ResizeObserver`. No inputs are required — the
 * host element's existing `max-height` and `overflow-y` styles are used
 * as-is.
 *
 * @example
 * ```html
 * <div class="panel-top-scroll" sduxOverflowPill>
 *   <ul>...</ul>
 * </div>
 * ```
 */
@Directive({
  selector: '[sduxOverflowPill]',
  standalone: true
})
export class OverflowPillDirective implements OnInit, OnDestroy {
  /** Reference to the host element the directive is applied to. */
  readonly #el = inject(ElementRef<HTMLElement>);

  /** Angular renderer used for DOM manipulation. */
  readonly #renderer = inject(Renderer2);

  /** Position-relative wrapper inserted around the host element. */
  #wrapper: HTMLElement | null = null;

  /** The "See More" pill element rendered at the bottom of the container. */
  #pill: HTMLElement | null = null;

  /** ResizeObserver monitoring host element dimension changes. */
  #observer: ResizeObserver | null = null;

  /** MutationObserver monitoring host child list changes for dynamic content. */
  #mutationObserver: MutationObserver | null = null;

  /** Teardown function for the host scroll event listener. */
  #scrollUnlisten: (() => void) | null = null;

  /** Initializes the wrapper, pill, observers, and scroll listener. */
  ngOnInit(): void {
    this.#wrapHost();
    this.#createPill();
    this.#observeResize();
    this.#observeChildChanges();
    this.#listenToScroll();
  }

  /** Disconnects observers and removes the scroll listener. */
  ngOnDestroy(): void {
    this.#observer?.disconnect();
    this.#observer = null;
    this.#mutationObserver?.disconnect();
    this.#mutationObserver = null;
    this.#scrollUnlisten?.();
    this.#scrollUnlisten = null;
  }

  /** Wraps the host element in a position-relative container for pill positioning. */
  #wrapHost(): void {
    const host = this.#el.nativeElement;
    const parent = host.parentNode;
    /* istanbul ignore if -- defensive: host always has a parent in Angular templates */
    if (!parent) return;

    this.#wrapper = this.#renderer.createElement('div');
    this.#renderer.setStyle(this.#wrapper, 'position', 'relative');

    parent.insertBefore(this.#wrapper, host);
    this.#wrapper!.appendChild(host);
  }

  /** Creates the fade container and pill element with inline styles, appends to the wrapper, and registers click-to-scroll. */
  #createPill(): void {
    const host = this.#el.nativeElement;

    const fade = this.#renderer.createElement('div');
    this.#renderer.addClass(fade, 'sdux-overflow-fade');
    this.#renderer.setStyle(fade, 'position', 'absolute');
    this.#renderer.setStyle(fade, 'bottom', '0');
    this.#renderer.setStyle(fade, 'left', '0');
    this.#renderer.setStyle(fade, 'right', '0');
    this.#renderer.setStyle(fade, 'display', 'flex');
    this.#renderer.setStyle(fade, 'justifyContent', 'center');
    this.#renderer.setStyle(fade, 'paddingBottom', '0.25rem');
    this.#renderer.setStyle(fade, 'pointerEvents', 'none');

    this.#pill = this.#renderer.createElement('div');
    this.#renderer.addClass(this.#pill, 'sdux-overflow-pill');
    this.#renderer.setStyle(this.#pill, 'display', 'flex');
    this.#renderer.setStyle(this.#pill, 'alignItems', 'center');
    this.#renderer.setStyle(this.#pill, 'justifyContent', 'center');
    this.#renderer.setStyle(this.#pill, 'gap', '0.25rem');
    this.#renderer.setStyle(this.#pill, 'padding', '0.25rem 1rem');
    this.#renderer.setStyle(this.#pill, 'fontSize', '0.75rem');
    this.#renderer.setStyle(this.#pill, 'color', 'var(--sdux-text-primary)');
    this.#renderer.setStyle(this.#pill, 'background', 'rgba(0, 0, 0, 0.25)');
    this.#renderer.setStyle(this.#pill, 'backdropFilter', 'blur(4px)');
    this.#renderer.setStyle(
      this.#pill,
      'border',
      '1px solid var(--sdux-surface-outline)'
    );
    this.#renderer.setStyle(this.#pill, 'borderRadius', '0.75rem');
    this.#renderer.setStyle(this.#pill, 'cursor', 'pointer');
    this.#renderer.setStyle(this.#pill, 'pointerEvents', 'auto');

    const text = this.#renderer.createText('See More ');
    this.#renderer.appendChild(this.#pill, text);

    const chevron = this.#renderer.createElement('span');
    this.#renderer.addClass(chevron, 'sdux-overflow-chevron');
    this.#renderer.setStyle(chevron, 'fontSize', '16px');
    this.#renderer.setStyle(chevron, 'lineHeight', '1');
    const chevronText = this.#renderer.createText('▾');
    this.#renderer.appendChild(chevron, chevronText);
    this.#renderer.appendChild(this.#pill, chevron);

    this.#renderer.appendChild(fade, this.#pill);
    this.#wrapper!.appendChild(fade);

    this.#renderer.listen(this.#pill, 'click', () => {
      host.scrollBy({ top: 100, behavior: 'smooth' });
    });

    this.#setVisible(false);
  }

  /** Starts a ResizeObserver on the host element to re-evaluate overflow on dimension changes. */
  #observeResize(): void {
    /* istanbul ignore if -- defensive: ResizeObserver is available in all supported browsers */
    if (typeof ResizeObserver === 'undefined') return;

    this.#observer = new ResizeObserver(() => {
      this.#checkOverflow();
    });

    this.#observer.observe(this.#el.nativeElement);
  }

  /** Starts a MutationObserver on the host to re-evaluate overflow when children are added or removed. */
  #observeChildChanges(): void {
    /* istanbul ignore if -- defensive: MutationObserver is available in all supported browsers */
    if (typeof MutationObserver === 'undefined') return;

    this.#mutationObserver = new MutationObserver(() => {
      this.#checkOverflow();
    });

    this.#mutationObserver.observe(this.#el.nativeElement, {
      childList: true,
      subtree: true
    });
  }

  /** Compares scrollHeight to clientHeight and hides the pill when scrolled to the bottom. */
  #checkOverflow(): void {
    const el = this.#el.nativeElement;
    const overflows = el.scrollHeight > el.clientHeight;
    const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 4;
    this.#setVisible(overflows && !atBottom);
  }

  /** Registers a scroll event listener on the host to re-evaluate overflow on user scroll. */
  #listenToScroll(): void {
    this.#scrollUnlisten = this.#renderer.listen(
      this.#el.nativeElement,
      'scroll',
      () => this.#checkOverflow()
    );
  }

  /**
   * Toggles the fade container's display to show or hide the pill.
   *
   * @param visible - Whether the pill should be visible.
   */
  #setVisible(visible: boolean): void {
    const fade = this.#pill?.parentElement;
    /* istanbul ignore if -- defensive: fade is always present when pill exists */
    if (!fade) return;

    if (visible) {
      this.#renderer.setStyle(fade, 'display', 'flex');
    } else {
      this.#renderer.setStyle(fade, 'display', 'none');
    }
  }
}
