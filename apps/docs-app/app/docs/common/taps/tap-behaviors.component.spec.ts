import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { sduxTestingModule } from '@sdux-vault/ui/web-components';
import { VaultTapBehaviorCommonComponent } from './tap-behaviors.component';

describe('Component: VaultTapCommon', () => {
  let fixture: ComponentFixture<VaultTapBehaviorCommonComponent>;
  let component: VaultTapBehaviorCommonComponent;

  const getText = () => fixture.nativeElement.textContent as string;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VaultTapBehaviorCommonComponent, sduxTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(VaultTapBehaviorCommonComponent);
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

    it('renders Before and After Tap section', () => {
      const text = getText();
      expect(text).toContain('Before Tap');
      expect(text).toContain('After Tap');
    });

    it('renders two tables', () => {
      const tables = fixture.debugElement.queryAll(By.css('table'));
      expect(tables.length).toBe(2);
    });
  });

  // ------------------------------------------------------
  // type = "beforeTap"
  // ------------------------------------------------------

  describe('type = "beforeTap"', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('type', 'beforeTap');
      fixture.detectChanges();
    });

    it('renders only Before Tap', () => {
      const text = getText();
      expect(text).toContain('Before Tap');
      expect(text).not.toContain('After Tap');
    });

    it('renders exactly one table', () => {
      expect(fixture.debugElement.queryAll(By.css('table')).length).toBe(1);
    });
  });

  describe('type = "afterTap"', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('type', 'afterTap');
      fixture.detectChanges();
    });

    it('renders only after Tap', () => {
      const text = getText();
      expect(text).toContain('After Tap');
      expect(text).not.toContain('Before Tap');
    });

    it('renders exactly one table', () => {
      expect(fixture.debugElement.queryAll(By.css('table')).length).toBe(1);
    });
  });

  // ------------------------------------------------------
  // computed signal logic
  // ------------------------------------------------------

  describe('computed signals', () => {
    it('isBeforeTap works correctly', () => {
      fixture.componentRef.setInput('type', 'all');
      expect(component.isBeforeTap()).toBeTrue();

      fixture.componentRef.setInput('type', 'beforeTap');
      expect(component.isBeforeTap()).toBeTrue();

      fixture.componentRef.setInput('type', 'afterTap');
      expect(component.isBeforeTap()).toBeFalse();
    });

    it('isAfterTap works correctly', () => {
      fixture.componentRef.setInput('type', 'all');
      expect(component.isAfterTap()).toBeTrue();

      fixture.componentRef.setInput('type', 'afterTap');
      expect(component.isAfterTap()).toBeTrue();

      fixture.componentRef.setInput('type', 'beforeTap');
      expect(component.isAfterTap()).toBeFalse();
    });
  });
});
