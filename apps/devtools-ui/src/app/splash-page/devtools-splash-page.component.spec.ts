import {
  computed,
  provideZonelessChangeDetection,
  signal,
  WritableSignal
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { flushVaultPipeline } from '@sdux-vault/testing-utils';
import { EventContainerComponent } from '../reports/events/event-container/event-container.component';
import { EventViewComponent } from '../reports/events/event-view/event-view.component';
import { DevtoolsAggregateService } from '../services/devtools-aggregate.service';
import { DevtoolsLoggingService } from '../services/devtools-logging.service';
import { DevtoolsRegistryService } from '../services/registry/devtools-registry.service';
import {
  DevToolsSplashPageComponent,
  EXTENSION_VERSION,
  resolveExtensionVersion
} from './devtools-splash-page.component';

const mockEvent: any = {
  id: 1,
  type: 'enqueue',
  behaviorKey: 'test-behavior'
};

class MockDevtoolsService {
  eventsSignal: WritableSignal<any[]> = signal([mockEvent]);
  totalEventsSignal = computed(() => this.eventsSignal().length);

  events() {
    return this.eventsSignal();
  }

  readonly queueEvents = computed(() => this.eventsSignal());
  readonly totalQueueEvents = computed(() => this.queueEvents().length);

  get totalEvents() {
    return this.totalEventsSignal;
  }

  clearEvents = jasmine.createSpy('clearEvents').and.callFake(() => {
    this.eventsSignal.set([]);
  });
}

describe('Component: SplashPage', () => {
  let fixture: ComponentFixture<DevToolsSplashPageComponent>;
  let component: DevToolsSplashPageComponent;
  let mockService: MockDevtoolsService;

  beforeEach(async () => {
    mockService = new MockDevtoolsService();

    await TestBed.configureTestingModule({
      imports: [
        DevToolsSplashPageComponent,
        EventContainerComponent,
        EventViewComponent
      ],
      providers: [
        { provide: DevtoolsLoggingService, useValue: mockService },
        {
          provide: DevtoolsAggregateService,
          useValue: {
            traces: signal([]),
            tracesByCellKey: signal(new Map())
          }
        },
        {
          provide: DevtoolsRegistryService,
          useValue: {
            isLicensed: signal(false),
            registry: signal([]),
            versions: signal([]),
            license: signal(null)
          }
        },
        { provide: EXTENSION_VERSION, useValue: '0.0.27' },
        provideZonelessChangeDetection()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DevToolsSplashPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should expose totalEvents from the service', async () => {
    mockService.eventsSignal.set([mockEvent]);
    fixture.detectChanges();

    await flushVaultPipeline();

    expect(component.totalEvents()).toBe(1);
  });

  it('should render template without pipe errors', () => {
    expect(() => fixture.detectChanges()).not.toThrow();
  });

  it('should use the injected extension version', () => {
    expect(component.version).toBe('0.0.27');
  });

  it('should handle undefined events gracefully', () => {
    mockService.eventsSignal.set(undefined as any);
    fixture.detectChanges();

    expect(component.totalEvents()).toBeUndefined();
  });
});

describe('resolveExtensionVersion', () => {
  it('should return "dev" when chrome.runtime.getManifest is unavailable', () => {
    expect(resolveExtensionVersion()).toBe('dev');
  });

  it('should return the manifest version when available', () => {
    const original = (globalThis as any).chrome;
    (globalThis as any).chrome = {
      runtime: {
        getManifest: () => ({ version: '1.2.3' })
      }
    };

    expect(resolveExtensionVersion()).toBe('1.2.3');

    (globalThis as any).chrome = original;
  });
});
