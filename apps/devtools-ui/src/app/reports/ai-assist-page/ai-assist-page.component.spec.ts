import { provideZonelessChangeDetection, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EventShape } from '@sdux-vault/shared';
import { DevtoolsAggregateService } from '../../services/devtools-aggregate.service';
import { DevtoolsLoggingService } from '../../services/devtools-logging.service';
import { DevtoolsRegistryService } from '../../services/registry/devtools-registry.service';
import { AiAssistPageComponent } from './ai-assist-page.component';

describe('Component: AiAssistPage', () => {
  let fixture: ComponentFixture<AiAssistPageComponent>;
  let component: AiAssistPageComponent;

  const mockIsLicensed = signal(true);
  const mockEvents = signal<EventShape[]>([]);
  const mockTotalEvents = signal(0);

  beforeEach(async () => {
    mockEvents.set([]);
    mockTotalEvents.set(0);

    await TestBed.configureTestingModule({
      imports: [AiAssistPageComponent],
      providers: [
        provideZonelessChangeDetection(),
        {
          provide: DevtoolsAggregateService,
          useValue: { totalTraces: () => 0 }
        },
        {
          provide: DevtoolsRegistryService,
          useValue: { isLicensed: mockIsLicensed }
        },
        {
          provide: DevtoolsLoggingService,
          useValue: {
            events: mockEvents,
            totalEvents: mockTotalEvents
          }
        }
      ]
    }).compileComponents();

    mockIsLicensed.set(true);
    fixture = TestBed.createComponent(AiAssistPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('isLicensed', () => {
    it('should reflect the registry license state', () => {
      expect(component.isLicensed()).toBeTrue();
    });

    it('should reflect unlicensed state', () => {
      mockIsLicensed.set(false);
      expect(component.isLicensed()).toBeFalse();
    });
  });

  describe('hasEvents', () => {
    it('should return false when no events are recorded', () => {
      expect(component.hasEvents()).toBeFalse();
    });

    it('should return true when events are recorded', () => {
      mockEvents.set([
        {
          id: '1',
          cell: 'test',
          name: 'stage:start:resolve',
          type: 'stage',
          boundary: 'start',
          behaviorKey: 'test',
          timestamp: 1
        } as EventShape
      ]);
      mockTotalEvents.set(1);
      expect(component.hasEvents()).toBeTrue();
    });
  });

  describe('traceCount', () => {
    it('should return 0 when no events exist', () => {
      expect(component.traceCount()).toBe(0);
    });

    it('should count unique traceIds', () => {
      mockEvents.set([
        { id: '1', traceId: 'trace-1' } as EventShape,
        { id: '2', traceId: 'trace-1' } as EventShape,
        { id: '3', traceId: 'trace-2' } as EventShape
      ]);
      expect(component.traceCount()).toBe(2);
    });

    it('should exclude events without traceId', () => {
      mockEvents.set([
        { id: '1', traceId: 'trace-1' } as EventShape,
        { id: '2' } as EventShape
      ]);
      expect(component.traceCount()).toBe(1);
    });
  });

  describe('downloadAiAssist', () => {
    it('should not throw when called', () => {
      expect(() => component.downloadAiAssist()).not.toThrow();
    });
  });

  describe('downloadDump', () => {
    it('should not download when no events exist', () => {
      const spy = spyOn(document, 'createElement').and.callThrough();
      component.downloadDump();
      expect(spy).not.toHaveBeenCalled();
    });

    it('should create and download dump when events exist', () => {
      mockEvents.set([
        {
          id: '1',
          cell: 'test',
          name: 'stage:start:resolve',
          type: 'stage',
          boundary: 'start',
          behaviorKey: 'test',
          timestamp: 1,
          traceId: 'trace-1'
        } as EventShape
      ]);

      const anchor = document.createElement('a');
      spyOn(anchor, 'click');
      spyOn(document, 'createElement').and.returnValue(anchor);
      spyOn(URL, 'createObjectURL').and.returnValue('blob:mock');
      spyOn(URL, 'revokeObjectURL');

      component.downloadDump();

      expect(URL.createObjectURL).toHaveBeenCalled();
      expect(anchor.click).toHaveBeenCalled();
      expect(URL.revokeObjectURL).toHaveBeenCalledWith('blob:mock');
    });
  });
});
