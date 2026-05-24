import { Vault } from './vault'; // adjust import

describe('Factory: Vault', () => {
  it('should not throw', async () => {
    expect(() => Vault()).not.toThrow();
  });
});
