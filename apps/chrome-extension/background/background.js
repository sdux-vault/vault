/**
 * Background script for the Vault DevTools extension.
 *
 * This script manages the communication channel between:
 *  - the DevTools panel (via a long-lived port per tab)
 *  - the content script (via runtime messages)
 *
 * It forwards Vault pipeline and queue events from the inspected page
 * to the correct DevTools panel based on the originating tab ID.
 *
 * This file contains no application logic, only routing of messages.
 */

/** Active long-lived connections to DevTools panels, keyed by tab ID. */
const devtoolsPorts = new Map();

/** Maximum number of events to buffer per tab while the panel is disconnected. */
const MAX_BUFFER_SIZE = 500;

/** Events buffered per tab while the DevTools panel port is disconnected. */
const eventBuffers = new Map();

/**
 * Listens for connections from the DevTools panel.
 *
 * Only ports named `"vault-devtools"` are tracked. The panel must send
 * a `VAULT_INIT` message with its `tabId` to complete the handshake.
 * When the port connects and identifies its tab, any buffered events
 * for that tab are flushed. When the port disconnects, the reference
 * and buffer for that tab are cleared.
 */
chrome.runtime.onConnect.addListener((port) => {
  if (port.name === 'vault-devtools') {
    port.onMessage.addListener((msg) => {
      if (msg?.type === 'VAULT_INIT' && typeof msg.tabId === 'number') {
        const tabId = msg.tabId;
        devtoolsPorts.set(tabId, port);

        const pending = eventBuffers.get(tabId) || [];
        eventBuffers.delete(tabId);
        for (const bufferedMsg of pending) {
          port.postMessage(bufferedMsg);
        }

        port.onDisconnect.addListener(() => {
          devtoolsPorts.delete(tabId);
          eventBuffers.delete(tabId);
        });
      }
    });
  }
});

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
 * Forwards Vault diagnostic events from the content script
 * to the DevTools panel, if connected.
 *
 * Only messages from content scripts (identified by `sender.tab`) belonging
 * to this extension (`sender.id`) are accepted. Messages with malformed
 * event payloads are silently dropped.
 *
 * Supported forwarded message types:
 *  - `VAULT_PIPELINE_EVENT`
 *
 * @param msg - Message received from the content script.
 * @param sender - Chrome sender metadata for origin validation.
 */
chrome.runtime.onMessage.addListener((msg, sender) => {
  if (!msg?.type) return;
  if (!sender?.tab || sender.id !== chrome.runtime.id) return;

  const tabId = sender.tab.id;

  if (msg.type === 'VAULT_PIPELINE_EVENT' && isValidPipelineEvent(msg.event)) {
    const outgoing = {
      type: 'VAULT_PIPELINE_EVENT',
      event: msg.event
    };

    const port = devtoolsPorts.get(tabId);
    if (port) {
      port.postMessage(outgoing);
    } else {
      const buffer = eventBuffers.get(tabId) || [];
      if (buffer.length < MAX_BUFFER_SIZE) {
        buffer.push(outgoing);
        eventBuffers.set(tabId, buffer);
      }
    }
  } else if (msg.type === 'VAULT_CONFIG' && msg.config) {
    const outgoing = {
      type: 'VAULT_CONFIG',
      config: msg.config
    };

    const port = devtoolsPorts.get(tabId);
    if (port) {
      port.postMessage(outgoing);
    } else {
      const buffer = eventBuffers.get(tabId) || [];
      if (buffer.length < MAX_BUFFER_SIZE) {
        buffer.push(outgoing);
        eventBuffers.set(tabId, buffer);
      }
    }
  }
});
