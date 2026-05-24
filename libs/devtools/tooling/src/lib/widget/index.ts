import { DevMode } from '@sdux-vault/shared';
import { injectDebugWidget } from './debug-widget.inject';

/** Initializes the devtools debug widget when dev mode is active. */
export function initDevtoolsWidget(): void {
  if (!DevMode.active) return;
  // istanbul ignore next line
  if (typeof window === 'undefined') return;

  globalThis.sdux ??= {};
  globalThis.sdux.debugWidget ??= {};

  if (globalThis.sdux.debugWidget.injected) return;

  globalThis.sdux.debugWidget.injected = true;

  const run = () => injectDebugWidget();

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run, { once: true });
  } else {
    run();
  }
}
