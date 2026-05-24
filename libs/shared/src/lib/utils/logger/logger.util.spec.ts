import {
  setVaultLogLevel,
  vaultDebug,
  vaultError,
  vaultLog,
  vaultWarn
} from './logger.util';

describe('Util: vaultLog', () => {
  let consoleLogSpy: jasmine.Spy;
  let consoleWarnSpy: jasmine.Spy;
  let consoleErrorSpy: jasmine.Spy;
  let consoleDebugSpy: jasmine.Spy;

  beforeEach(() => {
    // fresh spies before each test
    consoleLogSpy = spyOn(console, 'log');
    consoleWarnSpy = spyOn(console, 'warn');
    consoleErrorSpy = spyOn(console, 'error');
    consoleDebugSpy = spyOn(console, 'debug');
  });

  describe('LogLevel: log enabled', () => {
    beforeEach(() => {
      setVaultLogLevel('debug');
    });

    afterEach(() => {
      // let any queued microtasks flush before next test
      return Promise.resolve();
    });

    it('should log ', async () => {
      vaultLog('message');
      await Promise.resolve();
      // no console, no queue scheduled
      expect(consoleLogSpy).toHaveBeenCalledTimes(1);
      expect(consoleWarnSpy).toHaveBeenCalledTimes(0);
      expect(consoleErrorSpy).toHaveBeenCalledTimes(0);
      expect(consoleDebugSpy).toHaveBeenCalledTimes(0);
    });

    it('should log a single message when enabled via logging flag', async () => {
      vaultLog('Hello', 'World');

      // Wait for microtask queue to flush
      await Promise.resolve();

      expect(consoleLogSpy).toHaveBeenCalledWith('[vault]', 'Hello', 'World');
      expect(consoleWarnSpy).toHaveBeenCalledTimes(0);
      expect(consoleErrorSpy).toHaveBeenCalledTimes(0);
      expect(consoleDebugSpy).toHaveBeenCalledTimes(0);
    });
  });

  describe('LogLevel: error enabled', () => {
    beforeEach(() => {
      setVaultLogLevel('error');
    });

    afterEach(() => {
      // let any queued microtasks flush before next test
      return Promise.resolve();
    });

    it('should log error', async () => {
      vaultError('error');
      vaultWarn('warn');
      vaultLog('log');
      vaultDebug('debug');
      await Promise.resolve();
      expect(consoleErrorSpy).toHaveBeenCalledWith('[vault]', 'error');
      expect(consoleWarnSpy).not.toHaveBeenCalled();
      expect(consoleLogSpy).not.toHaveBeenCalled();
      expect(consoleDebugSpy).not.toHaveBeenCalled();
    });
  });

  describe('LogLevel: warn enabled', () => {
    beforeEach(() => {
      // fresh spies before each test

      setVaultLogLevel('warn');
    });

    afterEach(() => {
      // let any queued microtasks flush before next test
      return Promise.resolve();
    });

    it('should debug and log', async () => {
      vaultError('error');
      vaultWarn('warn');
      vaultLog('log');
      vaultDebug('debug');
      await Promise.resolve();
      expect(consoleErrorSpy).toHaveBeenCalledWith('[vault]', 'error');
      expect(consoleWarnSpy).toHaveBeenCalledWith('[vault]', 'warn');
      expect(consoleLogSpy).not.toHaveBeenCalled();
      expect(consoleDebugSpy).not.toHaveBeenCalled();
    });
  });

  describe('LogLevel: log enabled', () => {
    beforeEach(() => {
      // fresh spies before each test

      setVaultLogLevel('log');
    });

    afterEach(() => {
      // let any queued microtasks flush before next test
      return Promise.resolve();
    });

    it('should debug and log', async () => {
      vaultError('error');
      vaultWarn('warn');
      vaultLog('log');
      vaultDebug('debug');
      await Promise.resolve();
      expect(consoleErrorSpy).toHaveBeenCalledWith('[vault]', 'error');
      expect(consoleWarnSpy).toHaveBeenCalledWith('[vault]', 'warn');
      expect(consoleLogSpy).toHaveBeenCalledWith('[vault]', 'log');
      expect(consoleDebugSpy).not.toHaveBeenCalled();
    });
  });

  describe('LogLevel: debug enabled', () => {
    beforeEach(() => {
      // fresh spies before each test

      setVaultLogLevel('debug');
    });

    afterEach(() => {
      // let any queued microtasks flush before next test
      return Promise.resolve();
    });

    it('should debug and log', async () => {
      vaultError('error');
      vaultWarn('warn');
      vaultLog('log');
      vaultDebug('debug');
      await Promise.resolve();
      expect(consoleErrorSpy).toHaveBeenCalledWith('[vault]', 'error');
      expect(consoleWarnSpy).toHaveBeenCalledWith('[vault]', 'warn');
      expect(consoleLogSpy).toHaveBeenCalledWith('[vault]', 'log');
      expect(consoleDebugSpy).toHaveBeenCalledWith('[vault]', 'debug');
    });
  });

  describe('Logging disabled - Explicit', () => {
    beforeEach(() => {
      // fresh spies before each test
      setVaultLogLevel('off');
    });

    afterEach(() => {
      // let any queued microtasks flush before next test
      return Promise.resolve();
    });

    it('should not log when both logging and devMode are false', async () => {
      vaultLog('message');
      await Promise.resolve();
      // no console, no queue scheduled
      expect(consoleLogSpy).toHaveBeenCalledTimes(0);
      expect(consoleWarnSpy).toHaveBeenCalledTimes(0);
      expect(consoleErrorSpy).toHaveBeenCalledTimes(0);
      expect(consoleDebugSpy).toHaveBeenCalledTimes(0);
    });
  });

  describe('Logging disabled - Implicit', () => {
    beforeEach(() => {
      // fresh spies before each test
      setVaultLogLevel(undefined as any);
    });

    afterEach(() => {
      // let any queued microtasks flush before next test
      return Promise.resolve();
    });

    it('should not log when both logging and devMode are false', async () => {
      vaultLog('message');
      await Promise.resolve();
      // no console, no queue scheduled
      expect(consoleLogSpy).toHaveBeenCalledTimes(0);
      expect(consoleWarnSpy).toHaveBeenCalledTimes(0);
      expect(consoleErrorSpy).toHaveBeenCalledTimes(0);
      expect(consoleDebugSpy).toHaveBeenCalledTimes(0);
    });
  });
});
