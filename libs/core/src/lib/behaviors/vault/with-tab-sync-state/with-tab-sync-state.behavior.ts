import { VAULT_LICENSE_ID, verifyLicensePayload } from '@sdux-vault/engine';
import {
  BehaviorClassContext,
  BehaviorContext,
  BehaviorType,
  BehaviorTypes,
  defineBehaviorKey,
  isolateValue,
  StateEmitType,
  StateEmitTypes,
  StateSnapshotShape,
  TabSyncBehaviorClassContext,
  VaultBehavior,
  vaultDebug
} from '@sdux-vault/shared';
import { Subscription } from 'rxjs';
import { withCoreStateBehavior } from '../../../behaviors/state/with-core-state/with-core-state.behavior';
import { TAB_SYNC_CHANNEL_PREFIX } from '../../../constants/tab-sync-channel-prefix.constant';
import { TAB_SYNC_SESSION_KEY } from '../../../constants/tab-sync-session-key.constant';
import { TabSyncBusService } from '../../../controllers/vault/tab-sync/services/tab-sync-bus.service';
import { TabSyncBusCommandTypes } from '../../../controllers/vault/tab-sync/types/tab-sync-bus-command.type';
import { TabSyncBusNotificationTypes } from '../../../controllers/vault/tab-sync/types/tab-sync-bus-notification.type';
import { TabSyncMessageShape } from '../../../shapes/state/tab-sync-message.shape';
import { NON_BROADCAST_TYPES } from '../../../types/non-broadcast-state-emit.type';

/**
 * Cross-tab state synchronization behavior that extends core state management.
 *
 * This behavior broadcasts finalized state snapshots to other browser tabs
 * via BroadcastChannel and applies incoming snapshots from other tabs directly
 * to the local state without triggering the pipeline. It requires a valid
 * license and is opt-in per FeatureCell.
 */
@VaultBehavior({
  type: BehaviorTypes.TabSyncState,
  key: defineBehaviorKey('Core', 'TabSyncState'),
  critical: true,
  needsLicense: true,
  licenseId: VAULT_LICENSE_ID
})
export class withTabSyncStateBehavior<T> extends withCoreStateBehavior<T> {
  /** Static behavior type used for pipeline classification. */
  static override readonly type: BehaviorType;

  /** Indicates that this behavior is required for pipeline execution. */
  static override readonly critical: boolean;

  /** Instance-level pipeline behavior type identifier. */
  override readonly type = withTabSyncStateBehavior.type;

  /** Indicates that this behavior must always execute. */
  override readonly critical = withTabSyncStateBehavior.critical;

  /** Unique identifier for this behavior instance. */
  override readonly key: string;

  /** Unique identifier for the current browser tab. */
  readonly tabId: string;

  /**
   * License identifier required by this behavior.
   */
  static readonly licenseId: string;

  /** BroadcastChannel used for cross-tab state synchronization. */
  #channel: BroadcastChannel | null = null;

  /** Behavior context used for committing remote snapshots. */
  readonly #ctx: BehaviorContext<T>;

  /** Feature cell key scoping this behavior instance. */
  #featureCellKey: string;

  /** Shared bus service for controller-to-behavior communication. */
  readonly #bus = TabSyncBusService();

  /** Subscription to bus command events. */
  #busSubscription: Subscription | null = null;

  /** Cached peer snapshot received during the negotiation phase. */
  #cachedSnapshot: StateSnapshotShape<T> | null = null;

  /** Whether controller negotiation has completed. */
  #negotiationComplete = false;

  /** Whether the behavior is ready to broadcast state changes. */
  #broadcastReady = false;

  /**
   * Creates a new tab sync state behavior instance.
   *
   * @param key Unique behavior identifier supplied by the factory.
   * @param behaviorCtx Behavior class context for dependency injection.
   */
  constructor(key: string, behaviorCtx: BehaviorClassContext) {
    super(key, behaviorCtx);
    this.key = key;
    this.#featureCellKey = behaviorCtx.featureCellKey;
    this.tabId = this.#resolveTabId();

    const tabSyncCtx = behaviorCtx as TabSyncBehaviorClassContext;

    this.#ctx = {
      featureCellKey: behaviorCtx.featureCellKey,
      lastSnapshot: tabSyncCtx.lastSnapshot,
      state$: tabSyncCtx.state$
    } as BehaviorContext<T>;

    vaultDebug(
      `${this.key} constructor: featureCellKey="${this.#featureCellKey}", tabId="${this.tabId}"`
    );

