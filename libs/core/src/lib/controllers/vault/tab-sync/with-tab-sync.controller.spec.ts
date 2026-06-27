import { setVerifyLicensePayloadResult } from '@sdux-vault/engine';
import {
  ControllerMessageTypes,
  ControllerVote,
  ControllerVotes,
  setVaultLogLevel,
  StateSnapshotShape
} from '@sdux-vault/shared';
import { flushVaultPipeline } from '@sdux-vault/testing-utils';
import { TAB_SYNC_CTRL_CHANNEL_PREFIX } from './constants/tab-sync-ctrl-channel-prefix.constant';
import { TAB_SYNC_REGISTRY_PREFIX } from './constants/tab-sync-registry-prefix.constant';
import { TabSyncBusService } from './services/tab-sync-bus.service';
import { TabSyncBusCommandShape } from './shapes/tab-sync-bus-command.shape';
import { TabSyncChannelMessageShape } from './shapes/tab-sync-channel-message.shape';
import { TabSyncRegistryEntryShape } from './shapes/tab-sync-registry-entry.shape';
import { TabSyncBusCommandTypes } from './types/tab-sync-bus-command.type';
import { TabSyncBusNotificationTypes } from './types/tab-sync-bus-notification.type';
import { TabSyncChannelMessageTypes } from './types/tab-sync-channel-message.type';
import { withTabSyncController } from './with-tab-sync.controller';

