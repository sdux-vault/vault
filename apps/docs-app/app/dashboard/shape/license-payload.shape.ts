import { LicenseType } from '../types/license.type';

export interface LicensePayloadShape {
  organization: string;
  domain: string;
  licenseType: LicenseType;
  issuedAt: number;
  expires: string | 'forever';
}
