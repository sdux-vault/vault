import {
  computed,
  provideZonelessChangeDetection,
  signal,
  WritableSignal
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { flushVaultPipeline } from '@sdux-vault/testing-utils';
import { DevtoolsPipelineEventComponent } from '../panels/events/pipeline/devtools-pipeline-event.component';
import { DevtoolsMainPipelinePanelComponent } from '../panels/pipeline/main/devtools-main-pipeline-panel.component';
import { DevtoolsService } from '../services/devtools.service';
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

class MockNgVaultDevtoolsService {
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
  let mockService: MockNgVaultDevtoolsService;

  beforeEach(async () => {
    mockService = new MockNgVaultDevtoolsService();

    await TestBed.configureTestingModule({
      imports: [
        DevToolsSplashPageComponent,
        DevtoolsMainPipelinePanelComponent,
        DevtoolsPipelineEventComponent
      ],
      providers: [
        { provide: DevtoolsService, useValue: mockService },
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

  it('should reflect cleared events after clearEvents()', async () => {
    mockService.eventsSignal.set([mockEvent]);
    await flushVaultPipeline();

    expect(component.events()).toEqual([
      Object({ id: 1, type: 'enqueue', behaviorKey: 'test-behavior' })
    ]);

    component.clearEvents();
    await flushVaultPipeline();

    expect(component.events()).toEqual([]);
    expect(component.totalEvents()).toBe(0);
  });

  it('should render template without pipe errors', () => {
    expect(() => fixture.detectChanges()).not.toThrow();
  });

  it('should use the injected extension version', () => {
    expect(component.version).toBe('0.0.27');
  });

  it('should compute errorEvents from events with errors', async () => {
    const errorEvent = { ...mockEvent, id: '2', error: { message: 'fail' } };
    mockService.eventsSignal.set([mockEvent, errorEvent]);
    await flushVaultPipeline();

    expect(component.errorEvents().length).toBe(1);
    expect(component.errorEvents()[0].id).toBe('2');
  });

  it('should return empty errorEvents when no errors exist', async () => {
    mockService.eventsSignal.set([mockEvent]);
    await flushVaultPipeline();

    expect(component.errorEvents().length).toBe(0);
  });

  it('should download all events as a JSON file', () => {
    const createObjectURLSpy = spyOn(URL, 'createObjectURL').and.returnValue(
      'blob:mock-url'
    );
    const revokeObjectURLSpy = spyOn(URL, 'revokeObjectURL');

    let clickedDownload = '';
    spyOn(document, 'createElement').and.callFake((tag: string) => {
      if (tag === 'a') {
        const anchor = {
          href: '',
          download: '',
          click: jasmine.createSpy('click')
        };

        Object.defineProperty(anchor, 'download', {
          set(val: string) {
            clickedDownload = val;
          },
          get() {
            return clickedDownload;
          }
        });

        return anchor as any;
      }
      return document.createElement(tag);
    });

    const mockClickEvent = new MouseEvent('click');
    spyOn(mockClickEvent, 'stopPropagation');

    component.downloadAllEvents(mockClickEvent);

    expect(mockClickEvent.stopPropagation).toHaveBeenCalled();
    expect(createObjectURLSpy).toHaveBeenCalledWith(jasmine.any(Blob));
    expect(clickedDownload).toMatch(/^sdux-all-events-\d+\.json$/);
    expect(revokeObjectURLSpy).toHaveBeenCalledWith('blob:mock-url');
  });

  it('should download error events as a JSON file', () => {
    const errorEvent = { ...mockEvent, id: '2', error: { message: 'fail' } };
    mockService.eventsSignal.set([mockEvent, errorEvent]);
    fixture.detectChanges();

    const createObjectURLSpy = spyOn(URL, 'createObjectURL').and.returnValue(
      'blob:mock-url'
    );
    spyOn(URL, 'revokeObjectURL');

    let clickedDownload = '';
    spyOn(document, 'createElement').and.callFake((tag: string) => {
      if (tag === 'a') {
        const anchor = {
          href: '',
          download: '',
          click: jasmine.createSpy('click')
        };

        Object.defineProperty(anchor, 'download', {
          set(val: string) {
            clickedDownload = val;
          },
          get() {
            return clickedDownload;
          }
        });

        return anchor as any;
      }
      return document.createElement(tag);
    });

    const mockClickEvent = new MouseEvent('click');
    spyOn(mockClickEvent, 'stopPropagation');

    component.downloadErrorEvents(mockClickEvent);

    expect(mockClickEvent.stopPropagation).toHaveBeenCalled();
    expect(createObjectURLSpy).toHaveBeenCalledWith(jasmine.any(Blob));
    expect(clickedDownload).toMatch(/^sdux-error-events-\d+\.json$/);
  });

  it('should render download buttons in tab labels', async () => {
    mockService.eventsSignal.set([mockEvent]);
    fixture.detectChanges();
    await flushVaultPipeline();

    const buttons = fixture.nativeElement.querySelectorAll('.tab-download-btn');

    expect(buttons.length).toBe(2);
    expect(buttons[0].getAttribute('aria-label')).toBe('Download all events');
    expect(buttons[1].getAttribute('aria-label')).toBe('Download error events');
  });

  it('should handle undefined events gracefully', () => {
    mockService.eventsSignal.set(undefined as any);
    fixture.detectChanges();

    expect(component.totalEvents()).toBeUndefined();
    expect(component.errorEvents()).toEqual([]);
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
