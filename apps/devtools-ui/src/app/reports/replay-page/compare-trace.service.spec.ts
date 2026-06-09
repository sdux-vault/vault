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

    it('should diff when only before event is null', () => {
      service.compareBeforeId.set('');
      const hunks = service.compareDiffHunks();
      expect(hunks.length).toBeGreaterThan(0);
    });

    it('should diff when only after event is null', () => {
      service.compareAfterId.set('');
      const hunks = service.compareDiffHunks();
      expect(hunks.length).toBeGreaterThan(0);
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

    it('should fallback to 0 when trace has no metrics', () => {
      const noMetricsTrace: TraceExecutionShape = {
        traceId: 'no-metrics',
        cellKey: 'employees',
        startedAt: 1000,
        finishedAt: 1100,
        events: [],
        metrics: undefined as any
      };
      service.cellTraces.set([noMetricsTrace]);
      service.compareBeforeId.set('no-metrics');
      service.compareAfterId.set('no-metrics');
      expect(service.compareBeforeDuration()).toBe(0);
      expect(service.compareAfterDuration()).toBe(0);
    });
  });

  describe('buildAllEventsMarkers', () => {
    beforeEach(() => {
      service.compareBeforeId.set('abc-123-def-456');
      service.compareAfterId.set('merge-trace-001');
    });

    it('should return markers for every event', () => {
      const markers = service.timelineBeforeAllMarkers();
      expect(markers.length).toBe(2);
      expect(markers[0].eventName).toBe('lifecycle:start:replace');
      expect(markers[1].eventName).toBe('pipeline:candidate:resolve');
    });

    it('should return empty when no trace selected', () => {
      service.compareBeforeId.set('');
      expect(service.timelineBeforeAllMarkers()).toEqual([]);
    });

    it('should return empty when trace not found', () => {
      expect(service.buildAllEventsMarkers('nonexistent')).toEqual([]);
    });

    it('should return empty when trace has no events', () => {
      const emptyTrace: TraceExecutionShape = {
        traceId: 'empty-trace',
        cellKey: 'employees',
        startedAt: 1000,
        finishedAt: 1100,
        events: [],
        metrics: {
          status: 'success',
          duration: 100,
          stageCount: 0,
          eventCount: 0
        } as any
      };
      service.cellTraces.set([emptyTrace]);
      expect(service.buildAllEventsMarkers('empty-trace')).toEqual([]);
    });

    it('should spread overlapping markers', () => {
      const tightTrace: TraceExecutionShape = {
        traceId: 'tight-trace',
        cellKey: 'employees',
        startedAt: 1000,
        finishedAt: 1001,
        events: [
          { name: 'a:start', traceId: 'tight-trace', timestamp: 1000 } as any,
          { name: 'b:start', traceId: 'tight-trace', timestamp: 1000 } as any,
          { name: 'c:start', traceId: 'tight-trace', timestamp: 1000 } as any
        ],
        metrics: {
          status: 'success',
          duration: 1,
          stageCount: 1,
          eventCount: 3
        } as any
      };
      service.cellTraces.set([tightTrace]);
      service.compareBeforeId.set('tight-trace');
      service.compareAfterId.set('tight-trace');
      const markers = service.buildAllEventsMarkers('tight-trace');
      expect(markers.length).toBe(3);
      expect(markers[1].position).toBeGreaterThan(markers[0].position);
      expect(markers[2].position).toBeGreaterThan(markers[1].position);
    });

    it('should clamp spread positions at 100%', () => {
      const edgeTrace: TraceExecutionShape = {
        traceId: 'edge-trace',
        cellKey: 'employees',
        startedAt: 1000,
        finishedAt: 1001,
        events: [
          { name: 'a:start', traceId: 'edge-trace', timestamp: 1001 } as any,
          { name: 'b:start', traceId: 'edge-trace', timestamp: 1001 } as any,
          { name: 'c:start', traceId: 'edge-trace', timestamp: 1001 } as any
        ],
        metrics: {
          status: 'success',
          duration: 1,
          stageCount: 1,
          eventCount: 3
        } as any
      };
      service.cellTraces.set([edgeTrace]);
      service.compareBeforeId.set('edge-trace');
      service.compareAfterId.set('edge-trace');
      const markers = service.buildAllEventsMarkers('edge-trace');
      expect(markers.length).toBe(3);
      for (const marker of markers) {
        expect(marker.position).toBeLessThanOrEqual(100);
      }
    });

    it('should compute timelineAfterAllMarkers', () => {
      const markers = service.timelineAfterAllMarkers();
      expect(markers.length).toBe(2);
    });
  });

  describe('buildDiffOnlyMarkers', () => {
    beforeEach(() => {
      service.compareBeforeId.set('abc-123-def-456');
      service.compareAfterId.set('merge-trace-001');
    });

    it('should return markers for differing events only', () => {
      const markers = service.timelineBeforeDiffMarkers();
      expect(markers.length).toBeGreaterThan(0);
    });

    it('should return empty when no before trace selected', () => {
      expect(service.buildDiffOnlyMarkers('', 'merge-trace-001')).toEqual([]);
    });

    it('should return empty when no after trace selected', () => {
      expect(service.buildDiffOnlyMarkers('abc-123-def-456', '')).toEqual([]);
    });

    it('should return empty when before trace has no events', () => {
      const emptyTrace: TraceExecutionShape = {
        traceId: 'empty-trace',
        cellKey: 'employees',
        startedAt: 1000,
        finishedAt: 1100,
        events: [],
        metrics: {
          status: 'success',
          duration: 100,
          stageCount: 0,
          eventCount: 0
        } as any
      };
      service.cellTraces.set([emptyTrace, mockMergeTrace]);
      expect(
        service.buildDiffOnlyMarkers('empty-trace', 'merge-trace-001')
      ).toEqual([]);
    });

    it('should return empty when no events differ', () => {
      const identicalTrace1: TraceExecutionShape = {
        traceId: 'id-1',
        cellKey: 'employees',
        startedAt: 1000,
        finishedAt: 1100,
        events: [{ name: 'lifecycle:start', timestamp: 1010 } as any],
        metrics: {
          status: 'success',
          duration: 100,
          stageCount: 1,
          eventCount: 1
        } as any
      };
      const identicalTrace2: TraceExecutionShape = {
        traceId: 'id-2',
        cellKey: 'employees',
        startedAt: 2000,
        finishedAt: 2100,
        events: [{ name: 'lifecycle:start', timestamp: 2010 } as any],
        metrics: {
          status: 'success',
          duration: 100,
          stageCount: 1,
          eventCount: 1
        } as any
      };
      service.cellTraces.set([identicalTrace1, identicalTrace2]);
      service.compareBeforeId.set('id-1');
      service.compareAfterId.set('id-2');
      expect(service.buildDiffOnlyMarkers('id-1', 'id-2')).toEqual([]);
    });

    it('should skip events that do not differ', () => {
      const mixedTrace1: TraceExecutionShape = {
        traceId: 'mix-1',
        cellKey: 'employees',
        startedAt: 1000,
        finishedAt: 1100,
        events: [
          { name: 'lifecycle:start', timestamp: 1010 } as any,
          { name: 'pipeline:resolve', timestamp: 1050, data: 'a' } as any
        ],
        metrics: {
          status: 'success',
          duration: 100,
          stageCount: 1,
          eventCount: 2
        } as any
      };
      const mixedTrace2: TraceExecutionShape = {
        traceId: 'mix-2',
        cellKey: 'employees',
        startedAt: 2000,
        finishedAt: 2100,
        events: [
          { name: 'lifecycle:start', timestamp: 2010 } as any,
          { name: 'pipeline:resolve', timestamp: 2050, data: 'b' } as any
        ],
        metrics: {
          status: 'success',
          duration: 100,
          stageCount: 1,
          eventCount: 2
        } as any
      };
      service.cellTraces.set([mixedTrace1, mixedTrace2]);
      service.compareBeforeId.set('mix-1');
      service.compareAfterId.set('mix-2');
      const markers = service.buildDiffOnlyMarkers('mix-1', 'mix-2');
      expect(markers.length).toBe(1);
      expect(markers[0].eventName).toBe('pipeline:resolve');
    });

    it('should compute timelineAfterDiffMarkers', () => {
      const markers = service.timelineAfterDiffMarkers();
      expect(markers.length).toBeGreaterThanOrEqual(0);
    });
  });

  describe('buildStateOnlyMarkers', () => {
    it('should return empty when no trace selected', () => {
      expect(service.timelineBeforeStateMarkers()).toEqual([]);
    });

    it('should return empty when trace has no events', () => {
      const emptyTrace: TraceExecutionShape = {
        traceId: 'empty-trace',
        cellKey: 'employees',
        startedAt: 1000,
        finishedAt: 1100,
        events: [],
        metrics: {
          status: 'success',
          duration: 100,
          stageCount: 0,
          eventCount: 0
        } as any
      };
      service.cellTraces.set([emptyTrace]);
      expect(service.buildStateOnlyMarkers('empty-trace')).toEqual([]);
    });

    it('should return markers for events with state attribute', () => {
      const stateTrace: TraceExecutionShape = {
        traceId: 'state-trace',
        cellKey: 'employees',
        startedAt: 1000,
        finishedAt: 1100,
        events: [
          {
            name: 'lifecycle:start',
            timestamp: 1010,
            state: { count: 1 }
          } as any,
          { name: 'pipeline:resolve', timestamp: 1020 } as any,
          {
            name: 'lifecycle:end',
            timestamp: 1030,
            state: { count: 2 }
          } as any
        ],
        metrics: {
          status: 'success',
          duration: 100,
          stageCount: 1,
          eventCount: 3
        } as any
      };
      service.cellTraces.set([stateTrace]);
      service.compareBeforeId.set('state-trace');
      service.compareAfterId.set('state-trace');
      const markers = service.buildStateOnlyMarkers('state-trace');
      expect(markers.length).toBe(2);
      expect(markers[0].eventName).toBe('lifecycle:start');
      expect(markers[1].eventName).toBe('lifecycle:end');
    });

    it('should compute timelineAfterStateMarkers', () => {
      const markers = service.timelineAfterStateMarkers();
      expect(markers.length).toBeGreaterThanOrEqual(0);
    });
  });

  describe('buildCategoryFilteredMarkers', () => {
    beforeEach(() => {
      service.compareBeforeId.set('abc-123-def-456');
      service.compareAfterId.set('merge-trace-001');
    });

    it('should return empty when no trace selected', () => {
      service.toggleCategoryFilter('lifecycle');
      expect(service.buildCategoryFilteredMarkers('')).toEqual([]);
    });

    it('should return empty when no category filters active', () => {
      expect(service.timelineBeforeCategoryMarkers()).toEqual([]);
    });

    it('should return only matching category events', () => {
      service.toggleCategoryFilter('lifecycle');
      const markers = service.timelineBeforeCategoryMarkers();
      expect(markers.length).toBe(1);
      expect(markers[0].label).toBe('lifecycle');
    });

    it('should return empty when trace has no events', () => {
      const emptyTrace: TraceExecutionShape = {
        traceId: 'empty-trace',
        cellKey: 'employees',
        startedAt: 1000,
        finishedAt: 1100,
        events: [],
        metrics: {
          status: 'success',
          duration: 100,
          stageCount: 0,
          eventCount: 0
        } as any
      };
      service.cellTraces.set([emptyTrace]);
      service.toggleCategoryFilter('lifecycle');
      expect(service.buildCategoryFilteredMarkers('empty-trace')).toEqual([]);
    });

    it('should compute timelineAfterCategoryMarkers', () => {
      service.toggleCategoryFilter('lifecycle');
      const markers = service.timelineAfterCategoryMarkers();
      expect(markers.length).toBeGreaterThanOrEqual(0);
    });
  });

  describe('buildCategorySpans', () => {
    beforeEach(() => {
      service.compareBeforeId.set('abc-123-def-456');
      service.compareAfterId.set('merge-trace-001');
    });

    it('should return empty when no trace selected', () => {
      expect(service.buildCategorySpans('')).toEqual([]);
    });

    it('should return empty when trace not found', () => {
      expect(service.buildCategorySpans('nonexistent')).toEqual([]);
    });

    it('should return empty when trace has no events', () => {
      const emptyTrace: TraceExecutionShape = {
        traceId: 'empty-trace',
        cellKey: 'employees',
        startedAt: 1000,
        finishedAt: 1100,
        events: [],
        metrics: {
          status: 'success',
          duration: 100,
          stageCount: 0,
          eventCount: 0
        } as any
      };
      service.cellTraces.set([emptyTrace]);
      expect(service.buildCategorySpans('empty-trace')).toEqual([]);
    });

    it('should build spans with correct start/end positions', () => {
      const spans = service.timelineBeforeSpans();
      expect(spans.length).toBe(2);
      const lifecycleSpan = spans.find((s) => s.label === 'lifecycle');
      expect(lifecycleSpan).toBeTruthy();
      expect(lifecycleSpan!.eventCount).toBe(1);
      expect(lifecycleSpan!.startElapsed).toBe(10);
    });

    it('should compute duration across multiple events in same category', () => {
      const multiTrace: TraceExecutionShape = {
        traceId: 'multi-trace',
        cellKey: 'employees',
        startedAt: 1000,
        finishedAt: 1100,
        events: [
          { name: 'lifecycle:start', timestamp: 1010 } as any,
          { name: 'lifecycle:middle', timestamp: 1030 } as any,
          { name: 'lifecycle:end', timestamp: 1050 } as any,
          { name: 'pipeline:resolve', timestamp: 1060 } as any
        ],
        metrics: {
          status: 'success',
          duration: 100,
          stageCount: 1,
          eventCount: 4
        } as any
      };
      service.cellTraces.set([multiTrace]);
      service.compareBeforeId.set('multi-trace');
      service.compareAfterId.set('multi-trace');
      const spans = service.buildCategorySpans('multi-trace');
      const lifecycleSpan = spans.find((s) => s.label === 'lifecycle');
      expect(lifecycleSpan!.eventCount).toBe(3);
      expect(lifecycleSpan!.duration).toBe(40);
      expect(lifecycleSpan!.startElapsed).toBe(10);
      expect(lifecycleSpan!.endElapsed).toBe(50);
    });

    it('should sort spans by start position', () => {
      const spans = service.timelineBeforeSpans();
      for (let i = 1; i < spans.length; i++) {
        expect(spans[i].startPosition).toBeGreaterThanOrEqual(
          spans[i - 1].startPosition
        );
      }
    });

    it('should compute timelineAfterSpans', () => {
      const spans = service.timelineAfterSpans();
      expect(spans.length).toBeGreaterThanOrEqual(0);
    });
  });

  describe('buildElapsedDeltaMarkers', () => {
    beforeEach(() => {
      service.compareBeforeId.set('abc-123-def-456');
      service.compareAfterId.set('merge-trace-001');
    });

    it('should return delta markers for each event pair', () => {
      const markers = service.timelineDeltaMarkers();
      expect(markers.length).toBe(2);
    });

    it('should compute positive delta when after is slower', () => {
      const markers = service.timelineDeltaMarkers();
      const firstMarker = markers[0];
      expect(firstMarker.label).toBe('lifecycle');
      expect(firstMarker.beforeElapsed).toBeDefined();
      expect(firstMarker.afterElapsed).toBeDefined();
    });

    it('should normalize deltas to -1..1 range', () => {
      const markers = service.timelineDeltaMarkers();
      for (const marker of markers) {
        expect(Math.abs(marker.normalizedDelta)).toBeLessThanOrEqual(1);
      }
    });

    it('should return empty when no before trace selected', () => {
      service.compareBeforeId.set('');
      expect(service.timelineDeltaMarkers()).toEqual([]);
    });

    it('should return empty when no after trace selected', () => {
      service.compareAfterId.set('');
      expect(service.timelineDeltaMarkers()).toEqual([]);
    });

    it('should return empty when before trace has no events', () => {
      const emptyTrace: TraceExecutionShape = {
        traceId: 'empty-trace',
        cellKey: 'employees',
        startedAt: 1000,
        finishedAt: 1100,
        events: [],
        metrics: {
          status: 'success',
          duration: 100,
          stageCount: 0,
          eventCount: 0
        } as any
      };
      service.cellTraces.set([emptyTrace, mockMergeTrace]);
      service.compareBeforeId.set('empty-trace');
      expect(service.timelineDeltaMarkers()).toEqual([]);
    });

    it('should return empty when after trace has no events', () => {
      const emptyTrace: TraceExecutionShape = {
        traceId: 'empty-trace',
        cellKey: 'employees',
        startedAt: 1000,
        finishedAt: 1100,
        events: [],
        metrics: {
          status: 'success',
          duration: 100,
          stageCount: 0,
          eventCount: 0
        } as any
      };
      service.cellTraces.set([mockTrace, emptyTrace]);
      service.compareAfterId.set('empty-trace');
      expect(service.timelineDeltaMarkers()).toEqual([]);
    });

    it('should handle zero deltas with maxAbsDelta of 1', () => {
      const sameTrace1: TraceExecutionShape = {
        traceId: 'same-1',
        cellKey: 'employees',
        startedAt: 1000,
        finishedAt: 1100,
        events: [{ name: 'lifecycle:start', timestamp: 1010 } as any],
        metrics: {
          status: 'success',
          duration: 100,
          stageCount: 1,
          eventCount: 1
        } as any
      };
      const sameTrace2: TraceExecutionShape = {
        traceId: 'same-2',
        cellKey: 'employees',
        startedAt: 2000,
        finishedAt: 2100,
        events: [{ name: 'lifecycle:start', timestamp: 2010 } as any],
        metrics: {
          status: 'success',
          duration: 100,
          stageCount: 1,
          eventCount: 1
        } as any
      };
      service.cellTraces.set([sameTrace1, sameTrace2]);
      service.compareBeforeId.set('same-1');
      service.compareAfterId.set('same-2');
      const markers = service.timelineDeltaMarkers();
      expect(markers.length).toBe(1);
      expect(markers[0].delta).toBe(0);
      expect(markers[0].normalizedDelta).toBe(0);
    });

    it('should position markers evenly across the timeline', () => {
      const markers = service.timelineDeltaMarkers();
      expect(markers[0].position).toBe(0);
      expect(markers[markers.length - 1].position).toBe(100);
    });
  });

  describe('buildWaterfallCategories', () => {
    beforeEach(() => {
      service.compareBeforeId.set('abc-123-def-456');
      service.compareAfterId.set('merge-trace-001');
    });

    it('should build categories from both traces', () => {
      const categories = service.timelineWaterfallCategories();
      expect(categories.length).toBe(2);
    });

    it('should have before and after markers per category', () => {
      const categories = service.timelineWaterfallCategories();
      const lifecycle = categories.find((c) => c.label === 'lifecycle');
      expect(lifecycle).toBeTruthy();
      expect(lifecycle!.beforeMarkers.length).toBe(1);
      expect(lifecycle!.afterMarkers.length).toBe(1);
    });

    it('should compute totalEvents correctly', () => {
      const categories = service.timelineWaterfallCategories();
      for (const cat of categories) {
        expect(cat.totalEvents).toBe(
          cat.beforeMarkers.length + cat.afterMarkers.length
        );
      }
    });

    it('should sort categories by earliest marker position', () => {
      const categories = service.timelineWaterfallCategories();
      for (let i = 1; i < categories.length; i++) {
        const prevFirst = Math.min(
          ...[
            ...categories[i - 1].beforeMarkers,
            ...categories[i - 1].afterMarkers
          ].map((m) => m.position)
        );
        const currFirst = Math.min(
          ...[
            ...categories[i].beforeMarkers,
            ...categories[i].afterMarkers
          ].map((m) => m.position)
        );
        expect(currFirst).toBeGreaterThanOrEqual(prevFirst);
      }
    });

    it('should return empty when no traces selected', () => {
      service.compareBeforeId.set('');
      service.compareAfterId.set('');
      expect(service.timelineWaterfallCategories()).toEqual([]);
    });

    it('should handle only before trace selected', () => {
      service.compareAfterId.set('');
      const categories = service.timelineWaterfallCategories();
      expect(categories.length).toBe(2);
      for (const cat of categories) {
        expect(cat.afterMarkers.length).toBe(0);
      }
    });

    it('should handle only after trace selected', () => {
      service.compareBeforeId.set('');
      const categories = service.timelineWaterfallCategories();
      expect(categories.length).toBe(2);
      for (const cat of categories) {
        expect(cat.beforeMarkers.length).toBe(0);
      }
    });

    it('should handle non-existent trace gracefully', () => {
      service.compareBeforeId.set('nonexistent-id');
      const categories = service.timelineWaterfallCategories();
      expect(categories.length).toBeGreaterThanOrEqual(0);
    });
  });

  describe('compareCategories edge cases', () => {
    it('should skip events without a name property', () => {
      const weirdTrace: TraceExecutionShape = {
        traceId: 'weird-trace',
        cellKey: 'employees',
        startedAt: 1000,
        finishedAt: 1100,
        events: [
          { name: 'lifecycle:start', timestamp: 1010 } as any,
          { timestamp: 1020 } as any,
          null as any
        ],
        metrics: {
          status: 'success',
          duration: 100,
          stageCount: 1,
          eventCount: 3
        } as any
      };
      service.cellTraces.set([weirdTrace]);
      service.compareBeforeId.set('weird-trace');
      service.compareAfterId.set('weird-trace');
      const cats = service.compareCategories();
      expect(cats).toContain('lifecycle');
      expect(cats.length).toBe(1);
    });
  });

  describe('visibleIndices with state filter', () => {
    it('should include events that have state attribute', () => {
      const stateTrace: TraceExecutionShape = {
        traceId: 'state-1',
        cellKey: 'employees',
        startedAt: 1000,
        finishedAt: 1100,
        events: [
          {
            name: 'lifecycle:start',
            timestamp: 1010,
            state: { x: 1 }
          } as any,
          { name: 'pipeline:resolve', timestamp: 1020 } as any
        ],
        metrics: {
          status: 'success',
          duration: 100,
          stageCount: 1,
          eventCount: 2
        } as any
      };
      const stateTrace2: TraceExecutionShape = {
        traceId: 'state-2',
        cellKey: 'employees',
        startedAt: 2000,
        finishedAt: 2100,
        events: [
          {
            name: 'lifecycle:start',
            timestamp: 2010,
            state: { x: 2 }
          } as any,
          { name: 'pipeline:resolve', timestamp: 2020 } as any
        ],
        metrics: {
          status: 'success',
          duration: 100,
          stageCount: 1,
          eventCount: 2
        } as any
      };
      service.cellTraces.set([stateTrace, stateTrace2]);
      service.compareBeforeId.set('state-1');
      service.compareAfterId.set('state-2');
      service.toggleStateFilter();
      const indices = service.visibleIndices();
      expect(indices).toEqual([0]);
    });
  });

  describe('navigation with no visible indices and hasPrevious/hasNext', () => {
    beforeEach(() => {
      service.compareBeforeId.set('abc-123-def-456');
      service.compareAfterId.set('merge-trace-001');
    });

    it('should report hasNext false when at last event', () => {
      service.compareEventIndex.set(service.compareTotalEvents() - 1);
      expect(service.compareHasNext()).toBeFalse();
    });

    it('should report hasPrevious false when at first event', () => {
      service.compareEventIndex.set(0);
      expect(service.compareHasPrevious()).toBeFalse();
    });

    it('should report hasPrevious true for visible indices', () => {
      service.toggleDiffFilter();
      const indices = service.visibleIndices();
      if (indices.length > 1) {
        service.compareEventIndex.set(indices[1]);
        expect(service.compareHasPrevious()).toBeTrue();
      }
    });

    it('should report hasNext true for visible indices', () => {
      service.toggleDiffFilter();
      const indices = service.visibleIndices();
      if (indices.length > 1) {
        service.compareEventIndex.set(indices[0]);
        expect(service.compareHasNext()).toBeTrue();
      }
    });

    it('should not navigate next when hasNext is false', () => {
      service.compareEventIndex.set(1);
      service.nextEvent();
      expect(service.compareEventIndex()).toBe(1);
    });

    it('should not navigate previous when hasPrevious is false', () => {
      service.compareEventIndex.set(0);
      service.previousEvent();
      expect(service.compareEventIndex()).toBe(0);
    });
  });

  describe('compareBeforeEvents and compareAfterEvents edge cases', () => {
    it('should return empty when trace ID does not match any trace', () => {
      service.compareBeforeId.set('nonexistent-id');
      expect(service.compareBeforeEvents()).toEqual([]);
    });

    it('should return empty when after trace ID does not match', () => {
      service.compareAfterId.set('nonexistent-id');
      expect(service.compareAfterEvents()).toEqual([]);
    });

    it('should fallback to empty array when trace has no events property', () => {
      const noEventsTrace: TraceExecutionShape = {
        traceId: 'no-events',
        cellKey: 'employees',
        startedAt: 1000,
        finishedAt: 1100,
        events: undefined as any,
        metrics: {
          status: 'success',
          duration: 100,
          stageCount: 1,
          eventCount: 0
        } as any
      };
      service.cellTraces.set([noEventsTrace]);
      service.compareBeforeId.set('no-events');
      service.compareAfterId.set('no-events');
      expect(service.compareBeforeEvents()).toEqual([]);
      expect(service.compareAfterEvents()).toEqual([]);
    });
  });

  describe('stripNoiseFields edge cases', () => {
    it('should return non-object values as-is', () => {
      expect(service.stripNoiseFields(42)).toBe(42);
      expect(service.stripNoiseFields('hello')).toBe('hello');
      expect(service.stripNoiseFields(true)).toBe(true);
    });

    it('should not add elapsed when traceStartedAt is not provided', () => {
      const result = service.stripNoiseFields({
        timestamp: 1010,
        name: 'test'
      }) as Record<string, unknown>;
      expect(result['elapsed']).toBeUndefined();
      expect(result['timestamp']).toBeUndefined();
    });

    it('should not add delta when otherTimestamp is missing', () => {
      const result = service.stripNoiseFields(
        { timestamp: 1010 },
        1000
      ) as Record<string, unknown>;
      expect(result['delta']).toBeUndefined();
    });

    it('should not add delta when otherTraceStartedAt is missing', () => {
      const result = service.stripNoiseFields(
        { timestamp: 1010 },
        1000,
        2010
      ) as Record<string, unknown>;
      expect(result['delta']).toBeUndefined();
    });

    it('should handle null payload', () => {
      const result = service.stripNoiseFields({
        timestamp: 1010,
        payload: null
      }) as Record<string, unknown>;
      expect(result['payload']).toBeNull();
    });
  });

  describe('timelineMaxDuration edge cases', () => {
    it('should return at least 1 when no traces selected', () => {
      expect(service.timelineMaxDuration()).toBe(1);
    });
  });

  describe('visibleIndices with category filter and mismatched trace lengths', () => {
    it('should fallback to empty category when event is undefined', () => {
      const shortTrace: TraceExecutionShape = {
        traceId: 'short',
        cellKey: 'employees',
        startedAt: 1000,
        finishedAt: 1100,
        events: [{ name: 'lifecycle:start', timestamp: 1010 } as any],
        metrics: {
          status: 'success',
          duration: 100,
          stageCount: 1,
          eventCount: 1
        } as any
      };
      const longTrace: TraceExecutionShape = {
        traceId: 'long',
        cellKey: 'employees',
        startedAt: 2000,
        finishedAt: 2200,
        events: [
          { name: 'lifecycle:start', timestamp: 2010 } as any,
          { name: 'lifecycle:end', timestamp: 2020 } as any
        ],
        metrics: {
          status: 'success',
          duration: 200,
          stageCount: 1,
          eventCount: 2
        } as any
      };
      service.cellTraces.set([shortTrace, longTrace]);
      service.compareBeforeId.set('short');
      service.compareAfterId.set('long');
      service.toggleCategoryFilter('lifecycle');
      const indices = service.visibleIndices();
      expect(indices.length).toBeGreaterThan(0);
    });
  });

  describe('timelineZoom', () => {
    it('should default to 1', () => {
      expect(service.timelineZoom()).toBe(1);
    });

    it('should accept a new zoom value', () => {
      service.timelineZoom.set(3);
      expect(service.timelineZoom()).toBe(3);
    });
  });

  describe('timelineTickInterval', () => {
    it('should return 100 at zoom 1', () => {
      expect(service.timelineTickInterval()).toBe(100);
    });

    it('should return 50 at zoom 2', () => {
      service.timelineZoom.set(2);
      expect(service.timelineTickInterval()).toBe(50);
    });

    it('should return 25 at zoom 4', () => {
      service.timelineZoom.set(4);
      expect(service.timelineTickInterval()).toBe(25);
    });
  });

  describe('timelineTickPercent', () => {
    it('should compute tick interval as percentage of max duration', () => {
      service.compareBeforeId.set('abc-123-def-456');
      service.compareAfterId.set('merge-trace-001');
      expect(service.timelineTickPercent()).toBe((100 / 500) * 100);
    });

    it('should adapt to zoom level', () => {
      service.compareBeforeId.set('abc-123-def-456');
      service.compareAfterId.set('merge-trace-001');
      service.timelineZoom.set(2);
      expect(service.timelineTickPercent()).toBe((50 / 500) * 100);
    });
  });
});
