import { Component, provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTabsModule } from '@angular/material/tabs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { GenericTabComponent } from '../generic-tab/generic-tab.component';
import { MultiFrameworkExampleComponent } from './multi-framework-example.component';

@Component({
  standalone: true,
  imports: [MultiFrameworkExampleComponent],
  template: `
    <sdux-multi-framework-example description="Sealed Pipeline">
      <ng-template #angular>
        <pre class="code-inline"><code>angular code</code></pre>
      </ng-template>
      <ng-template #core>
        <pre class="code-inline"><code>core code</code></pre>
      </ng-template>
    </sdux-multi-framework-example>
  `
})
class TestHostComponent {}

@Component({
  standalone: true,
  imports: [MultiFrameworkExampleComponent, GenericTabComponent],
  template: `
    <sdux-multi-framework-example description="Testing">
      <ng-template #angular>
        <pre class="code-inline"><code>angular code</code></pre>
      </ng-template>
      <ng-template #core>
        <pre class="code-inline"><code>core code</code></pre>
      </ng-template>
      <sdux-generic-tab label="Angular with Effects" [alphabetized]="true">
        <pre class="code-inline"><code>generic code</code></pre>
      </sdux-generic-tab>
    </sdux-multi-framework-example>
  `
})
class TestHostWithGenericComponent {}

@Component({
  standalone: true,
  imports: [MultiFrameworkExampleComponent, GenericTabComponent],
  template: `
    <sdux-multi-framework-example description="Testing">
      <ng-template #angular>
        <pre class="code-inline"><code>angular code</code></pre>
      </ng-template>
      <ng-template #core>
        <pre class="code-inline"><code>core code</code></pre>
      </ng-template>
      <sdux-generic-tab label="Custom Tab" [alphabetized]="false" [order]="1">
        <pre class="code-inline"><code>generic code</code></pre>
      </sdux-generic-tab>
    </sdux-multi-framework-example>
  `
})
class TestHostWithOrderComponent {}

describe('MultiFrameworkExampleComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TestHostComponent,
        MultiFrameworkExampleComponent,
        MatTabsModule,
        NoopAnimationsModule
      ],
      providers: [provideZonelessChangeDetection()]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    const el: HTMLElement = fixture.nativeElement;
    const container = el.querySelector('.sdux-tab-container');
    expect(container).toBeTruthy();
  });

  it('should render ten tabs in alphabetical order', () => {
    const el: HTMLElement = fixture.nativeElement;
    const tabLabels = el.querySelectorAll('.mat-mdc-tab');
    const labels = Array.from(tabLabels).map((tab) => tab.textContent?.trim());
    expect(labels).toEqual([
      'Angular',
      'Bun',
      'Deno',
      'Node.js',
      'React',
      'Solid',
      'Svelte',
      'Vanilla JS',
      'Vue',
      'Web Components'
    ]);
  });

  it('should project the angular template into the Angular tab', () => {
    const el: HTMLElement = fixture.nativeElement;
    const firstPanel = el.querySelector('.tab-panel');
    expect(firstPanel?.textContent).toContain('angular code');
  });

  it('should project the core template into all non-Angular tabs', () => {
    const el: HTMLElement = fixture.nativeElement;
    const panels = el.querySelectorAll('.tab-panel');
    for (let i = 1; i < panels.length; i++) {
      expect(panels[i]?.textContent).toContain('core code');
    }
  });

  it('should generate correct labels with the description input', () => {
    const component = fixture.debugElement.children[0].componentInstance;
    expect(component.description()).toBe('Sealed Pipeline');
  });

  it('should set selectedIndex to 0', () => {
    const el: HTMLElement = fixture.nativeElement;
    const firstTab = el.querySelector('.mat-mdc-tab');
    expect(firstTab?.classList).toContain('mdc-tab--active');
  });
});

describe('MultiFrameworkExampleComponent with generic (alphabetized)', () => {
  let fixture: ComponentFixture<TestHostWithGenericComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TestHostWithGenericComponent,
        MultiFrameworkExampleComponent,
        MatTabsModule,
        NoopAnimationsModule
      ],
      providers: [provideZonelessChangeDetection()]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostWithGenericComponent);
    fixture.detectChanges();
  });

  it('should insert the generic tab alphabetically', () => {
    const el: HTMLElement = fixture.nativeElement;
    const tabLabels = el.querySelectorAll('.mat-mdc-tab');
    const labels = Array.from(tabLabels).map((tab) => tab.textContent?.trim());
    expect(labels[1]).toBe('Angular with Effects');
    expect(labels.length).toBe(11);
  });

  it('should project the generic template into the generic tab', () => {
    const el: HTMLElement = fixture.nativeElement;
    const panels = el.querySelectorAll('.tab-panel');
    expect(panels[1]?.textContent).toContain('generic code');
  });
});

describe('MultiFrameworkExampleComponent with generic (order)', () => {
  let fixture: ComponentFixture<TestHostWithOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TestHostWithOrderComponent,
        MultiFrameworkExampleComponent,
        MatTabsModule,
        NoopAnimationsModule
      ],
      providers: [provideZonelessChangeDetection()]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostWithOrderComponent);
    fixture.detectChanges();
  });

  it('should insert the generic tab at the specified order position', () => {
    const el: HTMLElement = fixture.nativeElement;
    const tabLabels = el.querySelectorAll('.mat-mdc-tab');
    const labels = Array.from(tabLabels).map((tab) => tab.textContent?.trim());
    expect(labels[1]).toBe('Custom Tab');
    expect(labels[0]).toBe('Angular');
    expect(labels.length).toBe(11);
  });

  it('should project the generic template at the ordered position', () => {
    const el: HTMLElement = fixture.nativeElement;
    const panels = el.querySelectorAll('.tab-panel');
    expect(panels[1]?.textContent).toContain('generic code');
  });
});
