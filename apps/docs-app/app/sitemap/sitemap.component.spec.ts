import { BLOG_ENTRIES } from '../blog/blog-index/constants/blog-entries.constant';
import { SitemapComponent } from './sitemap.component';

describe('Component: Sitemap', () => {
  let component: SitemapComponent;

  beforeEach(() => {
    component = new SitemapComponent();
  });

  it('should include only active blog entries', () => {
    expect(component.blogEntries.length).toBeGreaterThan(0);
    expect(component.blogEntries.length).toBe(
      BLOG_ENTRIES.filter((entry) => entry.active).length
    );
    expect(component.blogEntries.every((entry) => entry.active)).toBeTrue();
  });

  it('should sort blog entries by date descending', () => {
    const dates = component.blogEntries.map((entry) => entry.date);
    const sortedDates = [...dates].sort((a, b) => b.localeCompare(a));

    expect(dates).toEqual(sortedDates);
  });
});
