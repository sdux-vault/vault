import { VaultLicensingShape } from '@sdux-vault/shared';
import { EnvironmentShape } from './shapes/environment.shape';

/** Environment configuration for enterprise-tier builds. */
export const environment: EnvironmentShape = {
  enterprise: true,
  pro: false,
  development: true,
  analyticsEnabled: true,
  api: 'https://api.sdux-vault.com',
  useInMemoryApi: false,
  devMode: false,
  bypassLicensing: false,
  license: {
    licenseId: 'sdux-vault',
    payload: `eyJvcmdhbml6YXRpb24iOiJTRHVYIFZhdWx0IEVudGVycHJpc2UiLCJkb21haW4iOiJzZHV4LXZhdWx0LmNvbSIsImxpY2Vuc2VUeXBlIjoiZW50ZXJwcmlzZSIsImlzc3VlZEF0IjoxNzc4NDI0ODM3MTYzLCJleHBpcmVzIjoxODA5OTYwODM3MTYzfQ==.5MQFsC9dJXMES4jZzfryfBLQY8t12vbvh0KvRAmhTyQ+tJkrUSeI3g+GNmQTOWdLijOiMvus0j4/jRW+uxcSEjeX8NP5ZRfjg5wMnD0RwCLjEH6P07aI3do3YLvAa5xR7qWd6hBeShIpPHSSqPCufoa8ncyLtw8M0rMdqwV6IrwpRgrESWun+ShEOWhugANkHuY51vS4LXN72kNcAzEMFcl5d9n2qdt8kXv8F4Vb+g2qIWB3/Ty1Dk6Ls1lMqio+nqbqC9U+d5GT7RaACYj5iJ6+GsiPHaae6DVQF1O78R4d5LRuz8Mrjtiq3hFxvPvctzoNWMxRBMJiCQ+ck5sbht7NlhQqBexLf8b9clIcT+vpEB5mO50hJYHA52nKHvNSvpNXLm+5x05AgoaXL8WEWm0Gm/hsnM3AIXwptZ9YHOUpNbNtIL6u1v/G/E4wfnkQadMUXvjznoFjrLX7xoRvmdnL1qKGPOOVAsQjEriNL2sumjyAH5b0e753e78uhaOAuyct1/ekIyQN79MfNVN9Pjtlbfp/GC0O1rzadlq/hIcHX4IKD+7DFmE99bykMhirfpLG06Rq52HymS7WlfS0dfa6fqSse2/Pw3VJC6s9jP9Rf+UxHoN2Emoyfc4Iia19pFnUAtm9geAa2Ysg3q/2stZg0pxTrIHJ1dOeAZDx1NY=`
  } as VaultLicensingShape
};
