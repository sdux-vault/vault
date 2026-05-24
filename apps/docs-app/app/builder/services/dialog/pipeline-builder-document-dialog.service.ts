import { Injectable, Type, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DocumentationDialogComponent } from '../../components/documentation-modal/documentation-dialog.component';

@Injectable({ providedIn: 'root' })
export class PipelineBuilderDocumentDialogService {
  private dialog = inject(MatDialog);

  open(component: Type<unknown>): void {
    this.dialog.open(DocumentationDialogComponent, {
      width: '90vw',
      maxWidth: '1200px',
      data: component,
      autoFocus: false,
      restoreFocus: false,
      panelClass: 'docs-dialog-panel'
    });
  }
}
