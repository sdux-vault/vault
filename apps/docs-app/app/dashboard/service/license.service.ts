import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LicenseShape } from '../shape/license.shape';

@Injectable({
  providedIn: 'root'
})
export class LicenseService {
  #http = inject(HttpClient);
  #url = environment.api;

  /**
   * getLicenses
   *
   * Returns all licenses for an organization
   */

  getLicenses(): Observable<LicenseShape[]> {
    return this.#http
      .get<LicenseShape[]>(`${this.#url}/api/v1/organization/licenses`)
      .pipe(
        map((licenses: LicenseShape[]) =>
          licenses.map((license: LicenseShape) => {
            const fingerprint = license.fingerprint ?? '';

            return {
              ...license,
              fingerprintDisplay: fingerprint
                ? `${fingerprint.slice(0, 6).toUpperCase()}...${fingerprint.slice(-6).toUpperCase()}`
                : ''
            };
          })
        )
      );
  }
}
