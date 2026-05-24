import { LicenseStatusType } from '../types/license-status.type';
import { LicenseType } from '../types/license.type';

export interface LicenseShape {
  uuid: string;
  organizationUuid: string;
  domain: string;
  licenseKey: string;
  fingerprint: string;
  fingerprintDisplay?: string;
  status: LicenseStatusType;
  expires: string;
  licenseType: LicenseType;
  created: string;
  updated?: string;
}
