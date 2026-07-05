import { Component, provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTabsModule } from '@angular/material/tabs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FrameworkPreferenceService } from '../../services/framework-preference.service';
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

@Component({
  standalone: true,
  imports: [MultiFrameworkExampleComponent],
  template: `
    <sdux-multi-framework-example
      description="No Copy"
      [displayCopyPaste]="false">
      <ng-template #angular>
        <pre class="code-inline"><code>angular code</code></pre>
      </ng-template>
      <ng-template #core>
        <pre class="code-inline"><code>core code</code></pre>
      </ng-template>
    </sdux-multi-framework-example>
  `
})
class TestHostWithNoCopyComponent {}

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
      <sdux-generic-tab label="Zzz Last Tab" [alphabetized]="true">
        <pre class="code-inline"><code>generic code</code></pre>
      </sdux-generic-tab>
    </sdux-multi-framework-example>
  `
})
class TestHostWithGenericAlphabetizedLastComponent {}

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
      <sdux-generic-tab label="Appended Tab" [alphabetized]="false">
        <pre class="code-inline"><code>generic code</code></pre>
      </sdux-generic-tab>
    </sdux-multi-framework-example>
  `
})
class TestHostWithGenericAppendedComponent {}

@Component({
  standalone: true,
  imports: [MultiFrameworkExampleComponent],
  template: `
    <sdux-multi-framework-example description="Core Only">
      <ng-template #core>
        <pre class="code-inline"><code>core code</code></pre>
      </ng-template>
    </sdux-multi-framework-example>
  `
})
class TestHostCoreOnlyComponent {}

@Component({
  standalone: true,
  imports: [MultiFrameworkExampleComponent],
  template: `
    <sdux-multi-framework-example description="Angular Only">
      <ng-template #angular>
        <pre class="code-inline"><code>angular code</code></pre>
      </ng-template>
    </sdux-multi-framework-example>
  `
})
class TestHostAngularOnlyComponent {}

@Component({
  standalone: true,
  imports: [MultiFrameworkExampleComponent, GenericTabComponent],
  template: `
    <sdux-multi-framework-example description="Core with Generic">
      <ng-template #core>
        <pre class="code-inline"><code>core code</code></pre>
      </ng-template>
      <sdux-generic-tab label="Vue" [alphabetized]="true">
        <pre class="code-inline"><code>vue code</code></pre>
      </sdux-generic-tab>
    </sdux-multi-framework-example>
  `
})
class TestHostCoreWithGenericComponent {}

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
    const tabs = el.querySelectorAll<HTMLElement>('.mat-mdc-tab');
    for (let i = 1; i < tabs.length; i++) {
      tabs[i].click();
      fixture.detectChanges();
      const panel = el.querySelector('.mat-mdc-tab-body-active .tab-panel');
      expect(panel?.textContent).toContain('core code');
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

  it('should default displayCopyPaste to true', () => {
    const component = fixture.debugElement.children[0].componentInstance;
    expect(component.displayCopyPaste()).toBeTrue();
  });

  it('should expose tabLabels with all 10 framework names', () => {
    const component = fixture.debugElement.children[0].componentInstance;
    expect(component.tabLabels()).toEqual([
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
    const tabs = el.querySelectorAll<HTMLElement>('.mat-mdc-tab');
    tabs[1].click();
    fixture.detectChanges();
    const panel = el.querySelector('.mat-mdc-tab-body-active .tab-panel');
    expect(panel?.textContent).toContain('generic code');
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
    const tabs = el.querySelectorAll<HTMLElement>('.mat-mdc-tab');
    tabs[1].click();
    fixture.detectChanges();
    const panel = el.querySelector('.mat-mdc-tab-body-active .tab-panel');
    expect(panel?.textContent).toContain('generic code');
  });
});

describe('MultiFrameworkExampleComponent with displayCopyPaste false', () => {
  let fixture: ComponentFixture<TestHostWithNoCopyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TestHostWithNoCopyComponent,
        MultiFrameworkExampleComponent,
        MatTabsModule,
        NoopAnimationsModule
      ],
      providers: [provideZonelessChangeDetection()]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostWithNoCopyComponent);
    fixture.detectChanges();
  });

  it('should pass displayCopyPaste false to the example viewer', () => {
    const component = fixture.debugElement.children[0].componentInstance;
    expect(component.displayCopyPaste()).toBeFalse();
  });
});

