import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LeftRightNavigationDirective } from './left-right-navigation.directive';

@Component({
  standalone: true,
  imports: [LeftRightNavigationDirective],
  template: `
    <div sduxLeftRightNavigation (previous)="onPrevious()" (next)="onNext()">
      <input class="test-input" />
      <textarea class="test-textarea"></textarea>
      <select class="test-select">
        <option>a</option>
      </select>
    </div>
  `
})
class TestHostComponent {
  previousCount = 0;
  nextCount = 0;

  onPrevious(): void {
    this.previousCount++;
  }

  onNext(): void {
    this.nextCount++;
  }
}

describe('JkNavDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestHostComponent]
    });
    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  function pressKey(key: string, target?: HTMLElement): void {
    const event = new KeyboardEvent('keydown', { key, bubbles: true });
    (target ?? document).dispatchEvent(event);
  }

  it('should emit previous on j key', () => {
    pressKey('j');
    expect(host.previousCount).toBe(1);
  });

  it('should emit previous on ArrowLeft key', () => {
    pressKey('ArrowLeft');
    expect(host.previousCount).toBe(1);
  });

  it('should emit next on l key', () => {
    pressKey('l');
    expect(host.nextCount).toBe(1);
  });

  it('should emit next on ArrowRight key', () => {
    pressKey('ArrowRight');
    expect(host.nextCount).toBe(1);
  });

  it('should not emit when focus is on an input', () => {
    const input = fixture.nativeElement.querySelector(
      '.test-input'
    ) as HTMLInputElement;
    pressKey('j', input);
    pressKey('l', input);
    expect(host.previousCount).toBe(0);
    expect(host.nextCount).toBe(0);
  });

  it('should not emit when focus is on a textarea', () => {
    const textarea = fixture.nativeElement.querySelector(
      '.test-textarea'
    ) as HTMLTextAreaElement;
    pressKey('j', textarea);
    pressKey('l', textarea);
    expect(host.previousCount).toBe(0);
    expect(host.nextCount).toBe(0);
  });

  it('should not emit when focus is on a select', () => {
    const select = fixture.nativeElement.querySelector(
      '.test-select'
    ) as HTMLSelectElement;
    pressKey('j', select);
    pressKey('l', select);
    expect(host.previousCount).toBe(0);
    expect(host.nextCount).toBe(0);
  });

  it('should ignore unrelated keys', () => {
    pressKey('a');
    pressKey('Escape');
    pressKey('Enter');
    expect(host.previousCount).toBe(0);
    expect(host.nextCount).toBe(0);
  });
});
