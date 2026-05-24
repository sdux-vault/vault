import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MobileLayoutService } from '../../services/mobile-layout.service';
import { ExampleViewerService } from '../services/example-viewer.service';
import { ExampleViewerSourceComponent } from './example-viewer-source.component';

describe('ExampleViewerSourceComponent', () => {
  let fixture: ComponentFixture<ExampleViewerSourceComponent>;
  let component: ExampleViewerSourceComponent;

  let exampleViewerService: jasmine.SpyObj<ExampleViewerService>;
  let snack: jasmine.SpyObj<MatSnackBar>;

  beforeAll(() => {
    jasmine.clock().install();
  });

  afterAll(() => {
    jasmine.clock().uninstall();
  });

  beforeEach(async () => {
    exampleViewerService = jasmine.createSpyObj('ExampleViewerService', [
      'setDefaultVisibility',
      'toggle'
    ]);

    snack = jasmine.createSpyObj('MatSnackBar', ['open']);

    await TestBed.configureTestingModule({
      imports: [ExampleViewerSourceComponent],
      providers: [
        { provide: ExampleViewerService, useValue: exampleViewerService },
        { provide: MatSnackBar, useValue: snack },
        MobileLayoutService,
        provideZonelessChangeDetection()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ExampleViewerSourceComponent);
    component = fixture.componentInstance;

    // Fake clipboard
    spyOn(navigator.clipboard, 'writeText').and.returnValue(Promise.resolve());

    fixture.detectChanges();
  });

  // ───────────────────────────────────────────────
  // copyCode() tests
  // ───────────────────────────────────────────────

  it('should copy code and show success snackbar', async () => {
    const blocks = [{ nativeElement: { innerText: '"A"' } }];

    component.codeBlocks = {
      get: () => blocks[0]
    } as any;

    component.copyCode(0);

    // Clipboard called
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('"A"');

    // Snackbar called
    await Promise.resolve();
    expect(component.copySuccess()).toBeTrue();

    jasmine.clock().tick(2000);
    expect(snack.open).toHaveBeenCalledWith('Source copied!', '', {
      duration: 2000,
      verticalPosition: 'top'
    });

    // copySuccess toggled

    // Fast-forward 2 seconds
    jasmine.clock().tick(2000);
    expect(component.copySuccess()).toBeFalse();
  });

  it('should warn when no text to copy', () => {
    component.codeBlocks = {
      get: () => ({ nativeElement: { innerText: '' } })
    } as any;

    component.copyCode(0);

    jasmine.clock().tick(2000);

    expect(snack.open).toHaveBeenCalledWith('Nothing to copy!', '', {
      duration: 1500,
      verticalPosition: 'top'
    });
  });

  it('should do nothing if index is out of bounds', () => {
    component.codeBlocks = { get: () => undefined } as any;

    component.copyCode(0);

    expect(snack.open).toHaveBeenCalledWith('Nothing to copy!', '', {
      duration: 1500,
      verticalPosition: 'top'
    });
  });

  it('should call setDefaultVisibility when exampleId is provided', () => {
    // GIVEN: exampleId and displayExamples are provided as inputs
    fixture.componentRef.setInput('exampleId', 'ex-123');
    fixture.componentRef.setInput('displayExamples', true);

    // WHEN: change detection runs (effect executes in constructor)
    fixture.detectChanges();

    // THEN: service should have been called
    expect(exampleViewerService.setDefaultVisibility).toHaveBeenCalledWith(
      'ex-123',
      true
    );
  });
});
