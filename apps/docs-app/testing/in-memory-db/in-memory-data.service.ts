import { HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';
import { getContactData } from '../data/contact/contact.data';
import { getLicenseData } from '../data/license/license.data';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  // eslint-disable-next-line
  parseRequestUrl(url: string, utils: any) {
    if (url.includes('/licenses')) {
      return utils.parseRequestUrl('/api/licenses');
    }

    return utils.parseRequestUrl(url);
  }

  createDb() {
    return {
      licenses: getLicenseData(),
      contacts: getContactData()
    };
  }

  get(reqInfo: RequestInfo) {
    const { url } = reqInfo;

    if (url.includes('/organization/contact/admin')) {
      // eslint-disable-next-line
      const req = reqInfo.req as HttpRequest<any>;
      const headers = req.headers;

      const authHeader = headers.get('Authorization') || '';

      const token = authHeader.replace('Bearer ', '');

      let organizationUuid: string | null = null;

      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        organizationUuid = payload.organizationUuid;
      } catch {
        return reqInfo.utils.createResponse$(() => ({
          status: 401,
          body: { message: 'Invalid token' }
        }));
      }

      const contacts = getContactData();

      const admin = contacts.find(
        // eslint-disable-next-line
        (c: any) =>
          c.organizationUuid === organizationUuid && c.role === 'admin'
      );

      const options = admin
        ? { status: 200, body: admin }
        : { status: 404, body: { message: 'Admin contact not found' } };

      return reqInfo.utils.createResponse$(() => options);
    }

    return undefined;
  }

  post(reqInfo: RequestInfo) {
    const { url, utils, req } = reqInfo;

    if (url.includes('/api/v1/authenticate')) {
      const body = reqInfo.utils.getJsonBody(req);

      const { password } = body;

      if (password !== 'password') {
        return utils.createResponse$(() => ({
          status: 403,
          body: { message: 'Invalid credentials' }
        }));
      }

      const organizationUuid = 'test-org-uuid';
      const payload = {
        fullName: 'Test Account',
        contactUuid: crypto.randomUUID(),
        organizationUuid,
        organizationName: 'Mock Organization',
        role: 'admin',
        iat: Date.now(),
        exp: Date.now() + 1000 * 60 * 60 * 24
      };

      const token = [
        btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' })),
        btoa(JSON.stringify(payload)),
        'mock-signature'
      ].join('.');

      return utils.createResponse$(() => ({
        status: 200,
        body: {
          token
        }
      }));
    }

    return undefined;
  }
}
