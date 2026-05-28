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
        event: { cell: 'test', type: 'init' }
      });

      expect(chrome.runtime.sendMessage).toHaveBeenCalledWith({
        type: 'VAULT_PIPELINE_EVENT',
        event: { cell: 'test', type: 'init' }
      });
    });

    it('should forward VAULT_BRIDGE_CONNECTED to chrome.runtime.sendMessage', () => {
      dispatchWindowMessage({
        source: 'vault-devtools',
        type: 'VAULT_BRIDGE_CONNECTED'
      });

      expect(chrome.runtime.sendMessage).toHaveBeenCalledWith({
        type: 'VAULT_BRIDGE_CONNECTED',
        event: undefined
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
          event: { cell: 'test', type: 'init' }
        });
      }).not.toThrow();
    });
  });
});
