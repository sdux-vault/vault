import { TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ContactTemplateComponent } from '../contact-template.component';
import { ContactInquiryDialogService } from './contact-inquiry-dialog.service';

describe('Service: ContactInquiryDialog', () => {
  let service: ContactInquiryDialogService;
  let dialog: jasmine.SpyObj<MatDialog>;
  let dialogRef: jasmine.SpyObj<MatDialogRef<ContactTemplateComponent>>;

  beforeEach(() => {
    dialogRef = jasmine.createSpyObj('MatDialogRef', ['afterClosed', 'close']);
    dialog = jasmine.createSpyObj('MatDialog', ['open']);
    dialog.open.and.returnValue(dialogRef);

    TestBed.configureTestingModule({
      providers: [
        ContactInquiryDialogService,
        { provide: MatDialog, useValue: dialog }
      ]
    });

    service = TestBed.inject(ContactInquiryDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should open a dialog with ContactTemplateComponent', () => {
    service.open();

    expect(dialog.open).toHaveBeenCalledWith(ContactTemplateComponent, {
      width: '800px',
      autoFocus: true
    });
  });

  it('should return the dialog reference', () => {
    const result = service.open();

    expect(result).toBe(dialogRef);
  });
});
