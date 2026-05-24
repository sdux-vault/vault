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
  /** Prevent multiple injections of the devtools bridge. */
  if (window.__vaultDevtoolsBridgeInjected) return;
  window.__vaultDevtoolsBridgeInjected = true;

  /** Internal retry counter for waiting on Vault globals. */
  let counter = 1;

  /** Base wait interval used for exponential retry delays. */
  const elapsedTime = 500;

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
            wantsErrors: true,
            wantsQueue: true
          });
        }
      } catch (e) {
        console.error('[Vault DevTools] Failed to enable insights:', e);
      }

      //
      // PIPELINE EVENTS
      //
      if (typeof bus.pipeline$ === 'function') {
        bus.pipeline$().subscribe((event) => {
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
    }
  }

  waitForVault();
})();
