import {
  LicensingAbstract,
  VAULT_LICENSE_ID,
  verifyLicensePayload
} from '@sdux-vault/engine';
import {
  ControllerClassContext,
  ControllerMessageShape,
  ControllerMessageTypes,
  ControllerType,
  ControllerTypes,
  ControllerVote,
  ControllerVotes,
  defineControllerKey,
  StateSnapshotShape,
  VaultController,
  vaultDebug,
  vaultWarn
} from '@sdux-vault/shared';
import { Observable, of, race, Subject, Subscription, timer } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { TAB_SYNC_CTRL_CHANNEL_PREFIX } from './constants/tab-sync-ctrl-channel-prefix.constant';
import { TAB_SYNC_HEARTBEAT_INTERVAL } from './constants/tab-sync-heartbeat-interval.constant';
import { TAB_SYNC_PEER_TIMEOUT } from './constants/tab-sync-peer-timeout.constant';
import { TAB_SYNC_REGISTRY_PREFIX } from './constants/tab-sync-registry-prefix.constant';
import { TAB_SYNC_STALE_THRESHOLD } from './constants/tab-sync-stale-threshold.constant';
import { TabSyncBusService } from './services/tab-sync-bus.service';
import { TabSyncChannelMessageShape } from './shapes/tab-sync-channel-message.shape';
import { TabSyncRegistryEntryShape } from './shapes/tab-sync-registry-entry.shape';
import { TabSyncBusCommandTypes } from './types/tab-sync-bus-command.type';
import { TabSyncBusNotificationTypes } from './types/tab-sync-bus-notification.type';
import { TabSyncChannelMessageTypes } from './types/tab-sync-channel-message.type';

/**
 * Controller that coordinates initial cross-tab state negotiation for Tab Sync.
 *
 * On the first pipeline attempt, this controller sends a snapshot request to
 * other tabs via BroadcastChannel. If a peer responds with a snapshot within
 * the negotiation timeout, the controller denies the initial conduct and
 * commands the behavior to commit the cached snapshot. If no peer responds,
 * the controller abstains and commands the behavior to proceed normally.
 *
 * After the first conduct, the controller abstains on all subsequent attempts
 * and responds to snapshot requests from newly opened tabs.
 */
@VaultController({
  type: ControllerTypes.TabSync,
  key: defineControllerKey('Policy', 'TabSync'),
  critical: false,
  needsLicense: true,
  licenseId: VAULT_LICENSE_ID
})
export class withTabSyncController<T> extends LicensingAbstract<T> {
  /** Static controller type identifier assigned by the decorator. */
  static readonly type: ControllerType;

  /** Indicates that this controller is non-critical in the pipeline. */
  static readonly critical: boolean;

  /** License identifier used for license validation. */
  static readonly licenseId: string;

  /** Instance-level controller type identifier. */
  readonly type = withTabSyncController.type;

  /** Indicates whether this controller is critical for pipeline execution. */
  readonly critical = withTabSyncController.critical;

  /** Unique controller key for this instance. */
  readonly key: string;

  /** Unique identifier for the current browser tab. */
  readonly tabId: string;

  /** Shared bus service used for controller-to-behavior communication. */
  readonly #bus = TabSyncBusService();

  /** Feature cell key scoping this controller instance. */
  readonly #featureCellKey: string;

  /** localStorage key used for the cross-tab registry. */
  readonly #registryKey: string;

  /** Subscription to bus notification events. */
  #busSubscription: Subscription | null = null;

  /** Subscription to snapshot-ready notifications from the local behavior. */
  #snapshotReadySubscription: Subscription | null = null;

  /** BroadcastChannel used for cross-tab controller negotiation. */
  #channel: BroadcastChannel | null = null;

  /** Whether the initial cross-tab negotiation has completed. */
  #negotiated = false;

  /** Whether the controller is in a post-sync settling phase. */
  #settling = false;

  /** Interval handle for the registry heartbeat timer. */
  #heartbeatTimer: ReturnType<typeof setInterval> | null = null;

  /** Cached beforeunload handler reference for cleanup on destroy. */
  #unloadHandler: (() => void) | null = null;

  /** Subject emitting peer snapshots received during negotiation. */
  readonly #peerSnapshot$ = new Subject<StateSnapshotShape<T>>();

