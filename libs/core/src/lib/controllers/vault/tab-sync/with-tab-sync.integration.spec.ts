import {
  BehaviorContext,
  ControllerMessageTypes,
  ControllerVote,
  ControllerVotes,
  setVaultLogLevel,
  StateEmitSnapshotShape,
  StateEmitTypes,
  StateSnapshotShape
} from '@sdux-vault/shared';
import { Subject } from 'rxjs';
import { withTabSyncStateBehavior } from '../../../behaviors/vault/with-tab-sync-state/with-tab-sync-state.behavior';
import { TAB_SYNC_SESSION_KEY } from '../../../constants/tab-sync-session-key.constant';
import { TAB_SYNC_CTRL_CHANNEL_PREFIX } from './constants/tab-sync-ctrl-channel-prefix.constant';
import { TabSyncBusService } from './services/tab-sync-bus.service';
import { TabSyncBusCommandShape } from './shapes/tab-sync-bus-command.shape';
import { TabSyncBusNotificationShape } from './shapes/tab-sync-bus-notification.shape';
import { TabSyncChannelMessageShape } from './shapes/tab-sync-channel-message.shape';
import { TabSyncBusCommandTypes } from './types/tab-sync-bus-command.type';
import { TabSyncBusNotificationTypes } from './types/tab-sync-bus-notification.type';
import { TabSyncChannelMessageTypes } from './types/tab-sync-channel-message.type';
import { withTabSyncController } from './with-tab-sync.controller';

/**
 * Integration tests for the full TabSync system:
 * Controller ↔ Bus ↔ Behavior ↔ BroadcastChannel
 *
 * These tests simulate real multi-tab scenarios by creating
 * paired controller+behavior instances that communicate through
 * shared BroadcastChannels and the singleton TabSyncBus.
 */
