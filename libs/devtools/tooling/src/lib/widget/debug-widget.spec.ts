import { DevMode } from '@sdux-vault/shared';
import { EventBus } from '../utils/event-bus';
import { resetDebugEngineForTesting } from '../widget/debug-widget.engine';
import { DebugWidget } from './debug-widget';

describe('DebugWidget', () => {
  let widget: DebugWidget;
  let infoSpy: any;

  beforeAll(() => {
    if (!customElements.get('debug-widget')) {
      customElements.define('debug-widget', DebugWidget);
    }
  });

  beforeEach(() => {
    spyOn(window, 'open');
    spyOnProperty(DevMode, 'active', 'get').and.returnValue(true);

    infoSpy = spyOn(console, 'info'); // <-- make it a spy
    localStorage.removeItem('sdux-debug-state'); // <-- important: prevents minimized render

    widget = document.createElement('debug-widget') as unknown as DebugWidget;
    document.body.appendChild(widget);
  });

  afterEach(() => {
    widget.remove();
    resetDebugEngineForTesting();

    if (globalThis.sdux?.debugWidget) {
      globalThis.sdux.debugWidget.aiAssistEnabled = false;
    }
  });

  it('should safely return if shadowRoot is missing', () => {
    const widget = new DebugWidget();

    // call private method directly
    (widget as any).render();

    expect(widget.shadowRoot).toBeNull();
  });

  // ------------------------------------------------
  // Render
  // ------------------------------------------------

  it('should render debugger UI', () => {
    expect(widget.shadowRoot).toBeTruthy();
    expect(widget.shadowRoot!.innerHTML).toContain('SDuX DEBUGGER');
  });

  // ------------------------------------------------
  // Minimize
  // ------------------------------------------------

  it('should start minimized', () => {
    expect(widget.shadowRoot!.innerHTML).toContain('SDuX DEBUGGER');
    expect(widget.shadowRoot!.innerHTML).not.toContain('Record');
    expect(widget.style.position).toBe('fixed');
    expect(widget.style.bottom).toBe('');
    expect(widget.style.top).toBe('80px');
    expect(widget.style.right).toBe('20px');
    expect(widget.style.left).toBe('');
    expect(widget.style.zIndex).toBe('999999');

    const updated = widget.shadowRoot!.getElementById('minimize')!;
    expect(updated.textContent).toContain('▢');
  });

  describe('Maximized', () => {
    beforeEach(() => {
      const btn = widget.shadowRoot!.getElementById('minimize')!;
      btn.click();
    });

    // ------------------------------------------------
    // Download logs
    // ------------------------------------------------
    it('should trigger log download', () => {
      spyOn(URL, 'createObjectURL').and.returnValue('blob:test');

      const bus = EventBus();

      const recordBtn = widget.shadowRoot!.getElementById('recordToggle')!;
      recordBtn.click(); // start recording

      // send real pipeline event
      bus.nextPipeline({
        type: 'test-event',
        traceId: 'download'
      } as any);

      recordBtn.click(); // stop recording

      const downloadBtn = widget.shadowRoot!.getElementById('export')!;
      expect((downloadBtn as HTMLButtonElement).disabled).toBeFalse();

      downloadBtn.click();

      const downloadTraceBtn =
        widget.shadowRoot!.getElementById('downloadTrace')!;
      expect((downloadTraceBtn as HTMLButtonElement).disabled).toBeFalse();

      downloadTraceBtn.click();

      expect(URL.createObjectURL).toHaveBeenCalled();

      const downloadTrace1000Btn =
        widget.shadowRoot!.getElementById('downloadTrace1000')!;
      expect((downloadTrace1000Btn as HTMLButtonElement).disabled).toBeFalse();

      downloadTrace1000Btn.click();

      expect(URL.createObjectURL).toHaveBeenCalled();
    });

    it('should trigger log download', () => {
      spyOn(URL, 'createObjectURL').and.returnValue('blob:test');

      const recorder = (widget as any).recorder;
      spyOn(recorder, 'getEvents').and.returnValue([{}] as any); // <- makes hasEvents true
      spyOn(recorder, 'getErrorCount').and.returnValue(0);

      // sync the DOM disabled/enabled state
      (widget as any).updateButtonState();

      const downloadBtn = widget.shadowRoot!.getElementById(
        'export'
      ) as HTMLButtonElement;
      expect(downloadBtn.disabled).toBeFalse();

      downloadBtn.click();

      const downloadDumpBtn =
        widget.shadowRoot!.getElementById('downloadDump')!;
      expect((downloadDumpBtn as HTMLButtonElement).disabled).toBeFalse();

      downloadDumpBtn.click();

      expect(URL.createObjectURL).toHaveBeenCalled();
    });

    // ------------------------------------------------
    // AI assist file
    // ------------------------------------------------

    it('should download AI assist file', () => {
      spyOn(URL, 'createObjectURL').and.returnValue('blob:test');

      globalThis.sdux ??= {};
      globalThis.sdux.debugWidget ??= {};
      globalThis.sdux.debugWidget.aiAssistEnabled = true;

      const recorder = (widget as any).recorder;
      spyOn(recorder, 'getEvents').and.returnValue([{}] as any);

      (widget as any).updateButtonState();

      const btn = widget.shadowRoot!.getElementById(
        'aiAssist'
      ) as HTMLButtonElement;
      expect(btn).not.toBeNull();
      expect(btn.disabled)
        .withContext(
          'AI Assist should be enabled when events exist and license is valid'
        )
        .toBeFalse();

      btn.click();

      expect(URL.createObjectURL).toHaveBeenCalled();
    });

    it('should disable AI assist button when license is not resolved', () => {
      globalThis.sdux ??= {};
      globalThis.sdux.debugWidget ??= {};
      globalThis.sdux.debugWidget.aiAssistEnabled = false;

      const recorder = (widget as any).recorder;
      spyOn(recorder, 'getEvents').and.returnValue([{}] as any);

      (widget as any).updateButtonState();

      const btn = widget.shadowRoot!.getElementById(
        'aiAssist'
      ) as HTMLButtonElement;
      expect(btn).not.toBeNull();
      expect(btn.disabled)
        .withContext('AI Assist should be disabled without a valid license')
        .toBeTrue();
    });

    it('should enable AI assist button when sdux-license-resolved event fires', () => {
      globalThis.sdux ??= {};
      globalThis.sdux.debugWidget ??= {};
      globalThis.sdux.debugWidget.aiAssistEnabled = false;

      const recorder = (widget as any).recorder;
      spyOn(recorder, 'getEvents').and.returnValue([{}] as any);

      (widget as any).updateButtonState();

      const btn = widget.shadowRoot!.getElementById(
        'aiAssist'
      ) as HTMLButtonElement;
      expect(btn.disabled).toBeTrue();

      globalThis.sdux.debugWidget.aiAssistEnabled = true;
      document.dispatchEvent(new CustomEvent('sdux-license-resolved'));

      expect(btn.disabled)
        .withContext('AI Assist should be enabled after license resolved event')
        .toBeFalse();
    });

    // ------------------------------------------------
    // Issue creation
    // ------------------------------------------------

    it('should open GitHub issue', () => {
      const clickSpy = jasmine.createSpy('click');

      spyOn(document, 'createElement').and.callFake((): any => ({
        href: '',
        download: '',
        click: clickSpy
      }));

      spyOn(document.body, 'appendChild').and.callFake((): any => {});
      spyOn(document.body, 'removeChild').and.callFake((): any => {});

      spyOn(URL, 'createObjectURL').and.returnValue('blob:test');
      spyOn(URL, 'revokeObjectURL');

      const recorder = (widget as any).recorder;
      spyOn(recorder, 'getEvents').and.returnValue([{}] as any);

      (widget as any).updateButtonState();

      const btn = widget.shadowRoot!.getElementById(
        'createIssue'
      ) as HTMLButtonElement;

      expect(btn).not.toBeNull();
      expect(btn.disabled).toBeFalse();

      btn.click();

      expect(clickSpy).toHaveBeenCalled();
      expect(infoSpy).toHaveBeenCalledWith(
        '[SDUX] Issue dump generated and redirected'
      );
      expect(window.open).toHaveBeenCalled();
    });

    // ------------------------------------------------
    // Clear events
    // ------------------------------------------------
    it('should clear events when confirmed', () => {
      spyOn(window, 'confirm').and.returnValue(true);

      const recorder = (widget as any).recorder;

      // Make widget think it has events
      spyOn(recorder, 'getEvents').and.returnValue([{}] as any);
      spyOn(recorder, 'getErrorCount').and.returnValue(0);

      const clearSpy = spyOn(recorder, 'clear').and.callThrough();

      // IMPORTANT: re-sync disabled/enabled state after changing getEvents()
      (widget as any).updateButtonState();

      const btn = widget.shadowRoot!.getElementById(
        'clear'
      ) as HTMLButtonElement;
      expect(btn.disabled)
        .withContext('clear button should be enabled when events exist')
        .toBeFalse();

      btn.click();

      expect(clearSpy).toHaveBeenCalled();

      // If you want to assert logging:
      // Make sure you created infoSpy somewhere (usually in beforeEach)
      expect(infoSpy).toHaveBeenCalledWith('[SDUX] Events cleared');
    });

    it('should not clear when cancelled', () => {
      spyOn(window, 'confirm').and.returnValue(false);

      const btn = widget.shadowRoot!.getElementById('clear')!;

      btn.click();

      expect(infoSpy).not.toHaveBeenCalledWith('[SDUX] Events cleared');
    });

    // ------------------------------------------------
    // Close
    // ------------------------------------------------

    it('should remove widget when closed', () => {
      spyOn(widget, 'remove');

      const btn = widget.shadowRoot!.getElementById('close')!;

      btn.click();

      expect(widget.remove).toHaveBeenCalled();
    });

    // ------------------------------------------------
    // Help
    // ------------------------------------------------

    it('should open help page', () => {
      // If the widget is minimized (from persisted state), expand it first.
      const ensureHelpButton = () => {
        let help = widget.shadowRoot?.getElementById(
          'help'
        ) as HTMLButtonElement | null;
        if (help) return help;

        const minimizeBtn = widget.shadowRoot?.getElementById(
          'minimize'
        ) as HTMLButtonElement | null;
        expect(minimizeBtn)
          .withContext('minimize button should exist')
          .not.toBeNull();

        // Toggle once to expand (minimized -> expanded) which re-renders.
        minimizeBtn!.click();

        help = widget.shadowRoot?.getElementById(
          'help'
        ) as HTMLButtonElement | null;
        expect(help)
          .withContext('help button should exist after expanding')
          .not.toBeNull();

        return help!;
      };

      const btn = ensureHelpButton();
      btn.click();

      expect(window.open).toHaveBeenCalled();
    });
    // ------------------------------------------------
    // Dragging
    // ------------------------------------------------

    it('should drag widget', () => {
      const panel = widget.shadowRoot!.getElementById('panel')!;

      panel.dispatchEvent(
        new PointerEvent('pointerdown', {
          clientX: 100,
          clientY: 100
        })
      );

      document.dispatchEvent(
        new PointerEvent('pointermove', {
          clientX: 200,
          clientY: 200
        })
      );

      expect(widget.style.left).toBeDefined();
      expect(widget.style.top).toBeDefined();
    });

    it('should stop drag on pointerup', () => {
      const panel = widget.shadowRoot!.getElementById('panel')!;

      panel.dispatchEvent(
        new PointerEvent('pointerdown', {
          clientX: 10,
          clientY: 10
        })
      );

      document.dispatchEvent(new PointerEvent('pointerup'));

      const prev = widget.style.left;

      document.dispatchEvent(
        new PointerEvent('pointermove', {
          clientX: 300,
          clientY: 300
        })
      );

      expect(widget.style.left).toBe(prev);
    });

    describe('DebugWidget persisted state restoration', () => {
      it('should restore position when left and top exist', () => {
        localStorage.setItem(
          'sdux-debug-state',
          JSON.stringify({
            left: '120px',
            top: '80px',
            minimized: false
          })
        );

        widget = document.createElement(
          'debug-widget'
        ) as unknown as DebugWidget;
        document.body.appendChild(widget);

        expect(widget.style.left).toBe('120px');
        expect(widget.style.top).toBe('80px');
        expect(widget.style.right).toBe('auto');
      });

      it('should set minimized state from storage', () => {
        localStorage.setItem(
          'sdux-debug-state',
          JSON.stringify({
            minimized: true
          })
        );

        widget = document.createElement(
          'debug-widget'
        ) as unknown as DebugWidget;
        document.body.appendChild(widget);

        // minimized UI removes the controls section
        expect(widget.shadowRoot!.innerHTML).not.toContain('Record');
      });

      it('should ignore left/top if missing', () => {
        localStorage.setItem(
          'sdux-debug-state',
          JSON.stringify({
            minimized: false
          })
        );

        widget = document.createElement(
          'debug-widget'
        ) as unknown as DebugWidget;
        document.body.appendChild(widget);

        // defaults should remain
        expect(widget.style.left).toBe('');
        expect(widget.style.bottom).toBe('');
        expect(widget.style.top).toBe('80px');
        expect(widget.style.right).toBe('20px');
      });

      it('should ignore corrupted storage', () => {
        localStorage.setItem('sdux-debug-state', 'not-valid-json');

        widget = document.createElement(
          'debug-widget'
        ) as unknown as DebugWidget;
        document.body.appendChild(widget);

        // widget should still render normally
        expect(widget.shadowRoot).toBeTruthy();
        expect(widget.shadowRoot!.innerHTML).toContain('SDuX DEBUGGER');
      });

      it('should safely handle empty storage', () => {
        localStorage.removeItem('sdux-debug-state');

        widget = document.createElement(
          'debug-widget'
        ) as unknown as DebugWidget;
        document.body.appendChild(widget);

        expect(widget.shadowRoot).toBeTruthy();
        expect(widget.style.left).toBe('');
        expect(widget.style.bottom).toBe('');
        expect(widget.style.top).toBe('80px');
        expect(widget.style.right).toBe('20px');
      });
    });

    describe('DebugWidget recording render states', () => {
      it('should call start then stop via recordToggle', () => {
        const startSpy = spyOn(widget as any, 'start').and.callThrough();
        const stopSpy = spyOn(widget as any, 'stop').and.callThrough();

        const btn = widget.shadowRoot!.getElementById(
          'recordToggle'
        ) as HTMLButtonElement;

        // first click → start()
        btn.click();
        expect(startSpy).toHaveBeenCalled();

        // second click → stop()
        btn.click();
        expect(stopSpy).toHaveBeenCalled();
      });

      it('should render record state when not recording', () => {
        const btn = widget.shadowRoot!.getElementById('recordToggle')!;

        expect(btn.textContent).toContain('Record');
        expect(widget.shadowRoot!.querySelector('.record-dot')).toBeNull();
      });

      it('should render recording indicators when recording starts', () => {
        const btn = widget.shadowRoot!.getElementById('recordToggle')!;

        btn.click(); // start recording

        expect(widget.shadowRoot!.querySelector('.record-dot')).not.toBeNull();

        const timer = widget.shadowRoot!.getElementById('sessionTimer')!;
        expect(timer.textContent).not.toBe('');
        expect(btn.textContent).toContain('Stop');
      });

      it('should not start again if already recording', () => {
        (widget as any).recording = true;

        const recorder = (widget as any).recorder;
        const startSpy = spyOn(recorder, 'start');

        (widget as any).start();

        expect(startSpy).not.toHaveBeenCalled();
      });

      it('should resume from pause state', () => {
        const now = Date.now();

        (widget as any).pauseStart = now - 1000;
        (widget as any).pausedDuration = 0;

        (widget as any).start();

        expect((widget as any).pauseStart).toBeNull();
        expect((widget as any).pausedDuration).toBeGreaterThan(0);
      });

      it('should not reset sessionStartTime if already set', () => {
        (widget as any).sessionStartTime = 12345;

        (widget as any).start();

        expect((widget as any).sessionStartTime).toBe(12345);
      });

      it('should safely handle missing timer element', () => {
        const timer = widget.shadowRoot!.getElementById('sessionTimer');
        timer?.remove();

        (widget as any).start();

        expect((widget as any).recording).toBeTrue();
      });

      it('should update session timer from interval callback', () => {
        let intervalCallback: any;

        spyOn(window, 'setInterval').and.callFake(((
          cb: any,
          ..._args: any[]
        ) => {
          intervalCallback = cb;
          return 123 as any;
        }) as any);

        const timer = widget.shadowRoot!.getElementById('sessionTimer')!;
        spyOn(widget as any, 'getSessionTime').and.returnValue('0:01');

        (widget as any).start();

        // simulate interval tick
        intervalCallback!();

        expect(timer.textContent).toBe('0:01');
      });

      it('should update event and button state when recorder emits', () => {
        const recorder = (widget as any).recorder;

        let callback: any;

        spyOn(recorder, 'start').and.callFake((cb: any) => {
          callback = cb;
        });

        const updateEventSpy = spyOn(widget as any, 'updateEventCount');
        const updateButtonSpy = spyOn(widget as any, 'updateButtonState');

        (widget as any).start();

        // simulate recorder event
        callback!();

        expect(updateEventSpy).toHaveBeenCalled();
        expect(updateButtonSpy).toHaveBeenCalled();
      });
    });

    describe('DebugWidget minimized render state', () => {
      beforeEach(() => {
        localStorage.setItem(
          'sdux-debug-state',
          JSON.stringify({
            minimized: true
          })
        );

        widget = document.createElement(
          'debug-widget'
        ) as unknown as DebugWidget;
        document.body.appendChild(widget);
      });

      it('should hide controls when minimized', () => {
        expect(widget.shadowRoot!.querySelector('.controls')).toBeNull();
        expect(widget.shadowRoot!.querySelector('.export-row')).toBeNull();
      });

      it('should render controls when expanded again', () => {
        const minimizeBtn = widget.shadowRoot!.getElementById('minimize')!;
        minimizeBtn.click();

        expect(widget.shadowRoot!.querySelector('.controls')).not.toBeNull();
        expect(widget.shadowRoot!.querySelector('.export-row')).not.toBeNull();
      });
    });

    describe('DebugWidget minimize button state', () => {
      beforeEach(() => {
        localStorage.removeItem('sdux-debug-state');

        widget = document.createElement(
          'debug-widget'
        ) as unknown as DebugWidget;
        document.body.appendChild(widget);
      });

      it('should show "_" when expanded', () => {
        const btn = widget.shadowRoot!.getElementById('minimize')!;
        expect(btn.textContent).toContain('▢');
      });

      it('should show "▢" when minimized', () => {
        const btn = widget.shadowRoot!.getElementById('minimize')!;
        btn.click();

        const updated = widget.shadowRoot!.getElementById('minimize')!;
        expect(updated.textContent).toContain('_');
      });
    });

    describe('DebugWidget render template branches', () => {
      it('should render recording template branches', () => {
        widget = document.createElement(
          'debug-widget'
        ) as unknown as DebugWidget;
        document.body.appendChild(widget);

        // force recording state
        (widget as any).recording = true;

        // force template re-render
        (widget as any).render();

        expect(widget.shadowRoot!.querySelector('.record-dot')).not.toBeNull();

        const btn = widget.shadowRoot!.getElementById('recordToggle')!;
        expect(btn.textContent).toContain('Stop');

        const timer = widget.shadowRoot!.getElementById('sessionTimer')!;
        expect(timer.textContent).not.toBe('');
      });

      it('should render non-recording template branches', () => {
        widget = document.createElement(
          'debug-widget'
        ) as unknown as DebugWidget;
        document.body.appendChild(widget);

        (widget as any).recording = false;
        (widget as any).render();

        expect(widget.shadowRoot!.querySelector('.record-dot')).toBeNull();

        const btn = widget.shadowRoot!.getElementById('recordToggle')!;
        expect(btn.textContent).toContain('Record');
      });
    });

    describe('DebugWidget stop logic', () => {
      it('should early return if not recording', () => {
        (widget as any).recording = false;

        const recorder = (widget as any).recorder;
        const stopSpy = spyOn(recorder, 'stop');

        (widget as any).stop();

        expect(stopSpy).not.toHaveBeenCalled();
      });

      it('should stop recording and clear timer interval', () => {
        const recorder = (widget as any).recorder;

        spyOn(recorder, 'stop');

        const clearSpy = spyOn(window, 'clearInterval');

        (widget as any).recording = true;
        (widget as any).timerInterval = 123;

        (widget as any).stop();

        expect(recorder.stop).toHaveBeenCalled();
        expect(clearSpy).toHaveBeenCalledWith(123);
        expect((widget as any).timerInterval).toBeNull();
        expect((widget as any).recording).toBeFalse();
      });

      it('should stop recording when no timer interval exists', () => {
        const recorder = (widget as any).recorder;

        spyOn(recorder, 'stop');

        (widget as any).recording = true;
        (widget as any).timerInterval = null;

        (widget as any).stop();

        expect(recorder.stop).toHaveBeenCalled();
        expect((widget as any).recording).toBeFalse();
      });
    });

    describe('DebugWidget updateEventCount logic', () => {
      let recorder: any;

      beforeEach(() => {
        recorder = (widget as any).recorder;
      });

      it('should update total and error counts', () => {
        spyOn(recorder, 'getEvents').and.returnValue([{}, {}]);
        spyOn(recorder, 'getErrorCount').and.returnValue(1);

        (widget as any).updateEventCount();

        const total = widget.shadowRoot!.getElementById('eventCount')!;
        const errors = widget.shadowRoot!.getElementById('eventErrorCount')!;

        expect(total.textContent).toBe('2');
        expect(errors.textContent).toBe('1');
      });

      it('should pulse error indicator when errors increase', () => {
        spyOn(recorder, 'getEvents').and.returnValue([{}]);
        spyOn(recorder, 'getErrorCount').and.returnValue(2);

        const errorEl = widget.shadowRoot!.getElementById('eventErrorCount')!;
        errorEl.textContent = '1'; // prev = 1

        (widget as any).updateEventCount();

        expect(errorEl.classList.contains('bump')).toBeTrue();
        expect(errorEl.textContent).toBe('2');
      });

      it('should not pulse when error count does not increase', () => {
        spyOn(recorder, 'getEvents').and.returnValue([{}]);
        spyOn(recorder, 'getErrorCount').and.returnValue(1);

        const errorEl = widget.shadowRoot!.getElementById('eventErrorCount')!;
        errorEl.textContent = '2'; // prev > current

        (widget as any).updateEventCount();

        expect(errorEl.classList.contains('bump')).toBeFalse();
        expect(errorEl.textContent).toBe('1');
      });

      it('should default prev error count to 0 when empty', () => {
        spyOn(recorder, 'getEvents').and.returnValue([{}]);
        spyOn(recorder, 'getErrorCount').and.returnValue(1);

        const errorEl = widget.shadowRoot!.getElementById('eventErrorCount')!;
        errorEl.textContent = ''; // triggers ?? '0'

        (widget as any).updateEventCount();

        expect(errorEl.textContent).toBe('1');
      });

      it('should fallback to 0 when error textContent is null', () => {
        const recorder = (widget as any).recorder;

        spyOn(recorder, 'getEvents').and.returnValue([{}]);
        spyOn(recorder, 'getErrorCount').and.returnValue(1);

        const errorEl = widget.shadowRoot!.getElementById('eventErrorCount')!;

        (errorEl as any).textContent = undefined;

        (widget as any).updateEventCount();

        expect(errorEl.textContent).toBe('1');
      });
    });

    describe('DebugWidget export menu outside click behavior', () => {
      let exportBtn: HTMLButtonElement;
      let exportMenu: HTMLElement;

      beforeEach(() => {
        const recorder = (widget as any).recorder;

        spyOn(recorder, 'getEvents').and.returnValue([{}] as any);
        spyOn(recorder, 'getErrorCount').and.returnValue(0);

        (widget as any).updateButtonState();

        exportBtn = widget.shadowRoot!.getElementById(
          'export'
        ) as HTMLButtonElement;
        exportMenu = widget.shadowRoot!.getElementById(
          'exportMenu'
        ) as HTMLElement;

        exportBtn.click(); // open menu
      });

      it('should close export menu when clicking outside', () => {
        expect(exportMenu.classList.contains('open')).toBeTrue();

        const event = new PointerEvent('pointerdown');

        spyOn(event, 'composedPath').and.returnValue([]);

        document.dispatchEvent(event);

        expect(exportMenu.classList.contains('open')).toBeFalse();
        expect((widget as any).exportMenuOpen).toBeFalse();
      });

      it('should NOT close export menu when clicking inside menu', () => {
        expect(exportMenu.classList.contains('open')).toBeTrue();

        const event = new PointerEvent('pointerdown');

        spyOn(event, 'composedPath').and.returnValue([exportMenu]);

        document.dispatchEvent(event);

        expect(exportMenu.classList.contains('open')).toBeTrue();
        expect((widget as any).exportMenuOpen).toBeTrue();
      });

      it('should do nothing when export menu is not open', () => {
        exportBtn.click(); // closes it

        expect((widget as any).exportMenuOpen).toBeFalse();

        const event = new PointerEvent('pointerdown');
        spyOn(event, 'composedPath').and.returnValue([]);

        document.dispatchEvent(event);

        expect(exportMenu.classList.contains('open')).toBeFalse();
      });
    });

    describe('DebugWidget clear edge cases', () => {
      it('should early return when there are no events', () => {
        const recorder = (widget as any).recorder;

        spyOn(recorder, 'getEvents').and.returnValue([]);
        const clearSpy = spyOn(recorder, 'clear');

        (widget as any).clear();

        expect(clearSpy).not.toHaveBeenCalled();
        expect(infoSpy).not.toHaveBeenCalled();
      });

      it('should handle missing timer element safely', () => {
        spyOn(window, 'confirm').and.returnValue(true);

        const recorder = (widget as any).recorder;

        spyOn(recorder, 'getEvents').and.returnValue([{}]);
        spyOn(recorder, 'getErrorCount').and.returnValue(0);
        spyOn(recorder, 'clear');

        const timer = widget.shadowRoot!.getElementById('sessionTimer');
        timer?.remove(); // forces the branch

        (widget as any).clear();

        expect(recorder.clear).toHaveBeenCalled();
        expect(infoSpy).toHaveBeenCalledWith('[SDUX] Events cleared');
      });

      it('should early return if confirm dialog is dismissed', () => {
        const recorder = (widget as any).recorder;

        // Ensure events exist so we reach confirm()
        spyOn(recorder, 'getEvents').and.returnValue([{}]);

        // Simulate browser cancel without spying
        const originalConfirm = window.confirm;
        (window as any).confirm = () => false;

        const clearSpy = spyOn(recorder, 'clear');

        (widget as any).clear();

        expect(clearSpy).not.toHaveBeenCalled();
        expect(infoSpy).not.toHaveBeenCalledWith('[SDUX] Events cleared');

        window.confirm = originalConfirm;
      });
    });
  });

  // ------------------------------------------------
  // disconnectedCallback
  // ------------------------------------------------

  describe('disconnectedCallback', () => {
    it('should stop the recorder when removed from the DOM', () => {
      const recorder = (widget as any).recorder;
      const stopSpy = spyOn(recorder, 'stop');

      widget.remove();

      expect(stopSpy).toHaveBeenCalled();
    });

    it('should clear the timer interval when removed during recording', () => {
      const btn = widget.shadowRoot!.getElementById('minimize')!;
      btn.click();

      const recordBtn = widget.shadowRoot!.getElementById('recordToggle')!;
      recordBtn.click();

      expect((widget as any).timerInterval).not.toBeNull();

      widget.remove();

      expect((widget as any).timerInterval).toBeNull();
      expect((widget as any).recording).toBe(false);
    });

    it('should remove document-level pointermove and pointerup listeners', () => {
      widget.remove();

      // AbortController.abort() causes the browser to remove listeners internally.
      // Verify the abort signal is triggered by checking the controller state.
      expect((widget as any).abortController.signal.aborted).toBe(true);
    });
  });
});
