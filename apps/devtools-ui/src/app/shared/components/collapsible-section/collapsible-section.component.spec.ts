import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CollapsibleSectionComponent } from './collapsible-section.component';

@Component({
  standalone: true,
  imports: [CollapsibleSectionComponent],
  template: `
    <sdux-collapsible-section ariaLabel="Toggle test section">
      <h3 header>Test Title</h3>
      <p class="body-content">Body content</p>
    </sdux-collapsible-section>
  `
})
class TestHostComponent {}

describe('CollapsibleSectionComponent', () => {
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
    expect(el.querySelector('sdux-collapsible-section')).toBeTruthy();
  });

  it('should render header content', () => {
    expect(el.querySelector('[header]')!.textContent).toContain('Test Title');
  });

  it('should default to expanded', () => {
    const header = el.querySelector('.collapsible-header')!;
    expect(header.getAttribute('aria-expanded')).toBe('true');
    expect(el.querySelector('.body-content')).toBeTruthy();
  });

  it('should collapse on click', () => {
    const header = el.querySelector('.collapsible-header') as HTMLElement;
    header.click();
    fixture.detectChanges();
    expect(header.getAttribute('aria-expanded')).toBe('false');
    expect(el.querySelector('.body-content')).toBeNull();
  });

  it('should expand again on second click', () => {
    const header = el.querySelector('.collapsible-header') as HTMLElement;
    header.click();
    fixture.detectChanges();
    header.click();
    fixture.detectChanges();
    expect(el.querySelector('.body-content')).toBeTruthy();
  });

  it('should set correct aria-label', () => {
    const header = el.querySelector('.collapsible-header')!;
    expect(header.getAttribute('aria-label')).toBe('Toggle test section');
  });

  it('should show expanded chevron when open', () => {
    const chevron = el.querySelector('.chevron')!;
    expect(chevron.classList).toContain('expanded');
  });

  it('should toggle on Enter key', () => {
    const header = el.querySelector('.collapsible-header') as HTMLElement;
    header.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Enter', bubbles: true })
    );
    fixture.detectChanges();
    expect(el.querySelector('.body-content')).toBeNull();
  });
});
