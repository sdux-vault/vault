import { httpResource } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ContactShape } from '../shape/contact.shape';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  #url = environment.api;

  /**
   * adminContact resource
   *
   * Fully reactive HTTP resource
   */
  adminContact = httpResource<ContactShape>(() => ({
    url: `${this.#url}/api/v1/organization/contact/admin`,
    method: 'GET'
  }));
}
