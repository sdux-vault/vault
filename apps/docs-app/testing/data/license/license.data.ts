import { isolateValue } from '@sdux-vault/shared';

const Data = [
  Object({
    id: 1,
    uuid: '1',
    organizationUuid: 'org-1',
    domain: 'example.com',
    licenseKey:
      'eyJvcmdhbml6YXRpb24iOiJTaWduYWwgRGF0YSBMYWJzIExMQyIsImRvbWFpbiI6ImV4YW1wbGUuY29tIiwibGljZW5zZVR5cGUiOiJlbnRlcnByaXNlIiwiaXNzdWVkQXQiOjE3MzAwMDAwMDAwMDAsImV4cGlyZXMiOjE3NjE1MzYwMDAwMDB9.bW9jay1zaWduYXR1cmUtc2R1eC1zaGEyNTYtcnNhLXNpbQ==',

    fingerprint:
      'a1b2c3d4e5f60718293a4b5c6d7e8f90123456789abcdef0123456789abcdef0',
    status: 'active',
    licenseType: 'standard',
    created: new Date(),
    expires: null
  }),
  Object({
    id: 2,
    uuid: '2',
    organizationUuid: 'org-1',
    domain: 'this-is-a-very-long-domain-name-to-see-what-happens-test.com',
    licenseKey:
      'eyJvcmdhbml6YXRpb24iOiJTaWduYWwgRGF0YSBMYWJzIExMQyIsImRvbWFpbiI6InRoaXMtaXMtYS12ZXJ5LWxvbmctZG9tYWluLW5hbWUtdG8tc2VlLXdoYXQtaGFwcGVucy10ZXN0LmNvbSIsImxpY2Vuc2VUeXBlIjoiZW50ZXJwcmlzZSIsImlzc3VlZEF0IjoxNzMwMDAwMDAwMDAwLCJleHBpcmVzIjoxNzYxNTM2MDAwMDAwfQ==.bW9jay1zaWduYXR1cmUtbG9uZw==',

    fingerprint:
      'bb91e4c2d7a5f6831029384756abcdefabcdef1234567890fedcba0987654321',
    status: 'active',
    licenseType: 'enterprise',
    created: new Date(),
    expires: new Date(Date.now() + 86400000 * 365)
  }),
  Object({
    id: 4,
    uuid: 'internal-uuid-1',
    organizationUuid: 'internal-uuid',
    domain: 'internal.signal.local',
    licenseKey:
      'eyJvcmdhbml6YXRpb24iOiJTaWduYWwgRGF0YSAoSW50ZXJuYWwpIiwiZG9tYWluIjoiaW50ZXJuYWwuc2lnbmFsLmxvY2FsIiwibGljZW5zZVR5cGUiOiJpbnRlcm5hbCIsImlzc3VlZEF0IjoxNzMwMDAwMDAwMDAwLCJleHBpcmVzIjoiZm9yZXZlciJ9.aW50ZXJuYWwtbW9jay1zaWduYXR1cmUtc2R1eA==',

    fingerprint:
      '5a6b7c8d9e0f112233445566778899aabbccddeeff0011223344556677889900',
    status: 'inactive',
    licenseType: 'internal',
    created: new Date('2024-01-01'),
    expires: null
  }),
  Object({
    id: 3,
    uuid: 'std-uuid-1',
    organizationUuid: 'org-uuid',
    domain: 'standard.example.com',
    licenseKey:
      'eyJvcmdhbml6YXRpb24iOiJTaWduYWwgRGF0YSBMYWJzIExMQyIsImRvbWFpbiI6InN0YW5kYXJkLmV4YW1wbGUuY29tIiwibGljZW5zZVR5cGUiOiJzdGFuZGFyZCIsImlzc3VlZEF0IjoxNzMwMDAwMDAwMDAwLCJleHBpcmVzIjoxNzYxNTM2MDAwMDAwfQ==.bW9jay1zaWduYXR1cmUtc3Rk',
    fingerprint:
      'c7d8e9f00112233445566778899aabbccddeeff00112233445566778899aabb',
    status: 'active',
    licenseType: 'standard',
    created: new Date('2024-01-01'),
    expires: new Date('2025-01-01')
  }),
  Object({
    id: 5,
    uuid: 'error-uuid-1',
    organizationUuid: 'error-uuid',
    domain: 'internal.error.local',
    licenseKey:
      'Jvcmdhbml6YXRpb24iOiJFcnJvciBPcmciLCJkb21haW4iOiJpbnRlcm5hbC5lcnJvci5sb2NhbCIsImxpY2Vuc2VUeXBlIjoiaW50ZXJuYWwiLCJpc3N1ZWRBdCI6MTczMDAwMDAwMDAwMCwiZXhwaXJlcyI6ImZvcmV2ZXIifQ==.bW9jay1zaWduYXR1cmUtZXJyb3I=',
    fingerprint:
      '9f3a1c7d82ab4e6d5f0c9a1b2d3e4f5061728394a5b6c7d8e9f0011223344556',
    status: 'active',
    licenseType: 'internal',
    created: new Date('2024-01-01'),
    expires: null
  })
];

export const getLicenseData = (index?: number, asArray = false) => {
  if (index !== undefined && index >= 0 && index < Data.length) {
    const item = isolateValue(Data[index]);
    return asArray ? [item] : item;
  }

  return isolateValue(Data);
};
