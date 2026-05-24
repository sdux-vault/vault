import { DevMode } from '@sdux-vault/shared';
import { initDevtoolsWidget } from './index';

describe('initDevtoolsWidget', () => {
  let addEventListenerSpy: any;
  beforeEach(() => {
    delete (window as any).sdux;

    // override readyState safely
    Object.defineProperty(document, 'readyState', {
      value: 'complete',
      configurable: true
    });

    addEventListenerSpy = spyOn(document, 'addEventListener').and.callThrough();
  });

  afterEach(() => {
    const elements = document.querySelectorAll('sdux-debug');
    elements.forEach((el) => el.remove());

    // Reset global state
    delete (window as any).sdux;
  });

  /* -----------------------------------------------------------
   * DEV MODE OFF
   * --------------------------------------------------------- */

  describe('when DevMode is inactive', () => {
    beforeEach(() => {
      spyOnProperty(DevMode, 'active', 'get').and.returnValue(false);
    });

    it('returns early when DevMode is inactive', () => {
      initDevtoolsWidget();

      expect(globalThis.sdux).toEqual(undefined);

      const el = document.querySelector('sdux-debug');
      expect(el).toBeNull();
    });
  });

  describe('when DevMode is active', () => {
    beforeEach(() => {
      spyOnProperty(DevMode, 'active', 'get').and.returnValue(true);
    });

    /* -----------------------------------------------------------
     * GLOBAL INIT
     * --------------------------------------------------------- */

    it('initializes global structure when missing', () => {
      initDevtoolsWidget();

      expect(globalThis.sdux).toEqual({
        debugWidget: {
          injected: true
        }
      });

      const el = document.querySelector('sdux-debug');
      expect(el).not.toBeNull();
    });

    /* -----------------------------------------------------------
     * ALREADY INJECTED
     * --------------------------------------------------------- */

    it('returns early when already injected', () => {
      globalThis.sdux = {
        debugWidget: {
          injected: true
        }
      };

      const preElement = document.querySelector('sdux-debug');
      expect(preElement).toBeNull();

      initDevtoolsWidget();

      const postElement = document.querySelector('sdux-debug');
      expect(postElement).toBeNull();
    });

    /* -----------------------------------------------------------
     * DOM LOADING STATE
     * --------------------------------------------------------- */

    it('registers DOMContentLoaded listener when document is loading', () => {
      // Override readyState safely
      Object.defineProperty(document, 'readyState', {
        value: 'loading',
        configurable: true
      });

      initDevtoolsWidget();

      expect(addEventListenerSpy).toHaveBeenCalledTimes(1);

      const args = addEventListenerSpy.calls.argsFor(0);

      expect(args[0]).toEqual('DOMContentLoaded');
      expect(typeof args[1]).toEqual('function');
      expect(args[2]).toEqual({ once: true });
    });

    /* -----------------------------------------------------------
     * DOM READY STATE
     * --------------------------------------------------------- */

    it('runs immediately when document is ready', () => {
      Object.defineProperty(document, 'readyState', {
        value: 'complete',
        configurable: true
      });

      initDevtoolsWidget();

      expect((window as any).sdux.debugWidget.injected).toEqual(true);
    });

    /* -----------------------------------------------------------
     * ENSURE SINGLE EXECUTION
     * --------------------------------------------------------- */

    it('does not inject twice on repeated calls', () => {
      Object.defineProperty(document, 'readyState', {
        value: 'complete',
        configurable: true
      });

      // clean DOM + state
      document.querySelectorAll('sdux-debug').forEach((el) => el.remove());
      delete (window as any).sdux;

      initDevtoolsWidget();
      initDevtoolsWidget();

      const elements = document.querySelectorAll('sdux-debug');
      expect(elements.length).toEqual(1);
    });
  });
});
