import {
  BehaviorClassContext,
  setVaultLogLevel,
  StepwiseBehaviorContract,
  VAULT_CLEAR_STATE,
  VAULT_CONTINUE,
  VAULT_NOOP
} from '@sdux-vault/shared';
import { StepwiseBusService } from '../../../controllers/stepwise/services/stepwise-bus.service';
import { StepwiseAnswerShape } from '../../../controllers/stepwise/shapes/stepwise-answer.shape';
import { StepwiseRequestShape } from '../../../controllers/stepwise/shapes/stepwise-request.shape';

import { flushVaultPipeline } from '@sdux-vault/testing-utils';
import { Subject } from 'rxjs';
import { StepwiseResponseShape } from '../../../controllers/stepwise/shapes/stepwise-response.shape';
import { StepwiseBehaviorDecisionShape } from '../symbols/shapes/stepwise-behavior-decision.shape';
import { withStepwiseResolveBehavior } from './with-stepwise-resolve.behavior';

describe('Behavior: Stepwise Resolve', () => {
  let behavior: StepwiseBehaviorContract<any>;
  let bus: ReturnType<typeof StepwiseBusService>;
  let currentResult: any;
  let candidateResult: any;
  let callbacks: StepwiseBehaviorDecisionShape;
  let warnSpy: jasmine.Spy;

  let requestSubject: Subject<StepwiseRequestShape>;
  let responseSubject: Subject<StepwiseResponseShape>;
  let answerSubject: Subject<StepwiseAnswerShape>;

  beforeAll(() => {
    warnSpy = spyOn(console, 'warn');
  });

  beforeEach(() => {
    warnSpy.calls.reset();
    setVaultLogLevel('warn');
  });

  afterEach(() => {
    setVaultLogLevel('off');
  });

  describe('withStepwise with config', () => {
    beforeEach(() => {
      bus = StepwiseBusService();
      // Replace internal subjects with controlled ones
      requestSubject = new Subject();
      responseSubject = new Subject();
      answerSubject = new Subject();

      spyOn(bus, 'emitInboundRequest').and.callFake(
        (req: StepwiseRequestShape) => {
          requestSubject.next(req);
        }
      );

      spyOn(bus, 'emitResponse').and.callFake((req: StepwiseResponseShape) => {
        responseSubject.next(req);
      });

      spyOn(bus, 'waitForAnswer').and.callFake(() => {
        return answerSubject.asObservable();
      });

      behavior = new withStepwiseResolveBehavior('stepwise-behavior', {
        behaviorConfig: {
          stepwiseCallback: (
            behaviorCurrent: any,
            behaviorCandidate: any,
            behaviorCallbacks: StepwiseBehaviorDecisionShape
          ) => {
            currentResult = behaviorCurrent;
            candidateResult = behaviorCandidate;
            callbacks = behaviorCallbacks;
          }
        }
      } as BehaviorClassContext);
    });
    it('should have correct metadata', () => {
      expect(behavior.type).toBe('stepwiseResolve');
      expect(behavior.critical).toBeTrue();
      expect(behavior.key).toBe('stepwise-behavior');
    });

    it('should have default decorator properties', () => {
      expect(withStepwiseResolveBehavior.critical).toBeTrue();
      expect(withStepwiseResolveBehavior.type).toBe('stepwiseResolve');
      expect(withStepwiseResolveBehavior.key).toBe(
        'SDUX::Behavior::Policy::StepwiseResolve'
      );
      expect(withStepwiseResolveBehavior.wantsConfig).toBeTrue();
      expect(withStepwiseResolveBehavior.configKey).toBe('withStepwiseResolve');
      expect(typeof withStepwiseResolveBehavior.installFluentApi).toBe(
        'function'
      );
    });

    // ---------------------------------------------------------------------------
    // Request emission
    // ---------------------------------------------------------------------------

    it('should emit a StepwiseRequest with correct shape for continue', async () => {
      const pipelineId = 'p1';
      const snapshot = { value: 123 };
      const candidate = { value: 456 };

      let emitted: any[] = [];

      requestSubject.subscribe((r) => emitted.push(r));
      responseSubject.subscribe((r) => emitted.push(r));

      const promise = behavior.evaluateStepwise(
        snapshot,
        candidate,
        pipelineId
      );

      callbacks.continue();
      expect(callbacks.stage).toBe('resolve');

      expect(currentResult).toEqual(snapshot);
      expect(candidateResult).toEqual(candidate);

      await flushVaultPipeline();

      answerSubject.next({
        id: `${pipelineId}:Resolve:TestStepwise`,
        decision: 'continue'
      });

      expect(await promise).toBe(VAULT_CONTINUE);

      expect(emitted).toEqual([
        Object({
          id: 'p1:Resolve:stepwise-behavior',
          pipelineId: 'p1',
          stage: 'resolve',
          snapshot
        }),
        Object({
          id: 'p1:Resolve:stepwise-behavior',
          pipelineId: 'p1',
          stage: 'resolve',
          decision: 'continue'
        })
      ]);

      expect(currentResult).toEqual(Object({ value: 123 }));
    });

    it('should emit a StepwiseRequest with correct shape for block', async () => {
      const pipelineId = 'p1';
      const snapshot = { value: 123 };
      const candidate = { value: 456 };

      let emitted: any[] = [];

      requestSubject.subscribe((r) => emitted.push(r));
      responseSubject.subscribe((r) => emitted.push(r));

      const promise = behavior.evaluateStepwise(
        snapshot,
        candidate,
        pipelineId
      );

      callbacks.block();
      expect(callbacks.stage).toBe('resolve');

      expect(currentResult).toEqual(snapshot);
      expect(candidateResult).toEqual(candidate);

      await flushVaultPipeline();

      answerSubject.next({
        id: `${pipelineId}:Resolve:TestStepwise`,
        decision: 'block'
      });

      expect(await promise).toBe(VAULT_NOOP);

      expect(emitted).toEqual([
        Object({
          id: 'p1:Resolve:stepwise-behavior',
          pipelineId: 'p1',
          stage: 'resolve',
          snapshot
        }),
        Object({
          id: 'p1:Resolve:stepwise-behavior',
          pipelineId: 'p1',
          stage: 'resolve',
          decision: 'block'
        })
      ]);

      expect(currentResult).toEqual(Object({ value: 123 }));
    });

    it('should emit a StepwiseRequest with correct shape for clear', async () => {
      const pipelineId = 'p1';
      const snapshot = { value: 123 };
      const candidate = { value: 456 };

      let emitted: any[] = [];

      requestSubject.subscribe((r) => emitted.push(r));
      responseSubject.subscribe((r) => emitted.push(r));

      const promise = behavior.evaluateStepwise(
        snapshot,
        candidate,
        pipelineId
      );

      callbacks.clear();
      expect(callbacks.stage).toBe('resolve');

      expect(currentResult).toEqual(snapshot);
      expect(candidateResult).toEqual(candidate);

      await flushVaultPipeline();

      answerSubject.next({
        id: `${pipelineId}:Resolve:TestStepwise`,
        decision: 'clear'
      });

      expect(await promise).toBe(VAULT_CLEAR_STATE);

      expect(emitted).toEqual([
        Object({
          id: 'p1:Resolve:stepwise-behavior',
          pipelineId: 'p1',
          stage: 'resolve',
          snapshot
        }),
        Object({
          id: 'p1:Resolve:stepwise-behavior',
          pipelineId: 'p1',
          stage: 'resolve',
          decision: 'clear'
        })
      ]);

      expect(currentResult).toEqual(Object({ value: 123 }));
    });

    it('should emit a StepwiseRequest with correct shape for other', async () => {
      const pipelineId = 'p1';
      const snapshot = { value: 123 };
      const candidate = { value: 456 };

      let emitted: any[] = [];

      requestSubject.subscribe((r) => emitted.push(r));
      responseSubject.subscribe((r) => emitted.push(r));

      const promise = behavior.evaluateStepwise(
        snapshot,
        candidate,
        pipelineId
      );

      callbacks.clear();
      expect(callbacks.stage).toBe('resolve');

      expect(currentResult).toEqual(snapshot);
      expect(candidateResult).toEqual(candidate);

      await flushVaultPipeline();

      answerSubject.next({
        id: `${pipelineId}:Resolve:TestStepwise`,
        decision: 'other' as any
      });

      expect(await promise).toBe(VAULT_NOOP);

      expect(emitted).toEqual([
        Object({
          id: 'p1:Resolve:stepwise-behavior',
          pipelineId: 'p1',
          stage: 'resolve',
          snapshot
        }),
        Object({
          id: 'p1:Resolve:stepwise-behavior',
          pipelineId: 'p1',
          stage: 'resolve',
          decision: 'clear'
        })
      ]);

      expect(currentResult).toEqual(Object({ value: 123 }));
    });

    // ---------------------------------------------------------------------------
    // Lifecycle
    // ---------------------------------------------------------------------------

    it('destroy() should be a no-op', async () => {
      expect(() => behavior.destroy()).not.toThrow();
      await flushVaultPipeline();
      expect(warnSpy).toHaveBeenCalledWith(
        '[vault]',
        'stepwise-behavior - destroy noop'
      );
    });

    it('reset() should be a no-op', async () => {
      expect(() => behavior.reset()).not.toThrow();
      await flushVaultPipeline();
      expect(warnSpy).toHaveBeenCalledWith(
        '[vault]',
        'stepwise-behavior - reset noop'
      );
    });

    describe('fluent api: installFluentApi()', () => {
      let cell: any;
      let behaviorConfigs: Map<any, unknown>;

      beforeEach(() => {
        behaviorConfigs = new Map();

        cell = {
          key: 'cell-key'
        };

        // install fluent api
        withStepwiseResolveBehavior.installFluentApi(cell, behaviorConfigs);
      });

      it('should install withStateCache on the cell', () => {
        expect(typeof cell.withStepwiseResolve).toBe('function');
      });

      it('should store options in behaviorConfigs under withStepwiseResolve key', () => {
        const options = {
          idKey: 'id',
          fetch: jasmine.createSpy('fetch')
        };

        cell.withStepwiseResolve(options);

        expect(behaviorConfigs.has('withStepwiseResolve')).toBeTrue();
        expect(behaviorConfigs.get('withStepwiseResolve')).toBe(options);
      });

      it('should return the cell to allow fluent chaining', () => {
        const options = {
          idKey: 'id',
          fetch: jasmine.createSpy('fetch')
        };

        const result = cell.withStepwiseResolve(options);

        expect(result).toBe(cell);
      });

      it('should overwrite previous cache config when called again', () => {
        const options1 = {
          idKey: 'id',
          fetch: jasmine.createSpy('fetch1')
        };

        const options2 = {
          idKey: 'uuid',
          fetch: jasmine.createSpy('fetch2')
        };

        cell.withStepwiseResolve(options1);
        cell.withStepwiseResolve(options2);

        expect(behaviorConfigs.get('withStepwiseResolve')).toBe(options2);
      });

      it('should propagate errors thrown by stepwiseCallback', async () => {
        const behavior = new withStepwiseResolveBehavior('stepwise-behavior', {
          behaviorConfig: {
            stepwiseCallback: () => {
              throw new Error('engineer error');
            }
          }
        } as BehaviorClassContext);

        await expectAsync(
          behavior.evaluateStepwise({ value: 1 }, { value: 2 }, 'p1')
        ).toBeRejectedWithError('engineer error');
      });
    });
  });

  describe('without config', () => {
    it('should throw if options are missing', () => {
      expect(
        () =>
          new withStepwiseResolveBehavior<any>(
            'behavior-key',
            {} as BehaviorClassContext
          )
      ).toThrowError(
        '[vault] Stepwise behavior requires configuration via withStepwiseResolve()'
      );
    });

    it('should throw if fetch option is not a function', () => {
      expect(
        () =>
          new withStepwiseResolveBehavior<any>('behavior-key', {
            behaviorConfig: {}
          } as BehaviorClassContext)
      ).toThrowError(
        '[vault] Stepwise behavior requires stepwiseCallback to be a function'
      );
    });
  });
});
