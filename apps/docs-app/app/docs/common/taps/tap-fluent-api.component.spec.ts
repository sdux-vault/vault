import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { sduxTestingModule } from '@sdux-vault/ui/web-components';
import { VaultTapFluentApiCommonComponent } from './tap-fluent-api.component';

describe('Component: VaultTapFluentApiCommon', () => {
  let fixture: ComponentFixture<VaultTapFluentApiCommonComponent>;
  let component: VaultTapFluentApiCommonComponent;

  const getText = () => fixture.nativeElement.textContent as string;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VaultTapFluentApiCommonComponent, sduxTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(VaultTapFluentApiCommonComponent);
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

    it('renders Before Tap section', () => {
      const text = getText();
      expect(text).toContain('BeforeTap');
    });

    it('renders After Tap section', () => {
      const text = getText();
      expect(text).toContain('AfterTap');
    });

    it('renders tables', () => {
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
      expect(text).toContain('BeforeTap');
      expect(text).not.toContain('AfterTap');
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
      expect(text).toContain('AfterTap');
      expect(text).not.toContain('BeforeTap');
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
      expect(component.isAfterTap()).toBeTrue();

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
