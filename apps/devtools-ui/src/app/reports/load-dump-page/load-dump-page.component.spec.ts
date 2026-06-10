import { provideZonelessChangeDetection, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { of } from 'rxjs';
import { ConfirmDialogService } from '../../services/confirm-dialog/confirm-dialog.service';
import { DevtoolsAggregateService } from '../../services/devtools-aggregate.service';
import { DevtoolsLoggingService } from '../../services/devtools-logging.service';
import { DevtoolsRegistryService } from '../../services/registry/devtools-registry.service';
import { LoadDumpPageComponent } from './load-dump-page.component';

describe('Component: LoadDumpPage', () => {
  let fixture: ComponentFixture<LoadDumpPageComponent>;
  let component: LoadDumpPageComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadDumpPageComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideRouter([]),
        {
          provide: DevtoolsAggregateService,
          useValue: {
            loadDumpEvents: jasmine.createSpy('loadDumpEvents'),
            clearTraces: jasmine.createSpy('clearTraces'),
            traces: signal([])
          }
        },
        {
          provide: DevtoolsLoggingService,
          useValue: { clearEvents: jasmine.createSpy('clearEvents') }
        },
        {
          provide: ConfirmDialogService,
          useValue: {
            confirm: jasmine.createSpy('confirm').and.returnValue(of(true))
          }
        },
        {
          provide: DevtoolsRegistryService,
          useValue: { isLicensed: signal(true) }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoadDumpPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render the page title', () => {
    const h2 = fixture.nativeElement.querySelector('h2');
    expect(h2.textContent).toContain('Load Debug Dump');
  });

  it('should not show success initially', () => {
    expect(fixture.nativeElement.querySelector('.success-section')).toBeNull();
  });

  it('should show success section after onFileLoaded', () => {
    component.onFileLoaded({ fileName: 'dump.json', eventCount: 42 });
    fixture.detectChanges();

    const success = fixture.nativeElement.querySelector('.success-message');
    expect(success.textContent).toContain('42');
    expect(success.textContent).toContain('dump.json');
  });

  it('should render navigate button after load', () => {
    component.onFileLoaded({ fileName: 'dump.json', eventCount: 10 });
    fixture.detectChanges();

    const btn = fixture.nativeElement.querySelector(
      '.success-section .sdux-button'
    );
    expect(btn).toBeTruthy();
    expect(btn.textContent).toContain('Trace Detail');
  });

  it('should navigate to trace detail view', () => {
    const router = TestBed.inject(Router);
    spyOn(router, 'navigate');
    component.navigateToTraceDetail();
    expect(router.navigate).toHaveBeenCalledWith(['/reports/trace-detail']);
  });

  it('should navigate when clicking the navigate button', () => {
    const router = TestBed.inject(Router);
    spyOn(router, 'navigate');

    component.onFileLoaded({ fileName: 'dump.json', eventCount: 5 });
    fixture.detectChanges();

    const btn = fixture.nativeElement.querySelector(
      '.success-section .sdux-button'
    );
    btn.click();
    expect(router.navigate).toHaveBeenCalledWith(['/reports/trace-detail']);
  });

  it('should show warning notice when no file has been loaded', () => {
    const warning = fixture.nativeElement.querySelector('.warning-notice');
    expect(warning).toBeTruthy();
    expect(warning.textContent).toContain('replace');
  });

  it('should show upsell notice when not licensed', async () => {
    const registry = TestBed.inject(DevtoolsRegistryService);
    (registry.isLicensed as ReturnType<typeof signal<boolean>>).set(false);
    fixture.detectChanges();

    const upsell = fixture.nativeElement.querySelector('sdux-upsell-notice');
    expect(upsell).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.load-dump-page')).toBeNull();
  });
});
