import { Component, provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import Prism from 'prismjs';
import { PrismHighlightDirective } from './prism-highlight.directive';

@Component({
  standalone: true,
  imports: [PrismHighlightDirective],
  template: `<code sduxPrismHighlight>const value = true;</code>`
})
class PrismHighlightTestComponent {}

describe('Directive: PrismHighlightDirective', () => {
  it('should highlight its code element after the view initializes', () => {
    TestBed.configureTestingModule({
      imports: [PrismHighlightTestComponent],
      providers: [provideZonelessChangeDetection()]
    });
    const prismSpy = spyOn(Prism, 'highlightElement');
    const fixture = TestBed.createComponent(PrismHighlightTestComponent);

    fixture.detectChanges();

    const codeElement = fixture.nativeElement.querySelector('code');
    expect(prismSpy).toHaveBeenCalledOnceWith(codeElement);
  });
});