describe('Controller: withTabSyncController', () => {
  let controller: withTabSyncController<any>;
  let bus: ReturnType<typeof TabSyncBusService>;
  let peerChannel: BroadcastChannel;
  let warnSpy: jasmine.Spy;
  let debugSpy: jasmine.Spy;

  const featureCellKey = 'test-cell';
  const channelName = `${TAB_SYNC_CTRL_CHANNEL_PREFIX}:${featureCellKey}`;
  const registryKey = `${TAB_SYNC_REGISTRY_PREFIX}:${featureCellKey}`;

  const ctx: any = {
    conductorId: 'test-conductor-id',
    featureCellKey
  };

  const buildAttemptMessage = () =>
    ({ type: ControllerMessageTypes.Attempt, traceId: 'trace-attempt' }) as any;

  const buildSuccessMessage = () =>
    ({ type: ControllerMessageTypes.Success, traceId: 'trace-success' }) as any;

  const buildFinalizeMessage = () =>
    ({
      type: ControllerMessageTypes.Finalize,
      traceId: 'trace-finalize'
    }) as any;

  const buildFailMessage = () =>
    ({ type: ControllerMessageTypes.Failure, traceId: 'trace-failure' }) as any;

  const buildPeerSnapshot = (): StateSnapshotShape<any> => ({
    isLoading: false,
    value: [{ id: 1, name: 'Jane' }],
    error: null,
    hasValue: true
  });

  /**
   * Seeds a peer entry in the localStorage registry so the controller
   * takes the negotiation path instead of the no-peers fast path.
   */
  function seedPeerInRegistry(
    tabId = 'peer-tab-seed',
    timestamp = Date.now()
  ): void {
    const entries: TabSyncRegistryEntryShape[] = [{ tabId, timestamp }];
    const existing = localStorage.getItem(registryKey);
    if (existing) {
      try {
        const parsed = JSON.parse(existing);
        if (Array.isArray(parsed)) {
          entries.push(...parsed);
        }
      } catch {
        // ignore
      }
    }
    localStorage.setItem(registryKey, JSON.stringify(entries));
  }

  beforeAll(() => {
    warnSpy = spyOn(console, 'warn');
    debugSpy = spyOn(console, 'debug');
  });

  beforeEach(() => {
    warnSpy.calls.reset();
    debugSpy.calls.reset();

    setVaultLogLevel('debug');

    try {
      localStorage.removeItem(registryKey);
    } catch {
      // ignore
    }

    bus = TabSyncBusService();
    peerChannel = new BroadcastChannel(channelName);
    controller = new withTabSyncController('tab-sync-ctrl', ctx);
  });

  afterEach(() => {
    controller?.destroy();
    peerChannel?.close();
    setVaultLogLevel('off');

    try {
      localStorage.removeItem(registryKey);
    } catch {
      // ignore
    }
  });

  // ---------------------------------------------------------------------------
  // Construction
  // ---------------------------------------------------------------------------

  it('should use conductorId as the tab identifier', () => {
    expect(controller.tabId).toBe('test-conductor-id');
  });

  // ---------------------------------------------------------------------------
  // Static metadata
  // ---------------------------------------------------------------------------

  it('should require a license', () => {
    expect((withTabSyncController as any).needsLicense).toBeTrue();
  });

  it('should have a license id', () => {
    expect((withTabSyncController as any).licenseId).toBe('sdux-vault');
  });

  // ---------------------------------------------------------------------------
  // Tab registry
  // ---------------------------------------------------------------------------

  it('should register itself in the localStorage registry on construction', () => {
    const json = localStorage.getItem(registryKey);
    expect(json).toBeTruthy();
    const entries: TabSyncRegistryEntryShape[] = JSON.parse(json!);
    expect(entries.some((e) => e.tabId === controller.tabId)).toBeTrue();
  });

  it('should log registry registration on construction', () => {
    expect(debugSpy).toHaveBeenCalledWith(
      '[vault]',
      jasmine.stringMatching(
        /^tab-sync-ctrl registered in tab registry \(\d+ total entries\)$/
      )
    );
  });

  it('should remove itself from the registry on destroy', () => {
    controller.destroy();

    const json = localStorage.getItem(registryKey);
    if (json) {
      const entries: TabSyncRegistryEntryShape[] = JSON.parse(json);
      expect(entries.some((e) => e.tabId === controller.tabId)).toBeFalse();
    } else {
      expect(json).toBeNull();
    }
  });

  it('should log registry removal on destroy', () => {
    controller.destroy();

    expect(debugSpy).toHaveBeenCalledWith(
      '[vault]',
      'tab-sync-ctrl removed from tab registry'
    );
  });

  it('should preserve other tab entries when removing from registry', () => {
    seedPeerInRegistry('other-tab-1');

    controller.destroy();

    const json = localStorage.getItem(registryKey);
    expect(json).toBeTruthy();
    const entries: TabSyncRegistryEntryShape[] = JSON.parse(json!);
    expect(entries.some((e) => e.tabId === 'other-tab-1')).toBeTrue();
    expect(entries.some((e) => e.tabId === controller.tabId)).toBeFalse();
  });

  it('should prune stale entries when reading peer entries', () => {
    const staleTimestamp = Date.now() - 60_000;
    seedPeerInRegistry('stale-tab', staleTimestamp);

    controller.handleMessage(buildAttemptMessage()).subscribe();

    const json = localStorage.getItem(registryKey);
    if (json) {
      const entries: TabSyncRegistryEntryShape[] = JSON.parse(json);
      expect(entries.some((e) => e.tabId === 'stale-tab')).toBeFalse();
    }
  });

  it('should remove the registry key entirely when all entries are stale', () => {
    controller.destroy();
    localStorage.removeItem(registryKey);

    const staleTimestamp = Date.now() - 60_000;
    localStorage.setItem(
      registryKey,
      JSON.stringify([{ tabId: 'stale-only', timestamp: staleTimestamp }])
    );

    controller = new withTabSyncController('tab-sync-ctrl', ctx);
    controller.handleMessage(buildAttemptMessage()).subscribe();

    const json = localStorage.getItem(registryKey);
    if (json) {
      const entries: TabSyncRegistryEntryShape[] = JSON.parse(json);
      expect(entries.some((e) => e.tabId === 'stale-only')).toBeFalse();
    }
  });

  it('should handle corrupted registry JSON gracefully', () => {
    localStorage.setItem(registryKey, '{{invalid json');
    controller.destroy();

    controller = new withTabSyncController('tab-sync-ctrl', ctx);

    expect(controller.tabId).toBeDefined();
  });

  it('should handle non-array registry value gracefully', () => {
    localStorage.setItem(registryKey, '"not-an-array"');
    controller.destroy();

    controller = new withTabSyncController('tab-sync-ctrl', ctx);

    let vote: ControllerVote | undefined;
    controller
      .handleMessage(buildAttemptMessage())
      .subscribe((v) => (vote = v));

    expect(vote).toBe(ControllerVotes.Abstain);
  });

  it('should skip registry when localStorage is unavailable', () => {
    controller.destroy();

    const originalLS = window.localStorage;
    Object.defineProperty(globalThis, 'localStorage', {
      value: undefined,
      writable: true,
      configurable: true
    });

    const degraded = new withTabSyncController('no-ls-key', {
      featureCellKey
    } as any);

    let vote: ControllerVote | undefined;
    degraded.handleMessage(buildAttemptMessage()).subscribe((v) => (vote = v));

    expect(vote).toBe(ControllerVotes.Abstain);

    degraded.destroy();

    Object.defineProperty(globalThis, 'localStorage', {
      value: originalLS,
      writable: true,
      configurable: true
    });
  });

  it('should remove registry key entirely when pruning leaves zero entries', () => {
    const staleTimestamp = Date.now() - 60_000;

    localStorage.setItem(
      registryKey,
      JSON.stringify([
        { tabId: controller.tabId, timestamp: staleTimestamp },
        { tabId: 'stale-peer', timestamp: staleTimestamp }
      ])
    );

    controller.handleMessage(buildAttemptMessage()).subscribe();

    const json = localStorage.getItem(registryKey);
    expect(json).toBeNull();
  });

  it('should return empty peers when localStorage throws during read', () => {
    const staleTimestamp = Date.now() - 60_000;
    seedPeerInRegistry('stale-peer', staleTimestamp);

    const originalLS = window.localStorage;
    const throwingLS = {
      getItem: originalLS.getItem.bind(originalLS),
      setItem: () => {
        throw new Error('quota exceeded');
      },
      removeItem: () => {
        throw new Error('storage error');
      },
      clear: originalLS.clear.bind(originalLS),
      key: originalLS.key.bind(originalLS),
      length: 0
    } as Storage;

    Object.defineProperty(globalThis, 'localStorage', {
      value: throwingLS,
      writable: true,
      configurable: true
    });

    let vote: ControllerVote | undefined;
    controller
      .handleMessage(buildAttemptMessage())
      .subscribe((v) => (vote = v));

    expect(vote).toBe(ControllerVotes.Abstain);

    Object.defineProperty(globalThis, 'localStorage', {
      value: originalLS,
      writable: true,
      configurable: true
    });
  });

  it('should log failure when registerInRegistry throws', () => {
    controller.destroy();

    const originalLS = window.localStorage;
    const throwingLS = {
      getItem: originalLS.getItem.bind(originalLS),
      setItem: () => {
        throw new Error('quota exceeded');
      },
      removeItem: originalLS.removeItem.bind(originalLS),
      clear: originalLS.clear.bind(originalLS),
      key: originalLS.key.bind(originalLS),
      length: 0
    } as Storage;

    Object.defineProperty(globalThis, 'localStorage', {
      value: throwingLS,
      writable: true,
      configurable: true
    });

    controller = new withTabSyncController('tab-sync-ctrl', ctx);

    expect(debugSpy).toHaveBeenCalledWith(
      '[vault]',
      'tab-sync-ctrl failed to register in tab registry'
    );

    Object.defineProperty(globalThis, 'localStorage', {
      value: originalLS,
      writable: true,
      configurable: true
    });
  });

  it('should log failure when removeFromRegistry throws', () => {
    const originalLS = window.localStorage;
    const throwingLS = {
      getItem: originalLS.getItem.bind(originalLS),
      setItem: originalLS.setItem.bind(originalLS),
      removeItem: () => {
        throw new Error('storage error');
      },
      clear: originalLS.clear.bind(originalLS),
      key: originalLS.key.bind(originalLS),
      length: 0
    } as Storage;

    Object.defineProperty(globalThis, 'localStorage', {
      value: throwingLS,
      writable: true,
      configurable: true
    });

    controller.destroy();

    expect(debugSpy).toHaveBeenCalledWith(
      '[vault]',
      'tab-sync-ctrl failed to remove from tab registry'
    );

    Object.defineProperty(globalThis, 'localStorage', {
      value: originalLS,
      writable: true,
      configurable: true
    });

    controller = new withTabSyncController('tab-sync-ctrl', ctx);
  });

  // ---------------------------------------------------------------------------
  // Heartbeat
  // ---------------------------------------------------------------------------

  it('should refresh its registry timestamp on heartbeat', () => {
    jasmine.clock().install();

    controller.destroy();
    localStorage.removeItem(registryKey);
    controller = new withTabSyncController('tab-sync-ctrl', ctx);

    const beforeJson = localStorage.getItem(registryKey);
    const beforeEntries: TabSyncRegistryEntryShape[] = JSON.parse(beforeJson!);
    const beforeTimestamp = beforeEntries.find(
      (e) => e.tabId === controller.tabId
    )!.timestamp;

    jasmine.clock().tick(5_001);

    const afterJson = localStorage.getItem(registryKey);
    const afterEntries: TabSyncRegistryEntryShape[] = JSON.parse(afterJson!);
    const afterTimestamp = afterEntries.find(
      (e) => e.tabId === controller.tabId
    )!.timestamp;

    expect(afterTimestamp).toBeGreaterThanOrEqual(beforeTimestamp);

    jasmine.clock().uninstall();
  });

  it('should re-add itself to registry on heartbeat if entry was removed externally', () => {
    jasmine.clock().install();

    controller.destroy();
    localStorage.removeItem(registryKey);
    controller = new withTabSyncController('tab-sync-ctrl', ctx);

    localStorage.setItem(registryKey, '[]');

    jasmine.clock().tick(5_001);

    const json = localStorage.getItem(registryKey);
    const entries: TabSyncRegistryEntryShape[] = JSON.parse(json!);
    expect(entries.some((e) => e.tabId === controller.tabId)).toBeTrue();

    jasmine.clock().uninstall();
  });

  it('should stop heartbeat on destroy', () => {
    jasmine.clock().install();

    controller.destroy();

    localStorage.setItem(
      registryKey,
      JSON.stringify([{ tabId: 'leftover', timestamp: Date.now() }])
    );

    jasmine.clock().tick(5_001);

    const json = localStorage.getItem(registryKey);
    const entries: TabSyncRegistryEntryShape[] = JSON.parse(json!);
    expect(entries.some((e) => e.tabId === controller.tabId)).toBeFalse();

    jasmine.clock().uninstall();
  });

  it('should skip heartbeat refresh when localStorage is unavailable', () => {
    jasmine.clock().install();

    controller.destroy();
    localStorage.removeItem(registryKey);
    controller = new withTabSyncController('tab-sync-ctrl', ctx);

    const originalLS = window.localStorage;
    Object.defineProperty(globalThis, 'localStorage', {
      value: undefined,
      writable: true,
      configurable: true
    });

    jasmine.clock().tick(5_001);

    Object.defineProperty(globalThis, 'localStorage', {
      value: originalLS,
      writable: true,
      configurable: true
    });

    jasmine.clock().uninstall();
  });

  // ---------------------------------------------------------------------------
  // beforeunload cleanup
  // ---------------------------------------------------------------------------

  it('should register a beforeunload listener that removes from registry', () => {
    let capturedHandler: EventListenerOrEventListenerObject | undefined;
    const addSpy = spyOn(window, 'addEventListener').and.callFake(
      (type: string, handler: EventListenerOrEventListenerObject) => {
        if (type === 'beforeunload') {
          capturedHandler = handler;
        }
      }
    );

    controller.destroy();
    localStorage.removeItem(registryKey);
    controller = new withTabSyncController('tab-sync-ctrl', ctx);

    expect(addSpy).toHaveBeenCalledWith('beforeunload', jasmine.any(Function));
    expect(capturedHandler).toBeDefined();

    (capturedHandler as () => void)();

    const json = localStorage.getItem(registryKey);
    if (json) {
      const entries: TabSyncRegistryEntryShape[] = JSON.parse(json);
      expect(entries.some((e) => e.tabId === controller.tabId)).toBeFalse();
    } else {
      expect(json).toBeNull();
    }
  });

  it('should unregister beforeunload listener on destroy', () => {
    const removeSpy = spyOn(window, 'removeEventListener').and.callThrough();
    controller.destroy();

    expect(removeSpy).toHaveBeenCalledWith(
      'beforeunload',
      jasmine.any(Function)
    );
  });

  // ---------------------------------------------------------------------------
  // Admission: non-Attempt messages
  // ---------------------------------------------------------------------------

  it('should log a debug message on handleMessage', () => {
    controller.handleMessage(buildAttemptMessage()).subscribe();

    expect(debugSpy).toHaveBeenCalledWith(
      '[vault]',
      'tab-sync-ctrl handleMessage received "attempt" for trace "trace-attempt".'
    );
  });

  it('should log a debug message for non-Attempt abstain', () => {
    controller.handleMessage(buildSuccessMessage()).subscribe();

    expect(debugSpy).toHaveBeenCalledWith(
      '[vault]',
      'tab-sync-ctrl handleMessage: non-Attempt message, abstaining'
    );
  });

  it('should log a debug message for already-negotiated abstain', () => {
    controller.handleMessage(buildAttemptMessage()).subscribe();

    debugSpy.calls.reset();
    controller.handleMessage(buildAttemptMessage()).subscribe();

    expect(debugSpy).toHaveBeenCalledWith(
      '[vault]',
      'tab-sync-ctrl handleMessage: already negotiated, abstaining'
    );
  });

  it('should log constructor debug message', () => {
    expect(debugSpy).toHaveBeenCalledWith(
      '[vault]',
      jasmine.stringMatching(
        /^tab-sync-ctrl constructor: featureCellKey="test-cell", tabId="/
      )
    );
  });

  it('should abstain on Success messages', () => {
    let vote: ControllerVote | undefined;
    controller
      .handleMessage(buildSuccessMessage())
      .subscribe((v) => (vote = v));
    expect(vote).toBe(ControllerVotes.Abstain);
  });

  it('should abstain on Finalize messages', () => {
    let vote: ControllerVote | undefined;
    controller
      .handleMessage(buildFinalizeMessage())
      .subscribe((v) => (vote = v));
    expect(vote).toBe(ControllerVotes.Abstain);
  });

  it('should abstain on Failure messages', () => {
    let vote: ControllerVote | undefined;
    controller.handleMessage(buildFailMessage()).subscribe((v) => (vote = v));
    expect(vote).toBe(ControllerVotes.Abstain);
  });

  // ---------------------------------------------------------------------------
  // Admission: first Attempt — no peers in registry (fast path)
  // ---------------------------------------------------------------------------

  it('should abstain immediately when no peers in registry', () => {
    let vote: ControllerVote | undefined;
    controller
      .handleMessage(buildAttemptMessage())
      .subscribe((v) => (vote = v));

    expect(vote).toBe(ControllerVotes.Abstain);
  });

  it('should emit ClearCache when no peers in registry', () => {
    const commands: TabSyncBusCommandShape[] = [];
    bus.command$.subscribe((cmd) => {
      if (cmd.featureCellKey === featureCellKey) {
        commands.push(cmd);
      }
    });

    controller.handleMessage(buildAttemptMessage()).subscribe();

    expect(
      commands.some((c) => c.command === TabSyncBusCommandTypes.ClearCache)
    ).toBeTrue();
  });

  it('should log no-peers-in-registry debug message', () => {
    debugSpy.calls.reset();
    controller.handleMessage(buildAttemptMessage()).subscribe();

    expect(debugSpy).toHaveBeenCalledWith(
      '[vault]',
      'tab-sync-ctrl handleMessage: no peers in registry, clearing cache and abstaining'
    );
  });

  // ---------------------------------------------------------------------------
  // Admission: first Attempt — peers in registry, no response (timeout)
  // ---------------------------------------------------------------------------

  it('should send a snapshot request on first Attempt when peers exist', (done) => {
    seedPeerInRegistry();

    peerChannel.onmessage = (event: MessageEvent) => {
      const msg = event.data as TabSyncChannelMessageShape<any>;
      expect(msg.messageType).toBe(TabSyncChannelMessageTypes.Request);
      expect(msg.featureCellKey).toBe(featureCellKey);
      expect(msg.tabId).toBe(controller.tabId);
      done();
    };

    controller.handleMessage(buildAttemptMessage()).subscribe();
  });

  it('should log negotiation start with peer count', () => {
    seedPeerInRegistry();

    debugSpy.calls.reset();
    controller.handleMessage(buildAttemptMessage()).subscribe();

    expect(debugSpy).toHaveBeenCalledWith(
      '[vault]',
      jasmine.stringMatching(
        /^tab-sync-ctrl handleMessage: first Attempt, \d+ peer\(s\) in registry, starting negotiation$/
      )
    );
  });

  it('should abstain and emit clear-cache when peer timeout expires', () => {
    jasmine.clock().install();
    seedPeerInRegistry();

    const commands: TabSyncBusCommandShape[] = [];
    bus.command$.subscribe((cmd) => {
      if (cmd.featureCellKey === featureCellKey) {
        commands.push(cmd);
      }
    });

    let vote: ControllerVote | undefined;
    controller.handleMessage(buildAttemptMessage()).subscribe((v) => {
      vote = v;
    });

    jasmine.clock().tick(3_001);

    expect(vote).toBe(ControllerVotes.Abstain);
    expect(
      commands.some((c) => c.command === TabSyncBusCommandTypes.ClearCache)
    ).toBeTrue();

    jasmine.clock().uninstall();
  });

  it('should log peer timeout expired debug message', () => {
    jasmine.clock().install();
    seedPeerInRegistry();

    controller.handleMessage(buildAttemptMessage()).subscribe();

    jasmine.clock().tick(3_001);

    expect(debugSpy).toHaveBeenCalledWith(
      '[vault]',
      'tab-sync-ctrl peer timeout expired, clearing cache and abstaining'
    );

    jasmine.clock().uninstall();
  });

  // ---------------------------------------------------------------------------
  // Admission: first Attempt — peer responds
  // ---------------------------------------------------------------------------

  it('should log bus PeerSnapshotReceived debug', (done) => {
    seedPeerInRegistry();

    controller.handleMessage(buildAttemptMessage()).subscribe(() => done());

    bus.emitNotification({
      featureCellKey,
      notification: TabSyncBusNotificationTypes.PeerSnapshotReceived,
      snapshot: buildPeerSnapshot()
    });

    expect(debugSpy).toHaveBeenCalledWith(
      '[vault]',
      `tab-sync-ctrl bus received PeerSnapshotReceived for "${featureCellKey}"`
    );
  });

  it('should log bus SnapshotReady debug', () => {
    controller.handleMessage(buildAttemptMessage()).subscribe();

    debugSpy.calls.reset();

    bus.emitNotification({
      featureCellKey,
      notification: TabSyncBusNotificationTypes.SnapshotReady,
      snapshot: buildPeerSnapshot()
    });

    expect(debugSpy).toHaveBeenCalledWith(
      '[vault]',
      `tab-sync-ctrl bus received SnapshotReady for "${featureCellKey}"`
    );
  });

  it('should abort and emit commit-cache when a peer responds with snapshot', (done) => {
    seedPeerInRegistry();

    const commands: TabSyncBusCommandShape[] = [];

    bus.command$.subscribe((cmd) => {
      if (cmd.featureCellKey === featureCellKey) {
        commands.push(cmd);
      }
    });

    controller.handleMessage(buildAttemptMessage()).subscribe((vote) => {
      expect(vote).toBe(ControllerVotes.Abort);
      const commitCmd = commands.find(
        (c) => c.command === TabSyncBusCommandTypes.CommitCache
      );
      expect(commitCmd).toBeDefined();
      expect(commitCmd!.snapshot).toEqual(buildPeerSnapshot());
      done();
    });

    bus.emitNotification({
      featureCellKey,
      notification: TabSyncBusNotificationTypes.PeerSnapshotReceived,
      snapshot: buildPeerSnapshot()
    });
  });

  it('should abort when a peer sends a Response message via BroadcastChannel', (done) => {
    seedPeerInRegistry();

    const commands: TabSyncBusCommandShape[] = [];

    bus.command$.subscribe((cmd) => {
      if (cmd.featureCellKey === featureCellKey) {
        commands.push(cmd);
      }
    });

    controller.handleMessage(buildAttemptMessage()).subscribe((vote) => {
      expect(vote).toBe(ControllerVotes.Abort);
      const commitCmd = commands.find(
        (c) => c.command === TabSyncBusCommandTypes.CommitCache
      );
      expect(commitCmd).toBeDefined();
      expect(commitCmd!.snapshot).toEqual(buildPeerSnapshot());
      done();
    });

    const responseMessage: TabSyncChannelMessageShape<any> = {
      messageType: TabSyncChannelMessageTypes.Response,
      featureCellKey,
      tabId: 'peer-tab-id',
      snapshot: buildPeerSnapshot()
    };

    peerChannel.postMessage(responseMessage);
  });

  // ---------------------------------------------------------------------------
  // Settling — abort subsequent Attempts after peer sync
  // ---------------------------------------------------------------------------

  it('should abort subsequent Attempts during settling after peer sync', (done) => {
    seedPeerInRegistry();

    controller.handleMessage(buildAttemptMessage()).subscribe(() => {
      let settlingVote: ControllerVote | undefined;
      controller
        .handleMessage(buildAttemptMessage())
        .subscribe((v) => (settlingVote = v));
      expect(settlingVote).toBe(ControllerVotes.Abort);
      done();
    });

    bus.emitNotification({
      featureCellKey,
      notification: TabSyncBusNotificationTypes.PeerSnapshotReceived,
      snapshot: buildPeerSnapshot()
    });
  });

  it('should abstain on Attempts after settling completes', (done) => {
    seedPeerInRegistry();

    controller.handleMessage(buildAttemptMessage()).subscribe(() => {
      setTimeout(() => {
        let postSettlingVote: ControllerVote | undefined;
        controller
          .handleMessage(buildAttemptMessage())
          .subscribe((v) => (postSettlingVote = v));
        expect(postSettlingVote).toBe(ControllerVotes.Abstain);
        done();
      }, 10);
    });

    bus.emitNotification({
      featureCellKey,
      notification: TabSyncBusNotificationTypes.PeerSnapshotReceived,
      snapshot: buildPeerSnapshot()
    });
  });

  it('should log settling abort debug message', (done) => {
    seedPeerInRegistry();

    controller.handleMessage(buildAttemptMessage()).subscribe(() => {
      debugSpy.calls.reset();
      controller.handleMessage(buildAttemptMessage()).subscribe();

      expect(debugSpy).toHaveBeenCalledWith(
        '[vault]',
        'tab-sync-ctrl handleMessage: settling after sync, aborting'
      );
      done();
    });

    bus.emitNotification({
      featureCellKey,
      notification: TabSyncBusNotificationTypes.PeerSnapshotReceived,
      snapshot: buildPeerSnapshot()
    });
  });

  it('should log settling complete after microtask', (done) => {
    seedPeerInRegistry();

    controller.handleMessage(buildAttemptMessage()).subscribe(() => {
      debugSpy.calls.reset();

      setTimeout(() => {
        expect(debugSpy).toHaveBeenCalledWith(
          '[vault]',
          'tab-sync-ctrl settling complete'
        );
        done();
      }, 10);
    });

    bus.emitNotification({
      featureCellKey,
      notification: TabSyncBusNotificationTypes.PeerSnapshotReceived,
      snapshot: buildPeerSnapshot()
    });
  });

  // ---------------------------------------------------------------------------
  // Serving snapshot requests — SnapshotReady relay
  // ---------------------------------------------------------------------------

  it('should send a Response on BroadcastChannel when behavior emits SnapshotReady', (done) => {
    controller.handleMessage(buildAttemptMessage()).subscribe();

    peerChannel.onmessage = (event: MessageEvent) => {
      const msg = event.data as TabSyncChannelMessageShape<any>;
      if (msg.messageType === TabSyncChannelMessageTypes.Response) {
        expect(msg.featureCellKey).toBe(featureCellKey);
        expect(msg.tabId).toBe(controller.tabId);
        expect(msg.snapshot).toEqual(buildPeerSnapshot());
        done();
      }
    };

    bus.emitNotification({
      featureCellKey,
      notification: TabSyncBusNotificationTypes.SnapshotReady,
      snapshot: buildPeerSnapshot()
    });
  });

  it('should ignore SnapshotReady notifications for a different featureCellKey', (done) => {
    controller.handleMessage(buildAttemptMessage()).subscribe();

    let responseSent = false;

    peerChannel.onmessage = (event: MessageEvent) => {
      const msg = event.data as TabSyncChannelMessageShape<any>;
      if (msg.messageType === TabSyncChannelMessageTypes.Response) {
        responseSent = true;
      }
    };

    bus.emitNotification({
      featureCellKey: 'other-cell',
      notification: TabSyncBusNotificationTypes.SnapshotReady,
      snapshot: buildPeerSnapshot()
    });

    setTimeout(() => {
      expect(responseSent).toBeFalse();
      done();
    }, 50);
  });

  // ---------------------------------------------------------------------------
  // Admission: subsequent Attempts
  // ---------------------------------------------------------------------------

  it('should abstain on all subsequent Attempts after negotiation', () => {
    controller.handleMessage(buildAttemptMessage()).subscribe();

    let vote: ControllerVote | undefined;
    controller
      .handleMessage(buildAttemptMessage())
      .subscribe((v) => (vote = v));

    expect(vote).toBe(ControllerVotes.Abstain);
  });

  // ---------------------------------------------------------------------------
  // Serving snapshot requests from new tabs
  // ---------------------------------------------------------------------------

  it('should log a debug when receiving a request from another tab', (done) => {
    controller.handleMessage(buildAttemptMessage()).subscribe();

    const requestMessage: TabSyncChannelMessageShape<any> = {
      messageType: TabSyncChannelMessageTypes.Request,
      featureCellKey,
      tabId: 'new-tab-id'
    };

    peerChannel.postMessage(requestMessage);

    setTimeout(() => {
      const debugArgs = debugSpy.calls.allArgs().map((a: any[]) => a[1]);
      expect(debugArgs).toContain(
        jasmine.stringMatching(
          /^tab-sync-ctrl #onChannelMessage: type="ctrl:request"/
        )
      );
      expect(debugArgs).toContain(
        'tab-sync-ctrl #handleSnapshotRequest: emitting SendSnapshot command'
      );
      done();
    }, 50);
  });

  it('should emit send-snapshot command when receiving a request from another tab', (done) => {
    controller.handleMessage(buildAttemptMessage()).subscribe();

    const commands: TabSyncBusCommandShape[] = [];
    bus.command$.subscribe((cmd) => {
      if (cmd.featureCellKey === featureCellKey) {
        commands.push(cmd);
      }
    });

    const requestMessage: TabSyncChannelMessageShape<any> = {
      messageType: TabSyncChannelMessageTypes.Request,
      featureCellKey,
      tabId: 'new-tab-id'
    };

    peerChannel.postMessage(requestMessage);

    setTimeout(() => {
      expect(
        commands.some((c) => c.command === TabSyncBusCommandTypes.SendSnapshot)
      ).toBeTrue();
      done();
    }, 50);
  });

  // ---------------------------------------------------------------------------
  // Ignoring self-originated and mismatched messages
  // ---------------------------------------------------------------------------

  it('should log ignored self-originated channel message', (done) => {
    controller.handleMessage(buildAttemptMessage()).subscribe();
    debugSpy.calls.reset();

    const selfMessage: TabSyncChannelMessageShape<any> = {
      messageType: TabSyncChannelMessageTypes.Request,
      featureCellKey,
      tabId: controller.tabId
    };

    peerChannel.postMessage(selfMessage);

    setTimeout(() => {
      expect(debugSpy).toHaveBeenCalledWith(
        '[vault]',
        'tab-sync-ctrl #onChannelMessage: ignored (self-originated)'
      );
      done();
    }, 50);
  });

  it('should log ignored different-cell channel message', (done) => {
    controller.handleMessage(buildAttemptMessage()).subscribe();
    debugSpy.calls.reset();

    const otherMessage: TabSyncChannelMessageShape<any> = {
      messageType: TabSyncChannelMessageTypes.Request,
      featureCellKey: 'products',
      tabId: 'other-tab-id'
    };

    peerChannel.postMessage(otherMessage);

    setTimeout(() => {
      expect(debugSpy).toHaveBeenCalledWith(
        '[vault]',
        'tab-sync-ctrl #onChannelMessage: ignored (different cell)'
      );
      done();
    }, 50);
  });

  it('should ignore channel messages from the same tab', (done) => {
    controller.handleMessage(buildAttemptMessage()).subscribe();

    const commands: TabSyncBusCommandShape[] = [];
    bus.command$.subscribe((cmd) => commands.push(cmd));

    const selfMessage: TabSyncChannelMessageShape<any> = {
      messageType: TabSyncChannelMessageTypes.Request,
      featureCellKey,
      tabId: controller.tabId
    };

    peerChannel.postMessage(selfMessage);

    setTimeout(() => {
      expect(
        commands.some((c) => c.command === TabSyncBusCommandTypes.SendSnapshot)
      ).toBeFalse();
      done();
    }, 50);
  });

  it('should ignore channel messages for a different featureCellKey', (done) => {
    controller.handleMessage(buildAttemptMessage()).subscribe();

    const commands: TabSyncBusCommandShape[] = [];
    bus.command$.subscribe((cmd) => commands.push(cmd));

    const otherMessage: TabSyncChannelMessageShape<any> = {
      messageType: TabSyncChannelMessageTypes.Request,
      featureCellKey: 'products',
      tabId: 'other-tab-id'
    };

    peerChannel.postMessage(otherMessage);

    setTimeout(() => {
      expect(commands.length).toBe(0);
      done();
    }, 50);
  });

  it('should ignore bus notifications for a different featureCellKey', () => {
    jasmine.clock().install();
    seedPeerInRegistry();

    let vote: ControllerVote | undefined;
    controller.handleMessage(buildAttemptMessage()).subscribe((v) => {
      vote = v;
    });

    bus.emitNotification({
      featureCellKey: 'other-cell',
      notification: TabSyncBusNotificationTypes.PeerSnapshotReceived,
      snapshot: buildPeerSnapshot()
    });

    jasmine.clock().tick(3_001);

    expect(vote).toBe(ControllerVotes.Abstain);

    jasmine.clock().uninstall();
  });

  // ---------------------------------------------------------------------------
  // Graceful degradation
  // ---------------------------------------------------------------------------

  it('should not throw when SnapshotReady fires without a channel', () => {
    controller.destroy();

    const originalBC = window.BroadcastChannel;
    (window as any).BroadcastChannel = undefined;

    controller = new withTabSyncController('tab-sync-ctrl-no-bc', ctx);

    expect(() => {
      bus.emitNotification({
        featureCellKey,
        notification: TabSyncBusNotificationTypes.SnapshotReady,
        snapshot: buildPeerSnapshot()
      });
    }).not.toThrow();

    (window as any).BroadcastChannel = originalBC;
  });

  it('should log no-BroadcastChannel abstain when BroadcastChannel is unavailable', () => {
    controller.destroy();

    const originalBC = window.BroadcastChannel;
    (window as any).BroadcastChannel = undefined;

    controller = new withTabSyncController('tab-sync-ctrl-no-bc', ctx);
    debugSpy.calls.reset();

    controller.handleMessage(buildAttemptMessage()).subscribe();

    expect(debugSpy).toHaveBeenCalledWith(
      '[vault]',
      'tab-sync-ctrl-no-bc handleMessage: no BroadcastChannel, clearing cache and abstaining'
    );

    (window as any).BroadcastChannel = originalBC;
  });

  it('should abstain immediately when BroadcastChannel is unavailable', () => {
    controller.destroy();

    const originalBC = window.BroadcastChannel;
    (window as any).BroadcastChannel = undefined;

    const commands: TabSyncBusCommandShape[] = [];
    bus.command$.subscribe((cmd) => {
      if (cmd.featureCellKey === featureCellKey) {
        commands.push(cmd);
      }
    });

    controller = new withTabSyncController('tab-sync-ctrl-no-bc', ctx);

    let vote: ControllerVote | undefined;
    controller
      .handleMessage(buildAttemptMessage())
      .subscribe((v) => (vote = v));

    expect(vote).toBe(ControllerVotes.Abstain);
    expect(
      commands.some((c) => c.command === TabSyncBusCommandTypes.ClearCache)
    ).toBeTrue();

    (window as any).BroadcastChannel = originalBC;
  });

  // ---------------------------------------------------------------------------
  // Destroy
  // ---------------------------------------------------------------------------

  it('should log a warning on destroy', () => {
    controller.destroy();

    expect(warnSpy).toHaveBeenCalledWith('[vault]', 'tab-sync-ctrl - destroy');
  });

  it('should unsubscribe from bus notifications on destroy', () => {
    controller.destroy();

    expect(() => {
      bus.emitNotification({
        featureCellKey,
        notification: TabSyncBusNotificationTypes.PeerSnapshotReceived,
        snapshot: buildPeerSnapshot()
      });
    }).not.toThrow();
  });

  // ---------------------------------------------------------------------------
  // Reset
  // ---------------------------------------------------------------------------

  it('should allow re-negotiation after reset', (done) => {
    controller.handleMessage(buildAttemptMessage()).subscribe();

    controller.reset();

    let requestSent = false;
    seedPeerInRegistry();

    peerChannel.onmessage = (event: MessageEvent) => {
      const msg = event.data as TabSyncChannelMessageShape<any>;
      if (msg.messageType === TabSyncChannelMessageTypes.Request) {
        requestSent = true;
      }
    };

    controller.handleMessage(buildAttemptMessage()).subscribe();

    setTimeout(() => {
      expect(requestSent).toBeTrue();
      done();
    }, 50);
  });

  it('should log a warning on reset', () => {
    controller.reset();

    expect(warnSpy).toHaveBeenCalledWith('[vault]', 'tab-sync-ctrl - reset');
  });

  // ---------------------------------------------------------------------------
  // License validation
  // ---------------------------------------------------------------------------

  describe('license validation', () => {
    it('should log license validation debug', async () => {
      setVerifyLicensePayloadResult(true);

      const licensed = new withTabSyncController('licensed-key', {
        featureCellKey: 'test-cell',
        licensePayload: 'valid-signed-token'
      } as any);

      await flushVaultPipeline();

      expect(debugSpy).toHaveBeenCalledWith(
        '[vault]',
        'licensed-key license validation resolved: true'
      );
      licensed.destroy();
    });

    it('should validate license as true when verifyLicensePayload resolves true', async () => {
      setVerifyLicensePayloadResult(true);

      const licensed = new withTabSyncController('licensed-key', {
        featureCellKey: 'test-cell',
        licensePayload: 'valid-signed-token'
      } as any);

      await flushVaultPipeline();

      expect(licensed).toBeTruthy();
      licensed.destroy();
    });

    it('should validate license as false when verifyLicensePayload resolves false', async () => {
      setVerifyLicensePayloadResult(false);

      const licensed = new withTabSyncController('licensed-key', {
        featureCellKey: 'test-cell',
        licensePayload: 'bad-token'
      } as any);

      await flushVaultPipeline();

      expect(licensed).toBeTruthy();
      licensed.destroy();
    });
  });
});
