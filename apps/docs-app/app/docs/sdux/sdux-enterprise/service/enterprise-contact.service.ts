import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { EnterpriseContactShape } from '../shape/enterprise-contact.shape';

@Injectable({
  providedIn: 'root'
})
export class EnterpriseContactService {
  #http = inject(HttpClient);
  #url = environment.api;

  submitContact(contact: EnterpriseContactShape) {
    return this.#http.post<void>(
      `${this.#url}/api/v1/enterprise/contact`,
      contact
    );
  }
}
