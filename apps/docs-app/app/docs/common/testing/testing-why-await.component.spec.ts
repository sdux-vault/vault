import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { sduxTestingModule } from '@sdux-vault/ui/web-components';
import { VaultTestingWhyYouMustAwaitCommonComponent } from './testing-why-await.component';

describe('Component: VaultTestingwhyYouMustAwaitCommon', () => {
  let fixture: ComponentFixture<VaultTestingWhyYouMustAwaitCommonComponent>;
  let component: VaultTestingWhyYouMustAwaitCommonComponent;

  const getText = () => fixture.nativeElement.textContent as string;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VaultTestingWhyYouMustAwaitCommonComponent, sduxTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(
      VaultTestingWhyYouMustAwaitCommonComponent
    );
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

    it('renders section', () => {
      const text = getText();
      expect(text).toContain('Why You Must Await');
      expect(text).not.toContain('Angular');
    });

    it('renders one tables', () => {
      const tables = fixture.debugElement.queryAll(By.css('table'));
      expect(tables.length).toBe(1);
    });
  });

  describe('type = ""', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('renders section', () => {
      const text = getText();
      expect(text).toContain('Why You Must Await');
      expect(text).not.toContain('Angular');
    });

    it('renders one tables', () => {
      const tables = fixture.debugElement.queryAll(By.css('table'));
      expect(tables.length).toBe(1);
    });
  });

  // ------------------------------------------------------
  // type = "angular"
  // ------------------------------------------------------

  describe('type = "angular"', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('type', 'angular');
      fixture.detectChanges();
    });

    it('renders only angular', () => {
      const text = getText();
      expect(text).toContain('In Angular');
      expect(text).not.toContain('Without awaiting');
    });

    it('renders exactly one table', () => {
      expect(fixture.debugElement.queryAll(By.css('table')).length).toBe(1);
    });
  });

  // ------------------------------------------------------
  // computed signal logic
  // ------------------------------------------------------

  describe('computed signal logic', () => {
    it('isAngular works correctly', () => {
      fixture.componentRef.setInput('type', 'all');
      expect(component.isAngular()).toBeFalse();

      fixture.componentRef.setInput('type', 'angular');
      expect(component.isAngular()).toBeTrue();
    });

    it('default works correctly', () => {
      expect(component.isAll()).toBeTrue();

      expect(component.isAngular()).toBeFalse();
    });

    it('all works correctly', () => {
      fixture.componentRef.setInput('type', 'all');
      expect(component.isAll()).toBeTrue();

      fixture.componentRef.setInput('type', 'all');
      expect(component.isAngular()).toBeFalse();
    });
  });
});
