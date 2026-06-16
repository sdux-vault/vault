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

describe('Directive: OverflowPill', () => {
  describe('with overflow', () => {
    let fixture: ComponentFixture<OverflowHostComponent>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [OverflowHostComponent]
      }).compileComponents();

      fixture = TestBed.createComponent(OverflowHostComponent);
      fixture.detectChanges();
    });

    it('should wrap the host element in a position-relative wrapper', () => {
      const host = fixture.nativeElement.querySelector('.test-scroll');
      const wrapper = host.parentElement;
      expect(wrapper).toBeTruthy();
      expect(wrapper.style.position).toBe('relative');
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

    it('should scroll the host when the pill is clicked', () => {
      const host = fixture.nativeElement.querySelector('.test-scroll');
      const scrollBySpy = jest.spyOn(host, 'scrollBy');

      const pill = fixture.nativeElement.querySelector('.sdux-overflow-pill');
      pill.click();

      expect(scrollBySpy).toHaveBeenCalledWith({
        top: 100,
        behavior: 'smooth'
      });
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
});
