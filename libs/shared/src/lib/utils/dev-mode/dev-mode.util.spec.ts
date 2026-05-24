import { DevMode } from './dev-mode.util';
import { isTestEnv } from './testing-environment.util';

describe('Util: DevMode', () => {
  describe('setDevMode', () => {
    it('should allow DevMode to be set once', () => {
      DevMode.setDevMode(true);
      DevMode.setDevMode(false);
      expect(DevMode.active).toBeFalse();
    });

    it('should throw if DevMode is set more than once in production', () => {
      spyOnProperty(isTestEnv, 'active', 'get').and.returnValue(false);

      expect(() => DevMode.setDevMode(false)).toThrowError(
        '[vault] DevMode has already been initialized.'
      );
    });
  });
});
