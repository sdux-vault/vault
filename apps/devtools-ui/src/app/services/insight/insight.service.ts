import { Injectable, NgZone } from '@angular/core';
import { Subject } from 'rxjs';

import { EventBus } from '@sdux-vault/devtools';
import type { EventShape } from '@sdux-vault/shared';
import type { DevtoolsMessageType } from '../../types/devtools-message.type';

/**
 * Provides a unified observable interface for Vault pipeline events sourced from
 * the Chrome DevTools extension or the internal EventBus.
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
   * Initializes the service and connects Chrome runtime listeners when available.
   *
   * @param zone - Angular zone used to re-enter the framework boundary.
   */
  constructor(private readonly zone: NgZone) {
    this.isChromeExtension =
      typeof chrome !== 'undefined' && !!chrome?.runtime?.onMessage;

    if (this.isChromeExtension) {
      chrome.runtime.onMessage.addListener((msg: DevtoolsMessageType) => {
        if (!msg?.type) return;

        this.zone.run(() => {
          if (msg.type === 'VAULT_PIPELINE_EVENT') {
            this.#chromePipeline$.next(msg.event as EventShape);
          }
        });
      });
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
}
