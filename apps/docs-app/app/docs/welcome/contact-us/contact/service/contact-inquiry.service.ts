import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import { ContactInquiryShape } from '../shape/contact-inquiry.shape';

@Injectable({
  providedIn: 'root'
})
export class ContactInquiryService {
  #http = inject(HttpClient);
  #url = environment.api;

  submitContact(contact: ContactInquiryShape) {
    return this.#http.post<void>(`${this.#url}/api/v1/contact`, contact);
  }
}
