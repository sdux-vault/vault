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
});
