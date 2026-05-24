import { Observable, of } from 'rxjs';

import { ControllerClassContext } from '../../contexts/controller-class.context';
import { VaultPrivateErrorServiceContract } from '../../interfaces/vault/vault-private-error-service.interface';
import { VaultPrivateErrorService } from '../../services/error/vault-private-error.service';
import { ControllerMessageTypes } from '../../types/controller/controller-message.type';
import { ControllerVote } from '../../types/controller/controller-vote.type';
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

  handleMessage(msg: any): Observable<ControllerVote | void> {
    this.lastHandleMessage = msg;
    return of('handled' as any);
  }
}

describe('Abstract: ActiveController - without OnExternalTrigger', () => {
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
  });

  it('should not call onExternalTrigger on each error emission', () => {
    controller['traceId'] = 'trace-a';

    privateErrorService.setError({ message: 'ERR' } as any);
    expect(controller.lastTriggerState).toBeNull();

    privateErrorService.clear();
    expect(controller.lastTriggerState).toBeNull();
  });

  it('handleMessage should store incoming message and return observable', async () => {
    const msg = { type: ControllerMessageTypes.Attempt, traceId: 'T1' };
    let received: any;

    controller.handleMessage(msg).subscribe((v) => (received = v));

    expect(received).toBe('handled');
    expect(controller.lastHandleMessage).toBe(msg);
  });
});
