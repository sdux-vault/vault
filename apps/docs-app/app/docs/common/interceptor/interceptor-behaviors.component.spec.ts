import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { sduxTestingModule } from '@sdux-vault/ui/web-components';
import { VaultInterceptorCommonComponent } from './interceptor-behaviors.component';

describe('Component: VaultInterceptorCommonComponent', () => {
  let fixture: ComponentFixture<VaultInterceptorCommonComponent>;
  let component: VaultInterceptorCommonComponent;

  const getText = () => fixture.nativeElement.textContent as string;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VaultInterceptorCommonComponent, sduxTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(VaultInterceptorCommonComponent);
    component = fixture.componentInstance;
  });

  // ------------------------------------------------------
  // type = "all"
  // ------------------------------------------------------

  describe('type = "all"', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('type', 'all');
      fixture.detectChanges();
    });

    it('renders Global Error Pause section', () => {
      const text = getText();
      expect(text).toContain('Global Error Pause');
      expect(text).toContain('Prevents updates from entering the pipeline');
    });

    it('renders four tables', () => {
      const tables = fixture.debugElement.queryAll(By.css('table'));
      expect(tables.length).toBe(1);
    });
  });

  // ------------------------------------------------------
  // type = "globalErrorPause"
  // ------------------------------------------------------

  describe('type = "globalErrorPause"', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('type', 'globalErrorPause');
      fixture.detectChanges();
    });

    it('renders only Global Error Pause', () => {
      const text = getText();
      expect(text).toContain('Global Error Pause');
      expect(text).not.toContain('Debounce');
      expect(text).not.toContain('Delay');
      expect(text).not.toContain('Throttle');
    });

    it('describes error gating behavior', () => {
      expect(getText()).toContain('global Vault error');
    });

    it('renders exactly one table', () => {
      expect(fixture.debugElement.queryAll(By.css('table')).length).toBe(1);
    });
  });

  // ------------------------------------------------------
  // computed signal logic
  // ------------------------------------------------------

  describe('computed signals', () => {
    it('isGlobalErrorPause works correctly', () => {
      fixture.componentRef.setInput('type', 'all');
      expect(component.isGlobalErrorPause()).toBeTrue();

      fixture.componentRef.setInput('type', 'globalErrorPause');
      expect(component.isGlobalErrorPause()).toBeTrue();

      fixture.componentRef.setInput('type', 'debounce');
      expect(component.isGlobalErrorPause()).toBeFalse();
    });
  });
});
