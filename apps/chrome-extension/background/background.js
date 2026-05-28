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

/**
 * Listens for connections from the DevTools panel.
 *
 * Only ports named `"vault-devtools"` are tracked.
 * When the port disconnects, the reference is cleared.
 */
chrome.runtime.onConnect.addListener((port) => {
  if (port.name === 'vault-devtools') {
    devtoolsPort = port;

    port.onDisconnect.addListener(() => {
      devtoolsPort = null;
    });
  }
});

/**
 * Forwards Vault diagnostic events from the content script
 * to the DevTools panel, if connected.
 *
 * Supported forwarded message types:
 *  - `VAULT_PIPELINE_EVENT`
 *
 * @param msg - Message received from the content script.
 */
chrome.runtime.onMessage.addListener((msg) => {
  if (!devtoolsPort || !msg?.type) return;

  if (msg.type === 'VAULT_PIPELINE_EVENT') {
    devtoolsPort.postMessage({
      type: 'VAULT_PIPELINE_EVENT',
      event: msg.event
    });
  }
});
