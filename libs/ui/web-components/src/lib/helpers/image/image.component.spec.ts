import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTooltip } from '@angular/material/tooltip';
import { By } from '@angular/platform-browser';
import { sduxTestingModule } from '../../testing-module/sdux.testing.module';
import { ImageComponent } from './image.component';

describe('Component: Image', () => {
  let fixture: ComponentFixture<ImageComponent>;
  let component: ImageComponent;

  const getImg = () =>
    fixture.debugElement.query(By.css('img')).nativeElement as HTMLImageElement;

  afterEach(() => {
    document.documentElement.removeAttribute('data-theme');
  });

  describe('standard tests', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ImageComponent, sduxTestingModule]
      });

      fixture = TestBed.createComponent(ImageComponent);
      component = fixture.componentInstance;
      fixture.componentRef.setInput('image', 'sdux.svg');
      fixture.detectChanges();
    });

    it('should render default light image with default tooltip', () => {
      const img = getImg();

      expect(img.getAttribute('src')).toContain('assets/sdux.svg');
      expect(img.getAttribute('alt')).toBe('Mock BN - Mock CP');
      expect(img.getAttribute('aria-label')).toBe('Mock BN - Mock CP');
      expect(img.getAttribute('role')).toBe('img');
      expect(img.getAttribute('class')).toContain('sdux-image');

      const tooltipDirective = fixture.debugElement
        .query(By.directive(MatTooltip))
        .injector.get(MatTooltip);
      expect(tooltipDirective.message).toBe('Mock BN - Mock CP');

      expect(img.width).toBe(0);
      expect(img.height).toBe(0);
    });

    it('should respect inputs changes', () => {
      const img = getImg();

      expect(img.getAttribute('src')).toContain('assets/sdux.svg');
      expect(img.getAttribute('alt')).toBe('Mock BN - Mock CP');
      expect(img.getAttribute('aria-label')).toBe('Mock BN - Mock CP');
      expect(img.getAttribute('role')).toBe('img');
      expect(img.getAttribute('class')).toContain('sdux-image');

      const tooltipDirective = fixture.debugElement
        .query(By.directive(MatTooltip))
        .injector.get(MatTooltip);
      expect(tooltipDirective.message).toBe('Mock BN - Mock CP');

      expect(img.width).toBe(0);
      expect(img.height).toBe(0);

      // The updates

      fixture.componentRef.setInput('image', 'changed.png');
      fixture.componentRef.setInput('tooltip', 'Secure State Demo');
      fixture.componentRef.setInput('width', 300);
      fixture.componentRef.setInput('height', 120);
      fixture.detectChanges();

      expect(img.width).toBe(300);
      expect(img.height).toBe(120);
      expect(img.getAttribute('alt')).toBe('Secure State Demo');
      expect(img.getAttribute('aria-label')).toBe('Secure State Demo');
      expect(tooltipDirective.message).toBe('Secure State Demo');
      expect(img.getAttribute('src')).toContain('assets/changed.png');
      expect(img.getAttribute('role')).toBe('img');
      expect(img.getAttribute('class')).toContain('sdux-image');

      // The updates

      fixture.componentRef.setInput('tooltip', '');
      fixture.detectChanges();

      expect(img.width).toBe(300);
      expect(img.height).toBe(120);
      expect(img.getAttribute('alt')).toBe('Mock BN Logo');
      expect(img.getAttribute('aria-label')).toBe('');
      expect(tooltipDirective.message).toBe('');
      expect(img.getAttribute('src')).toContain('assets/changed.png');
      expect(img.getAttribute('role')).toBe('img');
      expect(img.getAttribute('class')).toContain('sdux-image');
    });

    describe('Theme testing', () => {
      it('should resolve dark variant when theme is dark', async () => {
        document.documentElement.setAttribute('data-theme', 'dark');
        fixture.detectChanges();

        // Wait for MutationObserver → signal → computed chain to settle
        await fixture.whenStable();
        await new Promise((r) => setTimeout(r));

        const img = getImg();
        expect(img.getAttribute('src')).toContain('sdux-dark.svg');
      });

      it('should not add -dark twice if already dark image', async () => {
        document.documentElement.setAttribute('data-theme', 'dark');
        fixture.componentRef.setInput('image', 'sdux-dark.svg');
        fixture.detectChanges();

        await fixture.whenStable();
        await new Promise((r) => setTimeout(r));

        const img = getImg();
        expect(img.getAttribute('src')).toContain('sdux-dark.svg');
        expect(img.getAttribute('src')).not.toContain('dark-dark');
      });

      it('should not resolve dark variant when theme is false', async () => {
        fixture.componentRef.setInput('isThemeEnabled', false);
        document.documentElement.setAttribute('data-theme', 'dark');
        fixture.detectChanges();

        // Wait for MutationObserver → signal → computed chain to settle
        await fixture.whenStable();
        await new Promise((r) => setTimeout(r));

        const img = getImg();
        expect(img.getAttribute('src')).toContain('sdux.svg');
      });
    });
  });

  describe('Component: Image', () => {
    beforeEach(() => {
      spyOn(window, 'matchMedia').and.returnValue({
        matches: true,
        addEventListener: () => {},
        removeEventListener: () => {},
        addListener: () => {},
        removeListener: () => {}
      } as any);

      TestBed.configureTestingModule({
        imports: [ImageComponent, sduxTestingModule]
      });

      fixture = TestBed.createComponent(ImageComponent);
      component = fixture.componentInstance;
      fixture.componentRef.setInput('image', 'sdux.svg');
      fixture.detectChanges();
    });

    afterEach(() => {
      document.documentElement.removeAttribute('data-theme');
    });

    it('should fall back to prefers-color-scheme: dark when no theme', async () => {
      (window.matchMedia as jasmine.Spy).and.returnValue({
        matches: true,
        addEventListener: () => {},
        removeEventListener: () => {}
      } as any);

      (component as any).syncTheme();
      fixture.detectChanges();

      await fixture.whenStable();
      await new Promise((r) => setTimeout(r));

      const img = getImg();
      expect(img.getAttribute('src')).toContain('sdux-dark.svg');
    });
  });
});
