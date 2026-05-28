import { Injectable, NgZone } from '@angular/core';
import { Subject } from 'rxjs';

import { EventBus } from '@sdux-vault/devtools';
import type { EventShape } from '@sdux-vault/shared';

/**
 * Provides a unified observable interface for Vault pipeline events sourced from
 * the Chrome DevTools extension or the internal EventBus.
 *
 * When running inside a Chrome extension, events are received over a long-lived
 * port connection to the background service worker. Outside the extension, the
 * internal EventBus is used directly.
 */
@Injectable({ providedIn: 'root' })
export class InsightService {
  /**
   * Internal stream for pipeline events emitted by the Chrome extension.
   */
  readonly #chromePipeline$ = new Subject<EventShape>();

  /**
   * Whether the Vault Chrome DevTools extension is available in the environment.
   */
  readonly isChromeExtension: boolean;

  /**
   * Shared EventBus instance used to observe pipeline events outside the Chrome extension.
   */
  readonly #eventBus = EventBus();

  /**
   * Active port connection to the background service worker.
   */
  #port: chrome.runtime.Port | null = null;

  /**
   * Handle for the pending reconnection timer, if any.
   */
  #reconnectTimer: ReturnType<typeof setTimeout> | null = null;

  /**
   * Delay in milliseconds before attempting to reconnect after a disconnect.
   */
  static readonly RECONNECT_DELAY_MS = 1000;

  /**
   * Initializes the service and connects a long-lived port when running
   * inside the Chrome DevTools extension.
   *
   * @param zone - Angular zone used to re-enter the framework boundary.
   */
  constructor(private readonly zone: NgZone) {
    this.isChromeExtension =
      typeof chrome !== 'undefined' && !!chrome?.runtime?.connect;

    if (this.isChromeExtension) {
      this.#connectPort();
    }
  }

  /**
   * Returns an observable stream of pipeline events from the Chrome extension or internal EventBus.
   *
   * @returns Observable emitting pipeline events.
   */
  pipeline$() {
    return this.isChromeExtension
      ? this.#chromePipeline$.asObservable()
      : this.#eventBus.pipeline$();
  }

  /**
   * Legacy API for pipeline observation using callback functions.
   *
   * @param hook - Callback invoked for every pipeline event.
   * @returns A cleanup function that unsubscribes the listener.
   */
  listenPipeline(hook: (event: EventShape) => void): () => void {
    const sub = this.pipeline$().subscribe(hook);
    return () => sub.unsubscribe();
  }

  /**
   * Opens a long-lived port to the background service worker and
   * attaches message and disconnect listeners.
   */
  #connectPort(): void {
    this.#port = chrome.runtime.connect({ name: 'vault-devtools' });

    this.#port.onMessage.addListener(
      (msg: { type?: string; event?: unknown }) => {
        if (!msg?.type) return;

        this.zone.run(() => {
          if (msg.type === 'VAULT_PIPELINE_EVENT') {
            this.#chromePipeline$.next(msg.event as EventShape);
          }
        });
      }
    );

    this.#port.onDisconnect.addListener(() => {
      this.#port = null;
      this.#scheduleReconnect();
    });
  }

  /**
   * Schedules a reconnection attempt after a delay.
   * Clears any previously scheduled attempt.
   */
  #scheduleReconnect(): void {
    if (this.#reconnectTimer != null) {
      clearTimeout(this.#reconnectTimer);
    }
    this.#reconnectTimer = setTimeout(() => {
      this.#reconnectTimer = null;
      this.#connectPort();
    }, InsightService.RECONNECT_DELAY_MS);
  }
}