describe('MultiFrameworkExampleComponent with generic (alphabetized last)', () => {
  let fixture: ComponentFixture<TestHostWithGenericAlphabetizedLastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TestHostWithGenericAlphabetizedLastComponent,
        MultiFrameworkExampleComponent,
        MatTabsModule,
        NoopAnimationsModule
      ],
      providers: [provideZonelessChangeDetection()]
    }).compileComponents();

    fixture = TestBed.createComponent(
      TestHostWithGenericAlphabetizedLastComponent
    );
    fixture.detectChanges();
  });

  it('should append the generic tab at the end when it sorts last alphabetically', () => {
    const el: HTMLElement = fixture.nativeElement;
    const tabLabels = el.querySelectorAll('.mat-mdc-tab');
    const labels = Array.from(tabLabels).map((tab) => tab.textContent?.trim());
    expect(labels.length).toBe(11);
    expect(labels[10]).toBe('Zzz Last Tab');
  });
});

describe('MultiFrameworkExampleComponent with generic (appended, not alphabetized)', () => {
  let fixture: ComponentFixture<TestHostWithGenericAppendedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TestHostWithGenericAppendedComponent,
        MultiFrameworkExampleComponent,
        MatTabsModule,
        NoopAnimationsModule
      ],
      providers: [provideZonelessChangeDetection()]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostWithGenericAppendedComponent);
    fixture.detectChanges();
  });

  it('should append the generic tab at the end when not alphabetized and no order', () => {
    const el: HTMLElement = fixture.nativeElement;
    const tabLabels = el.querySelectorAll('.mat-mdc-tab');
    const labels = Array.from(tabLabels).map((tab) => tab.textContent?.trim());
    expect(labels.length).toBe(11);
    expect(labels[10]).toBe('Appended Tab');
  });
});

describe('MultiFrameworkExampleComponent with framework preference', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let preferenceService: FrameworkPreferenceService;

  beforeEach(async () => {
    localStorage.removeItem(FrameworkPreferenceService.STORAGE_KEY);

    await TestBed.configureTestingModule({
      imports: [
        TestHostComponent,
        MultiFrameworkExampleComponent,
        MatTabsModule,
        NoopAnimationsModule
      ],
      providers: [provideZonelessChangeDetection()]
    }).compileComponents();

    preferenceService = TestBed.inject(FrameworkPreferenceService);
    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  afterEach(() => {
    preferenceService.reset();
  });

  it('should show all tabs when no preference is set', () => {
    const component = fixture.debugElement.children[0].componentInstance;
    expect(component.visibleTabs().length).toBe(10);
  });

  it('should show only the preferred tab when a preference is set', () => {
    preferenceService.set('React');
    fixture.detectChanges();
    const component = fixture.debugElement.children[0].componentInstance;
    expect(component.visibleTabs().length).toBe(1);
    expect(component.visibleTabs()[0].label).toBe('React');
  });

  it('should show all tabs when the preferred framework is not in the tab list', () => {
    preferenceService.set('NonExistent');
    fixture.detectChanges();
    const component = fixture.debugElement.children[0].componentInstance;
    expect(component.visibleTabs().length).toBe(10);
  });

  it('should restore all tabs when preference is cleared', () => {
    preferenceService.set('Vue');
    fixture.detectChanges();
    const component = fixture.debugElement.children[0].componentInstance;
    expect(component.visibleTabs().length).toBe(1);

    preferenceService.reset();
    fixture.detectChanges();
    expect(component.visibleTabs().length).toBe(10);
  });
});

describe('MultiFrameworkExampleComponent without angular template', () => {
  let fixture: ComponentFixture<TestHostCoreOnlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TestHostCoreOnlyComponent,
        MultiFrameworkExampleComponent,
        MatTabsModule,
        NoopAnimationsModule
      ],
      providers: [provideZonelessChangeDetection()]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostCoreOnlyComponent);
    fixture.detectChanges();
  });

  it('should exclude the Angular tab when no angular template is provided', () => {
    const el: HTMLElement = fixture.nativeElement;
    const tabLabels = el.querySelectorAll('.mat-mdc-tab');
    const labels = Array.from(tabLabels).map((tab) => tab.textContent?.trim());
    expect(labels.length).toBe(9);
    expect(labels).not.toContain('Angular');
  });

  it('should render core content in all tabs', () => {
    const el: HTMLElement = fixture.nativeElement;
    const firstPanel = el.querySelector('.tab-panel');
    expect(firstPanel?.textContent).toContain('core code');
  });

  it('should expose tabLabels without Angular', () => {
    const component = fixture.debugElement.children[0].componentInstance;
    expect(component.tabLabels()).not.toContain('Angular');
    expect(component.tabLabels().length).toBe(9);
  });
});