describe('Integration: TabSync Controller + Behavior', () => {
  const featureCellKey = 'integration-cell';
  const ctrlChannelName = `${TAB_SYNC_CTRL_CHANNEL_PREFIX}:${featureCellKey}`;
  const behaviorChannelName = `sdux-vault:tab-sync:${featureCellKey}`;
  const registryKey = `sdux-vault:tab-registry:${featureCellKey}`;

  let bus: ReturnType<typeof TabSyncBusService>;
  let debugSpy: jasmine.Spy;
  let warnSpy: jasmine.Spy;

  beforeAll(() => {
    warnSpy = spyOn(console, 'warn');
    debugSpy = spyOn(console, 'debug');
  });

  // Cache the real sessionStorage reference before any test can corrupt it
  const realSessionStorage: Storage = window.sessionStorage;

  beforeEach(() => {
    warnSpy.calls.reset();
    debugSpy.calls.reset();
    setVaultLogLevel('debug');

    // Restore sessionStorage if a prior test corrupted it
    Object.defineProperty(globalThis, 'sessionStorage', {
      value: realSessionStorage,
      writable: true,
      configurable: true
    });

    try {
      sessionStorage.removeItem(TAB_SYNC_SESSION_KEY);
    } catch {
      // ignore
    }

    bus = TabSyncBusService();
    localStorage.removeItem(registryKey);
  });

  afterEach(() => {
    setVaultLogLevel('off');
    localStorage.removeItem(registryKey);

    try {
      sessionStorage.removeItem(TAB_SYNC_SESSION_KEY);
    } catch {
      // ignore
    }
  });

  // -------------------------------------------------------------------------
  // Helpers
  // -------------------------------------------------------------------------

  interface TabInstance {
    controller: withTabSyncController<any>;
    behavior: withTabSyncStateBehavior<any>;
    ctx: BehaviorContext<any>;
    state$: Subject<StateEmitSnapshotShape<any>>;
    emitted: StateEmitSnapshotShape<any>[];
  }

  /**
   * Creates a paired controller + behavior simulating a single tab.
   * Uses a fixed tabId override via sessionStorage to control identity.
   */
  function createTab(tabId: string): TabInstance {
    sessionStorage.setItem(TAB_SYNC_SESSION_KEY, tabId);

    const state$ = new Subject<StateEmitSnapshotShape<any>>();
    const emitted: StateEmitSnapshotShape<any>[] = [];
    state$.subscribe((s) => emitted.push(s));

    const lastSnapshot: StateSnapshotShape<any> = {
      isLoading: false,
      value: undefined,
      error: null,
      hasValue: false
    };

    const ctx: BehaviorContext<any> = {
      state$,
      lastSnapshot,
      incoming: undefined,
      featureCellKey,
      operation: 'replace' as any,
      options: undefined,
      state: {
        isLoading: false,
        value: undefined,
        error: null,
        hasValue: false
      },
      traceId: `trace-${tabId}`
    } as any;

    const controller = new withTabSyncController(`ctrl-${tabId}`, {
      featureCellKey
    } as any);

    const behavior = new withTabSyncStateBehavior(`behavior-${tabId}`, {
      featureCellKey,
      lastSnapshot,
      state$
    } as any);

    return { controller, behavior, ctx, state$, emitted };
  }

  function destroyTab(tab: TabInstance): void {
    tab.controller.destroy();
    tab.behavior.destroy(tab.ctx);
    tab.state$.complete();
  }

  // -------------------------------------------------------------------------
  // Bus observation helpers
  // -------------------------------------------------------------------------

  function collectBusCommands(): TabSyncBusCommandShape[] {
    const commands: TabSyncBusCommandShape[] = [];
    bus.command$.subscribe((cmd) => {
      if (cmd.featureCellKey === featureCellKey) {
        commands.push(cmd);
      }
    });
    return commands;
  }

  function collectBusNotifications(): TabSyncBusNotificationShape[] {
    const notifications: TabSyncBusNotificationShape[] = [];
    bus.notification$.subscribe((n) => {
      if (n.featureCellKey === featureCellKey) {
        notifications.push(n);
      }
    });
    return notifications;
  }

  // -------------------------------------------------------------------------
  // BroadcastChannel observation helpers
  // -------------------------------------------------------------------------

  function observeCtrlChannel(): {
    messages: TabSyncChannelMessageShape<any>[];
    channel: BroadcastChannel;
  } {
    const messages: TabSyncChannelMessageShape<any>[] = [];
    const channel = new BroadcastChannel(ctrlChannelName);
    channel.onmessage = (event) => messages.push(event.data);
    return { messages, channel };
  }

  function observeBehaviorChannel(): {
    messages: any[];
    channel: BroadcastChannel;
  } {
    const messages: any[] = [];
    const channel = new BroadcastChannel(behaviorChannelName);
    channel.onmessage = (event) => messages.push(event.data);
    return { messages, channel };
  }

  // -------------------------------------------------------------------------
  // Scenario 1: First tab comes online — no peers
  // -------------------------------------------------------------------------
  describe('first tab online (no peers)', () => {
    let tab1: TabInstance;

    afterEach(() => {
      destroyTab(tab1);
    });

    it('should NOT send a ctrl:request when no peers are in the registry', (done) => {
      const ctrlObserver = observeCtrlChannel();

      tab1 = createTab('tab-1');

      tab1.controller
        .handleMessage({
          type: ControllerMessageTypes.Attempt,
          traceId: 'trace-1'
        } as any)
        .subscribe(() => {
          setTimeout(() => {
            expect(ctrlObserver.messages).toEqual([]);
            ctrlObserver.channel.close();
            done();
          }, 50);
        });
    });

    it('should emit ClearCache command on timeout', (done) => {
      const commands = collectBusCommands();

      tab1 = createTab('tab-1');

      tab1.controller
        .handleMessage({
          type: ControllerMessageTypes.Attempt,
          traceId: 'trace-1'
        } as any)
        .subscribe((vote) => {
          expect(vote).toBe(ControllerVotes.Abstain);
          expect(commands).toEqual([
            {
              featureCellKey,
              tabId: 'tab-1',
              command: TabSyncBusCommandTypes.ClearCache
            }
          ]);
          done();
        });
    });

    it('should mark behavior negotiation complete after ClearCache', (done) => {
      tab1 = createTab('tab-1');

      tab1.controller
        .handleMessage({
          type: ControllerMessageTypes.Attempt,
          traceId: 'trace-1'
        } as any)
        .subscribe(() => {
          // First finalize after ClearCache — enables broadcastReady
          tab1.behavior.finalizePipelineState(
            { framework: 'initial' } as any,
            tab1.ctx
          );

          // Second finalize — broadcasts
          tab1.behavior.finalizePipelineState(
            { framework: 'Angular' } as any,
            tab1.ctx
          );

          setTimeout(() => {
            expect(debugSpy).toHaveBeenCalledWith(
              '[vault]',
              jasmine.stringMatching(
                /behavior-tab-1 broadcast state for "integration-cell"/
              )
            );
            done();
          }, 50);
        });
    });

    it('should broadcast finalized state to the behavior channel', (done) => {
      const behaviorObserver = observeBehaviorChannel();

      tab1 = createTab('tab-1');

      tab1.controller
        .handleMessage({
          type: ControllerMessageTypes.Attempt,
          traceId: 'trace-1'
        } as any)
        .subscribe(() => {
          // First finalize after ClearCache — enables broadcastReady
          tab1.behavior.finalizePipelineState(
            { framework: 'initial' } as any,
            tab1.ctx
          );

          // Second finalize — broadcasts
          tab1.behavior.finalizePipelineState(
            { framework: 'Angular', currentStep: 2 } as any,
            tab1.ctx
          );

          setTimeout(() => {
            expect(behaviorObserver.messages).toEqual([
              {
                featureCellKey,
                tabId: 'tab-1',
                snapshot: {
                  isLoading: false,
                  value: { framework: 'Angular', currentStep: 2 },
                  error: null,
                  hasValue: true
                },
                type: StateEmitTypes.FinalizePipeline
              }
            ]);
            behaviorObserver.channel.close();
            done();
          }, 50);
        });
    });
  });

  // -------------------------------------------------------------------------
  // Scenario 2: Second tab comes online — peer responds
  // -------------------------------------------------------------------------
  describe('second tab online (peer responds)', () => {
    let tab1: TabInstance;
    let tab2: TabInstance;

    afterEach(() => {
      if (tab1) destroyTab(tab1);
      if (tab2) destroyTab(tab2);
    });

    it('should abort the second tab initial Attempt when peer responds', (done) => {
      tab1 = createTab('tab-1');

      // Tab 1 completes its negotiation (no peers, times out)
      tab1.controller
        .handleMessage({
          type: ControllerMessageTypes.Attempt,
          traceId: 'trace-t1'
        } as any)
        .subscribe(() => {
          // Populate tab 1 with state
          tab1.behavior.finalizePipelineState(
            { framework: 'Angular', currentStep: 2 } as any,
            tab1.ctx
          );

          // Now create tab 2
          sessionStorage.setItem(TAB_SYNC_SESSION_KEY, 'tab-2');
          tab2 = createTab('tab-2');

          tab2.controller
            .handleMessage({
              type: ControllerMessageTypes.Attempt,
              traceId: 'trace-t2'
            } as any)
            .subscribe((vote) => {
              expect(vote).toBe(ControllerVotes.Abort);
              done();
            });
        });
    });

    it('should emit CommitCache with the peer snapshot', (done) => {
      const commands = collectBusCommands();

      tab1 = createTab('tab-1');

      tab1.controller
        .handleMessage({
          type: ControllerMessageTypes.Attempt,
          traceId: 'trace-t1'
        } as any)
        .subscribe(() => {
          tab1.behavior.finalizePipelineState(
            { framework: 'Angular', currentStep: 2 } as any,
            tab1.ctx
          );

          sessionStorage.setItem(TAB_SYNC_SESSION_KEY, 'tab-2');
          tab2 = createTab('tab-2');

          // Clear commands to isolate tab 2's activity
          commands.length = 0;

          tab2.controller
            .handleMessage({
              type: ControllerMessageTypes.Attempt,
              traceId: 'trace-t2'
            } as any)
            .subscribe(() => {
              expect(commands).toEqual([
                {
                  featureCellKey,
                  tabId: 'tab-1',
                  command: TabSyncBusCommandTypes.SendSnapshot
                },
                {
                  featureCellKey,
                  tabId: 'tab-2',
                  command: TabSyncBusCommandTypes.CommitCache,
                  snapshot: {
                    isLoading: false,
                    value: { framework: 'Angular', currentStep: 2 },
                    error: null,
                    hasValue: true
                  }
                }
              ]);
              done();
            });
        });
    });

    it('should commit the synced snapshot to the second tab behavior', (done) => {
      tab1 = createTab('tab-1');

      tab1.controller
        .handleMessage({
          type: ControllerMessageTypes.Attempt,
          traceId: 'trace-t1'
        } as any)
        .subscribe(() => {
          tab1.behavior.finalizePipelineState(
            { framework: 'Angular', currentStep: 2 } as any,
            tab1.ctx
          );

          sessionStorage.setItem(TAB_SYNC_SESSION_KEY, 'tab-2');
          tab2 = createTab('tab-2');

          tab2.controller
            .handleMessage({
              type: ControllerMessageTypes.Attempt,
              traceId: 'trace-t2'
            } as any)
            .subscribe(() => {
              expect(tab2.emitted).toEqual([
                {
                  type: StateEmitTypes.TabSync,
                  snapshot: {
                    isLoading: false,
                    value: { framework: 'Angular', currentStep: 2 },
                    error: null,
                    hasValue: true
                  }
                } as any
              ]);
              done();
            });
        });
    });

    it('should abort bootstrap Attempts during settling', (done) => {
      tab1 = createTab('tab-1');

      tab1.controller
        .handleMessage({
          type: ControllerMessageTypes.Attempt,
          traceId: 'trace-t1'
        } as any)
        .subscribe(() => {
          tab1.behavior.finalizePipelineState(
            { framework: 'Angular', currentStep: 2 } as any,
            tab1.ctx
          );

          sessionStorage.setItem(TAB_SYNC_SESSION_KEY, 'tab-2');
          tab2 = createTab('tab-2');

          tab2.controller
            .handleMessage({
              type: ControllerMessageTypes.Attempt,
              traceId: 'trace-t2-initial'
            } as any)
            .subscribe(() => {
              // Immediately send bootstrap Attempts — should be aborted
              let vote2: ControllerVote | undefined;
              tab2.controller
                .handleMessage({
                  type: ControllerMessageTypes.Attempt,
                  traceId: 'trace-t2-bootstrap-1'
                } as any)
                .subscribe((v) => (vote2 = v));

              expect(vote2).toBe(ControllerVotes.Abort);

              let vote3: ControllerVote | undefined;
              tab2.controller
                .handleMessage({
                  type: ControllerMessageTypes.Attempt,
                  traceId: 'trace-t2-bootstrap-2'
                } as any)
                .subscribe((v) => (vote3 = v));

              expect(vote3).toBe(ControllerVotes.Abort);

              expect(debugSpy).toHaveBeenCalledWith(
                '[vault]',
                'ctrl-tab-2 handleMessage: settling after sync, aborting'
              );
              done();
            });
        });
    });

    it('should abstain after settling completes', (done) => {
      tab1 = createTab('tab-1');

      tab1.controller
        .handleMessage({
          type: ControllerMessageTypes.Attempt,
          traceId: 'trace-t1'
        } as any)
        .subscribe(() => {
          tab1.behavior.finalizePipelineState(
            { framework: 'Angular', currentStep: 2 } as any,
            tab1.ctx
          );

          sessionStorage.setItem(TAB_SYNC_SESSION_KEY, 'tab-2');
          tab2 = createTab('tab-2');

          tab2.controller
            .handleMessage({
              type: ControllerMessageTypes.Attempt,
              traceId: 'trace-t2-initial'
            } as any)
            .subscribe(() => {
              // Wait for settling to complete (setTimeout(0))
              setTimeout(() => {
                let vote: ControllerVote | undefined;
                tab2.controller
                  .handleMessage({
                    type: ControllerMessageTypes.Attempt,
                    traceId: 'trace-t2-user-action'
                  } as any)
                  .subscribe((v) => (vote = v));

                expect(vote).toBe(ControllerVotes.Abstain);
                done();
              }, 20);
            });
        });
    });

    it('should NOT broadcast degraded state from second tab during settling', (done) => {
      const behaviorObserver = observeBehaviorChannel();

      tab1 = createTab('tab-1');

      tab1.controller
        .handleMessage({
          type: ControllerMessageTypes.Attempt,
          traceId: 'trace-t1'
        } as any)
        .subscribe(() => {
          // First finalize after ClearCache — enables broadcastReady
          tab1.behavior.finalizePipelineState(
            { framework: 'initial' } as any,
            tab1.ctx
          );

          // Second finalize — broadcasts
          tab1.behavior.finalizePipelineState(
            { framework: 'Angular', currentStep: 2 } as any,
            tab1.ctx
          );

          // Clear observer from tab 1's broadcast
          behaviorObserver.messages.length = 0;

          sessionStorage.setItem(TAB_SYNC_SESSION_KEY, 'tab-2');
          tab2 = createTab('tab-2');

          tab2.controller
            .handleMessage({
              type: ControllerMessageTypes.Attempt,
              traceId: 'trace-t2-initial'
            } as any)
            .subscribe(() => {
              setTimeout(() => {
                expect(behaviorObserver.messages).toEqual([
                  {
                    featureCellKey,
                    tabId: 'tab-1',
                    snapshot: {
                      isLoading: false,
                      value: { framework: 'Angular', currentStep: 2 },
                      error: null,
                      hasValue: true
                    },
                    type: StateEmitTypes.FinalizePipeline
                  }
                ]);
                behaviorObserver.channel.close();
                done();
              }, 50);
            });
        });
    });

    it('should allow second tab to broadcast after settling', (done) => {
      const behaviorObserver = observeBehaviorChannel();

      tab1 = createTab('tab-1');

      tab1.controller
        .handleMessage({
          type: ControllerMessageTypes.Attempt,
          traceId: 'trace-t1'
        } as any)
        .subscribe(() => {
          // First finalize after ClearCache — enables broadcastReady
          tab1.behavior.finalizePipelineState(
            { framework: 'initial' } as any,
            tab1.ctx
          );

          // Second finalize — broadcasts
          tab1.behavior.finalizePipelineState(
            { framework: 'Angular', currentStep: 2 } as any,
            tab1.ctx
          );

          behaviorObserver.messages.length = 0;

          sessionStorage.setItem(TAB_SYNC_SESSION_KEY, 'tab-2');
          tab2 = createTab('tab-2');

          tab2.controller
            .handleMessage({
              type: ControllerMessageTypes.Attempt,
              traceId: 'trace-t2-initial'
            } as any)
            .subscribe(() => {
              // After settling, trigger a normal pipeline finalize
              setTimeout(() => {
                tab2.behavior.finalizePipelineState(
                  { framework: 'Angular', currentStep: 3 } as any,
                  tab2.ctx
                );

                setTimeout(() => {
                  expect(behaviorObserver.messages).toEqual([
                    {
                      featureCellKey,
                      tabId: 'tab-1',
                      snapshot: {
                        isLoading: false,
                        value: { framework: 'Angular', currentStep: 2 },
                        error: null,
                        hasValue: true
                      },
                      type: StateEmitTypes.FinalizePipeline
                    },
                    {
                      featureCellKey,
                      tabId: 'tab-2',
                      snapshot: {
                        isLoading: false,
                        value: { framework: 'Angular', currentStep: 3 },
                        error: null,
                        hasValue: true
                      },
                      type: StateEmitTypes.FinalizePipeline
                    }
                  ]);
                  behaviorObserver.channel.close();
                  done();
                }, 50);
              }, 20);
            });
        });
    });
  });

  // -------------------------------------------------------------------------
  // Scenario 3: First tab should not be affected by second tab startup
  // -------------------------------------------------------------------------
  describe('first tab isolation during second tab startup', () => {
    let tab1: TabInstance;
    let tab2: TabInstance;

    afterEach(() => {
      if (tab1) destroyTab(tab1);
      if (tab2) destroyTab(tab2);
    });

    it('should not reset first tab state when second tab comes online', (done) => {
      tab1 = createTab('tab-1');

      tab1.controller
        .handleMessage({
          type: ControllerMessageTypes.Attempt,
          traceId: 'trace-t1'
        } as any)
        .subscribe(() => {
          tab1.behavior.finalizePipelineState(
            { framework: 'Angular', currentStep: 2 } as any,
            tab1.ctx
          );

          sessionStorage.setItem(TAB_SYNC_SESSION_KEY, 'tab-2');
          tab2 = createTab('tab-2');

          tab2.controller
            .handleMessage({
              type: ControllerMessageTypes.Attempt,
              traceId: 'trace-t2-initial'
            } as any)
            .subscribe(() => {
              setTimeout(() => {
                expect(tab1.emitted).toEqual([
                  {
                    type: StateEmitTypes.FinalizePipeline,
                    snapshot: {
                      isLoading: false,
                      value: { framework: 'Angular', currentStep: 2 },
                      error: null,
                      hasValue: true
                    }
                  } as any
                ]);
                done();
              }, 50);
            });
        });
    });

    it('should respond to snapshot request from second tab controller', (done) => {
      const ctrlObserver = observeCtrlChannel();

      tab1 = createTab('tab-1');

      tab1.controller
        .handleMessage({
          type: ControllerMessageTypes.Attempt,
          traceId: 'trace-t1'
        } as any)
        .subscribe(() => {
          tab1.behavior.finalizePipelineState(
            { framework: 'Angular', currentStep: 2 } as any,
            tab1.ctx
          );

          ctrlObserver.messages.length = 0;

          sessionStorage.setItem(TAB_SYNC_SESSION_KEY, 'tab-2');
          tab2 = createTab('tab-2');

          tab2.controller
            .handleMessage({
              type: ControllerMessageTypes.Attempt,
              traceId: 'trace-t2-initial'
            } as any)
            .subscribe(() => {
              setTimeout(() => {
                expect(ctrlObserver.messages).toEqual([
                  {
                    messageType: TabSyncChannelMessageTypes.Request,
                    featureCellKey,
                    tabId: 'tab-2'
                  },
                  {
                    messageType: TabSyncChannelMessageTypes.Response,
                    featureCellKey,
                    tabId: 'tab-1',
                    snapshot: {
                      isLoading: false,
                      value: { framework: 'Angular', currentStep: 2 },
                      error: null,
                      hasValue: true
                    }
                  },
                  {
                    messageType: TabSyncChannelMessageTypes.Response,
                    featureCellKey,
                    tabId: 'tab-2',
                    snapshot: {
                      isLoading: false,
                      value: { framework: 'Angular', currentStep: 2 },
                      error: null,
                      hasValue: true
                    }
                  }
                ]);
                ctrlObserver.channel.close();
                done();
              }, 50);
            });
        });
    });
  });

  // -------------------------------------------------------------------------
  // Scenario 4: Bus traffic observation
  // -------------------------------------------------------------------------
  describe('bus traffic during negotiation', () => {
    let tab1: TabInstance;
    let tab2: TabInstance;

    afterEach(() => {
      if (tab1) destroyTab(tab1);
      if (tab2) destroyTab(tab2);
    });

    it('should emit SendSnapshot command when tab 1 receives a request', (done) => {
      tab1 = createTab('tab-1');

      tab1.controller
        .handleMessage({
          type: ControllerMessageTypes.Attempt,
          traceId: 'trace-t1'
        } as any)
        .subscribe(() => {
          const commands = collectBusCommands();

          sessionStorage.setItem(TAB_SYNC_SESSION_KEY, 'tab-2');
          tab2 = createTab('tab-2');

          tab2.controller
            .handleMessage({
              type: ControllerMessageTypes.Attempt,
              traceId: 'trace-t2'
            } as any)
            .subscribe(() => {
              expect(commands).toEqual([
                {
                  featureCellKey,
                  tabId: 'tab-1',
                  command: TabSyncBusCommandTypes.SendSnapshot
                },
                {
                  featureCellKey,
                  tabId: 'tab-2',
                  command: TabSyncBusCommandTypes.CommitCache,
                  snapshot: {
                    isLoading: false,
                    value: undefined,
                    error: null,
                    hasValue: false
                  }
                }
              ]);
              done();
            });
        });
    });

    it('should emit SnapshotReady notification from behavior in response to SendSnapshot', (done) => {
      tab1 = createTab('tab-1');

      tab1.controller
        .handleMessage({
          type: ControllerMessageTypes.Attempt,
          traceId: 'trace-t1'
        } as any)
        .subscribe(() => {
          tab1.behavior.finalizePipelineState(
            { framework: 'Angular' } as any,
            tab1.ctx
          );

          const notifications = collectBusNotifications();

          sessionStorage.setItem(TAB_SYNC_SESSION_KEY, 'tab-2');
          tab2 = createTab('tab-2');

          tab2.controller
            .handleMessage({
              type: ControllerMessageTypes.Attempt,
              traceId: 'trace-t2'
            } as any)
            .subscribe(() => {
              expect(notifications).toEqual([
                {
                  featureCellKey,
                  notification: TabSyncBusNotificationTypes.SnapshotReady,
                  snapshot: {
                    isLoading: false,
                    value: { framework: 'Angular' },
                    error: null,
                    hasValue: true
                  }
                }
              ]);
              done();
            });
        });
    });

    it('should emit CommitCache command from tab 2 controller after receiving snapshot', (done) => {
      tab1 = createTab('tab-1');

      tab1.controller
        .handleMessage({
          type: ControllerMessageTypes.Attempt,
          traceId: 'trace-t1'
        } as any)
        .subscribe(() => {
          tab1.behavior.finalizePipelineState(
            { framework: 'Angular', currentStep: 2 } as any,
            tab1.ctx
          );

          const commands = collectBusCommands();

          sessionStorage.setItem(TAB_SYNC_SESSION_KEY, 'tab-2');
          tab2 = createTab('tab-2');

          tab2.controller
            .handleMessage({
              type: ControllerMessageTypes.Attempt,
              traceId: 'trace-t2'
            } as any)
            .subscribe(() => {
              expect(commands).toEqual([
                {
                  featureCellKey,
                  tabId: 'tab-1',
                  command: TabSyncBusCommandTypes.SendSnapshot
                },
                {
                  featureCellKey,
                  tabId: 'tab-2',
                  command: TabSyncBusCommandTypes.CommitCache,
                  snapshot: {
                    isLoading: false,
                    value: { framework: 'Angular', currentStep: 2 },
                    error: null,
                    hasValue: true
                  }
                }
              ]);
              done();
            });
        });
    });
  });

  // -------------------------------------------------------------------------
  // Scenario 5: Steady-state cross-tab sync (post-negotiation)
  // -------------------------------------------------------------------------
  describe('steady-state cross-tab sync', () => {
    let tab1: TabInstance;
    let tab2: TabInstance;

    afterEach(() => {
      if (tab1) destroyTab(tab1);
      if (tab2) destroyTab(tab2);
    });

    it('should sync state from tab 1 to tab 2 after both are settled', (done) => {
      tab1 = createTab('tab-1');

      tab1.controller
        .handleMessage({
          type: ControllerMessageTypes.Attempt,
          traceId: 'trace-t1'
        } as any)
        .subscribe(() => {
          tab1.behavior.finalizePipelineState(
            { framework: 'Angular', currentStep: 1 } as any,
            tab1.ctx
          );

          sessionStorage.setItem(TAB_SYNC_SESSION_KEY, 'tab-2');
          tab2 = createTab('tab-2');

          tab2.controller
            .handleMessage({
              type: ControllerMessageTypes.Attempt,
              traceId: 'trace-t2'
            } as any)
            .subscribe(() => {
              // Wait for settling to complete
              setTimeout(() => {
                // Clear tab 2 emissions
                tab2.emitted.length = 0;

                // Tab 1 updates state — should sync to tab 2
                tab1.behavior.finalizePipelineState(
                  { framework: 'Angular', currentStep: 5 } as any,
                  tab1.ctx
                );

                setTimeout(() => {
                  expect(tab2.emitted).toEqual([
                    {
                      type: StateEmitTypes.TabSync,
                      snapshot: {
                        isLoading: false,
                        value: { framework: 'Angular', currentStep: 5 },
                        error: null,
                        hasValue: true
                      }
                    } as any
                  ]);
                  done();
                }, 50);
              }, 20);
            });
        });
    });

    it('should sync state from tab 2 to tab 1 after settling', (done) => {
      tab1 = createTab('tab-1');

      tab1.controller
        .handleMessage({
          type: ControllerMessageTypes.Attempt,
          traceId: 'trace-t1'
        } as any)
        .subscribe(() => {
          tab1.behavior.finalizePipelineState(
            { framework: 'Angular', currentStep: 1 } as any,
            tab1.ctx
          );

          sessionStorage.setItem(TAB_SYNC_SESSION_KEY, 'tab-2');
          tab2 = createTab('tab-2');

          tab2.controller
            .handleMessage({
              type: ControllerMessageTypes.Attempt,
              traceId: 'trace-t2'
            } as any)
            .subscribe(() => {
              setTimeout(() => {
                // Clear tab 1 emissions
                tab1.emitted.length = 0;

                // Tab 2 updates state — should sync to tab 1
                tab2.behavior.finalizePipelineState(
                  { framework: 'React', currentStep: 3 } as any,
                  tab2.ctx
                );

                setTimeout(() => {
                  expect(tab1.emitted).toEqual([
                    {
                      type: StateEmitTypes.TabSync,
                      snapshot: {
                        isLoading: false,
                        value: { framework: 'React', currentStep: 3 },
                        error: null,
                        hasValue: true
                      }
                    } as any
                  ]);
                  done();
                }, 50);
              }, 20);
            });
        });
    });

    it('should not create a feedback loop on cross-tab sync', (done) => {
      const behaviorObserver = observeBehaviorChannel();

      tab1 = createTab('tab-1');

      tab1.controller
        .handleMessage({
          type: ControllerMessageTypes.Attempt,
          traceId: 'trace-t1'
        } as any)
        .subscribe(() => {
          tab1.behavior.finalizePipelineState(
            { framework: 'Angular', currentStep: 1 } as any,
            tab1.ctx
          );

          sessionStorage.setItem(TAB_SYNC_SESSION_KEY, 'tab-2');
          tab2 = createTab('tab-2');

          tab2.controller
            .handleMessage({
              type: ControllerMessageTypes.Attempt,
              traceId: 'trace-t2'
            } as any)
            .subscribe(() => {
              setTimeout(() => {
                behaviorObserver.messages.length = 0;

                // Tab 1 sends an update
                tab1.behavior.finalizePipelineState(
                  { framework: 'Vue', currentStep: 7 } as any,
                  tab1.ctx
                );

                // Wait long enough for any feedback loop to manifest
                setTimeout(() => {
                  expect(behaviorObserver.messages).toEqual([
                    {
                      featureCellKey,
                      tabId: 'tab-1',
                      snapshot: {
                        isLoading: false,
                        value: { framework: 'Vue', currentStep: 7 },
                        error: null,
                        hasValue: true
                      },
                      type: StateEmitTypes.FinalizePipeline
                    }
                  ]);
                  behaviorObserver.channel.close();
                  done();
                }, 100);
              }, 20);
            });
        });
    });
  });
});
