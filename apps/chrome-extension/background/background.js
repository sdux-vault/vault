/**
 * Background script for the Vault DevTools extension.
 *
 * This script manages the communication channel between:
 *  - the DevTools panel (via a long-lived port)
 *  - the content script (via runtime messages)
 *
 * It forwards Vault pipeline and queue events from the inspected page
 * to the DevTools UI for real-time monitoring.
 *
 * This file contains no application logic, only routing of messages.
 */

/** Active long-lived connection to the DevTools panel. */
let devtoolsPort = null;

/** Maximum number of events to buffer while the panel is disconnected. */
const MAX_BUFFER_SIZE = 500;

/** Events buffered while the DevTools panel port is disconnected. */
let eventBuffer = [];

/**
 * Listens for connections from the DevTools panel.
 *
 * Only ports named `"vault-devtools"` are tracked.
 * When the port connects, any buffered events are flushed.
 * When the port disconnects, the reference is cleared.
 */
chrome.runtime.onConnect.addListener((port) => {
  if (port.name === 'vault-devtools') {
    devtoolsPort = port;

    const pending = eventBuffer;
    eventBuffer = [];
    for (const msg of pending) {
      devtoolsPort.postMessage(msg);
    }

    port.onDisconnect.addListener(() => {
      devtoolsPort = null;
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

  if (msg.type === 'VAULT_PIPELINE_EVENT' && isValidPipelineEvent(msg.event)) {
    const outgoing = {
      type: 'VAULT_PIPELINE_EVENT',
      event: msg.event
    };

    if (devtoolsPort) {
      devtoolsPort.postMessage(outgoing);
    } else if (eventBuffer.length < MAX_BUFFER_SIZE) {
      eventBuffer.push(outgoing);
    }
  } else if (msg.type === 'VAULT_CONFIG' && msg.config) {
    const outgoing = {
      type: 'VAULT_CONFIG',
      config: msg.config
    };

    if (devtoolsPort) {
      devtoolsPort.postMessage(outgoing);
    } else if (eventBuffer.length < MAX_BUFFER_SIZE) {
      eventBuffer.push(outgoing);
    }
  }
});
