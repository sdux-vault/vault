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
import { DevToolsSplashPageComponent } from './devtools-splash-page.component';

const mockEvent: any = {
  id: 1,
  type: 'enqueue'
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

    expect(component.events()).toEqual([Object({ id: 1, type: 'enqueue' })]);

    component.clearEvents();
    await flushVaultPipeline();

    expect(component.events()).toEqual([]);
    expect(component.totalEvents()).toBe(0);
  });

  it('should render template without pipe errors', () => {
    expect(() => fixture.detectChanges()).not.toThrow();
  });
});
