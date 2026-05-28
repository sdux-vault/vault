import { buildChromeMock, loadScript } from './chrome-mock.mjs';

describe('Chrome Extension: background.js', () => {
  let chrome;
  let connectListeners;
  let messageListeners;

  /** A valid sender matching the extension's own content script. */
  const validSender = () => ({ tab: { id: 1 }, id: chrome.runtime.id });

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

  /** Sends a message to all registered listeners with optional sender. */
  function sendMessage(msg, sender) {
    messageListeners.forEach((fn) => fn(msg, sender));
  }

  describe('onConnect (vault-devtools port)', () => {
    it('should track a vault-devtools port', () => {
      const port = chrome._createPort('vault-devtools');
      connectListeners.forEach((fn) => fn(port));

      const event = { cell: 'test', type: 'init', timestamp: 1 };
      sendMessage({ type: 'VAULT_PIPELINE_EVENT', event }, validSender());

      expect(port.postMessage).toHaveBeenCalledWith({
        type: 'VAULT_PIPELINE_EVENT',
        event
      });
    });

    it('should ignore ports with other names', () => {
      const port = chrome._createPort('other-port');
      connectListeners.forEach((fn) => fn(port));

      const event = { cell: 'test', type: 'init', timestamp: 1 };
      sendMessage({ type: 'VAULT_PIPELINE_EVENT', event }, validSender());

      expect(port.postMessage).not.toHaveBeenCalled();
    });

    it('should clear the port reference on disconnect', () => {
      const port = chrome._createPort('vault-devtools');
      connectListeners.forEach((fn) => fn(port));

      port._triggerDisconnect();

      const event = { cell: 'test', type: 'init', timestamp: 1 };
      sendMessage({ type: 'VAULT_PIPELINE_EVENT', event }, validSender());

      expect(port.postMessage).not.toHaveBeenCalled();
    });
  });

  describe('onMessage (forwarding to panel)', () => {
    let port;

    beforeEach(() => {
      port = chrome._createPort('vault-devtools');
      connectListeners.forEach((fn) => fn(port));
    });

    it('should forward VAULT_PIPELINE_EVENT to the connected port', () => {
      const event = { cell: 'my-cell', type: 'stage:start', timestamp: 123 };
      sendMessage({ type: 'VAULT_PIPELINE_EVENT', event }, validSender());

      expect(port.postMessage).toHaveBeenCalledWith({
        type: 'VAULT_PIPELINE_EVENT',
        event
      });
    });

    it('should ignore messages without a type', () => {
      sendMessage({ foo: 'bar' }, validSender());
      sendMessage(null, validSender());
      sendMessage(undefined, validSender());

      expect(port.postMessage).not.toHaveBeenCalled();
    });

    it('should ignore messages with unknown types', () => {
      sendMessage(
        { type: 'UNKNOWN_TYPE', event: { cell: 'x', type: 'y', timestamp: 1 } },
        validSender()
      );

      expect(port.postMessage).not.toHaveBeenCalled();
    });

    it('should not forward when no port is connected', () => {
      port._triggerDisconnect();

      const event = { cell: 'test', type: 'init', timestamp: 1 };
      expect(() =>
        sendMessage({ type: 'VAULT_PIPELINE_EVENT', event }, validSender())
      ).not.toThrow();
    });
  });

  describe('sender validation', () => {
    let port;

    beforeEach(() => {
      port = chrome._createPort('vault-devtools');
      connectListeners.forEach((fn) => fn(port));
    });

    it('should reject messages without a sender tab', () => {
      const event = { cell: 'test', type: 'init', timestamp: 1 };
      sendMessage(
        { type: 'VAULT_PIPELINE_EVENT', event },
        { id: chrome.runtime.id }
      );

      expect(port.postMessage).not.toHaveBeenCalled();
    });

    it('should reject messages from a different extension', () => {
      const event = { cell: 'test', type: 'init', timestamp: 1 };
      sendMessage(
        { type: 'VAULT_PIPELINE_EVENT', event },
        { tab: { id: 1 }, id: 'other-extension-id' }
      );

      expect(port.postMessage).not.toHaveBeenCalled();
    });

    it('should reject messages with no sender', () => {
      const event = { cell: 'test', type: 'init', timestamp: 1 };
      sendMessage({ type: 'VAULT_PIPELINE_EVENT', event }, undefined);

      expect(port.postMessage).not.toHaveBeenCalled();
    });
  });

  describe('event schema validation', () => {
    let port;

    beforeEach(() => {
      port = chrome._createPort('vault-devtools');
      connectListeners.forEach((fn) => fn(port));
    });

    it('should reject events missing cell', () => {
      sendMessage(
        { type: 'VAULT_PIPELINE_EVENT', event: { type: 'init', timestamp: 1 } },
        validSender()
      );

      expect(port.postMessage).not.toHaveBeenCalled();
    });

    it('should reject events missing type', () => {
      sendMessage(
        { type: 'VAULT_PIPELINE_EVENT', event: { cell: 'test', timestamp: 1 } },
        validSender()
      );

      expect(port.postMessage).not.toHaveBeenCalled();
    });

    it('should reject events missing timestamp', () => {
      sendMessage(
        { type: 'VAULT_PIPELINE_EVENT', event: { cell: 'test', type: 'init' } },
        validSender()
      );

      expect(port.postMessage).not.toHaveBeenCalled();
    });

    it('should reject null event', () => {
      sendMessage({ type: 'VAULT_PIPELINE_EVENT', event: null }, validSender());

      expect(port.postMessage).not.toHaveBeenCalled();
    });

    it('should reject non-object event', () => {
      sendMessage(
        { type: 'VAULT_PIPELINE_EVENT', event: 'not-an-object' },
        validSender()
      );

      expect(port.postMessage).not.toHaveBeenCalled();
    });
  });

  describe('event buffering', () => {
    it('should buffer events when no port is connected', () => {
      const event = { cell: 'test', type: 'init', timestamp: 1 };
      sendMessage({ type: 'VAULT_PIPELINE_EVENT', event }, validSender());

      const port = chrome._createPort('vault-devtools');
      connectListeners.forEach((fn) => fn(port));

      expect(port.postMessage).toHaveBeenCalledWith({
        type: 'VAULT_PIPELINE_EVENT',
        event
      });
    });

    it('should flush multiple buffered events in order on reconnect', () => {
      const event1 = { cell: 'a', type: 'init', timestamp: 1 };
      const event2 = { cell: 'b', type: 'done', timestamp: 2 };
      sendMessage(
        { type: 'VAULT_PIPELINE_EVENT', event: event1 },
        validSender()
      );
      sendMessage(
        { type: 'VAULT_PIPELINE_EVENT', event: event2 },
        validSender()
      );

      const port = chrome._createPort('vault-devtools');
      connectListeners.forEach((fn) => fn(port));

      expect(port.postMessage).toHaveBeenCalledTimes(2);
      expect(port.postMessage.calls.argsFor(0)).toEqual([
        { type: 'VAULT_PIPELINE_EVENT', event: event1 }
      ]);
      expect(port.postMessage.calls.argsFor(1)).toEqual([
        { type: 'VAULT_PIPELINE_EVENT', event: event2 }
      ]);
    });

    it('should clear the buffer after flushing', () => {
      const event = { cell: 'test', type: 'init', timestamp: 1 };
      sendMessage({ type: 'VAULT_PIPELINE_EVENT', event }, validSender());

      const port1 = chrome._createPort('vault-devtools');
      connectListeners.forEach((fn) => fn(port1));
      port1._triggerDisconnect();

      const port2 = chrome._createPort('vault-devtools');
      connectListeners.forEach((fn) => fn(port2));

      expect(port2.postMessage).not.toHaveBeenCalled();
    });

    it('should buffer events after disconnect and flush on reconnect', () => {
      const port1 = chrome._createPort('vault-devtools');
      connectListeners.forEach((fn) => fn(port1));
      port1._triggerDisconnect();

      const event = { cell: 'test', type: 'init', timestamp: 1 };
      sendMessage({ type: 'VAULT_PIPELINE_EVENT', event }, validSender());

      const port2 = chrome._createPort('vault-devtools');
      connectListeners.forEach((fn) => fn(port2));

      expect(port2.postMessage).toHaveBeenCalledWith({
        type: 'VAULT_PIPELINE_EVENT',
        event
      });
    });

    it('should not buffer invalid events', () => {
      sendMessage({ type: 'VAULT_PIPELINE_EVENT', event: null }, validSender());

      const port = chrome._createPort('vault-devtools');
      connectListeners.forEach((fn) => fn(port));

      expect(port.postMessage).not.toHaveBeenCalled();
    });
  });
});
