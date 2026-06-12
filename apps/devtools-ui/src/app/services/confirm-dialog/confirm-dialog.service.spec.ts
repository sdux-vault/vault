import { TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { of } from 'rxjs';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';
import { ConfirmDialogService } from './confirm-dialog.service';

describe('ConfirmDialogService', () => {
  let service: ConfirmDialogService;
  let dialog: jasmine.SpyObj<MatDialog>;

  beforeEach(() => {
    dialog = jasmine.createSpyObj('MatDialog', ['open']);

    TestBed.configureTestingModule({
      providers: [
        ConfirmDialogService,
        { provide: MatDialog, useValue: dialog }
      ]
    });

    service = TestBed.inject(ConfirmDialogService);
  });

  it('should open the dialog with the provided data', () => {
    const mockRef = {
      afterClosed: () => of(true)
    } as MatDialogRef<ConfirmDialogComponent>;
    dialog.open.and.returnValue(mockRef);

    const data = { title: 'Test', message: 'Are you sure?' };
    service.confirm(data).subscribe();

    expect(dialog.open).toHaveBeenCalledWith(ConfirmDialogComponent, {
      data,
      width: '400px',
      disableClose: true
    });
  });

  it('should emit true when the user confirms', (done) => {
    const mockRef = {
      afterClosed: () => of(true)
    } as MatDialogRef<ConfirmDialogComponent>;
    dialog.open.and.returnValue(mockRef);

    service.confirm({ title: 'T', message: 'M' }).subscribe((result) => {
      expect(result).toBeTrue();
      done();
    });
  });

  it('should emit false when the user cancels', (done) => {
    const mockRef = {
      afterClosed: () => of(false)
    } as MatDialogRef<ConfirmDialogComponent>;
    dialog.open.and.returnValue(mockRef);

    service.confirm({ title: 'T', message: 'M' }).subscribe((result) => {
      expect(result).toBeFalse();
      done();
    });
  });

  it('should emit false when the dialog is dismissed without a result', (done) => {
    const mockRef = {
      afterClosed: () => of(undefined)
    } as MatDialogRef<ConfirmDialogComponent>;
    dialog.open.and.returnValue(mockRef);

    service.confirm({ title: 'T', message: 'M' }).subscribe((result) => {
      expect(result).toBeFalse();
      done();
    });
  });
});
