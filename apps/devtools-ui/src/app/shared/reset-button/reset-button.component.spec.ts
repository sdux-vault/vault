import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DevtoolsAggregateService } from '../../services/devtools-aggregate.service';
import { DevtoolsLoggingService } from '../../services/devtools-logging.service';
import { ResetButtonComponent } from './reset-button.component';

describe('Component: ResetButton', () => {
  let fixture: ComponentFixture<ResetButtonComponent>;
  let component: ResetButtonComponent;
  let loggingMock: jasmine.SpyObj<DevtoolsLoggingService>;
  let aggregateMock: jasmine.SpyObj<DevtoolsAggregateService>;

  beforeEach(async () => {
    loggingMock = jasmine.createSpyObj('DevtoolsLoggingService', [
      'clearEvents'
    ]);
    aggregateMock = jasmine.createSpyObj('DevtoolsAggregateService', [
      'clearTraces'
    ]);

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
    const button = fixture.nativeElement.querySelector('.btn-clear');
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
      fixture.nativeElement.querySelector('.btn-clear');
    button.click();

    expect(loggingMock.clearEvents).toHaveBeenCalledTimes(1);
    expect(aggregateMock.clearTraces).toHaveBeenCalledTimes(1);
  });
});