    this.#openChannel();
    verifyLicensePayload(this.behaviorCtx.licensePayload as string).then(
      (valid: boolean) => this.validateLicense(valid)
    );
    this.#subscribeToBusCommands();
  }

  /**
   * Returns a stable tab identifier persisted in sessionStorage.
   *
   * @returns The resolved tab identifier string.
   */
  #resolveTabId(): string {
    try {
      if (typeof sessionStorage === 'undefined') {
        return crypto.randomUUID();
      }

      let id = sessionStorage.getItem(TAB_SYNC_SESSION_KEY);
      if (!id) {
        id = crypto.randomUUID();
        sessionStorage.setItem(TAB_SYNC_SESSION_KEY, id);
      }
      return id;
    } catch {
      return crypto.randomUUID();
    }
  }

  /**
   * Opens the BroadcastChannel and begins listening for cross-tab messages.
   */
  #openChannel(): void {
    /* istanbul ignore if -- defensive guard; #channel is always null at construction */
    if (this.#channel) return;
    if (typeof BroadcastChannel === 'undefined') return;

    const channelName = `${TAB_SYNC_CHANNEL_PREFIX}:${this.#featureCellKey}`;
    this.#channel = new BroadcastChannel(channelName);

    vaultDebug(`${this.key} opened BroadcastChannel "${channelName}"`);

    this.#channel.onmessage = (event: MessageEvent<TabSyncMessageShape<T>>) => {
      this.#onMessage(event.data, this.#ctx);
    };
  }

  /**
   * Closes the BroadcastChannel and stops listening for cross-tab messages.
   */
  #closeChannel(): void {
    if (!this.#channel) return;
    this.#channel.close();
    this.#channel = null;
    vaultDebug(`${this.key} closed BroadcastChannel`);
  }

  /**
   * Handles an incoming cross-tab message and commits or caches the snapshot.
   *
   * @param message The broadcast payload.
   * @param ctx Pipeline behavior context.
   */
  #onMessage(message: TabSyncMessageShape<T>, ctx: BehaviorContext<T>): void {
    if (message.tabId === this.tabId) {
      vaultDebug(`${this.key} #onMessage: ignored (self-originated)`);
      return;
    }
    if (message.featureCellKey !== this.#featureCellKey) {
      vaultDebug(
        `${this.key} #onMessage: ignored (different cell "${message.featureCellKey}")`
      );
      return;
    }

    vaultDebug(
      `${this.key} received cross-tab sync for "${message.featureCellKey}"`
    );

    if (!this.#negotiationComplete) {
      vaultDebug(
        `${this.key} #onMessage: caching snapshot (negotiation pending)`
      );
      this.#cachedSnapshot = isolateValue(message.snapshot);

      this.#bus.emitNotification({
        featureCellKey: this.#featureCellKey,
        notification: TabSyncBusNotificationTypes.PeerSnapshotReceived,
        snapshot: this.#cachedSnapshot
      });
      return;
    }

    vaultDebug(
      `${this.key} #onMessage: committing remote snapshot (post-negotiation)`
    );
    super.commitState(
      ctx,
      isolateValue(message.snapshot),
      StateEmitTypes.TabSync
    );
  }

  /**
   * Subscribes to commands from the tab sync controller via the bus.
   */
  #subscribeToBusCommands(): void {
    this.#busSubscription = this.#bus.command$.subscribe((cmd) => {
      if (cmd.featureCellKey !== this.#featureCellKey) return;
      if (cmd.tabId !== this.tabId) return;

      switch (cmd.command) {
        case TabSyncBusCommandTypes.SendSnapshot: {
          vaultDebug(`${this.key} bus command: SendSnapshot`);
          this.#bus.emitNotification({
            featureCellKey: this.#featureCellKey,
            notification: TabSyncBusNotificationTypes.SnapshotReady,
            snapshot: isolateValue(this.#ctx.lastSnapshot)
          });
          break;
        }

        case TabSyncBusCommandTypes.CommitCache: {
          const commitSnapshot =
            this.#cachedSnapshot ??
            (cmd.snapshot as StateSnapshotShape<T> | undefined);
          vaultDebug(
            `${this.key} bus command: CommitCache, hasCachedSnapshot=${!!this.#cachedSnapshot}, hasCommandSnapshot=${!!cmd.snapshot}, willCommit=${!!commitSnapshot}`
          );
          this.#negotiationComplete = true;
          this.#broadcastReady = true;

          if (commitSnapshot) {
            super.commitState(
              this.#ctx,
              isolateValue(commitSnapshot),
              StateEmitTypes.TabSync
            );
          }
          this.#cachedSnapshot = null;
          break;
        }

        case TabSyncBusCommandTypes.ClearCache: {
          vaultDebug(`${this.key} bus command: ClearCache`);
          this.#negotiationComplete = true;
          this.#cachedSnapshot = null;
          break;
        }
      }
    });
  }

  /**
   * Extends commitState to broadcast finalized snapshots to other tabs.
   *
   * @param ctx Pipeline behavior context containing state references.
   * @param changes Partial snapshot changes or null.
   * @param type State emission classification.
   */
  protected override commitState(
    ctx: BehaviorContext<T>,
    changes: Partial<StateSnapshotShape<T>> | null,
    type: StateEmitType
  ): void {
    super.commitState(ctx, changes, type);

    if (!this.#broadcastReady) {
      if (
        this.#negotiationComplete &&
        type === StateEmitTypes.FinalizePipeline
      ) {
        this.#broadcastReady = true;
        vaultDebug(
          `${this.key} commitState: broadcast enabled after first pipeline`
        );
      }
      vaultDebug(
        `${this.key} commitState: skipped broadcast (broadcast not ready)`
      );
      return;
    }
    if (NON_BROADCAST_TYPES.has(type)) {
      vaultDebug(
        `${this.key} commitState: skipped broadcast (non-broadcast type "${type}")`
      );
      return;
    }
    if (!this.#channel) {
      vaultDebug(`${this.key} commitState: skipped broadcast (no channel)`);
      return;
    }

    const message: TabSyncMessageShape<T> = {
      featureCellKey: this.#featureCellKey,
      tabId: this.tabId,
      snapshot: isolateValue(ctx.lastSnapshot),
      type
    };

    this.#channel.postMessage(message);

    vaultDebug(
      `${this.key} broadcast state for "${this.#featureCellKey}" (type: ${type})`
    );
  }

  /**
   * Emits a terminal destroy state snapshot and closes the channel.
   *
   * @param ctx Pipeline behavior context.
   */
  override destroy(ctx: BehaviorContext<T>): void {
    super.destroy(ctx);
    this.#closeChannel();
    this.#busSubscription?.unsubscribe();
    this.#busSubscription = null;
  }

  /**
   * Emits a terminal reset state snapshot while keeping the channel open.
   *
   * @param ctx Pipeline behavior context.
   */
  override reset(ctx: BehaviorContext<T>): void {
    super.reset(ctx);
  }
}
