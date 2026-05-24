import { DebugWidget } from './debug-widget';

/** Registers and appends the sdux-debug custom element to the document body. */
export function injectDebugWidget(): void {
  if (!customElements.get('sdux-debug')) {
    try {
      customElements.define('sdux-debug', DebugWidget);
    } catch {
      // ignore if already defined (test or race condition)
    }
  }

  if (document.querySelector('sdux-debug')) return;

  const el = document.createElement('sdux-debug');
  document.body.appendChild(el);
}
