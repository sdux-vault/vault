import { Component, inject, OnDestroy } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import {
  CatchPhraseComponent,
  CatchPhraseService,
  ImageComponent
} from '@sdux-vault/ui/web-components';

@Component({
  selector: 'sdux-not-found',
  template: `<div class="not-found-container">
    <div class="logo-block">
      <sdux-image
        image="brand/sdux/brand-landscape.svg"
        tooltip="SDuX - {{ catchPhrase.value }}." />
      <div class="sub-title"><sdux-catch-phrase /></div>
    </div>

    <h1 class="title">404 - Page Not Found</h1>
    <p class="message">
      The page you’re looking for doesn’t exist or has moved.
    </p>

    <a routerLinkActive="active" routerLink="/" class="home-link"
      >Return Home</a
    >
  </div>`,
  styleUrls: ['./not-found.component.scss'],
  imports: [ImageComponent, RouterModule, CatchPhraseComponent]
})
export class NotFoundComponent implements OnDestroy {
  catchPhrase = inject(CatchPhraseService);

  #meta = inject(Meta);

  constructor() {
    this.#meta.addTag({ name: 'robots', content: 'noindex' });
  }

  ngOnDestroy(): void {
    this.#meta.removeTag('name="robots"');
  }
}
