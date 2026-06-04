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
  let host: TestHostComponent;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent, sduxTestingModule],
      providers: [provideRouter([]), provideVaultTesting()]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
    el = fixture.nativeElement;
  });

  it('should render the post title', () => {
    expect(el.querySelector('.header h3')?.textContent).toEqual('Test Post');
  });

  it('should render the date', () => {
    expect(el.querySelector('.blog-date')?.textContent).toEqual('2026-06-04');
  });

  it('should render the pillar code', () => {
    expect(el.querySelector('.blog-pillar')?.textContent?.trim()).toEqual('TA');
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

  describe('pillarLabel', () => {
    const cases: [string, string][] = [
      ['TA', 'Technical Authority'],
      ['ED', 'Educational Series'],
      ['SP', 'Social Proof/Momentum'],
      ['CE', 'Community Engagement'],
      ['RC', 'Redux Comparison']
    ];

    cases.forEach(([code, label]) => {
      it(`should resolve "${code}" to "${label}"`, () => {
        host.pillar = code;
        fixture.changeDetectorRef.markForCheck();
        fixture.detectChanges();

        const pillarEl = el.querySelector('.blog-pillar');
        expect(pillarEl?.getAttribute('aria-label')).toEqual(label);
      });
    });

    it('should fall back to the raw pillar code for unknown codes', () => {
      host.pillar = 'ZZ';
      fixture.changeDetectorRef.markForCheck();
      fixture.detectChanges();

      const pillarEl = el.querySelector('.blog-pillar');
      expect(pillarEl?.getAttribute('aria-label')).toEqual('ZZ');
    });
  });
});
