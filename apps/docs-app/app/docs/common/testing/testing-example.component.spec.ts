import { ComponentFixture, TestBed } from '@angular/core/testing';
import { sduxTestingModule } from '@sdux-vault/ui/web-components';
import { VaultTestingExampleCommonComponent } from './testing-example.component';

describe('Component: VaultTestingExampleCommon', () => {
  let fixture: ComponentFixture<VaultTestingExampleCommonComponent>;
  let component: VaultTestingExampleCommonComponent;

  const getText = () => fixture.nativeElement.textContent as string;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VaultTestingExampleCommonComponent, sduxTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(VaultTestingExampleCommonComponent);
    component = fixture.componentInstance;
  });

  describe('type = "all"', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('type', 'all');
      fixture.detectChanges();
    });

    it('renders all', () => {
      const text = getText();
      expect(text).toContain('Angular Test Structure');
      expect(text).toContain('Angular with Effects');
      expect(text).toContain('React');
      expect(text).toContain('Vue');
    });
  });

  describe('type = ""', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('renders all', () => {
      const text = getText();
      expect(text).toContain('Angular Test Structure');
      expect(text).toContain('Angular with Effects');
      expect(text).toContain('React');
      expect(text).toContain('Vue');
    });
  });

  describe('type = "typescript"', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('type', 'typescript');
      fixture.detectChanges();
    });

    it('renders only vue and react', () => {
      const text = getText();
      expect(text).not.toContain('Angular Test Structure');
      expect(text).not.toContain('Angular with Effects');
      expect(text).toContain('React');
      expect(text).toContain('Vue');
    });
  });

  describe('type = "vue"', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('type', 'vue');
      fixture.detectChanges();
    });

    it('renders only vue', () => {
      const text = getText();
      expect(text).not.toContain('Angular Test Structure');
      expect(text).not.toContain('Angular with Effects');
      expect(text).not.toContain('React');
      expect(text).toContain('Vue');
    });
  });

  describe('type = "react"', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('type', 'react');
      fixture.detectChanges();
    });

    it('renders only react ', () => {
      const text = getText();
      expect(text).not.toContain('Angular Test Structure');
      expect(text).not.toContain('Angular with Effects');
      expect(text).toContain('React');
      expect(text).not.toContain('Vue');
    });
  });

  describe('type = "angular"', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('type', 'angular');
      fixture.detectChanges();
    });

    it('renders only angular', () => {
      const text = getText();
      expect(text).toContain('Angular Test Structure');
      expect(text).toContain('Angular with Effects');
      expect(text).not.toContain('React');
      expect(text).not.toContain('Vue');
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
      expect(text).toContain('Angular Test Structure');
      expect(text).toContain('Angular with Effects');
      expect(text).not.toContain('React');
      expect(text).not.toContain('Vue');
    });
  });

  // ------------------------------------------------------
  // computed signal logic
  // ------------------------------------------------------

  describe('computed signal logic', () => {
    it('angular works correctly', () => {
      expect(component.isAngular()).toBeTrue();

      fixture.componentRef.setInput('type', 'all');
      expect(component.isAngular()).toBeTrue();

      fixture.componentRef.setInput('type', 'typescript');
      expect(component.isAngular()).toBeFalse();

      fixture.componentRef.setInput('type', 'angular');
      expect(component.isReact()).toBeFalse();

      fixture.componentRef.setInput('type', 'angular');
      expect(component.isVue()).toBeFalse();

      fixture.componentRef.setInput('type', 'angular');
      expect(component.isAngular()).toBeTrue();
    });

    it('vue works correctly', () => {
      expect(component.isVue()).toBeTrue();

      fixture.componentRef.setInput('type', 'all');
      expect(component.isVue()).toBeTrue();

      fixture.componentRef.setInput('type', 'typescript');
      expect(component.isVue()).toBeTrue();

      fixture.componentRef.setInput('type', 'vue');
      expect(component.isReact()).toBeFalse();

      fixture.componentRef.setInput('type', 'vue');
      expect(component.isVue()).toBeTrue();

      fixture.componentRef.setInput('type', 'vue');
      expect(component.isAngular()).toBeFalse();
    });

    it('react works correctly', () => {
      expect(component.isReact()).toBeTrue();

      fixture.componentRef.setInput('type', 'all');
      expect(component.isReact()).toBeTrue();

      fixture.componentRef.setInput('type', 'typescript');
      expect(component.isReact()).toBeTrue();

      fixture.componentRef.setInput('type', 'react');
      expect(component.isReact()).toBeTrue();

      fixture.componentRef.setInput('type', 'react');
      expect(component.isVue()).toBeFalse();

      fixture.componentRef.setInput('type', 'react');
      expect(component.isAngular()).toBeFalse();
    });
  });
});
