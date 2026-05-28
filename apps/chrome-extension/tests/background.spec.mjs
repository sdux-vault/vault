import { buildChromeMock, loadScript } from './chrome-mock.mjs';

describe('Chrome Extension: background.js', () => {
  let chrome;
  let connectListeners;
  let messageListeners;

  beforeEach(() => {
    chrome = buildChromeMock();
    connectListeners = chrome.runtime._connectListeners;
    messageListeners = chrome.runtime._messageListeners;
    globalThis.chrome = chrome;

    loadScript('background/background.js');
  });

  afterEach(() => {
    delete globalThis.chrome;
  });

  describe('onConnect (vault-devtools port)', () => {
    it('should track a vault-devtools port', () => {
      const port = chrome._createPort('vault-devtools');
      connectListeners.forEach((fn) => fn(port));

      const msg = {
        type: 'VAULT_PIPELINE_EVENT',
        event: { cell: 'test', type: 'init' }
      };
      messageListeners.forEach((fn) => fn(msg));

      expect(port.postMessage).toHaveBeenCalledWith({
        type: 'VAULT_PIPELINE_EVENT',
        event: { cell: 'test', type: 'init' }
      });
    });

    it('should ignore ports with other names', () => {
      const port = chrome._createPort('other-port');
      connectListeners.forEach((fn) => fn(port));

      const msg = {
        type: 'VAULT_PIPELINE_EVENT',
        event: { cell: 'test', type: 'init' }
      };
      messageListeners.forEach((fn) => fn(msg));

      expect(port.postMessage).not.toHaveBeenCalled();
    });

    it('should clear the port reference on disconnect', () => {
      const port = chrome._createPort('vault-devtools');
      connectListeners.forEach((fn) => fn(port));

      port._triggerDisconnect();

      const msg = {
        type: 'VAULT_PIPELINE_EVENT',
        event: { cell: 'test', type: 'init' }
      };
      messageListeners.forEach((fn) => fn(msg));

      expect(port.postMessage).not.toHaveBeenCalled();
    });
  });

  describe('onMessage (forwarding to panel)', () => {
    it('should forward VAULT_PIPELINE_EVENT to the connected port', () => {
      const port = chrome._createPort('vault-devtools');
      connectListeners.forEach((fn) => fn(port));

      const event = { cell: 'my-cell', type: 'stage:start', timestamp: 123 };
      messageListeners.forEach((fn) =>
        fn({ type: 'VAULT_PIPELINE_EVENT', event })
      );

      expect(port.postMessage).toHaveBeenCalledWith({
        type: 'VAULT_PIPELINE_EVENT',
        event
      });
    });

    it('should ignore messages without a type', () => {
      const port = chrome._createPort('vault-devtools');
      connectListeners.forEach((fn) => fn(port));

      messageListeners.forEach((fn) => fn({ foo: 'bar' }));
      messageListeners.forEach((fn) => fn(null));
      messageListeners.forEach((fn) => fn(undefined));

      expect(port.postMessage).not.toHaveBeenCalled();
    });

    it('should ignore messages with unknown types', () => {
      const port = chrome._createPort('vault-devtools');
      connectListeners.forEach((fn) => fn(port));

      messageListeners.forEach((fn) => fn({ type: 'UNKNOWN_TYPE', event: {} }));

      expect(port.postMessage).not.toHaveBeenCalled();
    });

    it('should not forward when no port is connected', () => {
      const msg = {
        type: 'VAULT_PIPELINE_EVENT',
        event: { cell: 'test', type: 'init' }
      };
      expect(() => messageListeners.forEach((fn) => fn(msg))).not.toThrow();
    });
  });
});
