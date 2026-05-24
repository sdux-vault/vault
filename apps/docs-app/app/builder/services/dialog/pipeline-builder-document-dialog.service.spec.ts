import { Component, provideZonelessChangeDetection, Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { DocumentationDialogComponent } from '../../components/documentation-modal/documentation-dialog.component';
import { PipelineBuilderDocumentDialogService } from './pipeline-builder-document-dialog.service';

// Mock MatDialog
class MockMatDialog {
  open = jasmine.createSpy('open');
}

@Component({ standalone: true, template: '' })
class MockDocComponent {}

describe('Service: Docs Dialog', () => {
  let service: PipelineBuilderDocumentDialogService;
  let dialog: MockMatDialog;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        PipelineBuilderDocumentDialogService,
        { provide: MatDialog, useClass: MockMatDialog }
      ]
    });

    service = TestBed.inject(PipelineBuilderDocumentDialogService);
    dialog = TestBed.inject(MatDialog) as unknown as MockMatDialog;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call MatDialog.open with correct parameters', () => {
    service.open(MockDocComponent);

    expect(dialog.open).toHaveBeenCalledOnceWith(
      DocumentationDialogComponent,
      jasmine.objectContaining({
        width: '90vw',
        maxWidth: '1200px',
        data: MockDocComponent,
        autoFocus: false,
        restoreFocus: false,
        panelClass: 'docs-dialog-panel'
      })
    );
  });

  it('should allow multiple sequential opens with different components', () => {
    @Component({ standalone: true, template: '' })
    class AnotherMockComponent {}

    service.open(MockDocComponent);
    service.open(AnotherMockComponent);

    expect(dialog.open).toHaveBeenCalledTimes(2);
    expect(dialog.open.calls.argsFor(0)[1].data).toBe(MockDocComponent);
    expect(dialog.open.calls.argsFor(1)[1].data).toBe(AnotherMockComponent);
  });

  it('should handle undefined component safely', () => {
    service.open(undefined as unknown as Type<any>);

    expect(dialog.open).toHaveBeenCalledWith(
      DocumentationDialogComponent,
      jasmine.objectContaining({
        data: undefined
      })
    );
  });
});
