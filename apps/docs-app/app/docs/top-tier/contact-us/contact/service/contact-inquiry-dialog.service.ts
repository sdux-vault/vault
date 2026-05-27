import { inject, Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ContactTemplateComponent } from '../contact-template.component';

@Injectable({
  providedIn: 'root'
})
export class ContactInquiryDialogService {
  #dialog = inject(MatDialog);

  open(): MatDialogRef<ContactTemplateComponent> {
    return this.#dialog.open(ContactTemplateComponent, {
      width: '800px',
      autoFocus: true
    });
  }
}
