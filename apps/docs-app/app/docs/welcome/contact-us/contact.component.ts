import { Component } from '@angular/core';
import { ContactTemplateComponent } from './contact/contact-template.component';

@Component({
  selector: 'sdux-contact-page',
  standalone: true,
  imports: [ContactTemplateComponent],
  templateUrl: './contact.component.html'
})
export class ContactComponent {}
