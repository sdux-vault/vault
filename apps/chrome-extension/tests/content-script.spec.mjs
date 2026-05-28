import { buildChromeMock, loadScript } from './chrome-mock.mjs';

describe('Chrome Extension: content-script.js', () => {
  let chrome;
  let windowMessageListeners;
  let originalAddEventListener;

  beforeEach(() => {
    chrome = buildChromeMock();
    globalThis.chrome = chrome;
    windowMessageListeners = [];

    // content-script.js uses `window` which doesn't exist in Node
    if (!globalThis.window) globalThis.window = globalThis;

    // Mock document for the bridge injection IIFE
    globalThis.document = {
      createElement: () => ({ set src(_v) {}, async: false, remove() {} }),
      documentElement: { appendChild() {} },
      head: null,
      body: null
    };

    originalAddEventListener = globalThis.addEventListener;
    globalThis.addEventListener = (type, fn) => {
      if (type === 'message') windowMessageListeners.push(fn);
    };

    loadScript('content/content-script.js');
  });

  afterEach(() => {
    delete globalThis.chrome;
    delete globalThis.document;
    globalThis.addEventListener = originalAddEventListener;
  });

  function dispatchWindowMessage(data, source = globalThis) {
    windowMessageListeners.forEach((fn) => fn({ source, data }));
  }

  describe('message forwarding to background', () => {
    it('should forward VAULT_PIPELINE_EVENT to chrome.runtime.sendMessage', () => {
      dispatchWindowMessage({
        source: 'vault-devtools',
        type: 'VAULT_PIPELINE_EVENT',
        event: { cell: 'test', type: 'init', timestamp: 1 }
      });

      expect(chrome.runtime.sendMessage).toHaveBeenCalledWith({
        type: 'VAULT_PIPELINE_EVENT',
        event: { cell: 'test', type: 'init', timestamp: 1 }
      });
    });

    it('should forward VAULT_BRIDGE_CONNECTED to chrome.runtime.sendMessage', () => {
      dispatchWindowMessage({
        source: 'vault-devtools',
        type: 'VAULT_BRIDGE_CONNECTED'
      });

      expect(chrome.runtime.sendMessage).toHaveBeenCalledWith({
        type: 'VAULT_BRIDGE_CONNECTED'
      });
    });

    it('should ignore messages from other sources', () => {
      dispatchWindowMessage({
        source: 'other-extension',
        type: 'VAULT_PIPELINE_EVENT',
        event: { cell: 'test' }
      });

      expect(chrome.runtime.sendMessage).not.toHaveBeenCalled();
    });

    it('should ignore messages from different windows', () => {
      dispatchWindowMessage(
        {
          source: 'vault-devtools',
          type: 'VAULT_PIPELINE_EVENT',
          event: { cell: 'test' }
        },
        {}
      );

      expect(chrome.runtime.sendMessage).not.toHaveBeenCalled();
    });

    it('should ignore messages without data', () => {
      dispatchWindowMessage(null);
      dispatchWindowMessage(undefined);

      expect(chrome.runtime.sendMessage).not.toHaveBeenCalled();
    });

    it('should ignore messages with unsupported types', () => {
      dispatchWindowMessage({
        source: 'vault-devtools',
        type: 'UNKNOWN_MESSAGE'
      });

      expect(chrome.runtime.sendMessage).not.toHaveBeenCalled();
    });

    it('should swallow errors when extension context is invalidated', () => {
      chrome.runtime.sendMessage.and.throwError(
        'Extension context invalidated'
      );

      expect(() => {
        dispatchWindowMessage({
          source: 'vault-devtools',
          type: 'VAULT_PIPELINE_EVENT',
          event: { cell: 'test', type: 'init', timestamp: 1 }
        });
      }).not.toThrow();
    });

    it('should swallow errors for VAULT_BRIDGE_CONNECTED when context is invalidated', () => {
      chrome.runtime.sendMessage.and.throwError(
        'Extension context invalidated'
      );

      expect(() => {
        dispatchWindowMessage({
          source: 'vault-devtools',
          type: 'VAULT_BRIDGE_CONNECTED'
        });
      }).not.toThrow();
    });
    it('should swallow async rejections from sendMessage', async () => {
      chrome.runtime.sendMessage.and.returnValue(
        Promise.reject(new Error('Service worker inactive'))
      );

      dispatchWindowMessage({
        source: 'vault-devtools',
        type: 'VAULT_PIPELINE_EVENT',
        event: { cell: 'test', type: 'init', timestamp: 1 }
      });

      // Flush microtask queue — if .catch() is missing, this would trigger
      // an unhandled rejection
      await Promise.resolve();

      expect(chrome.runtime.sendMessage).toHaveBeenCalled();
    });
  });

  describe('pipeline event schema validation', () => {
    it('should reject pipeline events missing cell', () => {
      dispatchWindowMessage({
        source: 'vault-devtools',
        type: 'VAULT_PIPELINE_EVENT',
        event: { type: 'init', timestamp: 1 }
      });

      expect(chrome.runtime.sendMessage).not.toHaveBeenCalled();
    });

    it('should reject pipeline events missing type', () => {
      dispatchWindowMessage({
        source: 'vault-devtools',
        type: 'VAULT_PIPELINE_EVENT',
        event: { cell: 'test', timestamp: 1 }
      });

      expect(chrome.runtime.sendMessage).not.toHaveBeenCalled();
    });

    it('should reject pipeline events missing timestamp', () => {
      dispatchWindowMessage({
        source: 'vault-devtools',
        type: 'VAULT_PIPELINE_EVENT',
        event: { cell: 'test', type: 'init' }
      });

      expect(chrome.runtime.sendMessage).not.toHaveBeenCalled();
    });

    it('should reject null pipeline event payload', () => {
      dispatchWindowMessage({
        source: 'vault-devtools',
        type: 'VAULT_PIPELINE_EVENT',
        event: null
      });

      expect(chrome.runtime.sendMessage).not.toHaveBeenCalled();
    });

    it('should reject non-object pipeline event payload', () => {
      dispatchWindowMessage({
        source: 'vault-devtools',
        type: 'VAULT_PIPELINE_EVENT',
        event: 'injected-string'
      });

      expect(chrome.runtime.sendMessage).not.toHaveBeenCalled();
    });
  });
});