  /**
   * Creates a new tab sync controller instance.
   *
   * @param key - Unique controller identifier assigned by the controller factory.
   * @param controllerCtx - Controller class context provided by the orchestrator.
   */
  constructor(
    key: string,
    readonly controllerCtx: ControllerClassContext
  ) {
    super(controllerCtx);
    this.key = key;
    this.#featureCellKey = controllerCtx.featureCellKey;
    this.tabId = controllerCtx.conductorId;
    this.#registryKey = `${TAB_SYNC_REGISTRY_PREFIX}:${this.#featureCellKey}`;

    vaultDebug(
      `${this.key} constructor: featureCellKey="${this.#featureCellKey}", tabId="${this.tabId}"`
    );

    this.#openChannel();
    this.#registerInRegistry();
    this.#startHeartbeat();
    this.#subscribeToBusNotifications();
    this.#subscribeToSnapshotReady();
    verifyLicensePayload(this.controllerCtx.licensePayload as string).then(
      (valid: boolean) => {
        vaultDebug(`${this.key} license validation resolved: ${valid}`);
        this.validateLicense(valid);
      }
    );
  }

  /**
   * Opens the BroadcastChannel for cross-tab controller negotiation.
   */
  #openChannel(): void {
    if (typeof BroadcastChannel === 'undefined') return;

    const channelName = `${TAB_SYNC_CTRL_CHANNEL_PREFIX}:${this.#featureCellKey}`;
    this.#channel = new BroadcastChannel(channelName);

    vaultDebug(`${this.key} opened ctrl-channel "${channelName}"`);

