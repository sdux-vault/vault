import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogData } from '../../shapes/confirm-dialog/confirm-dialog-data.shape';
import { ConfirmDialogComponent } from './confirm-dialog.component';

describe('ConfirmDialogComponent', () => {
  let component: ConfirmDialogComponent;
  let fixture: ComponentFixture<ConfirmDialogComponent>;
  let dialogRef: jasmine.SpyObj<MatDialogRef<ConfirmDialogComponent>>;

  const mockData: ConfirmDialogData = {
    title: 'Test Title',
    message: 'Test message body',
    confirmLabel: 'Yes',
    cancelLabel: 'No'
  };

  beforeEach(async () => {
    dialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [ConfirmDialogComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: mockData },
        { provide: MatDialogRef, useValue: dialogRef }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should expose the injected dialog data', () => {
    expect(component.data.title).toBe('Test Title');
    expect(component.data.message).toBe('Test message body');
    expect(component.data.confirmLabel).toBe('Yes');
    expect(component.data.cancelLabel).toBe('No');
  });

  it('should close the dialog with true when confirm is called', () => {
    component.confirm();
    expect(dialogRef.close).toHaveBeenCalledWith(true);
  });

  it('should close the dialog with false when cancel is called', () => {
    component.cancel();
    expect(dialogRef.close).toHaveBeenCalledWith(false);
  });
});
