import { Component, provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GenericTabComponent } from './generic-tab.component';

@Component({
  standalone: true,
  imports: [GenericTabComponent],
  template: `
    <sdux-generic-tab label="Angular with Effects" [alphabetized]="true">
      <pre class="code-inline"><code>effects code</code></pre>
    </sdux-generic-tab>
  `
})
class TestHostComponent {}

@Component({
  standalone: true,
  imports: [GenericTabComponent],
  template: `
    <sdux-generic-tab label="Custom" [alphabetized]="false" [order]="2">
      <pre class="code-inline"><code>custom code</code></pre>
    </sdux-generic-tab>
  `
})
class TestHostWithOrderComponent {}

describe('GenericTabComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent, GenericTabComponent],
      providers: [provideZonelessChangeDetection()]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('sdux-generic-tab')).toBeTruthy();
  });

  it('should expose the label input', () => {
    const component = fixture.debugElement.children[0]
      .componentInstance as GenericTabComponent;
    expect(component.label()).toBe('Angular with Effects');
  });

  it('should default alphabetized to true', () => {
    const component = fixture.debugElement.children[0]
      .componentInstance as GenericTabComponent;
    expect(component.alphabetized()).toBe(true);
  });

  it('should default order to undefined', () => {
    const component = fixture.debugElement.children[0]
      .componentInstance as GenericTabComponent;
    expect(component.order()).toBeUndefined();
  });

  it('should expose a template reference', () => {
    const component = fixture.debugElement.children[0]
      .componentInstance as GenericTabComponent;
    expect(component.template).toBeTruthy();
  });
});

describe('GenericTabComponent with order', () => {
  let fixture: ComponentFixture<TestHostWithOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostWithOrderComponent, GenericTabComponent],
      providers: [provideZonelessChangeDetection()]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostWithOrderComponent);
    fixture.detectChanges();
  });

  it('should accept an explicit order value', () => {
    const component = fixture.debugElement.children[0]
      .componentInstance as GenericTabComponent;
    expect(component.order()).toBe(2);
  });

  it('should set alphabetized to false when provided', () => {
    const component = fixture.debugElement.children[0]
      .componentInstance as GenericTabComponent;
    expect(component.alphabetized()).toBe(false);
  });
});
