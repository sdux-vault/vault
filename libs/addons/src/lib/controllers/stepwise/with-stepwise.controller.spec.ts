import {
  ControllerMessageTypes,
  ControllerVotes,
  setVaultLogLevel
} from '@sdux-vault/shared';
import { flushVaultPipeline } from '@sdux-vault/testing-utils';
import { StepwiseBusService } from './services/stepwise-bus.service';
import { StepwiseRequestShape } from './shapes/stepwise-request.shape';
import { withStepwiseController } from './with-stepwise.controller';

describe('Controller: withStepwiseController (reactive)', () => {
  let controller: withStepwiseController<any>;
  let bus: ReturnType<typeof StepwiseBusService>;
  let warnSpy: jasmine.Spy;
  let debugSpy: jasmine.Spy;

  const ctx: any = {}; // minimal ControllerClassContext stub

  beforeAll(() => {
    warnSpy = spyOn(console, 'warn');
    debugSpy = spyOn(console, 'debug');
  });

  beforeEach(() => {
    warnSpy.calls.reset();
    debugSpy.calls.reset();

    setVaultLogLevel('debug');

    bus = StepwiseBusService();
    controller = new withStepwiseController('stepwise-controller', ctx);
  });

  afterEach(() => {
    controller?.destroy();
    setVaultLogLevel('off');
  });

  // ---------------------------------------------------------------------------
  // Admission
  // ---------------------------------------------------------------------------

  it('should always abstain on handleMessage', () => {
    let result: any;

    controller
      .handleMessage({ type: ControllerMessageTypes.Attempt } as any)
      .subscribe((vote) => (result = vote));

    expect(result).toBe(ControllerVotes.Abstain);
  });

  // ---------------------------------------------------------------------------
  // Request handling
  // ---------------------------------------------------------------------------

  it('should queue incoming requests from request$', async () => {
    const req: StepwiseRequestShape = {
      id: 'r1',
      pipelineId: 'p1',
      stage: 'resolve',
      snapshot: {}
    };

    bus.emitOutboundRequest(req);

    await flushVaultPipeline();

    expect(debugSpy).toHaveBeenCalledWith(
      '[vault]',
      '[StepwiseBus] outboundRequest id="r1" stage="resolve"'
    );
  });

  it('should emit the first queued request outward', async () => {
    const emitted: string[] = [];

    spyOn(bus, 'emitOutboundRequest').and.callFake((r) => emitted.push(r.id));

    // Inject inbound request (Behavior → Controller)
    (bus as any).inboundRequest$['source'].next({
      id: 'r1',
      pipelineId: 'p1',
      stage: 'resolve',
      snapshot: {}
    });

    await flushVaultPipeline();

    expect(emitted).toEqual(['r1']);
  });

  it('should process queued requests sequentially', async () => {
    const answers: any[] = [];

    // Observe final answers only
    bus.answer$.subscribe((a) => answers.push(a));

    // Inject inbound requests (Behavior → Controller)
    bus.emitInboundRequest({
      id: 'r1',
      pipelineId: 'p1',
      stage: 'resolve',
      snapshot: {}
    });

    bus.emitInboundRequest({
      id: 'r2',
      pipelineId: 'p2',
      stage: 'filter',
      snapshot: {}
    });

    await flushVaultPipeline();

    // Only r1 may be resolved first
    bus.emitResponse({
      id: 'r1',
      pipelineId: 'p1',
      stage: 'resolve',
      decision: 'continue'
    });

    await flushVaultPipeline();

    // r2 becomes active after r1 completes
    bus.emitResponse({
      id: 'r2',
      pipelineId: 'p2',
      stage: 'filter',
      decision: 'block'
    });

    await flushVaultPipeline();

    expect(answers).toEqual([
      { id: 'r1', decision: 'continue' },
      { id: 'r2', decision: 'block' }
    ]);
  });

  // ---------------------------------------------------------------------------
  // Response handling
  // ---------------------------------------------------------------------------

  it('should emit answer when matching response arrives', async () => {
    const answers: any[] = [];
    spyOn(bus, 'emitAnswer').and.callFake((a) => answers.push(a));

    // Inject request properly (Behavior → Controller)
    bus.emitInboundRequest({
      id: 'r1',
      pipelineId: 'p1',
      stage: 'resolve',
      snapshot: {}
    });

    await flushVaultPipeline();

    // Respond to the active request
    bus.emitResponse({
      id: 'r1',
      pipelineId: 'p1',
      stage: 'resolve',
      decision: 'continue'
    });

    await flushVaultPipeline();

    expect(answers).toEqual([{ id: 'r1', decision: 'continue' }]);
  });

  it('should warn when response arrives with no awaiting request', async () => {
    bus.emitResponse({
      id: 'ghost',
      pipelineId: 'pX',
      stage: 'resolve',
      decision: 'clear'
    });

    await flushVaultPipeline();

    expect(warnSpy).toHaveBeenCalledWith(
      '[vault]',
      'stepwise-controller received response with no awaiting request id="ghost"'
    );
  });

  it('should warn and ignore out-of-order response', async () => {
    bus.emitOutboundRequest({
      id: 'r1',
      pipelineId: 'p1',
      stage: 'resolve',
      snapshot: {}
    });

    await flushVaultPipeline();

    bus.emitResponse({
      id: 'wrong',
      pipelineId: 'p1',
      stage: 'resolve',
      decision: 'continue'
    });

    await flushVaultPipeline();

    expect(warnSpy).toHaveBeenCalledWith(
      '[vault]',
      'stepwise-controller received response with no awaiting request id="wrong"'
    );
  });

  it('should warn and ignore out-of-order response', async () => {
    const answers: any[] = [];
    bus.answer$.subscribe((a) => answers.push(a));

    // Inbound requests
    bus.emitInboundRequest({
      id: 'r1',
      pipelineId: 'p1',
      stage: 'resolve',
      snapshot: {}
    });

    bus.emitInboundRequest({
      id: 'r2',
      pipelineId: 'p2',
      stage: 'filter',
      snapshot: {}
    });

    await flushVaultPipeline();

    // Out-of-order response
    bus.emitResponse({
      id: 'r2',
      pipelineId: 'p2',
      stage: 'filter',
      decision: 'continue'
    });

    await flushVaultPipeline();

    // Nothing emitted
    expect(answers.length).toBe(0);

    // Correct response
    bus.emitResponse({
      id: 'r1',
      pipelineId: 'p1',
      stage: 'resolve',
      decision: 'continue'
    });

    await flushVaultPipeline();

    expect(answers).toEqual([{ id: 'r1', decision: 'continue' }]);
  });

  it('should ignore duplicate responses after resolution', async () => {
    const answers: any[] = [];
    spyOn(bus, 'emitAnswer').and.callFake((a) => answers.push(a));

    // Properly inject request (Behavior → Controller)
    bus.emitInboundRequest({
      id: 'dup',
      pipelineId: 'p1',
      stage: 'resolve',
      snapshot: {}
    });

    await flushVaultPipeline();

    // First (valid) response
    bus.emitResponse({
      id: 'dup',
      pipelineId: 'p1',
      stage: 'resolve',
      decision: 'continue'
    });

    await flushVaultPipeline();

    // Duplicate response (must be ignored)
    bus.emitResponse({
      id: 'dup',
      pipelineId: 'p1',
      stage: 'resolve',
      decision: 'clear'
    });

    await flushVaultPipeline();

    expect(answers.length).toBe(1);
    expect(answers[0]).toEqual({ id: 'dup', decision: 'continue' });
  });

  it('should continue processing after ignoring an out-of-order response', async () => {
    const answers: any[] = [];
    bus.answer$.subscribe((a) => answers.push(a));

    bus.emitInboundRequest({
      id: 'r1',
      pipelineId: 'p1',
      stage: 'resolve',
      snapshot: {}
    });
    bus.emitInboundRequest({
      id: 'r2',
      pipelineId: 'p2',
      stage: 'filter',
      snapshot: {}
    });

    await flushVaultPipeline();

    // Wrong response first
    bus.emitResponse({
      id: 'r2',
      pipelineId: 'p2',
      stage: 'filter',
      decision: 'continue'
    });
    await flushVaultPipeline();

    // Correct response
    bus.emitResponse({
      id: 'r1',
      pipelineId: 'p1',
      stage: 'resolve',
      decision: 'continue'
    });
    await flushVaultPipeline();

    bus.emitResponse({
      id: 'r2',
      pipelineId: 'p2',
      stage: 'filter',
      decision: 'block'
    });
    await flushVaultPipeline();

    expect(answers).toEqual([
      { id: 'r1', decision: 'continue' },
      { id: 'r2', decision: 'block' }
    ]);
  });

  it('should queue inbound requests while awaiting another', async () => {
    bus.emitInboundRequest({
      id: 'r1',
      pipelineId: 'p1',
      stage: 'resolve',
      snapshot: {}
    });
    await flushVaultPipeline();

    bus.emitInboundRequest({
      id: 'r2',
      pipelineId: 'p2',
      stage: 'filter',
      snapshot: {}
    });
    bus.emitInboundRequest({
      id: 'r3',
      pipelineId: 'p3',
      stage: 'reducer',
      snapshot: {}
    });

    await flushVaultPipeline();

    bus.emitResponse({
      id: 'r1',
      pipelineId: 'p1',
      stage: 'resolve',
      decision: 'continue'
    });
    await flushVaultPipeline();

    bus.emitResponse({
      id: 'r2',
      pipelineId: 'p2',
      stage: 'filter',
      decision: 'continue'
    });
    await flushVaultPipeline();

    bus.emitResponse({
      id: 'r3',
      pipelineId: 'p3',
      stage: 'reducer',
      decision: 'clear'
    });
    await flushVaultPipeline();
  });

  it('should shared requests per controller instance', async () => {
    const controller2 = new withStepwiseController(
      'stepwise-controller-2',
      ctx
    );
    const answers: any[] = [];
    bus.answer$.subscribe((a) => answers.push(a));

    bus.emitInboundRequest({
      id: 'r1',
      pipelineId: 'p1',
      stage: 'resolve',
      snapshot: {}
    });

    await flushVaultPipeline();

    bus.emitResponse({
      id: 'r1',
      pipelineId: 'p1',
      stage: 'resolve',
      decision: 'continue'
    });
    await flushVaultPipeline();

    expect(answers.length).toBe(2);

    controller2.destroy();
  });

  // ---------------------------------------------------------------------------
  // Lifecycle
  // ---------------------------------------------------------------------------

  it('destroy() should unsubscribe and log warning', async () => {
    controller.destroy();
    await flushVaultPipeline();

    expect(warnSpy).toHaveBeenCalledWith(
      '[vault]',
      'stepwise-controller - destroy'
    );
  });

  it('should ignore responses after destroy()', async () => {
    const answers: any[] = [];
    bus.answer$.subscribe((a) => answers.push(a));

    bus.emitInboundRequest({
      id: 'r1',
      pipelineId: 'p1',
      stage: 'resolve',
      snapshot: {}
    });
    await flushVaultPipeline();

    controller.destroy();

    bus.emitResponse({
      id: 'r1',
      pipelineId: 'p1',
      stage: 'resolve',
      decision: 'continue'
    });
    await flushVaultPipeline();

    expect(answers.length).toBe(0);
  });

  it('destroy() should clear queue and awaiting so pending requests do not leak', async () => {
    const outbound: StepwiseRequestShape[] = [];
    bus.outboundRequest$.subscribe((r) => outbound.push(r));

    // Queue two requests — first becomes awaiting, second stays in queue
    bus.emitInboundRequest({
      id: 'r1',
      pipelineId: 'p1',
      stage: 'resolve',
      snapshot: {}
    });
    bus.emitInboundRequest({
      id: 'r2',
      pipelineId: 'p2',
      stage: 'resolve',
      snapshot: {}
    });
    await flushVaultPipeline();

    expect(outbound.length).toBe(1);
    expect(outbound[0].id).toBe('r1');

    // Destroy while r1 is awaiting and r2 is queued
    controller.destroy();
    await flushVaultPipeline();

    // Respond to r1 after destroy — should not emit an answer
    const answers: any[] = [];
    bus.answer$.subscribe((a) => answers.push(a));

    bus.emitResponse({
      id: 'r1',
      pipelineId: 'p1',
      stage: 'resolve',
      decision: 'continue'
    });
    await flushVaultPipeline();

    expect(answers.length).toBe(0);

    // r2 should never have been emitted
    expect(outbound.length).toBe(1);
  });

  it('reset() should log warning only', async () => {
    controller.reset();
    await flushVaultPipeline();

    expect(warnSpy).toHaveBeenCalledWith(
      '[vault]',
      'stepwise-controller - reset noop'
    );
  });
});
