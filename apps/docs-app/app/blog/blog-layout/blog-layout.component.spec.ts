import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideVaultTesting } from '@sdux-vault/angular';
import { sduxTestingModule } from '@sdux-vault/ui/web-components';
import { BlogLayoutComponent } from './blog-layout.component';

@Component({
  standalone: true,
  imports: [BlogLayoutComponent],
  template: `
    <sdux-blog-layout
      [title]="title"
      [date]="date"
      [pillar]="pillar"
      [readingTime]="readingTime">
      <p class="test-content">Projected content</p>
    </sdux-blog-layout>
  `
})
class TestHostComponent {
  title = 'Test Post';
  date = '2026-06-04';
  pillar = 'TA';
  readingTime = '5';
}

describe('Component: BlogLayout', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent, sduxTestingModule],
      providers: [provideRouter([]), provideVaultTesting()]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    el = fixture.nativeElement;
  });

  it('should render the post title', () => {
    expect(el.querySelector('.header h2')?.textContent).toEqual('Test Post');
  });

  it('should render the date', () => {
    expect(el.querySelector('.blog-date')?.textContent).toEqual('2026-06-04');
  });

  it('should render the reading time', () => {
    expect(el.querySelector('.blog-reading-time')?.textContent).toEqual(
      '5 min read'
    );
  });

  it('should project content', () => {
    expect(el.querySelector('.test-content')?.textContent).toEqual(
      'Projected content'
    );
  });

  it('should render a back link to /blog', () => {
    const link = el.querySelector('.blog-back-link a') as HTMLAnchorElement;
    expect(link).toBeTruthy();
    expect(link.textContent).toContain('All Posts');
  });

  it('should render the share bar', () => {
    expect(el.querySelector('.share-bar')).toBeTruthy();
  });

  it('should render share links for all platforms', () => {
    const links = el.querySelectorAll('.share-bar-links a');
    expect(links.length).toBe(8);
  });

  it('should render the copy link button', () => {
    const btn = el.querySelector('.share-bar-copy') as HTMLButtonElement;
    expect(btn).toBeTruthy();
    expect(btn.getAttribute('aria-label')).toEqual('Copy link to clipboard');
  });

  it('should build correct X share URL', () => {
    const xLink = el.querySelector(
      '.share-bar-links a[aria-label="Share on X"]'
    ) as HTMLAnchorElement;
    expect(xLink.href).toContain('twitter.com/intent/tweet');
    expect(xLink.href).toContain('Test%20Post');
  });

  it('should call clipboard on copy link click', () => {
    spyOn(navigator.clipboard, 'writeText');
    const btn = el.querySelector('.share-bar-copy') as HTMLButtonElement;
    btn.click();
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      'https://www.sdux-vault.com/'
    );
  });
});
