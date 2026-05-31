/**
 * Vault DevTools content script.
 *
 * This script is injected into the webpage by the Chrome extension.
 * Its responsibility is twofold:
 *
 * 1. Inject `bridge-inject.js` into the actual page execution context.
 *    This allows the extension to access Vault runtime globals that
 *    are not accessible from the isolated content script environment.
 *
 * 2. Listen for forwarded DevTools bridge messages (posted via
 *    window.postMessage) and relay them to the background service worker
 *    using chrome.runtime.sendMessage(). Only Vault-scoped messages
 *    originating from the same page context are forwarded.
 */

/**
 * Injects the bridge script into the real page context so that it can
 * interact directly with Vault runtime objects.
 *
 * The injected script is appended to the DOM and removed immediately
 * after execution. Errors are swallowed and printed to the console.
 */
(function injectBridge() {
  try {
    const script = document.createElement('script');
    script.src = chrome.runtime.getURL('bridge/bridge-inject.js');
    script.async = true;

    (document.documentElement || document.head || document.body).appendChild(
      script
    );
    script.remove();
  } catch (e) {
    console.error('[Vault DevTools] Failed to inject bridge script:', e);
  }
})();

/**
 * Validates that a pipeline event has the minimum required shape.
 *
 * @param event - The event payload to validate.
 * @returns True if the event has `cell`, `type`, and `timestamp` properties.
 */
function isValidPipelineEvent(event) {
  return (
    event != null &&
    typeof event === 'object' &&
    typeof event.cell === 'string' &&
    typeof event.type === 'string' &&
    typeof event.timestamp === 'number'
  );
}

/**
 * Forwards Vault DevTools bridge events from the page context to the
 * Chrome extension background script.
 *
 * Only messages explicitly tagged with `source: "vault-devtools"` and
 * originating from the same window context are processed. Pipeline events
 * are validated against the expected schema before forwarding.
 *
 * Supported message types:
 * - "VAULT_PIPELINE_EVENT"  — forwarded pipeline event payload (schema-validated)
 * - "VAULT_BRIDGE_CONNECTED" — bridge successfully connected to Vault
 * - "VAULT_CONFIG"          — versions and registry snapshot
 */
window.addEventListener('message', (event) => {
  if (event.source !== window) return;
  if (!event.data || event.data.source !== 'vault-devtools') return;

  const { type, event: payload, config } = event.data;

  if (type === 'VAULT_PIPELINE_EVENT' && isValidPipelineEvent(payload)) {
    try {
      chrome.runtime.sendMessage({ type, event: payload }).catch(() => {});
    } catch {
      // Extension context invalidated after reload — silently ignore.
    }
  } else if (type === 'VAULT_BRIDGE_CONNECTED') {
    try {
      chrome.runtime.sendMessage({ type }).catch(() => {});
    } catch {
      // Extension context invalidated after reload — silently ignore.
    }
  } else if (type === 'VAULT_CONFIG' && config) {
    try {
      chrome.runtime.sendMessage({ type, config }).catch(() => {});
    } catch {
      // Extension context invalidated after reload — silently ignore.
    }
  }
});
