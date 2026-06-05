import { provideZonelessChangeDetection, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DevtoolsRegistryService } from '../../../services/registry/devtools-registry.service';
import type { TraceExecutionShape } from '../../../shapes/trace';
import { TraceExecutionStatuses } from '../../../shapes/trace';
import { TracePipelineFlowTabComponent } from './trace-pipeline-flow-tab.component';

describe('Component: TracePipelineFlowTab', () => {
  let fixture: ComponentFixture<TracePipelineFlowTabComponent>;
  let component: TracePipelineFlowTabComponent;

  const mockTrace: TraceExecutionShape = {
    traceId: 'trace-1',
    cellKey: 'vault::todos::cell',
    startedAt: 1000,
    finishedAt: 1005,
    events: [],
    metrics: {
      duration: 5,
      eventCount: 0,
      status: TraceExecutionStatuses.Success,
      slowestStage: { name: 'reducer', duration: 3 },
      fastestStage: { name: 'reducer', duration: 3 },
      stages: [],
      hadRevote: false,
      controllerVoteCount: 1,
      usedLicensedFeatures: false
    }
  };

  const mockIsLicensed = signal(true);
  const mockRegistrations = signal([
    {
      cellKey: 'vault::todos::cell',
      behaviors: []
    }
  ]);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TracePipelineFlowTabComponent],
      providers: [
        provideZonelessChangeDetection(),
        {
          provide: DevtoolsRegistryService,
          useValue: {
            isLicensed: mockIsLicensed,
            registrations: mockRegistrations,
            getCell: () => signal(null)
          }
        }
      ]
    }).compileComponents();
    mockIsLicensed.set(true);

    fixture = TestBed.createComponent(TracePipelineFlowTabComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('trace', mockTrace);
    fixture.componentRef.setInput('cellKey', 'vault::todos::cell');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('isLicensed', () => {
    it('should reflect the registry license state', () => {
      expect(component.isLicensed()).toBeTrue();

      mockIsLicensed.set(false);
      expect(component.isLicensed()).toBeFalse();
    });
  });

  describe('resolvedCellKey', () => {
    it('should return the cell key input', () => {
      expect(component.resolvedCellKey()).toBe('vault::todos::cell');
    });

    it('should return null when cellKey is null', () => {
      fixture.componentRef.setInput('cellKey', null);
      fixture.detectChanges();
      expect(component.resolvedCellKey()).toBeNull();
    });
  });
});
