import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { sduxTestingModule } from '@sdux-vault/ui/web-components';
import { of } from 'rxjs';
import { PipelineBehaviorLandingComponent } from '../behaviors/pipeline-behavior-landingpage.component';
import { PipelineRoutingDirective } from './pipeline-routing.directive';

describe('Component: PipelineRoutingDirective', () => {
  let fixture: ComponentFixture<PipelineRoutingDirectiveMock>;
  let component: PipelineRoutingDirective;
  let titleService: Title;
  let metaService: Meta;

  @Component({
    selector: 'sdux-pipeline-routing-directive-mock',
    standalone: true,
    imports: [],
    template: ``,
    styles: ``
  })
  class PipelineRoutingDirectiveMock extends PipelineRoutingDirective {
    constructor() {
      super();
    }
  }

  describe('paramMap emits a value', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [sduxTestingModule, PipelineRoutingDirectiveMock],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: {
              paramMap: of(
                convertToParamMap({
                  category: 'encrypt',
                  type: 'aes'
                })
              ),
              fragment: of(),
              snapshot: { data: {} }
            }
          }
        ]
      }).compileComponents();

      fixture = TestBed.createComponent(PipelineRoutingDirectiveMock);
      component = fixture.componentInstance;
      titleService = TestBed.inject(Title);
      metaService = TestBed.inject(Meta);
      fixture.detectChanges();
    });

    it('should trigger markForCheck when paramMap emits', () => {
      expect(component.type).toBe('aes');
      expect(component.category).toBe('encrypt');
    });
  });

  describe('paramMap emits null', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [PipelineBehaviorLandingComponent, sduxTestingModule],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: {
              paramMap: of(convertToParamMap({})),
              fragment: of(),
              snapshot: { data: {} }
            }
          }
        ]
      }).compileComponents();

      fixture = TestBed.createComponent(PipelineRoutingDirectiveMock);
      component = fixture.componentInstance;
      titleService = TestBed.inject(Title);
      metaService = TestBed.inject(Meta);
      fixture.detectChanges();
    });

    it('should default type to "errors" when route param is null', () => {
      expect(component.category).toBe('');
      expect(component.type).toBe('');
    });
  });

  describe('paramMap emits - unknown type', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [PipelineBehaviorLandingComponent, sduxTestingModule],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: {
              paramMap: of(
                convertToParamMap({
                  category: 'stepwise',
                  type: 'unknown-type'
                })
              ),
              fragment: of(),
              snapshot: { data: {} }
            }
          }
        ]
      }).compileComponents();

      fixture = TestBed.createComponent(PipelineRoutingDirectiveMock);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should fall back to "Resolve Examples" when type is unknown', () => {
      expect(component.category).toBe('stepwise');
      expect(component.type).toBe('unknown-type');
    });
  });

  describe('paramMap emits - unknown category', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [PipelineBehaviorLandingComponent, sduxTestingModule],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: {
              paramMap: of(
                convertToParamMap({
                  category: 'unknown-type',
                  type: 'resolve'
                })
              ),
              fragment: of(),
              snapshot: { data: {} }
            }
          }
        ]
      }).compileComponents();

      fixture = TestBed.createComponent(PipelineRoutingDirectiveMock);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should fall back to "Resolve Examples" when type is unknown', () => {
      expect(component.category).toBe('unknown-type');
      expect(component.type).toBe('resolve');
    });
  });

  describe('SEO meta', () => {
    afterEach(() => {
      component.ngOnDestroy();
    });

    describe('when category has title and description', () => {
      beforeEach(async () => {
        await TestBed.configureTestingModule({
          imports: [sduxTestingModule, PipelineRoutingDirectiveMock],
          providers: [
            {
              provide: ActivatedRoute,
              useValue: {
                paramMap: of(
                  convertToParamMap({
                    category: 'welcome'
                  })
                ),
                fragment: of(),
                snapshot: { data: { category: 'welcome' } }
              }
            }
          ]
        }).compileComponents();

        fixture = TestBed.createComponent(PipelineRoutingDirectiveMock);
        component = fixture.componentInstance;
        titleService = TestBed.inject(Title);
        metaService = TestBed.inject(Meta);
        fixture.detectChanges();
      });

      it('should set the page title from the registry', () => {
        expect(titleService.getTitle()).toContain('Getting Started');
      });

      it('should set the meta description from the registry', () => {
        const tag = metaService.getTag('name="description"');
        expect(tag).toBeTruthy();
        expect(tag?.content).toContain('SDuX Vault');
      });
    });

    describe('when category has item with title and description', () => {
      beforeEach(async () => {
        await TestBed.configureTestingModule({
          imports: [sduxTestingModule, PipelineRoutingDirectiveMock],
          providers: [
            {
              provide: ActivatedRoute,
              useValue: {
                paramMap: of(
                  convertToParamMap({
                    category: 'welcome',
                    type: 'core-concepts'
                  })
                ),
                fragment: of(),
                snapshot: { data: {} }
              }
            }
          ]
        }).compileComponents();

        fixture = TestBed.createComponent(PipelineRoutingDirectiveMock);
        component = fixture.componentInstance;
        titleService = TestBed.inject(Title);
        metaService = TestBed.inject(Meta);
        fixture.detectChanges();
      });

      it('should set the page title from the item', () => {
        expect(titleService.getTitle()).toContain('Core Concepts');
      });

      it('should set the meta description from the item', () => {
        const tag = metaService.getTag('name="description"');
        expect(tag).toBeTruthy();
        expect(tag?.content).toContain('FeatureCell');
      });
    });

    describe('when category has no SEO meta', () => {
      beforeEach(async () => {
        await TestBed.configureTestingModule({
          imports: [sduxTestingModule, PipelineRoutingDirectiveMock],
          providers: [
            {
              provide: ActivatedRoute,
              useValue: {
                paramMap: of(
                  convertToParamMap({
                    category: 'unknown-category'
                  })
                ),
                fragment: of(),
                snapshot: { data: {} }
              }
            }
          ]
        }).compileComponents();

        fixture = TestBed.createComponent(PipelineRoutingDirectiveMock);
        component = fixture.componentInstance;
        titleService = TestBed.inject(Title);
        metaService = TestBed.inject(Meta);
        fixture.detectChanges();
      });

      it('should not set a meta description', () => {
        const tag = metaService.getTag('name="description"');
        expect(tag).toBeFalsy();
      });
    });

    describe('ngOnDestroy', () => {
      beforeEach(async () => {
        await TestBed.configureTestingModule({
          imports: [sduxTestingModule, PipelineRoutingDirectiveMock],
          providers: [
            {
              provide: ActivatedRoute,
              useValue: {
                paramMap: of(
                  convertToParamMap({
                    category: 'welcome'
                  })
                ),
                fragment: of(),
                snapshot: { data: { category: 'welcome' } }
              }
            }
          ]
        }).compileComponents();

        fixture = TestBed.createComponent(PipelineRoutingDirectiveMock);
        component = fixture.componentInstance;
        titleService = TestBed.inject(Title);
        metaService = TestBed.inject(Meta);
        fixture.detectChanges();
      });

      it('should remove the meta description tag on destroy', () => {
        expect(metaService.getTag('name="description"')).toBeTruthy();
        component.ngOnDestroy();
        expect(metaService.getTag('name="description"')).toBeFalsy();
      });
    });
  });
});
