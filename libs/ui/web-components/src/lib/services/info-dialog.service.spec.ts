import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { InfoDialogComponent } from '../helpers/info-dialog/info-dialog.component';
import { InfoDialogService } from './info-dialog.service';

// Create a mock for MatDialog
class MockMatDialog {
  open = jasmine.createSpy('open');
}

describe('Service: Info Dialog', () => {
  let service: InfoDialogService;
  let dialog: MockMatDialog;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        InfoDialogService,
        { provide: MatDialog, useClass: MockMatDialog }
      ]
    });

    service = TestBed.inject(InfoDialogService);
    dialog = TestBed.inject(MatDialog) as unknown as MockMatDialog;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call MatDialog.open with correct parameters', () => {
    const mockData = { id: 1, name: 'Ada Lovelace' };

    service.open(mockData);

    expect(dialog.open).toHaveBeenCalledOnceWith(
      InfoDialogComponent,
      jasmine.objectContaining({
        width: '400px',
        data: mockData,
        autoFocus: false,
        restoreFocus: false,
        panelClass: 'info-dialog-panel'
      })
    );
  });

  it('should allow multiple sequential opens with different data', () => {
    const user1 = { id: 1, name: 'Alan Turing' };
    const user2 = { id: 2, name: 'Grace Hopper' };

    service.open(user1);
    service.open(user2);

    expect(dialog.open).toHaveBeenCalledTimes(2);
    expect(dialog.open.calls.argsFor(0)[1].data).toBe(user1);
    expect(dialog.open.calls.argsFor(1)[1].data).toBe(user2);
  });

  it('should handle undefined data safely', () => {
    service.open(undefined);
    expect(dialog.open).toHaveBeenCalledWith(
      InfoDialogComponent,
      jasmine.objectContaining({
        data: undefined
      })
    );
  });
});
