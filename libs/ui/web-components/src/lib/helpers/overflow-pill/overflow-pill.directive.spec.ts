import { Component, ViewEncapsulation } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OverflowPillDirective } from './overflow-pill.directive';

@Component({
  standalone: true,
  imports: [OverflowPillDirective],
  template: `
    <div
      sduxOverflowPill
      class="test-scroll"
      style="max-height: 50px; overflow-y: auto;">
      <div class="content" style="height: 200px;">tall content</div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None
})
class OverflowHostComponent {}

@Component({
  standalone: true,
  imports: [OverflowPillDirective],
  template: `
    <div
      sduxOverflowPill
      class="test-scroll"
      style="max-height: 500px; overflow-y: auto;">
      <div class="content" style="height: 20px;">short content</div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None
})
class NoOverflowHostComponent {}

function mockOverflow(
  host: HTMLElement,
  scrollHeight: number,
  clientHeight: number,
  scrollTop = 0
): void {
  Object.defineProperty(host, 'scrollHeight', {
    get: () => scrollHeight,
    configurable: true
  });
  Object.defineProperty(host, 'clientHeight', {
    get: () => clientHeight,
    configurable: true
  });
  Object.defineProperty(host, 'scrollTop', {
    get: () => scrollTop,
    configurable: true
  });
}

describe('Directive: OverflowPill', () => {
  describe('with overflow', () => {
    let fixture: ComponentFixture<OverflowHostComponent>;
    let host: HTMLElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [OverflowHostComponent]
      }).compileComponents();

      fixture = TestBed.createComponent(OverflowHostComponent);
      fixture.detectChanges();

      host = fixture.nativeElement.querySelector('.test-scroll');
      mockOverflow(host, 200, 50);

      host.dispatchEvent(new Event('scroll'));
    });

    it('should wrap the host element in a position-relative wrapper', () => {
      const wrapper = host.parentElement;
      expect(wrapper).toBeTruthy();
      expect(wrapper!.style.position).toBe('relative');
    });

    it('should create the pill element', () => {
      const pill = fixture.nativeElement.querySelector('.sdux-overflow-pill');
      expect(pill).toBeTruthy();
      expect(pill.textContent).toContain('See More');
    });

    it('should create the chevron element', () => {
      const chevron = fixture.nativeElement.querySelector(
        '.sdux-overflow-chevron'
      );
      expect(chevron).toBeTruthy();
      expect(chevron.textContent).toContain('▾');
    });

    it('should create the fade container', () => {
      const fade = fixture.nativeElement.querySelector('.sdux-overflow-fade');
      expect(fade).toBeTruthy();
    });

    it('should show the pill when content overflows', () => {
      const fade = fixture.nativeElement.querySelector('.sdux-overflow-fade');
      expect(fade.style.display).not.toBe('none');
    });

    it('should hide the pill when scrolled to the bottom', () => {
      mockOverflow(host, 200, 50, 150);
      host.dispatchEvent(new Event('scroll'));

      const fade = fixture.nativeElement.querySelector('.sdux-overflow-fade');
      expect(fade.style.display).toBe('none');
    });

    it('should scroll the host when the pill is clicked', () => {
      const scrollBySpy = spyOn(host, 'scrollBy').and.stub();

      const pill = fixture.nativeElement.querySelector('.sdux-overflow-pill');
      pill.click();

      expect(scrollBySpy).toHaveBeenCalledWith(
        jasmine.objectContaining({ top: 100, behavior: 'smooth' })
      );
    });
  });

  describe('without overflow', () => {
    let fixture: ComponentFixture<NoOverflowHostComponent>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [NoOverflowHostComponent]
      }).compileComponents();

      fixture = TestBed.createComponent(NoOverflowHostComponent);
      fixture.detectChanges();
    });

    it('should hide the pill when content does not overflow', () => {
      const fade = fixture.nativeElement.querySelector('.sdux-overflow-fade');
      expect(fade.style.display).toBe('none');
    });
  });

  describe('cleanup', () => {
    let fixture: ComponentFixture<OverflowHostComponent>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [OverflowHostComponent]
      }).compileComponents();

      fixture = TestBed.createComponent(OverflowHostComponent);
      fixture.detectChanges();
    });

    it('should not throw on destroy', () => {
      expect(() => fixture.destroy()).not.toThrow();
    });
  });

  describe('dynamic content', () => {
    let fixture: ComponentFixture<OverflowHostComponent>;
    let host: HTMLElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [OverflowHostComponent]
      }).compileComponents();

      fixture = TestBed.createComponent(OverflowHostComponent);
      fixture.detectChanges();

      host = fixture.nativeElement.querySelector('.test-scroll');
    });

    it('should re-evaluate overflow when child content changes', (done) => {
      mockOverflow(host, 200, 50);

      const child = document.createElement('div');
      child.textContent = 'added content';
      host.appendChild(child);

      setTimeout(() => {
        const fade = fixture.nativeElement.querySelector('.sdux-overflow-fade');
        expect(fade.style.display).not.toBe('none');
        done();
      }, 50);
    });
  });
});
