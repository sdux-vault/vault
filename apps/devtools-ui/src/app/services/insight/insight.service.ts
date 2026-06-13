import { Injectable, NgZone, signal } from '@angular/core';
import { Subject } from 'rxjs';

import { EventBus } from '@sdux-vault/devtools';
import type { EventShape, VaultRegistrationShape } from '@sdux-vault/shared';

import { VaultConfigMessageShape } from '../../shared/shapes/vault-config-message.shape';
import { VaultRegistrationSerializedShape } from '../../shared/shapes/vault-registration-serialized.shape';

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
   * Reactive signal holding the latest Vault configuration from the bridge.
   */
  readonly vaultConfig = signal<VaultConfigMessageShape | null>(null);

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
   * Reads versions and registry directly from globalThis.sdux.
   */
  refreshLocalConfig(): void {
    this.#loadLocalConfig();
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
      (msg: { type?: string; event?: unknown; config?: unknown }) => {
        if (!msg?.type) return;

        switch (msg.type) {
          case 'VAULT_PIPELINE_EVENT':
            this.zone.run(() => {
              this.#chromePipeline$.next(msg.event as EventShape);
            });
            break;
          case 'VAULT_CONFIG':
            this.zone.run(() => {
              this.#mergeConfig(msg.config as VaultConfigMessageShape);
            });
            break;
          default:
            // eslint-disable-next-line no-console
            console.warn(
              `[Vault DevTools] Unhandled message type: "${msg.type}"`
            );
        }
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

  /**
   * Reads versions and registry directly from globalThis.sdux when
   * running outside the Chrome extension (demo / standalone mode).
   */
  #loadLocalConfig(): void {
    const sdux = globalThis.sdux;
    if (!sdux) return;

    const versions = sdux.versions ?? {};
    let registry: VaultRegistrationSerializedShape[] | null = null;

    if (typeof sdux.getRegistry === 'function') {
      try {
        const raw = sdux.getRegistry();
        if (raw) {
          registry = Array.from(raw.values()).map(
            (cell: VaultRegistrationShape) => ({
              key: cell.key,
              behaviorsRegistered: !!cell.behaviorsRegistered,
              controllersRegistered: !!cell.controllersRegistered,
              fluentApis: cell.fluentApis ?? null,
              behaviors: cell.behaviors
                ? Array.from(cell.behaviors.values())
                : [],
              controllers: cell.controllers
                ? Array.from(cell.controllers.values())
                : []
            })
          );
        }
      } catch {
        // Registry not available — ignore.
      }
    }

    this.#mergeConfig({ versions, registry, license: sdux.license ?? null });
  }

  /**
   * Merges incoming config into the existing vaultConfig signal,
   * preserving fields that the incoming payload does not provide.
   */
  #mergeConfig(incoming: VaultConfigMessageShape): void {
    const current = this.vaultConfig();
    this.vaultConfig.set({
      versions: { ...current?.versions, ...incoming.versions },
      registry: incoming.registry ?? current?.registry ?? null,
      license: incoming.license ?? current?.license ?? null
    });
  }

  /**
   * Replays a trace value through a live FeatureCell instance.
   *
   * In extension mode, uses `chrome.devtools.inspectedWindow.eval()` to
   * execute the replay command in the inspected page's context.
   * In standalone mode, calls `globalThis.sdux.replay.getCell()` directly.
   *
   * @param cellKey - The FeatureCell key to replay through.
   * @param value - The resolved value to dispatch.
   * @param method - The dispatch method ('replace' or 'merge').
   * @returns A promise resolving to a result with success/error info.
   */
  replayCell(
    cellKey: string,
    value: unknown,
    method: 'replace' | 'merge'
  ): Promise<{ success: boolean; message: string }> {
    if (this.isChromeExtension) {
      return this.#replayCellViaExtension(cellKey, value, method);
    }
    return this.#replayCellLocal(cellKey, value, method);
  }

  /**
   * Executes replay in the inspected page context via
   * chrome.devtools.inspectedWindow.eval().
   */
  #replayCellViaExtension(
    cellKey: string,
    value: unknown,
    method: 'replace' | 'merge'
  ): Promise<{ success: boolean; message: string }> {
    const serializedValue = JSON.stringify(value);
    const fnName = method === 'merge' ? 'mergeState' : 'replaceState';

    const expression = `
      (function() {
        try {
          var cell = globalThis.sdux && globalThis.sdux.replay &&
            globalThis.sdux.replay.getCell(${JSON.stringify(cellKey)});
          if (!cell) {
            return { success: false, message: 'No live cell found for "' +
              ${JSON.stringify(cellKey)} +
              '". Ensure the application is running with DevMode enabled.' };
          }
          cell.${fnName}(${serializedValue});
          return { success: true, message: 'Replayed via ${fnName} to "' +
            ${JSON.stringify(cellKey)} + '" successfully.' };
        } catch (e) {
          return { success: false, message: 'Replay failed: ' +
            (e && e.message ? e.message : String(e)) };
        }
      })();
    `;

    return new Promise((resolve) => {
      chrome.devtools.inspectedWindow.eval(
        expression,
        (result: unknown, exceptionInfo: unknown) => {
          if (exceptionInfo) {
            const info = exceptionInfo as { value?: string };
            resolve({
              success: false,
              message: `Replay eval failed: ${info.value ?? 'Unknown error'}`
            });
          } else {
            resolve(result as { success: boolean; message: string });
          }
        }
      );
    });
  }

  /**
   * Executes replay directly via globalThis.sdux in standalone mode.
   */
  #replayCellLocal(
    cellKey: string,
    value: unknown,
    method: 'replace' | 'merge'
  ): Promise<{ success: boolean; message: string }> {
    const sdux = globalThis.sdux;
    const cell = sdux?.replay?.getCell(cellKey) as
      | { mergeState: (v: unknown) => void; replaceState: (v: unknown) => void }
      | undefined;

    if (!cell) {
      return Promise.resolve({
        success: false,
        message: `No live cell found for "${cellKey}". Ensure the application is running with DevMode enabled.`
      });
    }

    try {
      if (method === 'merge') {
        cell.mergeState(value);
      } else {
        cell.replaceState(value);
      }
      return Promise.resolve({
        success: true,
        message: `Replayed via ${method}State to "${cellKey}" successfully.`
      });
    } catch (error: unknown) {
      return Promise.resolve({
        success: false,
        message: `Replay failed: ${error instanceof Error ? error.message : String(error)}`
      });
    }
  }
}
