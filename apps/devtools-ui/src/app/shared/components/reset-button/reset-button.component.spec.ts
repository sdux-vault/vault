import { provideZonelessChangeDetection, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DevtoolsAggregateService } from '../../../services/devtools-aggregate.service';
import { DevtoolsLoggingService } from '../../../services/devtools-logging.service';
import { ResetButtonComponent } from './reset-button.component';

describe('Component: ResetButton', () => {
  let fixture: ComponentFixture<ResetButtonComponent>;
  let component: ResetButtonComponent;
  let loggingMock: jasmine.SpyObj<DevtoolsLoggingService>;
  let aggregateMock: jasmine.SpyObj<DevtoolsAggregateService>;

  const totalEvents = signal(5);
  const totalTraces = signal(3);

  beforeEach(async () => {
    totalEvents.set(5);
    totalTraces.set(3);
    loggingMock = jasmine.createSpyObj(
      'DevtoolsLoggingService',
      ['clearEvents'],
      { totalEvents }
    );
    aggregateMock = jasmine.createSpyObj(
      'DevtoolsAggregateService',
      ['clearTraces'],
      { totalTraces }
    );

    await TestBed.configureTestingModule({
      imports: [ResetButtonComponent],
      providers: [
        provideZonelessChangeDetection(),
        { provide: DevtoolsLoggingService, useValue: loggingMock },
        { provide: DevtoolsAggregateService, useValue: aggregateMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ResetButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render a Clear button', () => {
    const button = fixture.nativeElement.querySelector('.sdux-button');
    expect(button).toBeTruthy();
    expect(button.textContent.trim()).toBe('Clear');
  });

  it('should call clearEvents on logging service when clear is called', () => {
    component.clear();
    expect(loggingMock.clearEvents).toHaveBeenCalledTimes(1);
  });

  it('should call clearTraces on aggregate service when clear is called', () => {
    component.clear();
    expect(aggregateMock.clearTraces).toHaveBeenCalledTimes(1);
  });

  it('should call both services when button is clicked', () => {
    const button: HTMLButtonElement =
      fixture.nativeElement.querySelector('.sdux-button');
    button.click();

    expect(loggingMock.clearEvents).toHaveBeenCalledTimes(1);
    expect(aggregateMock.clearTraces).toHaveBeenCalledTimes(1);
  });

  it('should hide the button when no events or traces exist', () => {
    totalEvents.set(0);
    totalTraces.set(0);
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('.sdux-button');
    expect(button).toBeNull();
  });
});
