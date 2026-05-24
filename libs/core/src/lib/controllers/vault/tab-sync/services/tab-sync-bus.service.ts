import { vaultDebug } from '@sdux-vault/shared';
import { Observable, Subject } from 'rxjs';
import { filter, take } from 'rxjs/operators';

import { TabSyncBusCommandShape } from '../shapes/tab-sync-bus-command.shape';
import { TabSyncBusNotificationShape } from '../shapes/tab-sync-bus-notification.shape';
import { TabSyncBusNotificationType } from '../types/tab-sync-bus-notification.type';

/**
 * Directional message bus that coordinates tab sync negotiation between controllers and behaviors.
 *
 * This service provides isolated channels for the tab sync controller to issue commands
 * to the behavior and for the behavior to notify the controller about cross-tab
 * negotiation outcomes. Neither side holds a direct reference to the other.
 */
class TabSyncBusServiceClass {
  /**
   * Subject emitting commands from the controller to the behavior.
   */
  readonly #command$ = new Subject<TabSyncBusCommandShape>();

  /**
   * Subject emitting notifications from the behavior to the controller.
   */
  readonly #notification$ = new Subject<TabSyncBusNotificationShape>();

  /**
   * Observable stream of commands issued by the controller.
   */
  readonly command$: Observable<TabSyncBusCommandShape> =
    this.#command$.asObservable();

  /**
   * Observable stream of notifications emitted by the behavior.
   */
  readonly notification$: Observable<TabSyncBusNotificationShape> =
    this.#notification$.asObservable();

  /**
   * Emits a command from the controller to the behavior.
   *
   * @param command - The command to emit.
   */
  emitCommand(command: TabSyncBusCommandShape): void {
    vaultDebug(
      `[TabSyncBus] command="${command.command}" featureCellKey="${command.featureCellKey}"`
    );
    this.#command$.next(command);
  }

  /**
   * Emits a notification from the behavior to the controller.
   *
   * @param notification - The notification to emit.
   */
  emitNotification(notification: TabSyncBusNotificationShape): void {
    vaultDebug(
      `[TabSyncBus] notification="${notification.notification}" featureCellKey="${notification.featureCellKey}"`
    );
    this.#notification$.next(notification);
  }

  /**
   * Returns an observable that resolves with the first notification matching
   * the given FeatureCell key and notification type.
   *
   * @param featureCellKey - The FeatureCell key to filter on.
   * @param type - The notification type to wait for.
   * @returns An observable emitting the matching notification.
   */
  waitForNotification(
    featureCellKey: string,
    type: TabSyncBusNotificationType
  ): Observable<TabSyncBusNotificationShape> {
    return this.notification$.pipe(
      filter(
        (n) => n.featureCellKey === featureCellKey && n.notification === type
      ),
      take(1)
    );
  }

  /**
   * Returns an observable that resolves with the first command matching
   * the given FeatureCell key.
   *
   * @param featureCellKey - The FeatureCell key to filter on.
   * @returns An observable emitting the matching command.
   */
  waitForCommand(featureCellKey: string): Observable<TabSyncBusCommandShape> {
    return this.command$.pipe(
      filter((c) => c.featureCellKey === featureCellKey),
      take(1)
    );
  }
}

/**
 * Cached singleton instance of the tab sync bus service.
 */
let _instance: TabSyncBusServiceClass | null = null;

/**
 * Returns the singleton instance of the tab sync bus service.
 *
 * @returns The shared tab sync bus service instance.
 */
export function TabSyncBusService(): TabSyncBusServiceClass {
  if (!_instance) {
    _instance = new TabSyncBusServiceClass();
  }
  return _instance;
}
