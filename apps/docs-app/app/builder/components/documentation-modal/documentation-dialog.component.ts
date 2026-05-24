import { CommonModule } from '@angular/common';
import { Component, Inject, Type } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  selector: 'sdux-documentation-dialog',
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: 'documentation-dialog.component.html',
  styleUrl: 'documentation-dialog.component.scss'
})
export class DocumentationDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public component: Type<unknown>,
    private dialogRef: MatDialogRef<DocumentationDialogComponent>
  ) {}

  close(): void {
    this.dialogRef.close();
  }
}
