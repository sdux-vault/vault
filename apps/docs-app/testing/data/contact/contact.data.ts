import { isolateValue } from '@sdux-vault/shared';

const Data = [
  Object({
    uuid: '1',
    organizationUuid: 'org-1',
    email: 'admin1@test.com',
    name: 'Admin One',
    role: 'admin',
    active: true,
    created: new Date().toISOString(),
    updated: new Date().toISOString()
  }),
  Object({
    uuid: '2',
    organizationUuid: 'test-org-uuid',
    email: 'admin2@test.com',
    name: 'Admin Two',
    role: 'admin',
    active: true,
    created: new Date().toISOString(),
    updated: new Date().toISOString()
  })
];

export const getContactData = (index?: number, asArray = false) => {
  if (index !== undefined && index >= 0 && index < Data.length) {
    const item = isolateValue(Data[index]);
    return asArray ? [item] : item;
  }

  return isolateValue(Data);
};
