import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DevtoolsAggregateService } from '../../services/devtools-aggregate.service';
import { DevtoolsRegistryService } from '../../services/registry/devtools-registry.service';
import { StateDiffViewComponent } from './state-diff-view.component';

describe('StateDiffViewComponent', () => {
  let component: StateDiffViewComponent;
  let fixture: ComponentFixture<StateDiffViewComponent>;
  const mockIsLicensed = signal(true);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        StateDiffViewComponent,
        MatSelectModule,
        MatTooltipModule,
        NoopAnimationsModule
      ],
      providers: [
        {
          provide: DevtoolsAggregateService,
          useValue: {
            traces: () => [],
            tracesByCellKey: () => new Map(),
            extractCandidates: () => []
          }
        },
        {
          provide: DevtoolsRegistryService,
          useValue: { isLicensed: mockIsLicensed }
        }
      ]
    }).compileComponents();

    mockIsLicensed.set(true);
    fixture = TestBed.createComponent(StateDiffViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default cell filter', () => {
    expect(component.selectedCell()).toBe('all');
  });

  it('should initialize with no selected trace', () => {
    expect(component.selectedTraceId()).toBeNull();
  });

  it('should compute empty candidates when no trace selected', () => {
    expect(component.candidates()).toEqual([]);
  });

  it('should compute zero total pairs with empty candidates', () => {
    expect(component.totalPairs()).toBe(0);
  });

  describe('computeDiff', () => {
    it('should detect added keys', () => {
      const result = component['computeDiff']({}, { a: 1, b: 2 });
      expect(result.added).toBe(2);
      expect(result.removed).toBe(0);
      expect(result.modified).toBe(0);
    });

    it('should detect removed keys', () => {
      const result = component['computeDiff']({ a: 1, b: 2 }, {});
      expect(result.removed).toBe(2);
    });

    it('should detect modified keys', () => {
      const result = component['computeDiff']({ a: 1 }, { a: 2 });
      expect(result.modified).toBe(1);
    });

    it('should handle null before', () => {
      const result = component['computeDiff'](null, { a: 1 });
      expect(result.added).toBe(1);
    });

    it('should handle null after', () => {
      const result = component['computeDiff']({ a: 1 }, null);
      expect(result.removed).toBe(1);
    });

    it('should handle both null', () => {
      const result = component['computeDiff'](null, null);
      expect(result).toEqual({ modified: 0, added: 0, removed: 0 });
    });
  });

  describe('pair navigation', () => {
    it('should start at indices 0 and 1', () => {
      expect(component.beforeIndex()).toBe(0);
      expect(component.afterIndex()).toBe(1);
    });

    it('should not navigate previous from start', () => {
      expect(component.hasPrevious()).toBe(false);
    });
  });
});
