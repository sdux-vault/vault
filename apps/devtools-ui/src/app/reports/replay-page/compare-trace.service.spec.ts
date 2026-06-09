import { TestBed } from '@angular/core/testing';
import type { TraceExecutionShape } from '../../shapes/trace';
import { CompareTraceService } from './compare-trace.service';

describe('CompareTraceService', () => {
  let service: CompareTraceService;

  const mockTrace: TraceExecutionShape = {
    traceId: 'abc-123-def-456',
    cellKey: 'employees',
    startedAt: 1000,
    finishedAt: 1500,
    events: [
      {
        name: 'lifecycle:start:replace',
        traceId: 'abc-123-def-456',
        timestamp: 1010
      } as any,
      {
        name: 'pipeline:candidate:resolve',
        traceId: 'abc-123-def-456',
        candidate: [{ id: 1, name: 'Luke' }],
        timestamp: 1045
      } as any
    ],
    metrics: {
      status: 'success',
      duration: 500,
      stageCount: 4,
      eventCount: 6
    } as any
  };

  const mockMergeTrace: TraceExecutionShape = {
    traceId: 'merge-trace-001',
    cellKey: 'employees',
    startedAt: 2000,
    finishedAt: 2200,
    events: [
      {
        name: 'lifecycle:start:merge',
        traceId: 'merge-trace-001',
        timestamp: 2005
      } as any,
      {
        name: 'pipeline:candidate:resolve',
        traceId: 'merge-trace-001',
        candidate: { name: 'updated' },
        timestamp: 2030
      } as any
    ],
    metrics: {
      status: 'success',
      duration: 200,
      stageCount: 3,
      eventCount: 4
    } as any
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CompareTraceService]
    });
    service = TestBed.inject(CompareTraceService);
    service.cellTraces.set([mockTrace, mockMergeTrace]);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  describe('trace labels', () => {
    it('should generate sequential labels', () => {
      const labels = service.traceLabels();
      expect(labels.get('abc-123-def-456')).toBe('t1');
      expect(labels.get('merge-trace-001')).toBe('t2');
    });
  });

  describe('trace selection', () => {
    it('should set before and after trace IDs', () => {
      service.compareBeforeId.set('abc-123-def-456');
      service.compareAfterId.set('merge-trace-001');
      expect(service.compareBeforeEvents().length).toBe(2);
      expect(service.compareAfterEvents().length).toBe(2);
    });

    it('should return empty events when no trace selected', () => {
      expect(service.compareBeforeEvents()).toEqual([]);
      expect(service.compareAfterEvents()).toEqual([]);
    });

    it('should select before trace and reset event index', () => {
      service.compareEventIndex.set(5);
      service.selectBeforeTrace('abc-123-def-456');
      expect(service.compareBeforeId()).toBe('abc-123-def-456');
      expect(service.compareEventIndex()).toBe(0);
    });

    it('should select after trace and reset event index', () => {
      service.compareEventIndex.set(5);
      service.selectAfterTrace('merge-trace-001');
      expect(service.compareAfterId()).toBe('merge-trace-001');
      expect(service.compareEventIndex()).toBe(0);
    });

    it('should swap traces when selecting already-selected before trace', () => {
      service.compareBeforeId.set('abc-123-def-456');
      service.compareAfterId.set('merge-trace-001');
      service.selectCompareTrace('abc-123-def-456');
      expect(service.compareBeforeId()).toBe('merge-trace-001');
      expect(service.compareAfterId()).toBe('abc-123-def-456');
    });
  });

  describe('durations', () => {
    beforeEach(() => {
      service.compareBeforeId.set('abc-123-def-456');
      service.compareAfterId.set('merge-trace-001');
    });

    it('should compute before duration', () => {
      expect(service.compareBeforeDuration()).toBe(500);
    });

    it('should compute after duration', () => {
      expect(service.compareAfterDuration()).toBe(200);
    });

    it('should compute duration delta', () => {
      expect(service.compareDurationDelta()).toBe('-300ms faster');
    });

    it('should return 0 duration when no trace selected', () => {
      service.compareBeforeId.set('');
      expect(service.compareBeforeDuration()).toBe(0);
    });
  });

  describe('timeline markers', () => {
    beforeEach(() => {
      service.compareBeforeId.set('abc-123-def-456');
      service.compareAfterId.set('merge-trace-001');
    });

    it('should build before markers with correct positions', () => {
      const markers = service.timelineBeforeMarkers();
      expect(markers.length).toBe(2);
      expect(markers[0].label).toBe('lifecycle');
      expect(markers[0].eventName).toBe('lifecycle:start:replace');
      expect(markers[0].elapsed).toBe(10);
      expect(markers[0].position).toBe(2);
      expect(markers[1].label).toBe('pipeline');
      expect(markers[1].eventName).toBe('pipeline:candidate:resolve');
      expect(markers[1].elapsed).toBe(45);
      expect(markers[1].position).toBe(9);
    });

    it('should build after markers with correct positions', () => {
      const markers = service.timelineAfterMarkers();
      expect(markers.length).toBe(2);
      expect(markers[0].label).toBe('lifecycle');
      expect(markers[0].eventName).toBe('lifecycle:start:merge');
      expect(markers[0].elapsed).toBe(5);
      expect(markers[0].position).toBe(1);
      expect(markers[1].label).toBe('pipeline');
      expect(markers[1].eventName).toBe('pipeline:candidate:resolve');
      expect(markers[1].elapsed).toBe(30);
      expect(markers[1].position).toBe(6);
    });

    it('should return empty markers when no trace selected', () => {
      service.compareBeforeId.set('');
      expect(service.timelineBeforeMarkers()).toEqual([]);
    });

    it('should return empty markers when trace ID not found', () => {
      expect(service.buildTimelineMarkers('nonexistent-id')).toEqual([]);
    });

    it('should deduplicate markers by category', () => {
      const dupeTrace: TraceExecutionShape = {
        traceId: 'dupe-trace',
        cellKey: 'employees',
        startedAt: 1000,
        finishedAt: 1100,
        events: [
          {
            name: 'lifecycle:start:replace',
            traceId: 'dupe-trace',
            timestamp: 1010
          } as any,
          {
            name: 'lifecycle:end:replace',
            traceId: 'dupe-trace',
            timestamp: 1020
          } as any,
          {
            name: 'pipeline:candidate:resolve',
            traceId: 'dupe-trace',
            timestamp: 1030
          } as any
        ],
        metrics: {
          status: 'success',
          duration: 100,
          stageCount: 1,
          eventCount: 3
        } as any
      };
      service.cellTraces.set([dupeTrace]);
      service.compareBeforeId.set('dupe-trace');
      service.compareAfterId.set('');
      const markers = service.buildTimelineMarkers('dupe-trace');
      expect(markers.length).toBe(2);
      expect(markers[0].label).toBe('lifecycle');
      expect(markers[1].label).toBe('pipeline');
    });

    it('should use max duration as time scale', () => {
      expect(service.timelineMaxDuration()).toBe(500);
    });
  });

  describe('filters', () => {
    beforeEach(() => {
      service.compareBeforeId.set('abc-123-def-456');
      service.compareAfterId.set('merge-trace-001');
    });

    it('should toggle diff filter', () => {
      expect(service.showOnlyDiffs()).toBeFalse();
      service.toggleDiffFilter();
      expect(service.showOnlyDiffs()).toBeTrue();
      service.toggleDiffFilter();
      expect(service.showOnlyDiffs()).toBeFalse();
    });

    it('should toggle category filter', () => {
      service.toggleCategoryFilter('lifecycle');
      expect(service.categoryFilters().has('lifecycle')).toBeTrue();
      service.toggleCategoryFilter('lifecycle');
      expect(service.categoryFilters().has('lifecycle')).toBeFalse();
    });

    it('should toggle state filter', () => {
      expect(service.showOnlyState()).toBeFalse();
      service.toggleStateFilter();
      expect(service.showOnlyState()).toBeTrue();
    });

    it('should reset filters', () => {
      service.showOnlyDiffs.set(true);
      service.showOnlyState.set(true);
      service.categoryFilters.set(new Set(['lifecycle']));
      service.resetFilters();
      expect(service.showOnlyDiffs()).toBeFalse();
      expect(service.showOnlyState()).toBeFalse();
      expect(service.categoryFilters().size).toBe(0);
    });

    it('should compute compare categories', () => {
      const cats = service.compareCategories();
      expect(cats).toContain('lifecycle');
      expect(cats).toContain('pipeline');
    });
  });

  describe('navigation', () => {
    beforeEach(() => {
      service.compareBeforeId.set('abc-123-def-456');
      service.compareAfterId.set('merge-trace-001');
    });

    it('should navigate to next event', () => {
      expect(service.compareEventIndex()).toBe(0);
      service.nextEvent();
      expect(service.compareEventIndex()).toBe(1);
    });

    it('should navigate to previous event', () => {
      service.compareEventIndex.set(1);
      service.previousEvent();
      expect(service.compareEventIndex()).toBe(0);
    });

    it('should not navigate past bounds', () => {
      service.previousEvent();
      expect(service.compareEventIndex()).toBe(0);
      service.compareEventIndex.set(1);
      service.nextEvent();
      expect(service.compareEventIndex()).toBe(1);
    });
  });

  describe('stripNoiseFields', () => {
    it('should remove id and traceId', () => {
      const result = service.stripNoiseFields({
        id: '123',
        traceId: 'abc',
        name: 'test',
        timestamp: 1010
      }) as Record<string, unknown>;
      expect(result['id']).toBeUndefined();
      expect(result['traceId']).toBeUndefined();
      expect(result['name']).toBe('test');
    });

    it('should add elapsed when traceStartedAt provided', () => {
      const result = service.stripNoiseFields(
        { timestamp: 1010 },
        1000
      ) as Record<string, unknown>;
      expect(result['elapsed']).toBe('+10ms');
    });

    it('should return undefined for null input', () => {
      expect(service.stripNoiseFields(null)).toBeNull();
      expect(service.stripNoiseFields(undefined)).toBeUndefined();
    });

    it('should add delta when both timestamps and starts provided', () => {
      const result = service.stripNoiseFields(
        { timestamp: 1020 },
        1000,
        2010,
        2000
      ) as Record<string, unknown>;
      expect(result['elapsed']).toBe('+20ms');
      expect(result['delta']).toBe('+10ms');
    });

    it('should show 0ms delta when elapsed times match', () => {
      const result = service.stripNoiseFields(
        { timestamp: 1010 },
        1000,
        2010,
        2000
      ) as Record<string, unknown>;
      expect(result['delta']).toBe('0ms');
    });

    it('should show negative delta when this trace is faster', () => {
      const result = service.stripNoiseFields(
        { timestamp: 1005 },
        1000,
        2020,
        2000
      ) as Record<string, unknown>;
      expect(result['delta']).toBe('-15ms');
    });

    it('should remove traceId from payload object', () => {
      const result = service.stripNoiseFields({
        timestamp: 1010,
        payload: { traceId: 'abc', data: 42 }
      }) as Record<string, unknown>;
      const payload = result['payload'] as Record<string, unknown>;
      expect(payload['traceId']).toBeUndefined();
      expect(payload['data']).toBe(42);
    });

    it('should not remove traceId from array payload', () => {
      const result = service.stripNoiseFields({
        timestamp: 1010,
        payload: [1, 2, 3]
      }) as Record<string, unknown>;
      expect(Array.isArray(result['payload'])).toBeTrue();
    });
  });

  describe('compareDurationDelta', () => {
    it('should return empty string when both durations are 0', () => {
      expect(service.compareDurationDelta()).toBe('');
    });

    it('should return same speed when durations are equal', () => {
      service.compareBeforeId.set('abc-123-def-456');
      service.compareAfterId.set('abc-123-def-456');
      expect(service.compareDurationDelta()).toBe('same speed');
    });

    it('should return slower when after is longer', () => {
      service.compareBeforeId.set('merge-trace-001');
      service.compareAfterId.set('abc-123-def-456');
      expect(service.compareDurationDelta()).toBe('+300ms slower');
    });
  });

  describe('compareDifferingCount', () => {
    it('should count differing events', () => {
      service.compareBeforeId.set('abc-123-def-456');
      service.compareAfterId.set('merge-trace-001');
      expect(service.compareDifferingCount()).toBeGreaterThan(0);
    });
  });

  describe('visibleIndices', () => {
    beforeEach(() => {
      service.compareBeforeId.set('abc-123-def-456');
      service.compareAfterId.set('merge-trace-001');
    });

    it('should return empty when no filters active', () => {
      expect(service.visibleIndices()).toEqual([]);
    });

    it('should filter by category', () => {
      service.toggleCategoryFilter('lifecycle');
      const indices = service.visibleIndices();
      expect(indices.length).toBeGreaterThan(0);
    });

    it('should filter by state', () => {
      service.toggleStateFilter();
      const indices = service.visibleIndices();
      expect(indices).toEqual([]);
    });

    it('should filter by diffs only', () => {
      service.toggleDiffFilter();
      const indices = service.visibleIndices();
      expect(indices.length).toBeGreaterThan(0);
    });

    it('should combine diff and category filters', () => {
      service.toggleDiffFilter();
      service.toggleCategoryFilter('lifecycle');
      const indices = service.visibleIndices();
      const diffOnlyIndices = (() => {
        service.toggleCategoryFilter('lifecycle');
        const result = service.visibleIndices();
        service.toggleCategoryFilter('lifecycle');
        return result;
      })();
      expect(indices.length).toBeLessThanOrEqual(diffOnlyIndices.length);
    });

    it('should skip non-diff events when diff filter is active', () => {
      const sharedTrace: TraceExecutionShape = {
        traceId: 'shared-1',
        cellKey: 'employees',
        startedAt: 1000,
        finishedAt: 1100,
        events: [
          { name: 'lifecycle:start:replace', timestamp: 1010 } as any,
          {
            name: 'pipeline:candidate:resolve',
            timestamp: 1020,
            candidate: 'same'
          } as any
        ],
        metrics: {
          status: 'success',
          duration: 100,
          stageCount: 1,
          eventCount: 2
        } as any
      };
      const sharedTrace2: TraceExecutionShape = {
        traceId: 'shared-2',
        cellKey: 'employees',
        startedAt: 2000,
        finishedAt: 2100,
        events: [
          { name: 'lifecycle:start:merge', timestamp: 2010 } as any,
          {
            name: 'pipeline:candidate:resolve',
            timestamp: 2020,
            candidate: 'same'
          } as any
        ],
        metrics: {
          status: 'success',
          duration: 100,
          stageCount: 1,
          eventCount: 2
        } as any
      };
      service.cellTraces.set([sharedTrace, sharedTrace2]);
      service.compareBeforeId.set('shared-1');
      service.compareAfterId.set('shared-2');
      service.toggleDiffFilter();
      const indices = service.visibleIndices();
      expect(indices).toEqual([0]);
    });
  });

  describe('skippedBeforeCurrentCount', () => {
    beforeEach(() => {
      service.compareBeforeId.set('abc-123-def-456');
      service.compareAfterId.set('merge-trace-001');
    });

    it('should return 0 when no filters active', () => {
      expect(service.skippedBeforeCurrentCount()).toBe(0);
    });

    it('should count skipped events between filtered indices', () => {
      service.toggleDiffFilter();
      const indices = service.visibleIndices();
      if (indices.length > 1) {
        service.compareEventIndex.set(indices[1]);
        expect(service.skippedBeforeCurrentCount()).toBe(
          indices[1] - indices[0] - 1
        );
      }
    });

    it('should return currentIdx when at position 0 in filtered list', () => {
      service.toggleDiffFilter();
      const indices = service.visibleIndices();
      if (indices.length > 0) {
        service.compareEventIndex.set(indices[0]);
        expect(service.skippedBeforeCurrentCount()).toBe(indices[0]);
      }
    });

    it('should return currentIdx when not found in filtered list', () => {
      service.toggleDiffFilter();
      const indices = service.visibleIndices();
      if (indices.length > 0) {
        const notInList = indices[indices.length - 1] + 1;
        service.compareEventIndex.set(notInList);
        expect(service.skippedBeforeCurrentCount()).toBe(notInList);
      }
    });
  });

  describe('currentBeforeEvent and currentAfterEvent', () => {
    beforeEach(() => {
      service.compareBeforeId.set('abc-123-def-456');
      service.compareAfterId.set('merge-trace-001');
    });

    it('should return stripped before event', () => {
      const event = service.currentBeforeEvent() as Record<string, unknown>;
      expect(event).toBeTruthy();
      expect(event['traceId']).toBeUndefined();
      expect(event['name']).toBe('lifecycle:start:replace');
    });

    it('should return stripped after event', () => {
      const event = service.currentAfterEvent() as Record<string, unknown>;
      expect(event).toBeTruthy();
      expect(event['traceId']).toBeUndefined();
      expect(event['name']).toBe('lifecycle:start:merge');
    });
  });

  describe('diff hunks and lines', () => {
    beforeEach(() => {
      service.compareBeforeId.set('abc-123-def-456');
      service.compareAfterId.set('merge-trace-001');
    });

    it('should compute diff hunks', () => {
      const hunks = service.compareDiffHunks();
      expect(hunks.length).toBeGreaterThan(0);
    });

    it('should return empty hunks when both events are null', () => {
      service.compareBeforeId.set('');
      service.compareAfterId.set('');
      expect(service.compareDiffHunks()).toEqual([]);
    });

    it('should build before lines', () => {
      const lines = service.compareBeforeLines();
      expect(lines.length).toBeGreaterThan(0);
    });

    it('should build after lines', () => {
      const lines = service.compareAfterLines();
      expect(lines.length).toBeGreaterThan(0);
    });
  });

  describe('buildLines', () => {
    it('should handle added hunks for before side', () => {
      const lines = service.buildLines(
        [{ value: 'added\n', added: true, removed: false, count: 1 }],
        'before'
      );
      expect(lines).toEqual([]);
    });

    it('should handle removed hunks for after side', () => {
      const lines = service.buildLines(
        [{ value: 'removed\n', added: false, removed: true, count: 1 }],
        'after'
      );
      expect(lines).toEqual([]);
    });

    it('should include added hunks for after side', () => {
      const lines = service.buildLines(
        [{ value: 'new line\n', added: true, removed: false, count: 1 }],
        'after'
      );
      expect(lines).toEqual([
        { text: 'new line', cssClass: 'diff-line-added' }
      ]);
    });

    it('should include removed hunks for before side', () => {
      const lines = service.buildLines(
        [{ value: 'old line\n', added: false, removed: true, count: 1 }],
        'before'
      );
      expect(lines).toEqual([
        { text: 'old line', cssClass: 'diff-line-removed' }
      ]);
    });

    it('should include unchanged hunks for both sides', () => {
      const lines = service.buildLines(
        [{ value: 'same', added: false, removed: false, count: 1 }],
        'before'
      );
      expect(lines).toEqual([{ text: 'same', cssClass: '' }]);
    });

    it('should skip empty lines', () => {
      const lines = service.buildLines(
        [{ value: 'a\n\nb\n', added: false, removed: false, count: 3 }],
        'before'
      );
      expect(lines).toEqual([
        { text: 'a', cssClass: '' },
        { text: 'b', cssClass: '' }
      ]);
    });
  });

  describe('jumpToNearestVisible', () => {
    beforeEach(() => {
      service.compareBeforeId.set('abc-123-def-456');
      service.compareAfterId.set('merge-trace-001');
    });

    it('should do nothing when no visible indices', () => {
      service.compareEventIndex.set(1);
      service.jumpToNearestVisible();
      expect(service.compareEventIndex()).toBe(1);
    });

    it('should jump to nearest when current is not visible', () => {
      service.toggleDiffFilter();
      const indices = service.visibleIndices();
      if (indices.length > 0) {
        service.compareEventIndex.set(999);
        service.jumpToNearestVisible();
        expect(indices).toContain(service.compareEventIndex());
      }
    });

    it('should stay put when current is already visible', () => {
      service.toggleDiffFilter();
      const indices = service.visibleIndices();
      if (indices.length > 0) {
        service.compareEventIndex.set(indices[0]);
        service.jumpToNearestVisible();
        expect(service.compareEventIndex()).toBe(indices[0]);
      }
    });
  });

  describe('selectCompareTrace', () => {
    it('should swap when selecting already-selected after trace', () => {
      service.compareBeforeId.set('abc-123-def-456');
      service.compareAfterId.set('merge-trace-001');
      service.selectCompareTrace('merge-trace-001');
      expect(service.compareBeforeId()).toBe('merge-trace-001');
      expect(service.compareAfterId()).toBe('abc-123-def-456');
    });

    it('should set before when before is empty', () => {
      service.compareBeforeId.set('');
      service.compareAfterId.set('merge-trace-001');
      service.selectCompareTrace('abc-123-def-456');
      expect(service.compareBeforeId()).toBe('abc-123-def-456');
    });

    it('should set after when before is already set', () => {
      service.compareBeforeId.set('abc-123-def-456');
      service.compareAfterId.set('');
      service.selectCompareTrace('merge-trace-001');
      expect(service.compareAfterId()).toBe('merge-trace-001');
    });
  });

  describe('navigation with filters', () => {
    beforeEach(() => {
      service.compareBeforeId.set('abc-123-def-456');
      service.compareAfterId.set('merge-trace-001');
      service.toggleDiffFilter();
    });

    it('should navigate next within visible indices', () => {
      const indices = service.visibleIndices();
      if (indices.length > 1) {
        service.compareEventIndex.set(indices[0]);
        service.nextEvent();
        expect(service.compareEventIndex()).toBe(indices[1]);
      }
    });

    it('should navigate previous within visible indices', () => {
      const indices = service.visibleIndices();
      if (indices.length > 1) {
        service.compareEventIndex.set(indices[1]);
        service.previousEvent();
        expect(service.compareEventIndex()).toBe(indices[0]);
      }
    });
  });

  describe('compareAfterDuration', () => {
    it('should return 0 when no trace selected', () => {
      service.compareAfterId.set('');
      expect(service.compareAfterDuration()).toBe(0);
    });
  });
});