    this.#channel.onmessage = (
      event: MessageEvent<TabSyncChannelMessageShape<T>>
    ) => {
      this.#onChannelMessage(event.data);
    };
  }

  /**
   * Handles incoming BroadcastChannel messages from other tabs' controllers.
   *
   * @param message - The channel message received from a peer tab.
   */
  #onChannelMessage(message: TabSyncChannelMessageShape<T>): void {
    vaultDebug(
      `${this.key} #onChannelMessage: type="${message.messageType}", from="${message.tabId}", cell="${message.featureCellKey}"`
    );

    if (message.tabId === this.tabId) {
      vaultDebug(`${this.key} #onChannelMessage: ignored (self-originated)`);
      return;
    }
    if (message.featureCellKey !== this.#featureCellKey) {
      vaultDebug(`${this.key} #onChannelMessage: ignored (different cell)`);
      return;
    }

    switch (message.messageType) {
      case TabSyncChannelMessageTypes.Request: {
        vaultDebug(
          `${this.key} received snapshot request from tab "${message.tabId}"`
        );
        this.#handleSnapshotRequest();
        break;
      }

      case TabSyncChannelMessageTypes.Response: {
        vaultDebug(
          `${this.key} received snapshot response from tab "${message.tabId}"`
        );
        if (message.snapshot) {
          this.#peerSnapshot$.next(message.snapshot);
        }
        break;
      }
    }
  }

  /**
   * Handles a snapshot request from a new tab by commanding the behavior to send its current snapshot.
   */
  #handleSnapshotRequest(): void {
    vaultDebug(
      `${this.key} #handleSnapshotRequest: emitting SendSnapshot command`
    );

    this.#bus.emitCommand({
      featureCellKey: this.#featureCellKey,
      tabId: this.tabId,
      command: TabSyncBusCommandTypes.SendSnapshot
    });
  }

  /**
   * Subscribes to behavior notifications on the bus to receive peer snapshot signals.
   */
  #subscribeToBusNotifications(): void {
    this.#busSubscription = this.#bus.notification$.subscribe(
      (notification) => {
        if (notification.featureCellKey !== this.#featureCellKey) return;

        if (
          notification.notification ===
          TabSyncBusNotificationTypes.PeerSnapshotReceived
        ) {
          vaultDebug(
            `${this.key} bus received PeerSnapshotReceived for "${notification.featureCellKey}"`
          );
          this.#peerSnapshot$.next(
            notification.snapshot as StateSnapshotShape<T>
          );
        }
      }
    );
  }

  /**
   * Subscribes to SnapshotReady notifications and forwards the snapshot to peer tabs.
   */
  #subscribeToSnapshotReady(): void {
    this.#snapshotReadySubscription = this.#bus.notification$.subscribe(
      (notification) => {
        if (notification.featureCellKey !== this.#featureCellKey) return;

        if (
          notification.notification ===
          TabSyncBusNotificationTypes.SnapshotReady
        ) {
          vaultDebug(
            `${this.key} bus received SnapshotReady for "${notification.featureCellKey}"`
          );
          this.#sendSnapshotResponse(
            notification.snapshot as StateSnapshotShape<T>
          );
        }
      }
    );
  }

  /**
   * Sends a snapshot response on the BroadcastChannel to peer tabs.
   *
   * @param snapshot - The state snapshot to broadcast.
   */
  #sendSnapshotResponse(snapshot: StateSnapshotShape<T>): void {
    if (!this.#channel) return;

    const message: TabSyncChannelMessageShape<T> = {
      messageType: TabSyncChannelMessageTypes.Response,
      featureCellKey: this.#featureCellKey,
      tabId: this.tabId,
      snapshot
    };

    this.#channel.postMessage(message);

    vaultDebug(
      `${this.key} sent snapshot response for "${this.#featureCellKey}"`
    );
  }

  /**
   * Sends a snapshot request on the BroadcastChannel to all peer tabs.
   */
  #requestSnapshot(): void {
    /* istanbul ignore if -- defensive guard; #channel is always set when called from handleMessage */
    if (!this.#channel) return;

    const message: TabSyncChannelMessageShape<T> = {
      messageType: TabSyncChannelMessageTypes.Request,
      featureCellKey: this.#featureCellKey,
      tabId: this.tabId
    };

    this.#channel.postMessage(message);

    vaultDebug(
      `${this.key} sent snapshot request for "${this.#featureCellKey}"`
    );
  }

  /**
   * Handles controller admission messages and performs cross-tab negotiation on the first attempt.
   *
   * @param message - Incoming controller message.
   * @returns An observable emitting the controller vote.
   */
  handleMessage(
    message: ControllerMessageShape<T>
  ): Observable<ControllerVote> {
    vaultDebug(
      `${this.key} handleMessage received "${message.type}" for trace "${message.traceId}".`
    );

    if (message.type !== ControllerMessageTypes.Attempt) {
      vaultDebug(`${this.key} handleMessage: non-Attempt message, abstaining`);
      return of(ControllerVotes.Abstain);
    }

    if (this.#negotiated) {
      if (this.#settling) {
        vaultDebug(`${this.key} handleMessage: settling after sync, aborting`);
        return of(ControllerVotes.Abort);
      }
      vaultDebug(`${this.key} handleMessage: already negotiated, abstaining`);
      return of(ControllerVotes.Abstain);
    }

    this.#negotiated = true;

    if (!this.#channel) {
      vaultDebug(
        `${this.key} handleMessage: no BroadcastChannel, clearing cache and abstaining`
      );
      this.#bus.emitCommand({
        featureCellKey: this.#featureCellKey,
        tabId: this.tabId,
        command: TabSyncBusCommandTypes.ClearCache
      });
      return of(ControllerVotes.Abstain);
    }

    const peers = this.#readPeerEntries();

    if (peers.length === 0) {
      vaultDebug(
        `${this.key} handleMessage: no peers in registry, clearing cache and abstaining`
      );
      this.#bus.emitCommand({
        featureCellKey: this.#featureCellKey,
        tabId: this.tabId,
        command: TabSyncBusCommandTypes.ClearCache
      });
      return of(ControllerVotes.Abstain);
    }

    vaultDebug(
      `${this.key} handleMessage: first Attempt, ${peers.length} peer(s) in registry, starting negotiation`
    );

    this.#requestSnapshot();

    return race(
      this.#peerSnapshot$.pipe(
        take(1),
        map((snapshot) => {
          vaultDebug(
            `${this.key} peer snapshot received, aborting initial conduct`
          );

          this.#settling = true;
          setTimeout(() => {
            this.#settling = false;
            vaultDebug(`${this.key} settling complete`);
          }, 0);

          this.#bus.emitCommand({
            featureCellKey: this.#featureCellKey,
            tabId: this.tabId,
            command: TabSyncBusCommandTypes.CommitCache,
            snapshot
          });

          return ControllerVotes.Abort as ControllerVote;
        })
      ),
      timer(TAB_SYNC_PEER_TIMEOUT).pipe(
        map(() => {
          vaultDebug(
            `${this.key} peer timeout expired, clearing cache and abstaining`
          );

          this.#bus.emitCommand({
            featureCellKey: this.#featureCellKey,
            tabId: this.tabId,
            command: TabSyncBusCommandTypes.ClearCache
          });

          return ControllerVotes.Abstain as ControllerVote;
        })
      )
    );
  }

  /**
   * Cleans up controller resources, removes the tab from the registry, and closes the channel.
   */
  destroy(): void {
    this.#busSubscription?.unsubscribe();
    this.#busSubscription = null;
    this.#snapshotReadySubscription?.unsubscribe();
    this.#snapshotReadySubscription = null;
    if (this.#channel) {
      this.#channel.close();
      this.#channel = null;
    }
    this.#stopHeartbeat();
    this.#removeFromRegistry();
    this.#peerSnapshot$.complete();
    vaultWarn(`${this.key} - destroy`);
  }

  /**
   * Resets controller negotiation state.
   */
  reset(): void {
    this.#negotiated = false;
    vaultWarn(`${this.key} - reset`);
  }

  // ---------------------------------------------------------------------------
  // Tab registry
  // ---------------------------------------------------------------------------

  /**
   * Writes this tab's entry into the localStorage tab registry and registers a beforeunload listener.
   */
  #registerInRegistry(): void {
    try {
      if (typeof localStorage === 'undefined') return;

      const entries = this.#readRegistryRaw();
      entries.push({ tabId: this.tabId, timestamp: Date.now() });
      localStorage.setItem(this.#registryKey, JSON.stringify(entries));

      this.#unloadHandler = () => this.#removeFromRegistry();
      window.addEventListener('beforeunload', this.#unloadHandler);

      vaultDebug(
        `${this.key} registered in tab registry (${entries.length} total entries)`
      );
    } catch {
      vaultDebug(`${this.key} failed to register in tab registry`);
    }
  }

  /**
   * Removes this tab's entry from the localStorage tab registry and unregisters the beforeunload listener.
   */
  #removeFromRegistry(): void {
    try {
      if (typeof localStorage === 'undefined') return;

      if (this.#unloadHandler) {
        window.removeEventListener('beforeunload', this.#unloadHandler);
        this.#unloadHandler = null;
      }

      const entries = this.#readRegistryRaw().filter(
        (e) => e.tabId !== this.tabId
      );

      if (entries.length === 0) {
        localStorage.removeItem(this.#registryKey);
      } else {
        localStorage.setItem(this.#registryKey, JSON.stringify(entries));
      }

      vaultDebug(`${this.key} removed from tab registry`);
    } catch {
      vaultDebug(`${this.key} failed to remove from tab registry`);
    }
  }

  /**
   * Returns all non-stale peer entries from the registry, excluding this tab.
   *
   * @returns List of active peer registry entries.
   */
  #readPeerEntries(): TabSyncRegistryEntryShape[] {
    try {
      if (typeof localStorage === 'undefined') return [];

      const now = Date.now();
      const raw = this.#readRegistryRaw();
      const fresh = raw.filter(
        (e) => now - e.timestamp < TAB_SYNC_STALE_THRESHOLD
      );

      if (fresh.length !== raw.length) {
        if (fresh.length === 0) {
          localStorage.removeItem(this.#registryKey);
        } else {
          localStorage.setItem(this.#registryKey, JSON.stringify(fresh));
        }
      }

      return fresh.filter((e) => e.tabId !== this.tabId);
    } catch {
      return [];
    }
  }

  /**
   * Reads the raw registry array from localStorage.
   *
   * @returns Parsed registry entries, or an empty array when unavailable.
   */
  #readRegistryRaw(): TabSyncRegistryEntryShape[] {
    try {
      const json = localStorage.getItem(this.#registryKey);
      if (!json) return [];
      const parsed: unknown = JSON.parse(json);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  // ---------------------------------------------------------------------------
  // Heartbeat
  // ---------------------------------------------------------------------------

  /**
   * Starts a periodic timer that refreshes this tab's timestamp in the registry.
   */
  #startHeartbeat(): void {
    try {
      if (typeof localStorage === 'undefined') return;

      this.#heartbeatTimer = setInterval(() => {
        this.#refreshRegistryTimestamp();
      }, TAB_SYNC_HEARTBEAT_INTERVAL);
    } catch {
      // localStorage unavailable — heartbeat is a best-effort feature
    }
  }

  /**
   * Stops the heartbeat timer.
   */
  #stopHeartbeat(): void {
    if (this.#heartbeatTimer !== null) {
      clearInterval(this.#heartbeatTimer);
      this.#heartbeatTimer = null;
    }
  }

  /**
   * Updates this tab's timestamp in the registry to the current time.
   */
  #refreshRegistryTimestamp(): void {
    try {
      if (typeof localStorage === 'undefined') return;

      const entries = this.#readRegistryRaw();
      const idx = entries.findIndex((e) => e.tabId === this.tabId);
      if (idx >= 0) {
        entries[idx] = { tabId: this.tabId, timestamp: Date.now() };
      } else {
        entries.push({ tabId: this.tabId, timestamp: Date.now() });
      }
      localStorage.setItem(this.#registryKey, JSON.stringify(entries));
    } catch {
      // best-effort
    }
  }
}
