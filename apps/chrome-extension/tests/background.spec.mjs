import { buildChromeMock, loadScript } from './chrome-mock.mjs';

describe('Chrome Extension: background.js', () => {
  let chrome;
  let connectListeners;
  let messageListeners;

  /** A valid sender matching the extension's own content script. */
  const validSender = (tabId = 1) => ({
    tab: { id: tabId },
    id: chrome.runtime.id
  });

  /**
   * Creates a port and completes the VAULT_INIT handshake.
   *
   * @param tabId - The tab ID to register with the background script.
   * @returns The mock port.
   */
  function connectPanel(tabId = 1) {
    const port = chrome._createPort('vault-devtools');
    connectListeners.forEach((fn) => fn(port));
    port._triggerMessage({ type: 'VAULT_INIT', tabId });
    return port;
  }

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
    it('should track a vault-devtools port after VAULT_INIT', () => {
      const port = connectPanel(1);

      const event = { cell: 'test', type: 'init', timestamp: 1 };
      sendMessage({ type: 'VAULT_PIPELINE_EVENT', event }, validSender(1));

      expect(port.postMessage).toHaveBeenCalledWith({
        type: 'VAULT_PIPELINE_EVENT',
        event
      });
    });

    it('should ignore ports with other names', () => {
      const port = chrome._createPort('other-port');
      connectListeners.forEach((fn) => fn(port));

      const event = { cell: 'test', type: 'init', timestamp: 1 };
      sendMessage({ type: 'VAULT_PIPELINE_EVENT', event }, validSender(1));

      expect(port.postMessage).not.toHaveBeenCalled();
    });

    it('should not forward events before VAULT_INIT is received', () => {
      const port = chrome._createPort('vault-devtools');
      connectListeners.forEach((fn) => fn(port));

      const event = { cell: 'test', type: 'init', timestamp: 1 };
      sendMessage({ type: 'VAULT_PIPELINE_EVENT', event }, validSender(1));

      expect(port.postMessage).not.toHaveBeenCalled();
    });

    it('should ignore VAULT_INIT without a numeric tabId', () => {
      const port = chrome._createPort('vault-devtools');
      connectListeners.forEach((fn) => fn(port));
      port._triggerMessage({ type: 'VAULT_INIT', tabId: 'not-a-number' });

      const event = { cell: 'test', type: 'init', timestamp: 1 };
      sendMessage({ type: 'VAULT_PIPELINE_EVENT', event }, validSender(1));

      expect(port.postMessage).not.toHaveBeenCalled();
    });

    it('should clear the port reference on disconnect', () => {
      const port = connectPanel(1);
      port._triggerDisconnect();

      const event = { cell: 'test', type: 'init', timestamp: 1 };
      sendMessage({ type: 'VAULT_PIPELINE_EVENT', event }, validSender(1));

      expect(port.postMessage).not.toHaveBeenCalled();
    });
  });

  describe('onMessage (forwarding to panel)', () => {
    let port;

    beforeEach(() => {
      port = connectPanel(1);
      port.postMessage.calls.reset();
    });

    it('should forward VAULT_PIPELINE_EVENT to the connected port', () => {
      const event = { cell: 'my-cell', type: 'stage:start', timestamp: 123 };
      sendMessage({ type: 'VAULT_PIPELINE_EVENT', event }, validSender(1));

      expect(port.postMessage).toHaveBeenCalledWith({
        type: 'VAULT_PIPELINE_EVENT',
        event
      });
    });

    it('should ignore messages without a type', () => {
      sendMessage({ foo: 'bar' }, validSender(1));
      sendMessage(null, validSender(1));
      sendMessage(undefined, validSender(1));

      expect(port.postMessage).not.toHaveBeenCalled();
    });

    it('should ignore messages with unknown types', () => {
      sendMessage(
        {
          type: 'UNKNOWN_TYPE',
          event: { cell: 'x', type: 'y', timestamp: 1 }
        },
        validSender(1)
      );

      expect(port.postMessage).not.toHaveBeenCalled();
    });

    it('should not forward when no port is connected', () => {
      port._triggerDisconnect();

      const event = { cell: 'test', type: 'init', timestamp: 1 };
      expect(() =>
        sendMessage({ type: 'VAULT_PIPELINE_EVENT', event }, validSender(1))
      ).not.toThrow();
    });
  });

  describe('sender validation', () => {
    let port;

    beforeEach(() => {
      port = connectPanel(1);
      port.postMessage.calls.reset();
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
      port = connectPanel(1);
      port.postMessage.calls.reset();
    });

    it('should reject events missing cell', () => {
      sendMessage(
        {
          type: 'VAULT_PIPELINE_EVENT',
          event: { type: 'init', timestamp: 1 }
        },
        validSender(1)
      );

      expect(port.postMessage).not.toHaveBeenCalled();
    });

    it('should reject events missing type', () => {
      sendMessage(
        {
          type: 'VAULT_PIPELINE_EVENT',
          event: { cell: 'test', timestamp: 1 }
        },
        validSender(1)
      );

      expect(port.postMessage).not.toHaveBeenCalled();
    });

    it('should reject events missing timestamp', () => {
      sendMessage(
        {
          type: 'VAULT_PIPELINE_EVENT',
          event: { cell: 'test', type: 'init' }
        },
        validSender(1)
      );

      expect(port.postMessage).not.toHaveBeenCalled();
    });

    it('should reject null event', () => {
      sendMessage(
        { type: 'VAULT_PIPELINE_EVENT', event: null },
        validSender(1)
      );

      expect(port.postMessage).not.toHaveBeenCalled();
    });

    it('should reject non-object event', () => {
      sendMessage(
        { type: 'VAULT_PIPELINE_EVENT', event: 'not-an-object' },
        validSender(1)
      );

      expect(port.postMessage).not.toHaveBeenCalled();
    });
  });

  describe('event buffering', () => {
    it('should buffer events when no port is connected for that tab', () => {
      const event = { cell: 'test', type: 'init', timestamp: 1 };
      sendMessage({ type: 'VAULT_PIPELINE_EVENT', event }, validSender(1));

      const port = connectPanel(1);

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
        validSender(1)
      );
      sendMessage(
        { type: 'VAULT_PIPELINE_EVENT', event: event2 },
        validSender(1)
      );

      const port = connectPanel(1);

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
      sendMessage({ type: 'VAULT_PIPELINE_EVENT', event }, validSender(1));

      const port1 = connectPanel(1);
      port1._triggerDisconnect();

      const port2 = connectPanel(1);

      expect(port2.postMessage).not.toHaveBeenCalled();
    });

    it('should buffer events after disconnect and flush on reconnect', () => {
      const port1 = connectPanel(1);
      port1._triggerDisconnect();

      const event = { cell: 'test', type: 'init', timestamp: 1 };
      sendMessage({ type: 'VAULT_PIPELINE_EVENT', event }, validSender(1));

      const port2 = connectPanel(1);

      expect(port2.postMessage).toHaveBeenCalledWith({
        type: 'VAULT_PIPELINE_EVENT',
        event
      });
    });

    it('should not buffer invalid events', () => {
      sendMessage(
        { type: 'VAULT_PIPELINE_EVENT', event: null },
        validSender(1)
      );

      const port = connectPanel(1);

      expect(port.postMessage).not.toHaveBeenCalled();
    });
  });

  describe('tab-scoped routing', () => {
    it('should route events to the correct tab panel', () => {
      const port1 = connectPanel(1);
      const port2 = connectPanel(2);
      port1.postMessage.calls.reset();
      port2.postMessage.calls.reset();

      const event1 = { cell: 'tab1-cell', type: 'init', timestamp: 1 };
      sendMessage(
        { type: 'VAULT_PIPELINE_EVENT', event: event1 },
        validSender(1)
      );

      expect(port1.postMessage).toHaveBeenCalledWith({
        type: 'VAULT_PIPELINE_EVENT',
        event: event1
      });
      expect(port2.postMessage).not.toHaveBeenCalled();
    });

    it('should route events from tab 2 only to tab 2 panel', () => {
      const port1 = connectPanel(1);
      const port2 = connectPanel(2);
      port1.postMessage.calls.reset();
      port2.postMessage.calls.reset();

      const event2 = { cell: 'tab2-cell', type: 'done', timestamp: 2 };
      sendMessage(
        { type: 'VAULT_PIPELINE_EVENT', event: event2 },
        validSender(2)
      );

      expect(port2.postMessage).toHaveBeenCalledWith({
        type: 'VAULT_PIPELINE_EVENT',
        event: event2
      });
      expect(port1.postMessage).not.toHaveBeenCalled();
    });

    it('should buffer events per tab independently', () => {
      const event1 = { cell: 'tab1', type: 'init', timestamp: 1 };
      const event2 = { cell: 'tab2', type: 'init', timestamp: 2 };
      sendMessage(
        { type: 'VAULT_PIPELINE_EVENT', event: event1 },
        validSender(1)
      );
      sendMessage(
        { type: 'VAULT_PIPELINE_EVENT', event: event2 },
        validSender(2)
      );

      const port1 = connectPanel(1);
      const port2 = connectPanel(2);

      expect(port1.postMessage).toHaveBeenCalledWith({
        type: 'VAULT_PIPELINE_EVENT',
        event: event1
      });
      expect(port1.postMessage).not.toHaveBeenCalledWith({
        type: 'VAULT_PIPELINE_EVENT',
        event: event2
      });

      expect(port2.postMessage).toHaveBeenCalledWith({
        type: 'VAULT_PIPELINE_EVENT',
        event: event2
      });
      expect(port2.postMessage).not.toHaveBeenCalledWith({
        type: 'VAULT_PIPELINE_EVENT',
        event: event1
      });
    });

    it('should not affect other tabs when one panel disconnects', () => {
      const port1 = connectPanel(1);
      const port2 = connectPanel(2);
      port1.postMessage.calls.reset();
      port2.postMessage.calls.reset();

      port1._triggerDisconnect();

      const event = { cell: 'tab2-cell', type: 'init', timestamp: 1 };
      sendMessage({ type: 'VAULT_PIPELINE_EVENT', event }, validSender(2));

      expect(port2.postMessage).toHaveBeenCalledWith({
        type: 'VAULT_PIPELINE_EVENT',
        event
      });
    });

    it('should clear buffer for disconnected tab only', () => {
      const event1 = { cell: 'tab1', type: 'init', timestamp: 1 };
      sendMessage(
        { type: 'VAULT_PIPELINE_EVENT', event: event1 },
        validSender(1)
      );

      const port1 = connectPanel(1);
      port1._triggerDisconnect();

      const event2 = { cell: 'tab2', type: 'init', timestamp: 2 };
      sendMessage(
        { type: 'VAULT_PIPELINE_EVENT', event: event2 },
        validSender(2)
      );

      const port2 = connectPanel(2);

      expect(port2.postMessage).toHaveBeenCalledWith({
        type: 'VAULT_PIPELINE_EVENT',
        event: event2
      });
    });
  });
});
