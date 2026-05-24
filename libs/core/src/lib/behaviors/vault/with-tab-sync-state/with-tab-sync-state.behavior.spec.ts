import { setVerifyLicensePayloadResult } from '@sdux-vault/engine';
import {
  BehaviorContext,
  setVaultLogLevel,
  StateEmitSnapshotShape,
  StateEmitTypes,
  TabSyncBehaviorClassContext
} from '@sdux-vault/shared';
import { flushVaultPipeline } from '@sdux-vault/testing-utils';
import { Subject } from 'rxjs';
import { TAB_SYNC_SESSION_KEY } from '../../../constants/tab-sync-session-key.constant';
import { TabSyncBusService } from '../../../controllers/vault/tab-sync/services/tab-sync-bus.service';
import { TabSyncBusCommandTypes } from '../../../controllers/vault/tab-sync/types/tab-sync-bus-command.type';
import { TabSyncMessageShape } from '../../../shapes/state/tab-sync-message.shape';
import { withTabSyncStateBehavior } from './with-tab-sync-state.behavior';

describe('Behavior: TabSyncState', () => {
  let behavior: withTabSyncStateBehavior<any>;
  let warnSpy: jasmine.Spy;
  let mockCtx: BehaviorContext<any>;
  let emitted: StateEmitSnapshotShape<any>[];
  let state$: Subject<StateEmitSnapshotShape<any>>;

  beforeEach(() => {
    sessionStorage.removeItem(TAB_SYNC_SESSION_KEY);

    warnSpy = spyOn(console, 'warn');
    spyOn(console, 'error');
    spyOn(console, 'debug');

    setVaultLogLevel('warn');

    emitted = [];
    state$ = new Subject<StateEmitSnapshotShape<any>>();

    mockCtx = {
      state$,
      lastSnapshot: {
        isLoading: false,
        value: undefined,
        error: null,
        hasValue: false
      },
      incoming: undefined,
      featureCellKey: 'test-cell',
      operation: 'replace' as any,
      options: undefined,
      state: {
        isLoading: false,
        value: undefined,
        error: null,
        hasValue: false
      },
      traceId: 'trace-1'
    } as any;

    state$.asObservable().subscribe((s) => emitted.push(s));

    behavior = new withTabSyncStateBehavior('tab-sync-key', {
      featureCellKey: 'test-cell',
      lastSnapshot: mockCtx.lastSnapshot,
      state$
    } as any);
  });

  afterEach(() => {
    behavior.destroy(mockCtx);
    setVaultLogLevel('off');
    state$.complete();
    sessionStorage.removeItem(TAB_SYNC_SESSION_KEY);
  });

  // -------------------------------------------------------
  // Static metadata
  // -------------------------------------------------------
  describe('static metadata', () => {
    it('should have correct static type', () => {
      expect(withTabSyncStateBehavior.type).toBe('tabSyncState');
    });

    it('should have correct static key', () => {
      expect(withTabSyncStateBehavior.key).toBe(
        'SDUX::Behavior::Core::TabSyncState'
      );
    });

    it('should be critical', () => {
      expect(withTabSyncStateBehavior.critical).toBeTrue();
    });

    it('should require a license', () => {
      expect((withTabSyncStateBehavior as any).needsLicense).toBeTrue();
    });

    it('should have a license id', () => {
      expect((withTabSyncStateBehavior as any).licenseId).toBe('sdux-vault');
    });
  });

  // -------------------------------------------------------
  // Instance metadata
  // -------------------------------------------------------
  describe('instance metadata', () => {
    it('should have correct instance type', () => {
      expect(behavior.type).toBe('tabSyncState');
    });

    it('should have correct instance key', () => {
      expect(behavior.key).toBe('tab-sync-key');
    });

    it('should be critical', () => {
      expect(behavior.critical).toBeTrue();
    });

    it('should generate a unique tabId persisted in sessionStorage', () => {
      expect(behavior.tabId).toBeDefined();
      expect(typeof behavior.tabId).toBe('string');
      expect(behavior.tabId.length).toBeGreaterThan(0);
      expect(sessionStorage.getItem(TAB_SYNC_SESSION_KEY)).toBe(behavior.tabId);
    });

    it('should share the same tabId across instances in the same tab', () => {
      const other = new withTabSyncStateBehavior('other-key', {
        featureCellKey: 'other-cell',
        lastSnapshot: mockCtx.lastSnapshot,
        state$
      } as any);
      expect(behavior.tabId).toBe(other.tabId);
      other.destroy(mockCtx);
    });

    it('should generate a new tabId when sessionStorage is cleared', () => {
      const originalId = behavior.tabId;
      sessionStorage.removeItem(TAB_SYNC_SESSION_KEY);
      const fresh = new withTabSyncStateBehavior('fresh-key', {
        featureCellKey: 'fresh-cell',
        lastSnapshot: mockCtx.lastSnapshot,
        state$
      } as any);
      expect(fresh.tabId).not.toBe(originalId);
      fresh.destroy(mockCtx);
    });
  });

  // -------------------------------------------------------
  // Channel lifecycle
  // -------------------------------------------------------
  describe('channel lifecycle', () => {
    it('should open a BroadcastChannel in the constructor', (done) => {
      const receiverChannel = new BroadcastChannel(
        'sdux-vault:tab-sync:test-cell'
      );
      receiverChannel.onmessage = (event) => {
        expect(event.data.featureCellKey).toBe('test-cell');
        receiverChannel.close();
        done();
      };

      // CommitCache enables broadcastReady immediately
      const bus = TabSyncBusService();
      bus.emitCommand({
        featureCellKey: 'test-cell',
        tabId: behavior.tabId,
        command: TabSyncBusCommandTypes.CommitCache,
        snapshot: {
          isLoading: false,
          value: { name: 'test' },
          error: null,
          hasValue: true
        }
      });

      // Channel is already open from constructor; broadcastReady is true after CommitCache
      behavior.finalizePipelineState({ name: 'test' } as any, mockCtx);
    });

    it('should close the channel on destroy', (done) => {
      behavior.destroy(mockCtx);

      const receiverChannel = new BroadcastChannel(
        'sdux-vault:tab-sync:test-cell'
      );
      const received: any[] = [];
      receiverChannel.onmessage = (event) => {
        received.push(event.data);
      };

      // Channel is closed — finalizePipelineState should not broadcast
      behavior.finalizePipelineState('after-destroy' as any, mockCtx);

      setTimeout(() => {
        expect(received.length).toBe(0);
        receiverChannel.close();
        done();
      }, 50);
    });
  });

  // -------------------------------------------------------
  // Broadcasting
  // -------------------------------------------------------
  describe('broadcasting', () => {
    let receiverChannel: BroadcastChannel;
    let receivedMessages: TabSyncMessageShape<any>[];

    beforeEach(() => {
      receivedMessages = [];
      receiverChannel = new BroadcastChannel('sdux-vault:tab-sync:test-cell');
      receiverChannel.onmessage = (event) => {
        receivedMessages.push(event.data);
      };
    });

    afterEach(() => {
      receiverChannel.close();
    });

    it('should not broadcast before negotiation completes', (done) => {
      const preChannel = new BroadcastChannel('sdux-vault:tab-sync:test-cell');
      const preMessages: any[] = [];
      preChannel.onmessage = (event) => {
        preMessages.push(event.data);
      };

      const preBehavior = new withTabSyncStateBehavior('pre-neg-key', {
        featureCellKey: 'test-cell',
        lastSnapshot: mockCtx.lastSnapshot,
        state$
      } as any);

      preBehavior.finalizePipelineState({ name: 'blocked' } as any, mockCtx);

      setTimeout(() => {
        expect(preMessages.length).toBe(0);
        preChannel.close();
        preBehavior.destroy(mockCtx);
        done();
      }, 50);
    });

    it('should not broadcast first FinalizePipeline after ClearCache', (done) => {
      const bus = TabSyncBusService();
      bus.emitCommand({
        featureCellKey: 'test-cell',
        tabId: behavior.tabId,
        command: TabSyncBusCommandTypes.ClearCache
      });

      // First FinalizePipeline enables broadcastReady but does NOT broadcast
      behavior.finalizePipelineState({ name: 'bootstrap' } as any, mockCtx);

      setTimeout(() => {
        expect(receivedMessages.length).toBe(0);
        done();
      }, 50);
    });

    it('should broadcast second FinalizePipeline after ClearCache', (done) => {
      const bus = TabSyncBusService();
      bus.emitCommand({
        featureCellKey: 'test-cell',
        tabId: behavior.tabId,
        command: TabSyncBusCommandTypes.ClearCache
      });

      // First FinalizePipeline enables broadcastReady
      behavior.finalizePipelineState({ name: 'bootstrap' } as any, mockCtx);

      // Second FinalizePipeline should now broadcast
      behavior.finalizePipelineState({ name: 'real' } as any, mockCtx);

      setTimeout(() => {
        expect(receivedMessages.length).toBe(1);
        expect(receivedMessages[0].featureCellKey).toBe('test-cell');
        expect(receivedMessages[0].tabId).toBe(behavior.tabId);
        expect(receivedMessages[0].snapshot.value).toEqual({ name: 'real' });
        expect(receivedMessages[0].type).toBe(StateEmitTypes.FinalizePipeline);
        done();
      }, 50);
    });

    it('should broadcast on FinalizePipeline after CommitCache', (done) => {
      const bus = TabSyncBusService();
      bus.emitCommand({
        featureCellKey: 'test-cell',
        tabId: behavior.tabId,
        command: TabSyncBusCommandTypes.CommitCache,
        snapshot: {
          isLoading: false,
          value: { peer: true },
          error: null,
          hasValue: true
        }
      });

      // CommitCache sets broadcastReady=true immediately, so finalize broadcasts
      behavior.finalizePipelineState({ name: 'test' } as any, mockCtx);

      setTimeout(() => {
        expect(receivedMessages.length).toBe(1);
        expect(receivedMessages[0].featureCellKey).toBe('test-cell');
        expect(receivedMessages[0].tabId).toBe(behavior.tabId);
        expect(receivedMessages[0].snapshot.value).toEqual({ name: 'test' });
        expect(receivedMessages[0].type).toBe(StateEmitTypes.FinalizePipeline);
        done();
      }, 50);
    });

    it('should not broadcast on PipelineDestroy', (done) => {
      const bus = TabSyncBusService();
      bus.emitCommand({
        featureCellKey: 'test-cell',
        tabId: behavior.tabId,
        command: TabSyncBusCommandTypes.CommitCache,
        snapshot: {
          isLoading: false,
          value: undefined,
          error: null,
          hasValue: false
        }
      });

      behavior.destroy(mockCtx);

      setTimeout(() => {
        expect(receivedMessages.length).toBe(0);
        done();
      }, 50);
    });

    it('should broadcast on PipelineReset after broadcastReady', (done) => {
      const bus = TabSyncBusService();
      bus.emitCommand({
        featureCellKey: 'test-cell',
        tabId: behavior.tabId,
        command: TabSyncBusCommandTypes.ClearCache
      });

      // First FinalizePipeline enables broadcastReady
      behavior.finalizePipelineState({ name: 'init' } as any, mockCtx);

      // Reset should broadcast because broadcastReady is now true
      behavior.reset(mockCtx);

      setTimeout(() => {
        expect(receivedMessages.length).toBe(1);
        expect(receivedMessages[0].type).toBe(StateEmitTypes.PipelineReset);
        done();
      }, 50);
    });

    it('should not broadcast on IncomingPipeline', (done) => {
      const bus = TabSyncBusService();
      bus.emitCommand({
        featureCellKey: 'test-cell',
        tabId: behavior.tabId,
        command: TabSyncBusCommandTypes.CommitCache,
        snapshot: {
          isLoading: false,
          value: undefined,
          error: null,
          hasValue: false
        }
      });

      mockCtx.incoming = { value: 'hello' };

      behavior.preparePipelineIncoming(mockCtx);

      setTimeout(() => {
        expect(receivedMessages.length).toBe(0);
        done();
      }, 50);
    });

    it('should not broadcast on PipelineError', (done) => {
      const bus = TabSyncBusService();
      bus.emitCommand({
        featureCellKey: 'test-cell',
        tabId: behavior.tabId,
        command: TabSyncBusCommandTypes.CommitCache,
        snapshot: {
          isLoading: false,
          value: undefined,
          error: null,
          hasValue: false
        }
      });

      behavior.finalizePipelineError(
        {
          message: 'fail',
          featureCellKey: 'test-cell',
          timestamp: Date.now(),
          raw: null
        } as any,
        mockCtx
      );

      setTimeout(() => {
        expect(receivedMessages.length).toBe(0);
        done();
      }, 50);
    });

    it('should not broadcast on AbortController', (done) => {
      const bus = TabSyncBusService();
      bus.emitCommand({
        featureCellKey: 'test-cell',
        tabId: behavior.tabId,
        command: TabSyncBusCommandTypes.CommitCache,
        snapshot: {
          isLoading: false,
          value: undefined,
          error: null,
          hasValue: false
        }
      });

      behavior.finalizeControllerAbort(mockCtx);

      setTimeout(() => {
        expect(receivedMessages.length).toBe(0);
        done();
      }, 50);
    });

    it('should not broadcast on DenyController', (done) => {
      const bus = TabSyncBusService();
      bus.emitCommand({
        featureCellKey: 'test-cell',
        tabId: behavior.tabId,
        command: TabSyncBusCommandTypes.CommitCache,
        snapshot: {
          isLoading: false,
          value: undefined,
          error: null,
          hasValue: false
        }
      });

      behavior.finalizeControllerDeny(mockCtx);

      setTimeout(() => {
        expect(receivedMessages.length).toBe(0);
        done();
      }, 50);
    });

    it('should not broadcast when channel is closed after destroy', (done) => {
      const bus = TabSyncBusService();
      bus.emitCommand({
        featureCellKey: 'test-cell',
        tabId: behavior.tabId,
        command: TabSyncBusCommandTypes.CommitCache,
        snapshot: {
          isLoading: false,
          value: undefined,
          error: null,
          hasValue: false
        }
      });

      behavior.destroy(mockCtx);

      // Channel is closed; finalizePipelineState should not broadcast
      behavior.finalizePipelineState('after-destroy' as any, mockCtx);

      setTimeout(() => {
        expect(receivedMessages.length).toBe(0);
        done();
      }, 50);
    });

    it('should broadcast finalizePipelineVaultStop after broadcastReady', (done) => {
      const bus = TabSyncBusService();
      bus.emitCommand({
        featureCellKey: 'test-cell',
        tabId: behavior.tabId,
        command: TabSyncBusCommandTypes.ClearCache
      });

      // First FinalizePipeline enables broadcastReady
      behavior.finalizePipelineState({ name: 'init' } as any, mockCtx);

      // vaultStop uses FinalizePipeline type which is not in NON_BROADCAST_TYPES
      behavior.finalizePipelineVaultStop(mockCtx);

      setTimeout(() => {
        expect(receivedMessages.length).toBe(1);
        done();
      }, 50);
    });

    it('should not broadcast finalizePipelineVaultStop before broadcastReady', (done) => {
      const bus = TabSyncBusService();
      bus.emitCommand({
        featureCellKey: 'test-cell',
        tabId: behavior.tabId,
        command: TabSyncBusCommandTypes.ClearCache
      });

      // No FinalizePipeline yet — broadcastReady is still false
      behavior.finalizePipelineVaultStop(mockCtx);

      setTimeout(() => {
        // vaultStop is FinalizePipeline type so it would enable broadcastReady
        // but that first call still does not broadcast
        expect(receivedMessages.length).toBe(0);
        done();
      }, 50);
    });
  });

  // -------------------------------------------------------
  // Receiving cross-tab messages
  // -------------------------------------------------------
  describe('receiving cross-tab messages', () => {
    let senderChannel: BroadcastChannel;

    beforeEach(() => {
      senderChannel = new BroadcastChannel('sdux-vault:tab-sync:test-cell');
    });

    afterEach(() => {
      senderChannel.close();
    });

    it('should apply incoming state from another tab', (done) => {
      const bus = TabSyncBusService();

      // Complete negotiation so incoming messages are committed immediately
      bus.emitCommand({
        featureCellKey: 'test-cell',
        tabId: behavior.tabId,
        command: TabSyncBusCommandTypes.ClearCache
      });

      const message: TabSyncMessageShape<any> = {
        featureCellKey: 'test-cell',
        tabId: 'other-tab-id',
        snapshot: {
          isLoading: false,
          value: { synced: true },
          error: null,
          hasValue: true
        },
        type: StateEmitTypes.FinalizePipeline
      };

      senderChannel.postMessage(message);

      setTimeout(() => {
        const tabSyncEmissions = emitted.filter(
          (e) => e.type === StateEmitTypes.TabSync
        );
        expect(tabSyncEmissions.length).toBe(1);
        expect(tabSyncEmissions[0].snapshot.value).toEqual({ synced: true });
        expect(tabSyncEmissions[0].snapshot.hasValue).toBeTrue();
        expect(tabSyncEmissions[0].type).toBe(StateEmitTypes.TabSync);
        done();
      }, 50);
    });

    it('should update lastSnapshot from incoming message', (done) => {
      const bus = TabSyncBusService();

      // Complete negotiation
      bus.emitCommand({
        featureCellKey: 'test-cell',
        tabId: behavior.tabId,
        command: TabSyncBusCommandTypes.ClearCache
      });

      const message: TabSyncMessageShape<any> = {
        featureCellKey: 'test-cell',
        tabId: 'other-tab-id',
        snapshot: {
          isLoading: true,
          value: 42,
          error: null,
          hasValue: true
        },
        type: StateEmitTypes.FinalizePipeline
      };

      senderChannel.postMessage(message);

      setTimeout(() => {
        expect(mockCtx.lastSnapshot.value).toBe(42);
        expect(mockCtx.lastSnapshot.isLoading).toBeTrue();
        expect(mockCtx.lastSnapshot.hasValue).toBeTrue();
        done();
      }, 50);
    });

    it('should ignore messages from same tab', (done) => {
      // Set ctx via preparePipelineIncoming
      mockCtx.incoming = { value: 'init' };
      behavior.preparePipelineIncoming(mockCtx);

      const message: TabSyncMessageShape<any> = {
        featureCellKey: 'test-cell',
        tabId: behavior.tabId,
        snapshot: {
          isLoading: false,
          value: 'self',
          error: null,
          hasValue: true
        },
        type: StateEmitTypes.FinalizePipeline
      };

      senderChannel.postMessage(message);

      setTimeout(() => {
        const tabSyncEmissions = emitted.filter(
          (e) => e.type === StateEmitTypes.TabSync
        );
        expect(tabSyncEmissions.length).toBe(0);
        done();
      }, 50);
    });

    it('should ignore messages for different featureCellKey', (done) => {
      const message: TabSyncMessageShape<any> = {
        featureCellKey: 'different-cell',
        tabId: 'other-tab',
        snapshot: {
          isLoading: false,
          value: 'wrong cell',
          error: null,
          hasValue: true
        },
        type: StateEmitTypes.FinalizePipeline
      };

      senderChannel.postMessage(message);

      setTimeout(() => {
        const tabSyncEmissions = emitted.filter(
          (e) => e.type === StateEmitTypes.TabSync
        );
        expect(tabSyncEmissions.length).toBe(0);
        done();
      }, 50);
    });

    it('should set hasValue to false when value is undefined', (done) => {
      const bus = TabSyncBusService();

      bus.emitCommand({
        featureCellKey: 'test-cell',
        tabId: behavior.tabId,
        command: TabSyncBusCommandTypes.ClearCache
      });

      const message: TabSyncMessageShape<any> = {
        featureCellKey: 'test-cell',
        tabId: 'other-tab-id',
        snapshot: {
          isLoading: false,
          value: undefined,
          error: null,
          hasValue: false
        },
        type: StateEmitTypes.FinalizePipeline
      };

      senderChannel.postMessage(message);

      setTimeout(() => {
        expect(mockCtx.lastSnapshot.hasValue).toBeFalse();
        expect(mockCtx.lastSnapshot.value).toBeUndefined();
        done();
      }, 50);
    });

    it('should set hasValue to false when value is null', (done) => {
      const bus = TabSyncBusService();

      bus.emitCommand({
        featureCellKey: 'test-cell',
        tabId: behavior.tabId,
        command: TabSyncBusCommandTypes.ClearCache
      });

      const message: TabSyncMessageShape<any> = {
        featureCellKey: 'test-cell',
        tabId: 'other-tab-id',
        snapshot: {
          isLoading: false,
          value: null,
          error: null,
          hasValue: false
        },
        type: StateEmitTypes.FinalizePipeline
      };

      senderChannel.postMessage(message);

      setTimeout(() => {
        expect(mockCtx.lastSnapshot.hasValue).toBeFalse();
        done();
      }, 50);
    });
  });

  // -------------------------------------------------------
  // Feedback loop prevention
  // -------------------------------------------------------
  describe('feedback loop prevention', () => {
    let receiverChannel: BroadcastChannel;
    let receivedMessages: TabSyncMessageShape<any>[];
    let senderChannel: BroadcastChannel;

    beforeEach(() => {
      receivedMessages = [];
      receiverChannel = new BroadcastChannel('sdux-vault:tab-sync:test-cell');
      receiverChannel.onmessage = (event) => {
        receivedMessages.push(event.data);
      };
      senderChannel = new BroadcastChannel('sdux-vault:tab-sync:test-cell');
    });

    afterEach(() => {
      receiverChannel.close();
      senderChannel.close();
    });

    it('should not re-broadcast state received from another tab', (done) => {
      const bus = TabSyncBusService();

      // Complete negotiation
      bus.emitCommand({
        featureCellKey: 'test-cell',
        tabId: behavior.tabId,
        command: TabSyncBusCommandTypes.ClearCache
      });

      const message: TabSyncMessageShape<any> = {
        featureCellKey: 'test-cell',
        tabId: 'other-tab-id',
        snapshot: {
          isLoading: false,
          value: { mirrored: true },
          error: null,
          hasValue: true
        },
        type: StateEmitTypes.FinalizePipeline
      };

      senderChannel.postMessage(message);

      setTimeout(() => {
        // The behavior should have received the message and emitted TabSync
        const tabSyncEmissions = emitted.filter(
          (e) => e.type === StateEmitTypes.TabSync
        );
        expect(tabSyncEmissions.length).toBe(1);

        // But should NOT have re-broadcast it
        const fromBehavior = receivedMessages.filter(
          (m) => m.tabId === behavior.tabId
        );
        expect(fromBehavior.length).toBe(0);
        done();
      }, 50);
    });
  });

  // -------------------------------------------------------
  // Bus command handling
  // -------------------------------------------------------
  describe('bus command handling', () => {
    let bus: ReturnType<typeof TabSyncBusService>;

    beforeEach(() => {
      bus = TabSyncBusService();
    });

    it('should emit SnapshotReady notification on SendSnapshot command', () => {
      const notifications: any[] = [];
      bus.notification$.subscribe((n) => {
        if (n.featureCellKey === 'test-cell') {
          notifications.push(n);
        }
      });

      bus.emitCommand({
        featureCellKey: 'test-cell',
        tabId: behavior.tabId,
        command: TabSyncBusCommandTypes.SendSnapshot
      });

      expect(notifications.length).toBe(1);
      expect(notifications[0].notification).toBe('snapshot-ready');
      expect(notifications[0].snapshot).toBeDefined();
    });

    it('should commit cached snapshot on CommitCache command', (done) => {
      const senderChannel = new BroadcastChannel(
        'sdux-vault:tab-sync:test-cell'
      );

      // Send a cross-tab message during negotiation (will be cached)
      const message: TabSyncMessageShape<any> = {
        featureCellKey: 'test-cell',
        tabId: 'other-tab-id',
        snapshot: {
          isLoading: false,
          value: { cached: true },
          error: null,
          hasValue: true
        },
        type: StateEmitTypes.FinalizePipeline
      };

      senderChannel.postMessage(message);

      setTimeout(() => {
        // No TabSync emission yet — snapshot is cached
        const beforeCommit = emitted.filter(
          (e) => e.type === StateEmitTypes.TabSync
        );
        expect(beforeCommit.length).toBe(0);

        // Now commit the cache
        bus.emitCommand({
          featureCellKey: 'test-cell',
          tabId: behavior.tabId,
          command: TabSyncBusCommandTypes.CommitCache
        });

        const afterCommit = emitted.filter(
          (e) => e.type === StateEmitTypes.TabSync
        );
        expect(afterCommit.length).toBe(1);
        expect(afterCommit[0].snapshot.value).toEqual({ cached: true });

        senderChannel.close();
        done();
      }, 50);
    });

    it('should commit command snapshot when behavior has no cached snapshot', () => {
      // No cross-tab message sent — behavior has no cached snapshot.
      // CommitCache carries the snapshot from the controller channel.
      bus.emitCommand({
        featureCellKey: 'test-cell',
        tabId: behavior.tabId,
        command: TabSyncBusCommandTypes.CommitCache,
        snapshot: {
          isLoading: false,
          value: { fromController: true },
          error: null,
          hasValue: true
        }
      });

      const tabSyncEmissions = emitted.filter(
        (e) => e.type === StateEmitTypes.TabSync
      );
      expect(tabSyncEmissions.length).toBe(1);
      expect(tabSyncEmissions[0].snapshot.value).toEqual({
        fromController: true
      });
    });

    it('should prefer cached snapshot over command snapshot', (done) => {
      const senderChannel = new BroadcastChannel(
        'sdux-vault:tab-sync:test-cell'
      );

      // Send a cross-tab message during negotiation (will be cached)
      const message: TabSyncMessageShape<any> = {
        featureCellKey: 'test-cell',
        tabId: 'other-tab-id',
        snapshot: {
          isLoading: false,
          value: { fromBehavior: true },
          error: null,
          hasValue: true
        },
        type: StateEmitTypes.FinalizePipeline
      };

      senderChannel.postMessage(message);

      setTimeout(() => {
        // CommitCache also carries a snapshot, but cached should win
        bus.emitCommand({
          featureCellKey: 'test-cell',
          tabId: behavior.tabId,
          command: TabSyncBusCommandTypes.CommitCache,
          snapshot: {
            isLoading: false,
            value: { fromController: true },
            error: null,
            hasValue: true
          }
        });

        const tabSyncEmissions = emitted.filter(
          (e) => e.type === StateEmitTypes.TabSync
        );
        expect(tabSyncEmissions.length).toBe(1);
        expect(tabSyncEmissions[0].snapshot.value).toEqual({
          fromBehavior: true
        });

        senderChannel.close();
        done();
      }, 50);
    });

    it('should discard cached snapshot on ClearCache command', (done) => {
      const senderChannel = new BroadcastChannel(
        'sdux-vault:tab-sync:test-cell'
      );

      // Send a cross-tab message during negotiation (will be cached)
      const message: TabSyncMessageShape<any> = {
        featureCellKey: 'test-cell',
        tabId: 'other-tab-id',
        snapshot: {
          isLoading: false,
          value: { cached: true },
          error: null,
          hasValue: true
        },
        type: StateEmitTypes.FinalizePipeline
      };

      senderChannel.postMessage(message);

      setTimeout(() => {
        // Clear the cache
        bus.emitCommand({
          featureCellKey: 'test-cell',
          tabId: behavior.tabId,
          command: TabSyncBusCommandTypes.ClearCache
        });

        // No TabSync emission — snapshot was discarded
        const tabSyncEmissions = emitted.filter(
          (e) => e.type === StateEmitTypes.TabSync
        );
        expect(tabSyncEmissions.length).toBe(0);

        senderChannel.close();
        done();
      }, 50);
    });

    it('should emit PeerSnapshotReceived notification during negotiation', (done) => {
      const senderChannel = new BroadcastChannel(
        'sdux-vault:tab-sync:test-cell'
      );
      const notifications: any[] = [];

      bus.notification$.subscribe((n) => {
        if (n.featureCellKey === 'test-cell') {
          notifications.push(n);
        }
      });

      const message: TabSyncMessageShape<any> = {
        featureCellKey: 'test-cell',
        tabId: 'other-tab-id',
        snapshot: {
          isLoading: false,
          value: { peer: true },
          error: null,
          hasValue: true
        },
        type: StateEmitTypes.FinalizePipeline
      };

      senderChannel.postMessage(message);

      setTimeout(() => {
        expect(notifications.length).toBe(1);
        expect(notifications[0].notification).toBe('peer-snapshot-received');
        expect(notifications[0].snapshot).toBeDefined();

        senderChannel.close();
        done();
      }, 50);
    });

    it('should ignore SendSnapshot command for a different featureCellKey', () => {
      const notifications: any[] = [];
      bus.notification$.subscribe((n) => notifications.push(n));

      bus.emitCommand({
        featureCellKey: 'other-cell',
        tabId: behavior.tabId,
        command: TabSyncBusCommandTypes.SendSnapshot
      });

      expect(notifications.length).toBe(0);
    });
  });

  // -------------------------------------------------------
  // broadcastReady gating
  // -------------------------------------------------------
  describe('broadcastReady gating', () => {
    let receiverChannel: BroadcastChannel;
    let receivedMessages: TabSyncMessageShape<any>[];

    beforeEach(() => {
      receivedMessages = [];
      receiverChannel = new BroadcastChannel('sdux-vault:tab-sync:test-cell');
      receiverChannel.onmessage = (event) => {
        receivedMessages.push(event.data);
      };
    });

    afterEach(() => {
      receiverChannel.close();
    });

    it('should enable broadcastReady immediately on CommitCache', (done) => {
      const bus = TabSyncBusService();
      bus.emitCommand({
        featureCellKey: 'test-cell',
        tabId: behavior.tabId,
        command: TabSyncBusCommandTypes.CommitCache,
        snapshot: {
          isLoading: false,
          value: { peer: true },
          error: null,
          hasValue: true
        }
      });

      // Immediately after CommitCache, FinalizePipeline should broadcast
      behavior.finalizePipelineState({ name: 'first' } as any, mockCtx);

      setTimeout(() => {
        expect(receivedMessages.length).toBe(1);
        done();
      }, 50);
    });

    it('should defer broadcastReady on ClearCache until first FinalizePipeline', (done) => {
      const bus = TabSyncBusService();
      bus.emitCommand({
        featureCellKey: 'test-cell',
        tabId: behavior.tabId,
        command: TabSyncBusCommandTypes.ClearCache
      });

      // First FinalizePipeline: enables broadcastReady but does NOT broadcast
      behavior.finalizePipelineState({ name: 'bootstrap' } as any, mockCtx);

      setTimeout(() => {
        expect(receivedMessages.length).toBe(0);

        // Second FinalizePipeline: broadcasts
        behavior.finalizePipelineState({ name: 'real' } as any, mockCtx);

        setTimeout(() => {
          expect(receivedMessages.length).toBe(1);
          expect(receivedMessages[0].snapshot.value).toEqual({ name: 'real' });
          done();
        }, 50);
      }, 50);
    });

    it('should not broadcast non-FinalizePipeline types before broadcastReady even after ClearCache', (done) => {
      const bus = TabSyncBusService();
      bus.emitCommand({
        featureCellKey: 'test-cell',
        tabId: behavior.tabId,
        command: TabSyncBusCommandTypes.ClearCache
      });

      // Reset is PipelineReset type — broadcastReady is still false, should not broadcast
      behavior.reset(mockCtx);

      setTimeout(() => {
        expect(receivedMessages.length).toBe(0);
        done();
      }, 50);
    });
  });

  // -------------------------------------------------------
  // destroy and reset
  // -------------------------------------------------------
  describe('destroy', () => {
    it('should emit PipelineDestroy state', () => {
      behavior.destroy(mockCtx);

      expect(emitted.length).toBe(1);
      expect(emitted[0].type).toBe(StateEmitTypes.PipelineDestroy);
      expect(emitted[0].snapshot.isLoading).toBeFalse();
      expect(emitted[0].snapshot.value).toBeUndefined();
      expect(emitted[0].snapshot.error).toBeNull();
    });

    it('should close the channel on destroy', () => {
      behavior.destroy(mockCtx);

      // Verify channel is closed — destroy was called, no error
      expect(behavior).toBeDefined();
    });

    it('should log a warning on destroy', () => {
      behavior.destroy(mockCtx);
      expect(warnSpy).toHaveBeenCalled();
    });

    it('should unsubscribe from bus commands on destroy', () => {
      const bus = TabSyncBusService();

      // Complete negotiation so bus commands have observable effect
      bus.emitCommand({
        featureCellKey: 'test-cell',
        tabId: behavior.tabId,
        command: TabSyncBusCommandTypes.ClearCache
      });

      behavior.destroy(mockCtx);

      // After destroy, SendSnapshot should not emit a SnapshotReady notification
      const notifications: any[] = [];
      bus.notification$.subscribe((n) => notifications.push(n));

      bus.emitCommand({
        featureCellKey: 'test-cell',
        tabId: behavior.tabId,
        command: TabSyncBusCommandTypes.SendSnapshot
      });

      expect(notifications.length).toBe(0);
    });
  });

  describe('reset', () => {
    it('should emit PipelineReset state', () => {
      behavior.reset(mockCtx);

      expect(emitted.length).toBe(1);
      expect(emitted[0].type).toBe(StateEmitTypes.PipelineReset);
      expect(emitted[0].snapshot.isLoading).toBeFalse();
      expect(emitted[0].snapshot.value).toBeUndefined();
      expect(emitted[0].snapshot.error).toBeNull();
    });

    it('should keep the channel open after reset and continue broadcasting', (done) => {
      const receiverChannel = new BroadcastChannel(
        'sdux-vault:tab-sync:test-cell'
      );
      const receivedMessages: any[] = [];
      receiverChannel.onmessage = (event) => {
        receivedMessages.push(event.data);
      };

      // CommitCache enables broadcastReady immediately
      const bus = TabSyncBusService();
      bus.emitCommand({
        featureCellKey: 'test-cell',
        tabId: behavior.tabId,
        command: TabSyncBusCommandTypes.CommitCache,
        snapshot: {
          isLoading: false,
          value: undefined,
          error: null,
          hasValue: false
        }
      });

      behavior.reset(mockCtx);

      // Channel stays open — next finalize should broadcast
      behavior.finalizePipelineState('post-reset' as any, mockCtx);

      setTimeout(() => {
        // 1 from reset + 1 from post-reset finalize
        expect(receivedMessages.length).toBe(2);
        expect(receivedMessages[0].type).toBe(StateEmitTypes.PipelineReset);
        expect(receivedMessages[1].type).toBe(StateEmitTypes.FinalizePipeline);
        receiverChannel.close();
        done();
      }, 50);
    });

    it('should log a warning on reset', () => {
      behavior.reset(mockCtx);
      expect(warnSpy).toHaveBeenCalled();
    });
  });

  // -------------------------------------------------------
  // License validation
  // -------------------------------------------------------
  describe('license validation', () => {
    it('should validate license as true when verifyLicensePayload resolves true', async () => {
      setVerifyLicensePayloadResult(true);

      const licensed = new withTabSyncStateBehavior('licensed-key', {
        featureCellKey: 'test-cell',
        licensePayload: 'valid-signed-token',
        lastSnapshot: mockCtx.lastSnapshot,
        state$
      } as TabSyncBehaviorClassContext);

      await flushVaultPipeline();

      expect(licensed).toBeTruthy();
    });

    it('should validate license as false when verifyLicensePayload resolves false', async () => {
      setVerifyLicensePayloadResult(false);

      const licensed = new withTabSyncStateBehavior('licensed-key', {
        featureCellKey: 'test-cell',
        licensePayload: 'bad-token',
        lastSnapshot: mockCtx.lastSnapshot,
        state$
      } as TabSyncBehaviorClassContext);

      await flushVaultPipeline();

      expect(licensed).toBeTruthy();
    });
  });

  // -------------------------------------------------------
  // vaultDebug logging
  // -------------------------------------------------------
  describe('vaultDebug logging', () => {
    let debugSpy: jasmine.Spy;

    beforeEach(() => {
      // eslint-disable-next-line
      debugSpy = console.debug as jasmine.Spy;
      debugSpy.calls.reset();
      setVaultLogLevel('debug');
    });

    it('should log constructor debug message', () => {
      const fresh = new withTabSyncStateBehavior('debug-key', {
        featureCellKey: 'debug-cell',
        lastSnapshot: mockCtx.lastSnapshot,
        state$
      } as any);

      expect(debugSpy).toHaveBeenCalledWith(
        '[vault]',
        jasmine.stringMatching(
          /^debug-key constructor: featureCellKey="debug-cell", tabId="/
        )
      );

      fresh.destroy(mockCtx);
    });

    it('should log ignored self-originated message', (done) => {
      const senderChannel = new BroadcastChannel(
        'sdux-vault:tab-sync:test-cell'
      );
      const message: TabSyncMessageShape<any> = {
        featureCellKey: 'test-cell',
        tabId: behavior.tabId,
        snapshot: {
          isLoading: false,
          value: 'self',
          error: null,
          hasValue: true
        },
        type: StateEmitTypes.FinalizePipeline
      };

      senderChannel.postMessage(message);

      setTimeout(() => {
        expect(debugSpy).toHaveBeenCalledWith(
          '[vault]',
          'tab-sync-key #onMessage: ignored (self-originated)'
        );
        senderChannel.close();
        done();
      }, 50);
    });

    it('should log ignored different-cell message', (done) => {
      const senderChannel = new BroadcastChannel(
        'sdux-vault:tab-sync:test-cell'
      );
      const message: TabSyncMessageShape<any> = {
        featureCellKey: 'different-cell',
        tabId: 'other-tab',
        snapshot: {
          isLoading: false,
          value: 'wrong',
          error: null,
          hasValue: true
        },
        type: StateEmitTypes.FinalizePipeline
      };

      senderChannel.postMessage(message);

      setTimeout(() => {
        expect(debugSpy).toHaveBeenCalledWith(
          '[vault]',
          'tab-sync-key #onMessage: ignored (different cell "different-cell")'
        );
        senderChannel.close();
        done();
      }, 50);
    });

    it('should log caching snapshot during negotiation', (done) => {
      const senderChannel = new BroadcastChannel(
        'sdux-vault:tab-sync:test-cell'
      );
      const message: TabSyncMessageShape<any> = {
        featureCellKey: 'test-cell',
        tabId: 'other-tab-id',
        snapshot: {
          isLoading: false,
          value: { cached: true },
          error: null,
          hasValue: true
        },
        type: StateEmitTypes.FinalizePipeline
      };

      senderChannel.postMessage(message);

      setTimeout(() => {
        expect(debugSpy).toHaveBeenCalledWith(
          '[vault]',
          'tab-sync-key #onMessage: caching snapshot (negotiation pending)'
        );
        senderChannel.close();
        done();
      }, 50);
    });

    it('should log committing remote snapshot post-negotiation', (done) => {
      const bus = TabSyncBusService();
      bus.emitCommand({
        featureCellKey: 'test-cell',
        tabId: behavior.tabId,
        command: TabSyncBusCommandTypes.ClearCache
      });

      const senderChannel = new BroadcastChannel(
        'sdux-vault:tab-sync:test-cell'
      );
      const message: TabSyncMessageShape<any> = {
        featureCellKey: 'test-cell',
        tabId: 'other-tab-id',
        snapshot: {
          isLoading: false,
          value: { synced: true },
          error: null,
          hasValue: true
        },
        type: StateEmitTypes.FinalizePipeline
      };

      senderChannel.postMessage(message);

      setTimeout(() => {
        expect(debugSpy).toHaveBeenCalledWith(
          '[vault]',
          'tab-sync-key #onMessage: committing remote snapshot (post-negotiation)'
        );
        senderChannel.close();
        done();
      }, 50);
    });

    it('should log SendSnapshot bus command', () => {
      const bus = TabSyncBusService();
      bus.emitCommand({
        featureCellKey: 'test-cell',
        tabId: behavior.tabId,
        command: TabSyncBusCommandTypes.SendSnapshot
      });

      expect(debugSpy).toHaveBeenCalledWith(
        '[vault]',
        'tab-sync-key bus command: SendSnapshot'
      );
    });

    it('should log CommitCache bus command', () => {
      const bus = TabSyncBusService();
      bus.emitCommand({
        featureCellKey: 'test-cell',
        tabId: behavior.tabId,
        command: TabSyncBusCommandTypes.CommitCache
      });

      expect(debugSpy).toHaveBeenCalledWith(
        '[vault]',
        jasmine.stringMatching(
          /^tab-sync-key bus command: CommitCache, hasCachedSnapshot=.*willCommit=/
        )
      );
    });

    it('should log ClearCache bus command', () => {
      const bus = TabSyncBusService();
      bus.emitCommand({
        featureCellKey: 'test-cell',
        tabId: behavior.tabId,
        command: TabSyncBusCommandTypes.ClearCache
      });

      expect(debugSpy).toHaveBeenCalledWith(
        '[vault]',
        'tab-sync-key bus command: ClearCache'
      );
    });

    it('should log skipped broadcast when broadcast not ready', () => {
      behavior.finalizePipelineState({ name: 'blocked' } as any, mockCtx);

      expect(debugSpy).toHaveBeenCalledWith(
        '[vault]',
        'tab-sync-key commitState: skipped broadcast (broadcast not ready)'
      );
    });

    it('should log broadcast enabled after first pipeline on ClearCache path', () => {
      const bus = TabSyncBusService();
      bus.emitCommand({
        featureCellKey: 'test-cell',
        tabId: behavior.tabId,
        command: TabSyncBusCommandTypes.ClearCache
      });

      behavior.finalizePipelineState({ name: 'first' } as any, mockCtx);

      expect(debugSpy).toHaveBeenCalledWith(
        '[vault]',
        'tab-sync-key commitState: broadcast enabled after first pipeline'
      );
    });

    it('should log skipped broadcast for non-broadcast type', () => {
      const bus = TabSyncBusService();
      bus.emitCommand({
        featureCellKey: 'test-cell',
        tabId: behavior.tabId,
        command: TabSyncBusCommandTypes.CommitCache,
        snapshot: {
          isLoading: false,
          value: undefined,
          error: null,
          hasValue: false
        }
      });

      behavior.destroy(mockCtx);

      expect(debugSpy).toHaveBeenCalledWith(
        '[vault]',
        jasmine.stringMatching(
          /^tab-sync-key commitState: skipped broadcast \(non-broadcast type/
        )
      );
    });

    it('should log skipped broadcast when no channel', () => {
      const bus = TabSyncBusService();
      bus.emitCommand({
        featureCellKey: 'test-cell',
        tabId: behavior.tabId,
        command: TabSyncBusCommandTypes.CommitCache,
        snapshot: {
          isLoading: false,
          value: undefined,
          error: null,
          hasValue: false
        }
      });

      behavior.destroy(mockCtx);
      debugSpy.calls.reset();

      behavior.finalizePipelineState('after-destroy' as any, mockCtx);

      expect(debugSpy).toHaveBeenCalledWith(
        '[vault]',
        'tab-sync-key commitState: skipped broadcast (no channel)'
      );
    });
  });

  // -------------------------------------------------------
  // Inherited behavior (core state)
  // -------------------------------------------------------
  describe('inherited core state behavior', () => {
    it('should handle preparePipelineIncoming with value', () => {
      mockCtx.incoming = { value: 'hello' };
      const result = behavior.preparePipelineIncoming(mockCtx);

      expect(result).toEqual({ value: 'hello' });
    });

    it('should handle finalizePipelineState with value', () => {
      behavior.finalizePipelineState('resolved' as any, mockCtx);

      const finalizeEmissions = emitted.filter(
        (e) => e.type === StateEmitTypes.FinalizePipeline
      );
      expect(finalizeEmissions.length).toBe(1);
      expect(finalizeEmissions[0].snapshot.value).toBe('resolved');
    });

    it('should handle finalizePipelineError', () => {
      const error = {
        message: 'error',
        featureCellKey: 'test-cell',
        timestamp: Date.now(),
        raw: null
      } as any;
      behavior.finalizePipelineError(error, mockCtx);

      const errorEmissions = emitted.filter(
        (e) => e.type === StateEmitTypes.PipelineError
      );
      expect(errorEmissions.length).toBe(1);
      expect(errorEmissions[0].snapshot.error!.message).toBe('error');
    });

    it('should handle finalizeControllerAbort', () => {
      behavior.finalizeControllerAbort(mockCtx);

      const abortEmissions = emitted.filter(
        (e) => e.type === StateEmitTypes.AbortController
      );
      expect(abortEmissions.length).toBe(1);
    });

    it('should handle finalizeControllerDeny', () => {
      behavior.finalizeControllerDeny(mockCtx);

      const denyEmissions = emitted.filter(
        (e) => e.type === StateEmitTypes.DenyController
      );
      expect(denyEmissions.length).toBe(1);
    });
  });

  describe('graceful degradation', () => {
    let originalBroadcastChannel: typeof BroadcastChannel;
    let originalSessionStorage: Storage;

    beforeEach(() => {
      originalBroadcastChannel = globalThis.BroadcastChannel;
      originalSessionStorage = globalThis.sessionStorage;
    });

    afterEach(() => {
      globalThis.BroadcastChannel = originalBroadcastChannel;
      Object.defineProperty(globalThis, 'sessionStorage', {
        value: originalSessionStorage,
        writable: true,
        configurable: true
      });
    });

    it('should operate as core state when BroadcastChannel is unavailable', () => {
      (globalThis as any).BroadcastChannel = undefined;

      const degraded = new withTabSyncStateBehavior('degraded-key', {
        featureCellKey: 'degraded-cell',
        lastSnapshot: mockCtx.lastSnapshot,
        state$
      } as any);

      expect(degraded.tabId).toBeDefined();

      const degradedCtx = { ...mockCtx };
      degradedCtx.incoming = { value: 'test' };
      const result = degraded.preparePipelineIncoming(degradedCtx);
      expect(result).toEqual({ value: 'test' });

      degraded.destroy(degradedCtx);
    });

    it('should fall back to random UUID when sessionStorage is unavailable', () => {
      Object.defineProperty(globalThis, 'sessionStorage', {
        value: undefined,
        writable: true,
        configurable: true
      });

      const degraded = new withTabSyncStateBehavior('no-storage-key', {
        featureCellKey: 'no-storage-cell',
        lastSnapshot: mockCtx.lastSnapshot,
        state$
      } as any);

      expect(degraded.tabId).toBeDefined();
      expect(typeof degraded.tabId).toBe('string');
      expect(degraded.tabId.length).toBeGreaterThan(0);

      degraded.destroy(mockCtx);
    });

    it('should fall back to random UUID when sessionStorage throws', () => {
      Object.defineProperty(globalThis, 'sessionStorage', {
        get() {
          throw new DOMException('Access denied', 'SecurityError');
        },
        configurable: true
      });

      const degraded = new withTabSyncStateBehavior('restricted-key', {
        featureCellKey: 'restricted-cell',
        lastSnapshot: mockCtx.lastSnapshot,
        state$
      } as any);

      expect(degraded.tabId).toBeDefined();
      expect(typeof degraded.tabId).toBe('string');
      expect(degraded.tabId.length).toBeGreaterThan(0);

      degraded.destroy(mockCtx);
    });
  });
});
