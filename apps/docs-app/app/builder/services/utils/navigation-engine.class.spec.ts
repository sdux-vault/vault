import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { StageInstanceShape } from '../../shapes/stage-instance.shape';
import { StageIdType } from '../../types/id/stage-id.type';
import { NavigationEngineService } from './navigation-engine.class';

const TEST_STAGES: StageInstanceShape[] = [
  {
    stageId: 'policy',
    selected: true,
    status: 'idle',
    index: 0,
    behaviorSelectionMode: 'multiple',
    mode: 'basic'
  },
  {
    stageId: 'interceptor',
    selected: null,
    status: 'inactive',
    index: 1,
    behaviorSelectionMode: 'multiple',
    mode: 'basic'
  },
  {
    stageId: 'resolve',
    selected: true,
    status: 'complete',
    index: 2,
    behaviorSelectionMode: 'multiple',
    mode: 'basic'
  },
  {
    stageId: 'merge',
    selected: null,
    status: 'inactive',
    index: 3,
    behaviorSelectionMode: 'single',
    mode: 'advanced'
  },
  {
    stageId: 'operator',
    selected: null,
    status: 'inactive',
    index: 4,
    behaviorSelectionMode: 'multiple',
    mode: 'basic'
  },
  {
    stageId: 'reducer',
    selected: true,
    status: 'idle',
    index: 7,
    behaviorSelectionMode: 'multiple',
    mode: 'basic'
  },
  {
    stageId: 'encrypt',
    selected: null,
    status: 'inactive',
    index: 8,
    behaviorSelectionMode: 'single',
    mode: 'basic'
  },
  {
    stageId: 'persist',
    selected: null,
    status: 'idle',
    index: 9,
    behaviorSelectionMode: 'single',
    mode: 'advanced'
  },
  {
    stageId: 'stepwise',
    selected: null,
    status: 'inactive',
    index: 12,
    behaviorSelectionMode: 'multiple',
    mode: 'advanced'
  },
  {
    stageId: 'cache',
    selected: true,
    status: 'idle',
    index: 13,
    behaviorSelectionMode: 'single',
    mode: 'basic'
  },
  {
    stageId: 'lookup',
    selected: null,
    status: 'inactive',
    index: 14,
    behaviorSelectionMode: 'single',
    mode: 'basic'
  }
];

describe('Class: NavigationEngine', () => {
  let engine: NavigationEngineService;
  let stages: StageInstanceShape[];

  beforeEach(async () => {
    stages = structuredClone(TEST_STAGES);

    await TestBed.configureTestingModule({
      imports: [],
      providers: [provideZonelessChangeDetection()]
    }).compileComponents();
    engine = TestBed.inject(NavigationEngineService);
  });

  function getStageId(stageId: string): StageIdType {
    return findStage(stageId).stageId;
  }

  function findStage(stageId: string): StageInstanceShape {
    return (
      stages.find((stage: StageInstanceShape) => stage.stageId === stageId) ??
      ({} as StageInstanceShape)
    );
  }

  function updateStage(stageId: string, status: any): void {
    const stage = findStage(stageId);
    stage.status = status;
  }

  describe('getNextViewingStageId', () => {
    it('should pass', () => {
      let stageId = 'policy';
      let result = engine.getNextViewingStageId(stages);
      expect(result).toBe(getStageId(stageId));
      updateStage(stageId, 'complete');

      stageId = 'reducer';
      result = engine.getNextViewingStageId(stages);
      expect(result).toBe(findStage(stageId).stageId);
      updateStage(stageId, 'complete');

      stageId = 'cache';
      result = engine.getNextViewingStageId(stages);
      expect(result).toBe(findStage(stageId).stageId);
      updateStage(stageId, 'complete');

      stageId = 'interceptor';
      result = engine.getNextViewingStageId(stages);
      expect(result).toBe(findStage(stageId).stageId);
      updateStage(stageId, 'complete');

      stageId = 'operator';
      updateStage(stageId, 'idle');
      result = engine.getNextViewingStageId(stages);
      expect(result).toBe(findStage(stageId).stageId);
      updateStage(stageId, 'complete');

      stageId = 'encrypt';
      updateStage(stageId, 'idle');
      result = engine.getNextViewingStageId(stages);
      expect(result).toBe(findStage(stageId).stageId);
      updateStage(stageId, 'complete');

      stageId = 'lookup';
      result = engine.getNextViewingStageId(stages);
      expect(result).toBe(findStage(stageId).stageId);
    });
  });

  describe('getNextViewingStageId', () => {
    it('should return null when stageInstances is undefined', () => {
      const result = engine.getNextViewingStageId(undefined as any);
      expect(result).toBeNull();
    });

    it('should return null when stageInstances is empty', () => {
      const result = engine.getNextViewingStageId([]);
      expect(result).toBeNull();
    });

    it('should return active stage when one exists (Active wins)', () => {
      const result = engine.getNextViewingStageId(stages);
      expect(result).toBe('policy');
    });

    it('should return first idle stage when no active exists (Idle wins)', () => {
      // remove active
      updateStage('policy', 'complete');

      const result = engine.getNextViewingStageId(stages);
      expect(result).toBe('reducer'); // first idle by index
    });

    it('should return last inactive when no active and no idle exist', () => {
      // remove active
      updateStage('policy', 'complete');

      // remove idle
      updateStage('reducer', 'complete');
      updateStage('cache', 'complete');

      const result = engine.getNextViewingStageId(stages);
      expect(result).toBe('interceptor'); // last inactive by index
    });

    it('should return last stage when everything is complete', () => {
      // mark all as complete
      stages.forEach((stage) => (stage.status = 'complete' as any));

      const result = engine.getNextViewingStageId(stages);
      expect(result).toBe('lookup'); // last by index
    });

    it('should always sort by index before deciding', () => {
      // scramble order
      stages.reverse();

      // remove active
      updateStage('policy', 'complete');

      const result = engine.getNextViewingStageId(stages);

      // should still pick reducer (index 7) not cache (13)
      expect(result).toBe('reducer');
    });
  });
});
