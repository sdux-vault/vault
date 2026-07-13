import { VaultLicensingShape } from '@sdux-vault/shared';
import { EnvironmentShape } from './shapes/environment.shape';

/** Environment configuration with licensing bypassed for local development. */
export const environment: EnvironmentShape = {
  enterprise: false,
  pro: false,
  development: false,
  analyticsEnabled: false,
  api: 'http://localhost:3101',
  useInMemoryApi: false,
  bypassLicensing: true,
  devMode: true,
  license: {
    licenseId: 'sdux-vault',
    payload: ''
  } as VaultLicensingShape
};
