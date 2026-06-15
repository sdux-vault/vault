import { buildChromeMock, loadScript } from './chrome-mock.mjs';

describe('Chrome Extension: devtools.js', () => {
  let chrome;

  beforeEach(() => {
    chrome = buildChromeMock();
    globalThis.chrome = chrome;
  });

  afterEach(() => {
    delete globalThis.chrome;
  });

  it('should create the Vault panel', () => {
    loadScript('devtools/devtools.js');

    expect(chrome.devtools.panels.create).toHaveBeenCalledWith(
      'SDuX Vault',
      '../icons/brand-128.png',
      'panel/panel.html'
    );
  });

  it('should only create one panel per load', () => {
    loadScript('devtools/devtools.js');

    expect(chrome.devtools.panels.create).toHaveBeenCalledTimes(1);
  });
});
