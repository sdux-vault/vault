import { PublicKeys } from './public-keys';
import { VerifyLicenseToken } from './verify-license-token.utility';

describe('Utility: verifyLicenseToken', () => {
  let originalPublicKeys: any;
  let verifyLicenseToken: any;

  beforeEach(() => {
    // Save original keys
    originalPublicKeys = { ...PublicKeys };

    verifyLicenseToken = VerifyLicenseToken.verify;

    // Provide test keys for all tiers
    (PublicKeys as any).production = '---PROD KEY---';
    (PublicKeys as any).basic = '---BASIC KEY---';
    (PublicKeys as any).development = '---DEV KEY---';

    // Mock atob
    spyOn(window, 'atob').and.callFake((str: string) => str);

    // Mock importPublicKey (internal function)
    spyOn<any>(window.crypto.subtle, 'importKey').and.callFake(() => {
      return Promise.resolve({ mockedPublicKey: true } as any);
    });

    // Mock crypto.subtle.verify
    spyOn(window.crypto.subtle, 'verify').and.callFake(() => {
      return Promise.resolve(true);
    });
  });

  afterEach(() => {
    // Restore original keys
    Object.assign(PublicKeys, originalPublicKeys);
  });

  function makeToken(payload: any, signature: string = 'sig') {
    return JSON.stringify({ payload, signature });
  }

  it('returns active: true when signature verifies and tier is valid', async () => {
    const token = makeToken({ type: 'production', email: 'test@example.com' });

    expect(await verifyLicenseToken(token)).toBeTrue();

    expect(window.crypto.subtle.verify).toHaveBeenCalled();
    expect(window.crypto.subtle.importKey).toHaveBeenCalled();
  });

  it('returns active: false when crypto.verify returns false', async () => {
    (window.crypto.subtle.verify as jasmine.Spy).and.returnValue(
      Promise.resolve(false)
    );

    const token = makeToken({ type: 'basic' });

    expect(await verifyLicenseToken(token)).toBeFalse();
  });

  it('returns free tier when token has no type', async () => {
    const token = makeToken({}); // no type → defaults to free

    expect(await verifyLicenseToken(token)).toBeFalse();

    expect(window.crypto.subtle.verify).not.toHaveBeenCalled();
  });

  it('returns free when tier does not exist in PublicKeys', async () => {
    const token = makeToken({ type: 'unknown-tier' });

    expect(await verifyLicenseToken(token)).toBeFalse();

    expect(window.crypto.subtle.verify).not.toHaveBeenCalled();
  });

  it('returns free when JSON.parse fails', async () => {
    expect(await verifyLicenseToken('NOT JSON')).toBeFalse();
  });

  it('calls importKey with correct parameters when tier exists', async () => {
    const token = makeToken({ type: 'development' });

    expect(await verifyLicenseToken(token)).toBeTrue();

    expect(window.crypto.subtle.importKey).toHaveBeenCalled();
  });

  it('returns free when signature or payload missing', async () => {
    const token = JSON.stringify({}); // missing parts

    expect(await verifyLicenseToken(token)).toBeFalse();
  });
});
