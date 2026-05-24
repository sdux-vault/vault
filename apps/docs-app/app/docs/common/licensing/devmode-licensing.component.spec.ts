import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { sduxTestingModule } from '@sdux-vault/ui/web-components';
import { DevmodeLicensingCommonComponent } from './devmode-licensing.component';

describe('Component: DevmodeLicensingCommonComponent', () => {
  let fixture: ComponentFixture<DevmodeLicensingCommonComponent>;
  let component: DevmodeLicensingCommonComponent;

  const getText = () => fixture.nativeElement.textContent as string;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DevmodeLicensingCommonComponent, sduxTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(DevmodeLicensingCommonComponent);
    component = fixture.componentInstance;
  });

  // ------------------------------------------------------
  // fragmentLink = false (default)
  // ------------------------------------------------------

  describe('fragmentLink = false (default)', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('renders the section title without navigation wrapper', () => {
      const nav = fixture.debugElement.query(
        By.css('.section-title-navigation')
      );
      expect(nav).toBeNull();
    });

    it('renders the section title directly', () => {
      const title = fixture.debugElement.query(By.css('.section-title'));
      expect(title).toBeTruthy();
      expect(title.nativeElement.textContent).toContain('DevMode & Licensing');
    });

    it('does not render the top link', () => {
      const topLink = fixture.debugElement.query(By.css('.section-top-link'));
      expect(topLink).toBeNull();
    });

    it('renders devMode content', () => {
      const text = getText();
      expect(text).toContain('devMode');
      expect(text).toContain('license enforcement is bypassed entirely');
    });

    it('renders the production warning', () => {
      const text = getText();
      expect(text).toContain('cannot run in production');
      expect(text).toContain('SDuX Debugger');
    });

    it('renders the section with the correct id', () => {
      const section = fixture.debugElement.query(
        By.css('#devmode-and-licensing')
      );
      expect(section).toBeTruthy();
    });
  });

  // ------------------------------------------------------
  // fragmentLink = true
  // ------------------------------------------------------

  describe('fragmentLink = true', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('fragmentLink', true);
      fixture.detectChanges();
    });

    it('renders the section title with navigation wrapper', () => {
      const nav = fixture.debugElement.query(
        By.css('.section-title-navigation')
      );
      expect(nav).toBeTruthy();
    });

    it('renders the top link', () => {
      const topLink = fixture.debugElement.query(By.css('.section-top-link'));
      expect(topLink).toBeTruthy();
      expect(topLink.nativeElement.textContent).toContain('↑ top');
    });

    it('renders the section title inside the navigation wrapper', () => {
      const title = fixture.debugElement.query(
        By.css('.section-title-navigation .section-title')
      );
      expect(title).toBeTruthy();
      expect(title.nativeElement.textContent).toContain('DevMode & Licensing');
    });

    it('renders devMode content', () => {
      const text = getText();
      expect(text).toContain('devMode');
      expect(text).toContain('license enforcement is bypassed entirely');
    });
  });

  // ------------------------------------------------------
  // signal logic
  // ------------------------------------------------------

  describe('signal logic', () => {
    it('fragmentLink defaults to false', () => {
      expect(component.fragmentLink()).toBeFalse();
    });

    it('fragmentLink reflects true when set', () => {
      fixture.componentRef.setInput('fragmentLink', true);
      expect(component.fragmentLink()).toBeTrue();
    });
  });
});
