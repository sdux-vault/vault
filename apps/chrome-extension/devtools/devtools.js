/**
 * Registers the Vault panel inside the Chrome DevTools interface.
 *
 * This script runs within the DevTools environment and is responsible
 * for creating the dedicated Vault inspection panel. The panel
 * displays Vault pipeline activity, queue events, and any additional
 * insights exposed by the extension UI.
 *
 * The panel is added once DevTools initializes. No runtime interaction
 * occurs in this script beyond the creation of the panel.
 */
chrome.devtools.panels.create(
  'Vault',
  '../icons/Vault-128.png',
  'panel/panel.html',
  () => {
    // Panel created successfully.
  }
);
