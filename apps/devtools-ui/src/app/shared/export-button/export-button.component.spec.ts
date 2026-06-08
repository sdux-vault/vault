import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExportButtonComponent } from './export-button.component';

describe('Component: ExportButton', () => {
  let fixture: ComponentFixture<ExportButtonComponent>;
  let component: ExportButtonComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExportButtonComponent],
      providers: [provideZonelessChangeDetection()]
    }).compileComponents();

    fixture = TestBed.createComponent(ExportButtonComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('data', [{ id: 1 }]);
    fixture.componentRef.setInput('filename', 'test-export');
    fixture.detectChanges();
  });

  it('should render a download button', () => {
    const btn = fixture.nativeElement.querySelector('button');
    expect(btn).toBeTruthy();
  });

  it('should use the label input for aria-label', () => {
    fixture.componentRef.setInput('label', 'Download all');
    fixture.detectChanges();
    const btn = fixture.nativeElement.querySelector('button');
    expect(btn.getAttribute('aria-label')).toBe('Download all');
  });

  it('should default label to "Download"', () => {
    const btn = fixture.nativeElement.querySelector('button');
    expect(btn.getAttribute('aria-label')).toBe('Download');
  });

  it('should stop propagation on click', () => {
    const event = new MouseEvent('click');
    spyOn(event, 'stopPropagation');
    spyOn(URL, 'createObjectURL').and.returnValue('blob:mock');
    spyOn(URL, 'revokeObjectURL');

    component.download(event);

    expect(event.stopPropagation).toHaveBeenCalled();
  });

  it('should create a blob and trigger download', () => {
    const createSpy = spyOn(URL, 'createObjectURL').and.returnValue(
      'blob:mock'
    );
    const revokeSpy = spyOn(URL, 'revokeObjectURL');

    let downloadName = '';
    spyOn(document, 'createElement').and.callFake((tag: string) => {
      if (tag === 'a') {
        const anchor = {
          href: '',
          download: '',
          click: jasmine.createSpy('click')
        };
        Object.defineProperty(anchor, 'download', {
          set(val: string) {
            downloadName = val;
          },
          get() {
            return downloadName;
          }
        });
        return anchor as any;
      }
      return document.createElement(tag);
    });

    component.download(new MouseEvent('click'));

    expect(createSpy).toHaveBeenCalledWith(jasmine.any(Blob));
    expect(downloadName).toMatch(/^sdux-test-export-\d+\.json$/);
    expect(revokeSpy).toHaveBeenCalledWith('blob:mock');
  });

  describe('normalizePayload', () => {
    let blobContent: string;

    beforeEach(() => {
      blobContent = '';
      spyOn(URL, 'createObjectURL').and.returnValue('blob:mock');
      spyOn(URL, 'revokeObjectURL');
      spyOn(document, 'createElement').and.callFake((tag: string) => {
        if (tag === 'a') {
          return { href: '', download: '', click: () => {} } as any;
        }
        return document.createElement(tag);
      });
      const originalStringify = JSON.stringify;
      spyOn(JSON, 'stringify').and.callFake((...args: any[]) => {
        const result = originalStringify.apply(JSON, args as [any, any?, any?]);
        blobContent = result;
        return result;
      });
    });

    it('should pass through empty arrays unchanged', () => {
      fixture.componentRef.setInput('data', []);
      fixture.detectChanges();

      component.download(new MouseEvent('click'));

      expect(JSON.parse(blobContent)).toEqual([]);
    });

    it('should pass through trace-shaped data unchanged', () => {
      const traces = [
        { traceId: 'abc', cellKey: 'cell-1', events: [{ id: '1' }] }
      ];
      fixture.componentRef.setInput('data', traces);
      fixture.detectChanges();

      component.download(new MouseEvent('click'));

      expect(JSON.parse(blobContent)).toEqual(traces);
    });

    it('should group flat events into trace-shaped objects', () => {
      const events = [
        {
          id: '1',
          traceId: 'trace-1',
          cell: 'cell-a',
          timestamp: 100,
          name: 'e1'
        },
        {
          id: '2',
          traceId: 'trace-1',
          cell: 'cell-a',
          timestamp: 200,
          name: 'e2'
        },
        {
          id: '3',
          traceId: 'trace-2',
          cell: 'cell-b',
          timestamp: 300,
          name: 'e3'
        }
      ];
      fixture.componentRef.setInput('data', events);
      fixture.detectChanges();

      component.download(new MouseEvent('click'));

      const result = JSON.parse(blobContent);
      expect(result.length).toBe(2);
      expect(result[0].traceId).toBe('trace-1');
      expect(result[0].cellKey).toBe('cell-a');
      expect(result[0].startedAt).toBe(100);
      expect(result[0].finishedAt).toBe(200);
      expect(result[0].events.length).toBe(2);
      expect(result[1].traceId).toBe('trace-2');
      expect(result[1].cellKey).toBe('cell-b');
      expect(result[1].startedAt).toBe(300);
      expect(result[1].finishedAt).toBe(300);
      expect(result[1].events.length).toBe(1);
    });

    it('should use "unknown" for events without traceId', () => {
      const events = [
        {
          id: '1',
          traceId: undefined,
          cell: 'cell-x',
          timestamp: 50,
          name: 'orphan'
        }
      ];
      fixture.componentRef.setInput('data', events as any);
      fixture.detectChanges();

      component.download(new MouseEvent('click'));

      const result = JSON.parse(blobContent);
      expect(result[0].traceId).toBe('unknown');
      expect(result[0].cellKey).toBe('cell-x');
    });

    it('should pass through data that is neither trace-shaped nor events', () => {
      const misc = [{ foo: 'bar', baz: 42 }];
      fixture.componentRef.setInput('data', misc);
      fixture.detectChanges();

      component.download(new MouseEvent('click'));

      expect(JSON.parse(blobContent)).toEqual(misc);
    });
  });
});