describe('MultiFrameworkExampleComponent without core template', () => {
  let fixture: ComponentFixture<TestHostAngularOnlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TestHostAngularOnlyComponent,
        MultiFrameworkExampleComponent,
        MatTabsModule,
        NoopAnimationsModule
      ],
      providers: [provideZonelessChangeDetection()]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostAngularOnlyComponent);
    fixture.detectChanges();
  });

  it('should exclude all core tabs when no core template is provided', () => {
    const el: HTMLElement = fixture.nativeElement;
    const tabLabels = el.querySelectorAll('.mat-mdc-tab');
    const labels = Array.from(tabLabels).map((tab) => tab.textContent?.trim());
    expect(labels.length).toBe(1);
    expect(labels[0]).toBe('Angular');
  });

  it('should render angular content in the Angular tab', () => {
    const el: HTMLElement = fixture.nativeElement;
    const firstPanel = el.querySelector('.tab-panel');
    expect(firstPanel?.textContent).toContain('angular code');
  });

  it('should expose tabLabels with only Angular', () => {
    const component = fixture.debugElement.children[0].componentInstance;
    expect(component.tabLabels()).toEqual(['Angular']);
  });
});

describe('MultiFrameworkExampleComponent without angular template but with generic tab', () => {
  let fixture: ComponentFixture<TestHostCoreWithGenericComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TestHostCoreWithGenericComponent,
        MultiFrameworkExampleComponent,
        MatTabsModule,
        NoopAnimationsModule
      ],
      providers: [provideZonelessChangeDetection()]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostCoreWithGenericComponent);
    fixture.detectChanges();
  });

  it('should render core tabs and the generic tab without Angular', () => {
    const el: HTMLElement = fixture.nativeElement;
    const tabLabels = el.querySelectorAll('.mat-mdc-tab');
    const labels = Array.from(tabLabels).map((tab) => tab.textContent?.trim());
    expect(labels.length).toBe(9);
    expect(labels).not.toContain('Angular');
    expect(labels).toContain('Vue');
  });

  it('should project the generic tab content', () => {
    const el: HTMLElement = fixture.nativeElement;
    const tabs = el.querySelectorAll<HTMLElement>('.mat-mdc-tab');
    const vueIndex = Array.from(tabs).findIndex(
      (tab) => tab.textContent?.trim() === 'Vue'
    );
    tabs[vueIndex].click();
    fixture.detectChanges();
    const panel = el.querySelector('.mat-mdc-tab-body-active .tab-panel');
    expect(panel?.textContent).toContain('vue code');
  });
});
