import { Component, provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AnalyticsService } from '../../services/analytics/analytics.service';
import { ShareBarComponent } from './share-bar.component';

@Component({
  standalone: true,
  imports: [ShareBarComponent],
  template: `<sdux-share-bar [title]="title" [url]="url" />`
})
class TestHostComponent {
  title = 'Pipeline Overview';
  url = 'https://www.sdux-vault.com/blog/pipeline-overview-video';
}

@Component({
  standalone: true,
  imports: [ShareBarComponent],
  template: `<sdux-share-bar [title]="title" [url]="url" [type]="type" />`
})
class TypeHostComponent {
  title = 'Test';
  url = 'https://www.sdux-vault.com/test';
  type = 'video';
}

@Component({
  standalone: true,
  imports: [ShareBarComponent],
  template: `<sdux-share-bar
    [title]="title"
    [url]="url"
    [displayMessage]="displayMessage" />`
})
class DisplayMessageHostComponent {
  title = 'Test';
  url = 'https://www.sdux-vault.com/test';
  displayMessage = false;
}

describe('Component: ShareBar', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;
  let analyticsService: jasmine.SpyObj<AnalyticsService>;

  beforeEach(async () => {
    analyticsService = jasmine.createSpyObj('AnalyticsService', [
      'trackShareInteraction'
    ]);

    await TestBed.configureTestingModule({
      imports: [
        TestHostComponent,
        TypeHostComponent,
        DisplayMessageHostComponent
      ],
      providers: [
        provideZonelessChangeDetection(),
        { provide: AnalyticsService, useValue: analyticsService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    const shareBar = fixture.nativeElement.querySelector('sdux-share-bar');
    expect(shareBar).toBeTruthy();
  });

  it('should render the share label with default type', () => {
    const label = fixture.nativeElement.querySelector('.section-title');
    expect(label.textContent).toContain('Share the post');
  });

  it('should render the share message by default', () => {
    const message = fixture.nativeElement.querySelector('.section-body p');
    expect(message).toBeTruthy();
    expect(message.textContent).toContain('If this saved you time');
  });

  it('should hide the share label when displayMessage is false', () => {
    const messageFixture = TestBed.createComponent(DisplayMessageHostComponent);
    messageFixture.detectChanges();

    const label = messageFixture.nativeElement.querySelector('.section-title');
    expect(label).toBeNull();
  });

  it('should hide the share message when displayMessage is false', () => {
    const messageFixture = TestBed.createComponent(DisplayMessageHostComponent);
    messageFixture.detectChanges();

    const message =
      messageFixture.nativeElement.querySelector('.section-body p');
    expect(message).toBeNull();
  });

  it('should still render share links when displayMessage is false', () => {
    const messageFixture = TestBed.createComponent(DisplayMessageHostComponent);
    messageFixture.detectChanges();

    const links =
      messageFixture.nativeElement.querySelectorAll('.share-bar-links a');
    expect(links.length).toBe(8);
  });

  it('should render all share links', () => {
    const links = fixture.nativeElement.querySelectorAll('.share-bar-links a');
    expect(links.length).toBe(8);
  });

  it('should render the copy button', () => {
    const btn = fixture.nativeElement.querySelector('.share-bar-copy');
    expect(btn).toBeTruthy();
  });

  it('should generate X share link with encoded title and URL', () => {
    const link = fixture.nativeElement.querySelector(
      'a[aria-label="Share on X"]'
    );
    expect(link.href).toContain('twitter.com/intent/tweet');
    expect(link.href).toContain(
      encodeURIComponent('SDuX Vault: Pipeline Overview')
    );
    expect(link.href).toContain(
      encodeURIComponent(
        'https://www.sdux-vault.com/blog/pipeline-overview-video'
      )
    );
  });

  it('should generate Bluesky share link', () => {
    const link = fixture.nativeElement.querySelector(
      'a[aria-label="Share on Bluesky"]'
    );
    expect(link.href).toContain('bsky.app/intent/compose');
  });

  it('should generate Mastodon share link', () => {
    const link = fixture.nativeElement.querySelector(
      'a[aria-label="Share on Mastodon"]'
    );
    expect(link.href).toContain('mastodon.social/share');
  });

  it('should generate LinkedIn share link', () => {
    const link = fixture.nativeElement.querySelector(
      'a[aria-label="Share on LinkedIn"]'
    );
    expect(link.href).toContain('linkedin.com/sharing/share-offsite');
  });

  it('should generate Reddit share link', () => {
    const link = fixture.nativeElement.querySelector(
      'a[aria-label="Share on Reddit"]'
    );
    expect(link.href).toContain('reddit.com/submit');
  });

  it('should generate Hacker News share link', () => {
    const link = fixture.nativeElement.querySelector(
      'a[aria-label="Share on Hacker News"]'
    );
    expect(link.href).toContain('news.ycombinator.com/submitlink');
  });

  it('should generate Facebook share link', () => {
    const link = fixture.nativeElement.querySelector(
      'a[aria-label="Share on Facebook"]'
    );
    expect(link.href).toContain('facebook.com/sharer');
  });

  it('should generate email share link', () => {
    const link = fixture.nativeElement.querySelector(
      'a[aria-label="Share via email"]'
    );
    expect(link.href).toContain('mailto:');
  });

  it('should copy the URL to clipboard on button click', () => {
    const writeTextSpy = spyOn(navigator.clipboard, 'writeText');
    const btn = fixture.nativeElement.querySelector('.share-bar-copy');
    btn.click();
    expect(writeTextSpy).toHaveBeenCalledWith(
      'https://www.sdux-vault.com/blog/pipeline-overview-video'
    );
    expect(analyticsService.trackShareInteraction).toHaveBeenCalledOnceWith({
      contentType: 'post',
      contentUrl: 'https://www.sdux-vault.com/blog/pipeline-overview-video',
      platform: 'clipboard',
      action: 'copy'
    });
  });

  it('should track the selected social platform', () => {
    const link = fixture.debugElement.query(
      By.css('a[aria-label="Share on Bluesky"]')
    );

    link.triggerEventHandler('click');

    expect(analyticsService.trackShareInteraction).toHaveBeenCalledOnceWith({
      contentType: 'post',
      contentUrl: 'https://www.sdux-vault.com/blog/pipeline-overview-video',
      platform: 'bluesky',
      action: 'share'
    });
  });

  it('should update links when inputs change', () => {
    host.title = 'New Title';
    host.url = 'https://www.sdux-vault.com/blog/new-post';
    fixture.changeDetectorRef.markForCheck();
    fixture.detectChanges();

    const link = fixture.nativeElement.querySelector(
      'a[aria-label="Share on X"]'
    );
    expect(link.href).toContain(encodeURIComponent('SDuX Vault: New Title'));
    expect(link.href).toContain(
      encodeURIComponent('https://www.sdux-vault.com/blog/new-post')
    );
  });

  it('should display custom type in label', async () => {
    const typeFixture = TestBed.createComponent(TypeHostComponent);
    typeFixture.detectChanges();

    const label = typeFixture.nativeElement.querySelector('.section-title');
    expect(label.textContent).toContain('Share the video');
  });

  it('should track the configured content type', () => {
    const typeFixture = TestBed.createComponent(TypeHostComponent);
    typeFixture.detectChanges();
    const link = typeFixture.debugElement.query(
      By.css('a[aria-label="Share on X"]')
    );

    link.triggerEventHandler('click');

    expect(analyticsService.trackShareInteraction).toHaveBeenCalledOnceWith({
      contentType: 'video',
      contentUrl: 'https://www.sdux-vault.com/test',
      platform: 'x',
      action: 'share'
    });
  });
});
