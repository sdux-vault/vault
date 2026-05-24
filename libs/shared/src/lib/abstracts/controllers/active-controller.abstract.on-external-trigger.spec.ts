import { Observable, of } from 'rxjs';

import { flushVaultPipeline } from '@sdux-vault/testing-utils';
import { ControllerClassContext } from '../../contexts/controller-class.context';
import { VaultPrivateErrorServiceContract } from '../../interfaces/vault/vault-private-error-service.interface';
import { VaultPrivateErrorService } from '../../services/error/vault-private-error.service';
import { ControllerMessageTypes } from '../../types/controller/controller-message.type';
import { ControllerVote } from '../../types/controller/controller-vote.type';
import { DevMode, setVaultLogLevel } from '../../utils';
import { AbstractActiveController } from './active-controller.abstract';

// ----------------------------------------------
// Fake concrete controller for testing
// ----------------------------------------------
class TestActiveController extends AbstractActiveController<any> {
  readonly type = 'test-type' as any;

  public lastTriggerState: boolean | null = null;
  public lastHandleMessage: any = null;

  constructor(key: any, ctrlCtx: any) {
    super(key, ctrlCtx);
  }

  protected override onExternalTrigger(newState: boolean): void {
    this.lastTriggerState = newState;
  }

  handleMessage(msg: any): Observable<ControllerVote | void> {
    this.lastHandleMessage = msg;
    return of('handled' as any);
  }
}

describe('Abstract: ActiveController', () => {
  let controller: TestActiveController;
  let privateErrorService: VaultPrivateErrorServiceContract;

  let warnSpy: jasmine.Spy;
  let debugSpy: jasmine.Spy;

  const revoteCalls: string[] = [];

  beforeAll(() => {
    warnSpy = spyOn(console, 'warn');
    debugSpy = spyOn(console, 'debug');
  });

  beforeEach(() => {
    warnSpy.calls.reset();
    debugSpy.calls.reset();
    revoteCalls.length = 0;

    setVaultLogLevel('debug');
    DevMode.setDevMode(true);

    privateErrorService = VaultPrivateErrorService();

    controller = new TestActiveController('test-controller', {
      featureCellKey: 'cell-key',
      requestRevote: (traceId: string) => {
        revoteCalls.push(traceId);
      }
    } as ControllerClassContext);
  });

  afterEach(() => {
    privateErrorService.clear();
    controller.destroy();
    setVaultLogLevel('off');
  });

  // ---------------------------------------------------------------------------
  // SUBSCRIPTION BEHAVIOR
  // ---------------------------------------------------------------------------

  it('should NOT request revote when error changes but traceId is not yet assigned', () => {
    privateErrorService.setError({ message: 'boom' } as any);

    expect(revoteCalls).toEqual([null as any]); // no traceId yet → no revote
    expect(controller.lastTriggerState).toBeTrue(); // onExternalTrigger still fires
  });

  it('should request revote only when error state toggles AND traceId exists', () => {
    controller['traceId'] = 'trace-123';

    privateErrorService.setError({ message: 'ERR' } as any);
    expect(revoteCalls).toEqual(['trace-123']);

    privateErrorService.clear();
    expect(revoteCalls).toEqual(['trace-123', 'trace-123']);
  });

  it('should NOT request revote if error state does NOT change', () => {
    controller['traceId'] = 'trace-xyz';

    privateErrorService.setError({ message: 'ERR' } as any);
    revoteCalls.length = 0;

    privateErrorService.setError({ message: 'ERR' } as any); // same state
    expect(revoteCalls).toEqual([]); // no additional revote
  });

  it('should call onExternalTrigger on each error emission', () => {
    controller['traceId'] = 'trace-a';

    privateErrorService.setError({ message: 'ERR' } as any);
    expect(controller.lastTriggerState).toBeTrue();

    privateErrorService.clear();
    expect(controller.lastTriggerState).toBeFalse();
  });

  // ---------------------------------------------------------------------------
  // HANDLE MESSAGE
  // ---------------------------------------------------------------------------

  it('handleMessage should store incoming message and return observable', async () => {
    const msg = { type: ControllerMessageTypes.Attempt, traceId: 'T1' };
    let received: any;

    controller.handleMessage(msg).subscribe((v) => (received = v));

    expect(received).toBe('handled');
    expect(controller.lastHandleMessage).toBe(msg);
  });

  // ---------------------------------------------------------------------------
  // DESTROY / RESET
  // ---------------------------------------------------------------------------

  it('destroy() should unsubscribe and log a warning', async () => {
    controller.destroy();
    await flushVaultPipeline();

    expect(warnSpy).toHaveBeenCalledWith(
      '[vault]',
      'test-controller - destroy'
    );
  });

  it('reset() should log a diagnostic warning but remain a no-op', async () => {
    controller.reset();
    await flushVaultPipeline();

    expect(warnSpy).toHaveBeenCalledWith(
      '[vault]',
      'test-controller - reset "noop"'
    );
  });
});
