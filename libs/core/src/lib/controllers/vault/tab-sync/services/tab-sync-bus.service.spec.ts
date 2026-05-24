import { setVaultLogLevel } from '@sdux-vault/shared';
import { flushVaultPipeline } from '@sdux-vault/testing-utils';
import { TabSyncBusCommandShape } from '../shapes/tab-sync-bus-command.shape';
import { TabSyncBusNotificationShape } from '../shapes/tab-sync-bus-notification.shape';
import { TabSyncBusCommandTypes } from '../types/tab-sync-bus-command.type';
import { TabSyncBusNotificationTypes } from '../types/tab-sync-bus-notification.type';
import { TabSyncBusService } from './tab-sync-bus.service';

describe('Service: TabSyncBus', () => {
  let bus: ReturnType<typeof TabSyncBusService>;
  let debugSpy: jasmine.Spy;

  beforeAll(() => {
    debugSpy = spyOn(console, 'debug');
  });

  beforeEach(() => {
    debugSpy.calls.reset();
    setVaultLogLevel('debug');
    bus = TabSyncBusService();
  });

  afterEach(() => {
    setVaultLogLevel('off');
  });

  // ---------------------------------------------------------------------------
  // Singleton behavior
  // ---------------------------------------------------------------------------

  it('should return the same singleton instance on multiple calls', () => {
    const bus2 = TabSyncBusService();
    expect(bus).toBe(bus2);
  });

  // ---------------------------------------------------------------------------
  // Command channel (controller → behavior)
  // ---------------------------------------------------------------------------

  it('should emit commands on command$', async () => {
    const command: TabSyncBusCommandShape = {
      featureCellKey: 'employees',
      tabId: 'test-tab',
      command: TabSyncBusCommandTypes.CommitCache
    };

    let received: TabSyncBusCommandShape | undefined;

    const sub = bus.command$.subscribe((cmd) => {
      received = cmd;
      sub.unsubscribe();
    });

    bus.emitCommand(command);

    await flushVaultPipeline();

    expect(received).toEqual(command);
  });

  it('should log when emitting a command', async () => {
    bus.emitCommand({
      featureCellKey: 'employees',
      tabId: 'test-tab',
      command: TabSyncBusCommandTypes.ClearCache
    });

    await flushVaultPipeline();

    expect(debugSpy).toHaveBeenCalledWith(
      '[vault]',
      '[TabSyncBus] command="clear-cache" featureCellKey="employees"'
    );
  });

  it('should allow multiple subscribers on command$', async () => {
    const values: TabSyncBusCommandShape[] = [];

    const s1 = bus.command$.subscribe((v) => values.push(v));
    const s2 = bus.command$.subscribe((v) => values.push(v));

    bus.emitCommand({
      featureCellKey: 'employees',
      tabId: 'test-tab',
      command: TabSyncBusCommandTypes.SendSnapshot
    });

    await flushVaultPipeline();

    expect(values.length).toBe(2);

    s1.unsubscribe();
    s2.unsubscribe();
  });

  // ---------------------------------------------------------------------------
  // Notification channel (behavior → controller)
  // ---------------------------------------------------------------------------

  it('should emit notifications on notification$', async () => {
    const notification: TabSyncBusNotificationShape = {
      featureCellKey: 'employees',
      notification: TabSyncBusNotificationTypes.PeerSnapshotReceived,
      snapshot: { value: [1, 2, 3] }
    };

    let received: TabSyncBusNotificationShape | undefined;

    const sub = bus.notification$.subscribe((n) => {
      received = n;
      sub.unsubscribe();
    });

    bus.emitNotification(notification);

    await flushVaultPipeline();

    expect(received).toEqual(notification);
  });

  it('should log when emitting a notification', async () => {
    bus.emitNotification({
      featureCellKey: 'employees',
      notification: TabSyncBusNotificationTypes.SnapshotReady
    });

    await flushVaultPipeline();

    expect(debugSpy).toHaveBeenCalledWith(
      '[vault]',
      '[TabSyncBus] notification="snapshot-ready" featureCellKey="employees"'
    );
  });

  it('should allow multiple subscribers on notification$', async () => {
    const values: TabSyncBusNotificationShape[] = [];

    const s1 = bus.notification$.subscribe((v) => values.push(v));
    const s2 = bus.notification$.subscribe((v) => values.push(v));

    bus.emitNotification({
      featureCellKey: 'employees',
      notification: TabSyncBusNotificationTypes.SnapshotReady,
      snapshot: { value: 'test' }
    });

    await flushVaultPipeline();

    expect(values.length).toBe(2);

    s1.unsubscribe();
    s2.unsubscribe();
  });

  // ---------------------------------------------------------------------------
  // waitForNotification
  // ---------------------------------------------------------------------------

  it('should resolve waitForNotification when matching notification arrives', () => {
    let result: TabSyncBusNotificationShape | undefined;

    bus
      .waitForNotification(
        'employees',
        TabSyncBusNotificationTypes.PeerSnapshotReceived
      )
      .subscribe((n) => {
        result = n;
      });

    bus.emitNotification({
      featureCellKey: 'employees',
      notification: TabSyncBusNotificationTypes.PeerSnapshotReceived,
      snapshot: { value: 'synced' }
    });

    expect(result).toEqual({
      featureCellKey: 'employees',
      notification: TabSyncBusNotificationTypes.PeerSnapshotReceived,
      snapshot: { value: 'synced' }
    });
  });

  it('should ignore notifications with non-matching featureCellKey', () => {
    let called = false;

    bus
      .waitForNotification(
        'employees',
        TabSyncBusNotificationTypes.SnapshotReady
      )
      .subscribe(() => {
        called = true;
      });

    bus.emitNotification({
      featureCellKey: 'products',
      notification: TabSyncBusNotificationTypes.SnapshotReady
    });

    expect(called).toBeFalse();
  });

  it('should ignore notifications with non-matching type', () => {
    let called = false;

    bus
      .waitForNotification(
        'employees',
        TabSyncBusNotificationTypes.PeerSnapshotReceived
      )
      .subscribe(() => {
        called = true;
      });

    bus.emitNotification({
      featureCellKey: 'employees',
      notification: TabSyncBusNotificationTypes.SnapshotReady
    });

    expect(called).toBeFalse();
  });

  it('should complete waitForNotification after first matching emission', () => {
    const received: TabSyncBusNotificationShape[] = [];

    bus
      .waitForNotification(
        'employees',
        TabSyncBusNotificationTypes.PeerSnapshotReceived
      )
      .subscribe({
        next: (n) => received.push(n)
      });

    bus.emitNotification({
      featureCellKey: 'employees',
      notification: TabSyncBusNotificationTypes.PeerSnapshotReceived,
      snapshot: { value: 'first' }
    });

    bus.emitNotification({
      featureCellKey: 'employees',
      notification: TabSyncBusNotificationTypes.PeerSnapshotReceived,
      snapshot: { value: 'second' }
    });

    expect(received.length).toBe(1);
    expect(received[0].snapshot).toEqual({ value: 'first' });
  });

  // ---------------------------------------------------------------------------
  // waitForCommand
  // ---------------------------------------------------------------------------

  it('should resolve waitForCommand when matching command arrives', () => {
    let result: TabSyncBusCommandShape | undefined;

    bus.waitForCommand('employees').subscribe((c) => {
      result = c;
    });

    bus.emitCommand({
      featureCellKey: 'employees',
      tabId: 'test-tab',
      command: TabSyncBusCommandTypes.CommitCache
    });

    expect(result).toEqual({
      featureCellKey: 'employees',
      tabId: 'test-tab',
      command: TabSyncBusCommandTypes.CommitCache
    });
  });

  it('should ignore commands with non-matching featureCellKey', () => {
    let called = false;

    bus.waitForCommand('employees').subscribe(() => {
      called = true;
    });

    bus.emitCommand({
      featureCellKey: 'products',
      tabId: 'test-tab',
      command: TabSyncBusCommandTypes.ClearCache
    });

    expect(called).toBeFalse();
  });

  it('should complete waitForCommand after first matching emission', () => {
    const received: TabSyncBusCommandShape[] = [];

    bus.waitForCommand('employees').subscribe({
      next: (c) => received.push(c)
    });

    bus.emitCommand({
      featureCellKey: 'employees',
      tabId: 'test-tab',
      command: TabSyncBusCommandTypes.CommitCache
    });

    bus.emitCommand({
      featureCellKey: 'employees',
      tabId: 'test-tab',
      command: TabSyncBusCommandTypes.ClearCache
    });

    expect(received.length).toBe(1);
    expect(received[0].command).toBe(TabSyncBusCommandTypes.CommitCache);
  });

  // ---------------------------------------------------------------------------
  // Channel isolation
  // ---------------------------------------------------------------------------

  it('should not emit commands on notification$', async () => {
    let called = false;

    bus.notification$.subscribe(() => {
      called = true;
    });

    bus.emitCommand({
      featureCellKey: 'employees',
      tabId: 'test-tab',
      command: TabSyncBusCommandTypes.CommitCache
    });

    await flushVaultPipeline();

    expect(called).toBeFalse();
  });

  it('should not emit notifications on command$', async () => {
    let called = false;

    bus.command$.subscribe(() => {
      called = true;
    });

    bus.emitNotification({
      featureCellKey: 'employees',
      notification: TabSyncBusNotificationTypes.SnapshotReady
    });

    await flushVaultPipeline();

    expect(called).toBeFalse();
  });
});
