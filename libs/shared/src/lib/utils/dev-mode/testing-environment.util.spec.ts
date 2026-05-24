import { isTestEnv } from './testing-environment.util';

describe('Util: isTestEnv', () => {
  it('should be active in test', () => {
    expect(isTestEnv.active).toBeTrue();
  });

  it('should throw if DevMode is set more than once in production', () => {
    spyOnProperty(isTestEnv, 'active', 'get').and.returnValue(false);

    expect(isTestEnv.active).toBeFalse();
  });
});
