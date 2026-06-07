/**
 * Vault DevTools bridge script injected into the inspected page.
 *
 * This script establishes a connection between the Vault runtime
 * and the browser DevTools extension. It waits until the global
 * Vault monitor and event bus are available, activates global
 * insights, and forwards pipeline and queue events to the DevTools
 * panel using window.postMessage().
 *
 * The bridge self-guards against multiple injections and retries
 * detection of Vault for a limited number of attempts.
 */
(function () {
  /**
   * Prevent multiple injections of the devtools bridge.
   *
   * Uses a Symbol key with Object.defineProperty to avoid:
   * - Fingerprinting via Object.keys / for...in (Symbols are non-enumerable)
   * - Setter interception via Object.defineProperty traps (configurable: false)
   */
  const BRIDGE_KEY = Symbol.for('__vault_devtools_bridge__');
  if (window[BRIDGE_KEY]) return;
  Object.defineProperty(window, BRIDGE_KEY, {
    value: true,
    writable: false,
    enumerable: false,
    configurable: true
  });

  /** Internal retry counter for waiting on Vault globals. */
  let counter = 1;

  /** Base wait interval used for exponential retry delays. */
  const elapsedTime = 500;

  /** Active subscription to the pipeline event stream. */
  let pipelineSub = null;

  /**
   * Attempts to detect Vault runtime globals and, once available,
   * registers the DevTools insight listener and event forwarders.
   *
   * The function retries with increasing delays until either:
   *  - the Vault monitor and event bus become available, or
   *  - maximum retry count is reached.
   *
   * When successful, pipeline and queue events are forwarded to
   * the DevTools extension via window.postMessage().
   */
  function waitForVault() {
    const monitor = window?.sdux?.vaultMonitorInstance;
    const bus = window?.sdux?.vaultEventBus;
    const timeout = elapsedTime * counter;

    console.warn(
      `${counter} waitForVault (timeout ${timeout})`,
      `monitor: ${monitor}`,
      `bus: ${bus}`
    );

    if (!monitor || !bus) {
      if (counter < 3) {
        counter++;
        return setTimeout(waitForVault, timeout);
      } else {
        console.error(
          'DevTools Never Loaded. Either the monitor: ${monitor} or bus: ${bus} did not register. Reload your app on a page with decorated @FeatureCell service and try again. FeatureCells are lazyloaded and only activated when the service is instantiated. The DevTools will only connect once an @FeatureCell is active.'
        );
      }
    } else {
      try {
        if (typeof monitor.activateGlobalInsights === 'function') {
          monitor.activateGlobalInsights({
            id: 'dev-tools',
            wantsState: true,
            wantsPayload: true,
            wantsCandidates: true,
            wantsErrors: true
          });
        }
      } catch (e) {
        console.error('[Vault DevTools] Failed to enable insights:', e);
      }

      //
      // PIPELINE EVENTS
      //
      if (typeof bus.pipeline$ === 'function') {
        pipelineSub = bus.pipeline$().subscribe((event) => {
          window.postMessage(
            {
              source: 'vault-devtools',
              type: 'VAULT_PIPELINE_EVENT',
              event
            },
            '*'
          );
        });
      }

      //
      // VAULT CONFIG (versions + registry)
      //
      forwardVaultConfig();
    }
  }

  /**
   * Reads versions and registry from the global SDuX namespace and
   * forwards them to the DevTools panel via postMessage.
   */
  function forwardVaultConfig() {
    var versions = window?.sdux?.versions ?? {};
    var registry = null;

    if (typeof window?.sdux?.getRegistry === 'function') {
      try {
        var raw = window.sdux.getRegistry();
        if (raw) {
          registry = Array.from(raw.entries()).map(function (entry) {
            var cell = entry[1];
            return {
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
            };
          });
        }
      } catch (e) {
        console.error('[Vault DevTools] Failed to serialize registry:', e);
      }
    }

    window.postMessage(
      {
        source: 'vault-devtools',
        type: 'VAULT_CONFIG',
        config: { versions: versions, registry: registry }
      },
      '*'
    );
  }

  /**
   * Cleans up the pipeline subscription when the page is unloaded
   * to prevent memory leaks during navigation.
   */
  window.addEventListener('beforeunload', () => {
    if (pipelineSub && typeof pipelineSub.unsubscribe === 'function') {
      pipelineSub.unsubscribe();
      pipelineSub = null;
    }
  });

  waitForVault();
})();
