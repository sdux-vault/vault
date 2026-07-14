import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { BLOG_ENTRIES } from '../blog-index/constants/blog-entries.constant';
import { BlogKeepReadingComponent } from './blog-keep-reading.component';

describe('Component: BlogKeepReading', () => {
  let fixture: ComponentFixture<BlogKeepReadingComponent>;
  let component: BlogKeepReadingComponent;
  let el: HTMLElement;
  let router: Router;

  const sorted = [...BLOG_ENTRIES].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogKeepReadingComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(BlogKeepReadingComponent);
    component = fixture.componentInstance;
  });

  function navigateTo(slug: string): void {
    spyOnProperty(router, 'url', 'get').and.returnValue(`/blog/${slug}`);
    fixture.detectChanges();
  }

  it('should render the section title', () => {
    fixture.detectChanges();
    el = fixture.nativeElement;
    expect(el.querySelector('.section-title')?.textContent).toEqual(
      'Keep Reading'
    );
  });

  it('should render at most 3 recommendation cards', () => {
    navigateTo(sorted[5].slug);
    el = fixture.nativeElement;
    const cards = el.querySelectorAll('.keep-reading-card');
    expect(cards.length).toBeLessThanOrEqual(3);
    expect(cards.length).toBeGreaterThan(0);
  });

  it('should exclude the current post from recommendations', () => {
    const current = sorted[3];
    navigateTo(current.slug);
    const slugs = component.recommendations().map((e) => e.slug);
    expect(slugs).not.toContain(current.slug);
  });

  it('should include the next (newer) post', () => {
    const currentIndex = 5;
    navigateTo(sorted[currentIndex].slug);
    const slugs = component.recommendations().map((e) => e.slug);
    expect(slugs).toContain(sorted[currentIndex - 1].slug);
  });

  it('should include the previous (older) post', () => {
    const currentIndex = 5;
    navigateTo(sorted[currentIndex].slug);
    const slugs = component.recommendations().map((e) => e.slug);
    expect(slugs).toContain(sorted[currentIndex + 1].slug);
  });

  it('should include a random third pick', () => {
    const currentIndex = 5;
    navigateTo(sorted[currentIndex].slug);
    const recs = component.recommendations();
    expect(recs.length).toBe(3);

    const nextSlug = sorted[currentIndex - 1].slug;
    const prevSlug = sorted[currentIndex + 1].slug;
    const third = recs.find((e) => e.slug !== nextSlug && e.slug !== prevSlug);
    expect(third).toBeTruthy();
  });

  it('should handle the newest post (no next)', () => {
    navigateTo(sorted[0].slug);
    const slugs = component.recommendations().map((e) => e.slug);
    expect(slugs).not.toContain(sorted[0].slug);
    expect(slugs).toContain(sorted[1].slug);
    expect(slugs.length).toBeLessThanOrEqual(3);
  });

  it('should handle the oldest post (no previous)', () => {
    navigateTo(sorted[sorted.length - 1].slug);
    const slugs = component.recommendations().map((e) => e.slug);
    expect(slugs).not.toContain(sorted[sorted.length - 1].slug);
    expect(slugs).toContain(sorted[sorted.length - 2].slug);
    expect(slugs.length).toBeLessThanOrEqual(3);
  });

  it('should render the title in each card', () => {
    navigateTo(sorted[5].slug);
    el = fixture.nativeElement;
    const titles = el.querySelectorAll('.keep-reading-title');
    const recs = component.recommendations();
    titles.forEach((titleEl, i) => {
      expect(titleEl.textContent).toEqual(recs[i].title);
    });
  });

  it('should render reading time in each card', () => {
    navigateTo(sorted[5].slug);
    el = fixture.nativeElement;
    const times = el.querySelectorAll('.keep-reading-time');
    const recs = component.recommendations();
    times.forEach((timeEl, i) => {
      expect(timeEl.textContent).toContain(`${recs[i].readingTime} min read`);
    });
  });

  it('should render aria-label on each card', () => {
    navigateTo(sorted[5].slug);
    el = fixture.nativeElement;
    const cards = el.querySelectorAll('.keep-reading-card');
    const recs = component.recommendations();
    cards.forEach((card, i) => {
      const label = card.getAttribute('aria-label');
      expect(label).toContain(recs[i].title);
      expect(label).toContain('min read');
    });
  });

  it('should render the "Browse all posts" footer link', () => {
    fixture.detectChanges();
    el = fixture.nativeElement;
    const footer = el.querySelector('.keep-reading-footer a');
    expect(footer).toBeTruthy();
    expect(footer?.textContent).toContain('Browse all posts');
  });

  it('should have aria-hidden on decorative elements', () => {
    navigateTo(sorted[5].slug);
    el = fixture.nativeElement;
    const dividers = el.querySelectorAll('.keep-reading-divider');
    dividers.forEach((d) => {
      expect(d.getAttribute('aria-hidden')).toBe('true');
    });
    const arrows = el.querySelectorAll('.keep-reading-arrow');
    arrows.forEach((a) => {
      expect(a.getAttribute('aria-hidden')).toBe('true');
    });
  });

  describe('scrollToTop', () => {
    it('should scroll to top when scrollToTop is called', () => {
      const container = document.createElement('div');
      const scrollSpy = jasmine.createSpy('scrollTo');
      container.scrollTo = scrollSpy;
      spyOn(document, 'querySelector').and.returnValue(container);
      component.scrollToTop();
      expect(scrollSpy).toHaveBeenCalledWith({
        top: 0,
        behavior: 'smooth'
      });
    });

    it('should fall back to window.scrollTo when mat-sidenav-content is not found', () => {
      spyOn(document, 'querySelector').and.returnValue(null);
      const windowScrollSpy = jasmine.createSpy('scrollTo');
      window.scrollTo = windowScrollSpy;
      component.scrollToTop();
      expect(windowScrollSpy).toHaveBeenCalledWith({
        top: 0,
        behavior: 'smooth'
      });
    });
  });

  it('should handle a slug not found in entries', () => {
    spyOnProperty(router, 'url', 'get').and.returnValue(
      '/blog/nonexistent-slug'
    );
    fixture.detectChanges();
    const recs = component.recommendations();
    expect(recs.length).toBeLessThanOrEqual(3);
    expect(recs.length).toBeGreaterThan(0);
  });
});
