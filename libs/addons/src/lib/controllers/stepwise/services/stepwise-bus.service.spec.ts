import { setVaultLogLevel } from '@sdux-vault/shared';
import { flushVaultPipeline } from '@sdux-vault/testing-utils';
import { StepwiseAnswerShape } from '../shapes/stepwise-answer.shape';
import { StepwiseRequestShape } from '../shapes/stepwise-request.shape';
import { StepwiseResponseShape } from '../shapes/stepwise-response.shape';
import { StepwiseBusService } from './stepwise-bus.service';

describe('Service: StepwiseBus', () => {
  let bus: any;
  let debugSpy: any;

  beforeAll(() => {
    debugSpy = spyOn(console, 'debug');
  });

  beforeEach(() => {
    debugSpy.calls.reset();

    setVaultLogLevel('debug');

    bus = StepwiseBusService();
  });

  afterEach(() => {
    setVaultLogLevel('off');
  });

  // ---------------------------------------------------------------------------
  // Singleton behavior
  // ---------------------------------------------------------------------------

  it('should return the same singleton instance on multiple calls', () => {
    const bus2 = StepwiseBusService();
    expect(bus).toBe(bus2);
  });

  // ---------------------------------------------------------------------------
  // Request channel
  // ---------------------------------------------------------------------------

  it('should emit inbound stepwise requests', async () => {
    const request: StepwiseRequestShape = {
      id: 'req-1',
      pipelineId: 'pipe-1',
      stage: 'resolve',
      snapshot: { foo: 'bar' }
    };

    const sub = bus.inboundRequest$.subscribe((req: any) => {
      expect(req).toEqual(request);
      sub.unsubscribe();
    });

    bus.emitInboundRequest(request);

    await flushVaultPipeline();

    expect(debugSpy).toHaveBeenCalledWith(
      '[vault]',
      '[StepwiseBus] inboundRequest id="req-1" stage="resolve"'
    );
  });

  it('should log when emitting a request', async () => {
    const request: StepwiseRequestShape = {
      id: 'req-log',
      pipelineId: 'pipe-log',
      stage: 'filter',
      snapshot: null
    };

    bus.emitOutboundRequest(request);

    await flushVaultPipeline();
    expect(debugSpy).toHaveBeenCalledWith(
      '[vault]',
      '[StepwiseBus] outboundRequest id="req-log" stage="filter"'
    );
  });

  // ---------------------------------------------------------------------------
  // Answer channel
  // ---------------------------------------------------------------------------

  it('should emit stepwise answers to answer$', async () => {
    const answer: StepwiseAnswerShape = {
      id: 'ans-1',
      decision: 'continue'
    };

    const sub = bus.answer$.subscribe((answer: any) => {
      expect(answer).toEqual(answer);
      sub.unsubscribe();
    });

    bus.emitAnswer(answer);

    await flushVaultPipeline();
    expect(debugSpy).toHaveBeenCalledWith(
      '[vault]',
      '[StepwiseBus] emitAnswer id="ans-1" decision="continue"'
    );
  });

  it('should log when submitting an answer', async () => {
    const answer: StepwiseAnswerShape = {
      id: 'ans-log',
      decision: 'block'
    };

    bus.emitAnswer(answer);

    await flushVaultPipeline();
    expect(debugSpy).toHaveBeenCalledWith(
      '[vault]',
      '[StepwiseBus] emitAnswer id="ans-log" decision="block"'
    );
  });

  // ---------------------------------------------------------------------------
  // Correlation / waitForAnswer
  // ---------------------------------------------------------------------------

  it('should resolve waitForAnswer when matching answer arrives', () => {
    let result: any;
    const answer: StepwiseAnswerShape = {
      id: 'corr-1',
      decision: 'continue'
    };

    bus.waitForAnswer('corr-1').subscribe((answer: any) => {
      result = answer;
    });

    bus.emitAnswer(answer);
    expect(result).toEqual(answer);
  });

  it('should ignore answers with non-matching ids', () => {
    let called = false;

    bus.waitForAnswer('target').subscribe(() => {
      called = true;
    });

    bus.emitAnswer({ id: 'other', decision: 'clear' });

    expect(called).toBeFalse();
  });

  it('should complete waitForAnswer after first matching emission', () => {
    const received: StepwiseAnswerShape[] = [];

    bus.waitForAnswer('once').subscribe({
      next: (answer: any) => received.push(answer)
    });

    bus.emitAnswer({ id: 'once', decision: 'continue' });
    bus.emitAnswer({ id: 'once', decision: 'clear' }); // ignored

    expect(received.length).toBe(1);
    expect(received[0].decision).toBe('continue');
  });

  // ---------------------------------------------------------------------------
  // Lifecycle / destroy
  // ---------------------------------------------------------------------------

  // ---------------------------------------------------------------------------
  // Safety / robustness
  // ---------------------------------------------------------------------------

  it('should allow multiple subscribers on inboundRequest$', async () => {
    const values: StepwiseRequestShape[] = [];

    const s1 = bus.inboundRequest$.subscribe((v: any) => values.push(v));
    const s2 = bus.inboundRequest$.subscribe((v: any) => values.push(v));

    bus.emitInboundRequest({
      id: 'multi',
      pipelineId: 'p',
      stage: 'reduce',
      snapshot: {}
    });

    await flushVaultPipeline();

    expect(values.length).toBe(2);

    s1.unsubscribe();
    s2.unsubscribe();
  });

  it('should allow multiple subscribers on answer$', async () => {
    const values: StepwiseAnswerShape[] = [];

    const s1 = bus.answer$.subscribe((v: any) => values.push(v));
    const s2 = bus.answer$.subscribe((v: any) => values.push(v));

    bus.emitAnswer({ id: 'multi-ans', decision: 'defer' });

    await flushVaultPipeline();

    expect(values.length).toBe(2);

    s1.unsubscribe();
    s2.unsubscribe();
  });

  it('should emit stepwise responses to response$', async () => {
    const response: StepwiseResponseShape = {
      id: 'resp-1',
      pipelineId: 'pipe-1',
      stage: 'resolve',
      decision: 'continue'
    };

    let received: StepwiseResponseShape | undefined;

    const sub = bus.response$.subscribe((r: any) => {
      received = r;
      sub.unsubscribe();
    });

    bus.emitResponse(response);

    await flushVaultPipeline();

    expect(received).toEqual(response);
  });

  it('should log when emitting a response', async () => {
    const response: StepwiseResponseShape = {
      id: 'resp-log',
      pipelineId: 'pipe-log',
      stage: 'filter',
      decision: 'block'
    };

    bus.emitResponse(response);

    await flushVaultPipeline();

    expect(debugSpy).toHaveBeenCalledWith(
      '[vault]',
      '[StepwiseBus] emitResponse id="resp-log" stage="filter" decision="block"'
    );
  });

  it('should allow multiple subscribers on response$', async () => {
    const values: StepwiseResponseShape[] = [];

    const s1 = bus.response$.subscribe((v: any) => values.push(v));
    const s2 = bus.response$.subscribe((v: any) => values.push(v));

    bus.emitResponse({
      id: 'resp-multi',
      pipelineId: 'pipe',
      stage: 'reduce',
      decision: 'clear'
    });

    await flushVaultPipeline();

    expect(values.length).toBe(2);

    s1.unsubscribe();
    s2.unsubscribe();
  });

  it('should not emit responses on answer$', async () => {
    let called = false;

    bus.answer$.subscribe(() => {
      called = true;
    });

    bus.emitResponse({
      id: 'resp-isolation',
      pipelineId: 'pipe-x',
      stage: 'resolve',
      decision: 'continue'
    });

    await flushVaultPipeline();

    expect(called).toBeFalse();
  });

  it('should allow responses even when no request was emitted', async () => {
    let received: StepwiseResponseShape | undefined;

    bus.response$.subscribe((r: any) => {
      received = r;
    });

    bus.emitResponse({
      id: 'orphan-response',
      pipelineId: 'pipe-orphan',
      stage: 'filter',
      decision: 'clear'
    });

    await flushVaultPipeline();

    expect(received?.id).toBe('orphan-response');
  });

  it('should not emit if waitForAnswer subscriber unsubscribes early', () => {
    let called = false;

    const sub = bus.waitForAnswer('early').subscribe(() => {
      called = true;
    });

    sub.unsubscribe();

    bus.emitAnswer({ id: 'early', decision: 'continue' });

    expect(called).toBeFalse();
  });

  it('should not complete waitForAnswer when non-matching answers arrive', () => {
    let completed = false;

    bus.waitForAnswer('target').subscribe({
      complete: () => (completed = true)
    });

    bus.emitAnswer({ id: 'other', decision: 'clear' });

    expect(completed).toBeFalse();
  });

  it('should resolve multiple waitForAnswer subscriptions independently', () => {
    const results: any[] = [];

    bus.waitForAnswer('a').subscribe((v: any) => results.push(v));
    bus.waitForAnswer('b').subscribe((v: any) => results.push(v));

    bus.emitAnswer({ id: 'b', decision: 'block' });
    bus.emitAnswer({ id: 'a', decision: 'continue' });

    expect(results).toEqual([
      { id: 'b', decision: 'block' },
      { id: 'a', decision: 'continue' }
    ]);
  });

  it('should not replay past answers to late waitForAnswer subscribers', () => {
    let called = false;

    bus.emitAnswer({ id: 'late', decision: 'continue' });

    bus.waitForAnswer('late').subscribe(() => {
      called = true;
    });

    expect(called).toBeFalse();
  });

  it('should not emit inbound requests on outboundRequest$', async () => {
    let called = false;

    bus.outboundRequest$.subscribe(() => (called = true));

    bus.emitInboundRequest({
      id: 'iso',
      pipelineId: 'p',
      stage: 'resolve',
      snapshot: {}
    });

    await flushVaultPipeline();
    expect(called).toBeFalse();
  });

  it('should not emit outbound requests on inboundRequest$', async () => {
    let called = false;

    bus.inboundRequest$.subscribe(() => (called = true));

    bus.emitOutboundRequest({
      id: 'iso',
      pipelineId: 'p',
      stage: 'resolve',
      snapshot: {}
    });

    await flushVaultPipeline();
    expect(called).toBeFalse();
  });
});
