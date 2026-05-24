import { resetDebugEngineForTesting } from '../widget/debug-widget.engine';
import { DebugWidget } from './debug-widget';
import { injectDebugWidget } from './debug-widget.inject';

describe('Widget: injectDebug', () => {
  let defineSpy: jasmine.Spy;

  beforeEach(() => {
    document.querySelectorAll('sdux-debug').forEach((el) => el.remove());

    defineSpy = spyOn(customElements, 'define');
  });

  afterEach(() => {
    resetDebugEngineForTesting();
    document.querySelectorAll('sdux-debug').forEach((el) => el.remove());
  });

  it('should define custom element and append it if not registered', () => {
    injectDebugWidget();

    expect(defineSpy).toHaveBeenCalledWith('sdux-debug', DebugWidget);
  });

  it('should only define once per call when not registered', () => {
    injectDebugWidget();

    expect(defineSpy.calls.count()).toBe(1);
  });

  it('should append a debug element to the DOM', () => {
    injectDebugWidget();

    const el = document.querySelector('sdux-debug');

    expect(el).not.toBeNull();
  });

  it('should not append multiple elements on repeated calls', () => {
    injectDebugWidget();
    injectDebugWidget();

    const elements = document.querySelectorAll('sdux-debug');

    expect(elements.length).toEqual(1);
  });

  it('should define and append element if not registered', () => {
    const getSpy = spyOn(customElements, 'get').and.callFake((name: string) => {
      if (name === 'sdux-debug') return undefined;
      return customElements.get(name);
    });

    injectDebugWidget();

    expect(getSpy).toHaveBeenCalledWith('sdux-debug');
    expect(defineSpy).toHaveBeenCalledWith('sdux-debug', DebugWidget);

    const el = document.querySelector('sdux-debug');
    expect(el).not.toBeNull();
  });
});
