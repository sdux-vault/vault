import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EscapeCloseDirective } from './escape-close.directive';

@Component({
  standalone: true,
  imports: [EscapeCloseDirective],
  template: `
    <div sduxEscapeClose (escapeClose)="onClose()">
      <input class="test-input" />
      <textarea class="test-textarea"></textarea>
      <select class="test-select">
        <option>a</option>
      </select>
    </div>
  `
})
class TestHostComponent {
  closeCount = 0;

  onClose(): void {
    this.closeCount++;
  }
}

describe('EscapeCloseDirective', () => {
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

  it('should emit escapeClose on Escape key', () => {
    pressKey('Escape');
    expect(host.closeCount).toBe(1);
  });

  it('should not emit when focus is on an input', () => {
    const input = fixture.nativeElement.querySelector(
      '.test-input'
    ) as HTMLInputElement;
    pressKey('Escape', input);
    expect(host.closeCount).toBe(0);
  });

  it('should not emit when focus is on a textarea', () => {
    const textarea = fixture.nativeElement.querySelector(
      '.test-textarea'
    ) as HTMLTextAreaElement;
    pressKey('Escape', textarea);
    expect(host.closeCount).toBe(0);
  });

  it('should not emit when focus is on a select', () => {
    const select = fixture.nativeElement.querySelector(
      '.test-select'
    ) as HTMLSelectElement;
    pressKey('Escape', select);
    expect(host.closeCount).toBe(0);
  });

  it('should ignore non-escape keys', () => {
    pressKey('Enter');
    pressKey('a');
    expect(host.closeCount).toBe(0);
  });
});
