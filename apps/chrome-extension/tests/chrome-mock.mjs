import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * Builds a mock Chrome API surface for testing extension scripts.
 *
 * Provides mock implementations of chrome.runtime, chrome.devtools,
 * chrome.tabs, and chrome.scripting with Jasmine spies.
 *
 * @returns A mock chrome object with helper methods for test assertions.
 */
export function buildChromeMock() {
  const connectListeners = [];
  const messageListeners = [];

  const chrome = {
    runtime: {
      id: 'mock-extension-id',
      _connectListeners: connectListeners,
      _messageListeners: messageListeners,

      onConnect: {
        addListener(fn) {
          connectListeners.push(fn);
        }
      },

      onMessage: {
        addListener(fn) {
          messageListeners.push(fn);
        }
      },

      connect: jasmine
        .createSpy('chrome.runtime.connect')
        .and.callFake((info) => {
          return chrome._createPort(info?.name ?? '');
        }),

      sendMessage: jasmine
        .createSpy('chrome.runtime.sendMessage')
        .and.returnValue(Promise.resolve()),

      getURL: jasmine
        .createSpy('chrome.runtime.getURL')
        .and.callFake((path) => `chrome-extension://mock-id/${path}`)
    },

    devtools: {
      panels: {
        create: jasmine.createSpy('chrome.devtools.panels.create')
      },
      inspectedWindow: {
        tabId: 42
      }
    },

    tabs: {
      sendMessage: jasmine.createSpy('chrome.tabs.sendMessage')
    },

    /**
     * Creates a mock port with Jasmine spies.
     *
     * @param name - The port name.
     * @returns A mock port object.
     */
    _createPort(name) {
      const disconnectListeners = [];
      const portMessageListeners = [];

      return {
        name,
        postMessage: jasmine.createSpy(`port[${name}].postMessage`),
        disconnect: jasmine.createSpy(`port[${name}].disconnect`),
        onMessage: {
          addListener(fn) {
            portMessageListeners.push(fn);
          }
        },
        onDisconnect: {
          addListener(fn) {
            disconnectListeners.push(fn);
          }
        },
        _triggerDisconnect() {
          disconnectListeners.forEach((fn) => fn());
        },
        _triggerMessage(msg) {
          portMessageListeners.forEach((fn) => fn(msg));
        }
      };
    }
  };

  return chrome;
}

/**
 * Loads and evaluates a chrome extension script in a fresh scope.
 *
 * This avoids Node ESM module caching issues by reading the file as
 * text and evaluating it via the Function constructor, ensuring each
 * test gets a fresh execution with its own module-level variables.
 *
 * @param relativePath - Path relative to the chrome-extension directory.
 */
export function loadScript(relativePath) {
  const absPath = resolve(__dirname, '..', relativePath);
  const source = readFileSync(absPath, 'utf-8');
  const fn = new Function(source);
  fn();
}
