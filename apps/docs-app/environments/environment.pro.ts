import { VaultLicensingShape } from '@sdux-vault/shared';
import { EnvironmentShape } from './shapes/environment.shape';

/** Environment configuration for pro-tier builds. */
export const environment: EnvironmentShape = {
  enterprise: false,
  pro: true,
  development: false,
  analyticsEnabled: true,
  api: 'https://api.sdux-vault.com',
  useInMemoryApi: false,
  devMode: false,
  bypassLicensing: false,
  license: {
    licenseId: 'sdux-vault',
    payload: `
        eyJvcmdhbml6YXRpb24iOiJTRHVYIFZhdWx0IFBybyIsImRvbWFpbiI6InNkdXgtdmF1bHQuY29tIiwibGljZW5zZVR5cGUiOiJwcm8iLCJpc3N1ZWRBdCI6MTc3ODQyNDkxNzMyMSwiZXhwaXJlcyI6ImZvcmV2ZXIifQ==.pDtkqsfMf0VK3/GNl42qoxpD+R7ptEY7GCzWNsv8IrsEmF8beIGEu/qV7bAQdtxRDkxVlHtqFsXitY2PrSd/9m11mM24pV5r8WfbNh7Tm6i+w8xozNWVmvWnjCdkmeXQXNwMTpQe4ljHCxFOZBhBQVMoPCmDslj4URyAPegqEeujTdUQER+JFbab4bcMOa6OoHtSslz7ikTNHM8l5HMUzrIfHm5R+IFlPMiylEH6nDKy8W1oNYGwDIeYd7KD//TSjZjXYhxrgvfAHy5mz0MwX5VQtNWId5Tn/N+X6uGZWkt8aJhz7ErjxP7S/R6ceUYNaoQDAnSfWZjKtQ8Y/PZ1nOPE/Xq46x4QsQKBephxHpO26QVjkS+hXEI3WCRJIBd/tP+/zTgcWtyDaUOJz0Snm9h53HbGUvaU+kb9XnQpzLSW/gXiJndcN75w2uFh7+UVU+Wlb1nylaHAOG9GXfZizi9ywOHuUwDN9IxWNL6fcNfd4Nk8BXKmmybNU8g0o0xfJ3IcaUq3V5RE92PSTfXdyiAhRg+GkkqG1AtLPHYawAdATKvzOnyLRT+rhbW1i8IaG9CHFr435GVe8sd6gVi8C+S9OlV+oKLwUagcAOCTUZ1Rvmalosrm9peVCWYlIRGiQCnBEauixz9onMWrGuW1+DlU1c5aRF/ofWiD9ucs8/o=`
  } as VaultLicensingShape
};
