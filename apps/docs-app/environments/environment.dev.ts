import { VAULT_LICENSE_ID } from '@sdux-vault/engine';
import { VaultLicensingShape } from '@sdux-vault/shared';
import { EnvironmentShape } from './shapes/environment.shape';

/** Environment configuration for local development with a development license. */
export const environment: EnvironmentShape = {
  enterprise: false,
  pro: false,
  development: true,
  bypassLicensing: false,
  api: 'http://localhost:3101',
  useInMemoryApi: false,
  devMode: true,
  license: {
    licenseId: VAULT_LICENSE_ID,
    payload: `eyJvcmdhbml6YXRpb24iOiJTRHVYIFZhdWx0IERldmVsb3BtZW50IiwiZG9tYWluIjoic2R1eC12YXVsdC5jb20iLCJsaWNlbnNlVHlwZSI6ImRldmVsb3BtZW50IiwiaXNzdWVkQXQiOjE3Nzg0MjQ2NzgxMjcsImV4cGlyZXMiOiJmb3JldmVyIn0=.dXS4vMugXu4mfI/QPPh5iDvtiy5033kRCG2R445HZtCb7778K1cuvg68GiX5GKBwMLMB5HOBoZFXwJbrwVzoMV4Ikm3VNvMtJ9EWe9TM0U0kQQnzukJqkLoI/p0ZhdD/RJhhzzOBqqMDYC5LXCbKDj4oAQQZHOthVo9vV5BGLJH7+C13HPzWOlWs8qrtKsQ1Jn96bMUul9X80Cjznt8l+NRG8eVJYq1gpRIp78ukDgOHz0xeSf7e/TC5vMdN9AAIn+RGYDUkA8/+MRDYEzojRyiwreVeF6duSBCI76mQKZoOtoG0KdGWzdMF86b+z+o2pXP2BBaOS9cx2wxs/X+Sp36ly9lXhaFrPjj3Res/bTQvVEtavAcqAmlEn9j1VO1XJdYGOxaL9pnvdPJBdal+Ojpyu9SFMxeZPhh7+5kgL8QNqZOikURpODipX9t1pwu/CFWYWkLlAugzqJfjh1UcPNtylRQh78tQJmMukAg9nrNEm+gaEhmIGRInazkJ3AfiaKC4S9jR0WulNIMw9vYK0OomIKL+3S9LWFqOuj9OIuJGY5An5moXLuSxky8K8mQvoZnvfVAImC+n1OMzSRRqo91FvDoyO1IIJfrIuppCk7uP6/Ib0KfAA98unyEf63iAQNwc/0jWOIoWiOXyWrclwKWfWdBw87uUJfO6Zug4l3k=`
  } as VaultLicensingShape
};
