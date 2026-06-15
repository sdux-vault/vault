import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HelpToggleComponent } from './help-toggle.component';

@Component({
  standalone: true,
  imports: [HelpToggleComponent],
  template: `
    <sdux-help-toggle ariaLabel="Toggle test help">
      <h3 helpHeading>Test Heading</h3>
      <p class="help-text">Test help content</p>
    </sdux-help-toggle>
  `
})
class TestHostComponent {}

describe('HelpToggleComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    el = fixture.nativeElement;
  });

  it('should create', () => {
    expect(el.querySelector('sdux-help-toggle')).toBeTruthy();
  });

  it('should render the toggle button with correct aria-label', () => {
    const button = el.querySelector('.help-toggle') as HTMLButtonElement;
    expect(button.getAttribute('aria-label')).toBe('Toggle test help');
    expect(button.getAttribute('aria-expanded')).toBe('false');
  });

  it('should not show help section by default', () => {
    expect(el.querySelector('.help-section')).toBeNull();
  });

  it('should show help section after clicking toggle', () => {
    const button = el.querySelector('.help-toggle') as HTMLButtonElement;
    button.click();
    fixture.detectChanges();
    expect(el.querySelector('.help-section')).toBeTruthy();
    expect(button.getAttribute('aria-expanded')).toBe('true');
  });

  it('should project help content', () => {
    const button = el.querySelector('.help-toggle') as HTMLButtonElement;
    button.click();
    fixture.detectChanges();
    expect(el.querySelector('.help-text')!.textContent).toContain(
      'Test help content'
    );
  });

  it('should toggle off on second click', () => {
    const button = el.querySelector('.help-toggle') as HTMLButtonElement;
    button.click();
    fixture.detectChanges();
    expect(el.querySelector('.help-section')).toBeTruthy();
    button.click();
    fixture.detectChanges();
    expect(el.querySelector('.help-section')).toBeNull();
  });

  it('should close help section when close button is clicked', () => {
    const toggle = el.querySelector('.help-toggle') as HTMLButtonElement;
    toggle.click();
    fixture.detectChanges();
    expect(el.querySelector('.help-section')).toBeTruthy();

    const close = el.querySelector('.help-close') as HTMLButtonElement;
    expect(close).toBeTruthy();
    expect(close.getAttribute('aria-label')).toBe('Close help');
    close.click();
    fixture.detectChanges();
    expect(el.querySelector('.help-section')).toBeNull();
  });
});
