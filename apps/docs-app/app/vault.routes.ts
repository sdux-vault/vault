import { Routes } from '@angular/router';
import { dashboardAuthenticationGuard } from './dashboard/utils/authentication.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./splash-page/splash-page.component').then(
        (m) => m.SplashPageComponent
      )
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./splash-page/splash-page.component').then(
        (m) => m.SplashPageComponent
      )
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./docs/top-tier/contact-us/contact.component').then(
        (m) => m.ContactComponent
      )
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
    canActivate: [dashboardAuthenticationGuard]
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./dashboard/login/login.component').then((m) => m.LoginComponent)
  },
  {
    path: 'press',
    data: { category: 'welcome' },
    loadComponent: () =>
      import('./docs/top-tier/press/press.component').then(
        (m) => m.DocsTopTierPressComponent
      )
  },
  {
    path: 'press-kit',
    redirectTo: 'press'
  },
  {
    path: 'tutorial',
    children: [
      {
        path: 'angular',
        data: { category: 'tutorial' },
        loadComponent: () =>
          import('./docs/tutorial/tutorial.component').then(
            (m) => m.TutorialComponent
          )
      }
    ]
  },
  {
    path: 'sdux',
    children: [
      {
        path: 'training',
        data: { category: 'sdux', type: 'training' },
        loadComponent: () =>
          import('./docs/sdux/sdux-training/sdux-training.component').then(
            (m) => m.SDuXTrainingOverviewComponent
          )
      },
      {
        path: 'vault',
        data: { category: 'sdux', type: 'vault' },
        loadComponent: () =>
          import('./docs/sdux/sdux-vault/sdux-vault.component').then(
            (m) => m.SDuXVaultOverviewComponent
          )
      },
      {
        path: 'enterprise',
        data: { category: 'sdux', type: 'enterprise' },
        loadComponent: () =>
          import('./docs/sdux/sdux-enterprise/sdux-enterprise.component').then(
            (m) => m.SDuXEnterpriseOverviewComponent
          )
      }
    ]
  },
  {
    path: 'signup',
    loadComponent: () =>
      import('./dashboard/sign-up/sign-up.component').then(
        (m) => m.SignupComponent
      )
  },
  {
    path: 'blog',
    loadChildren: () => import('./blog/blog.routes').then((m) => m.blogRoutes)
  },
  {
    path: 'builder',
    loadComponent: () =>
      import('./builder/pipeline-builder-splashpage.component').then(
        (m) => m.PipelineBuilderSplashpageComponent
      )
  },
  {
    path: 'sitemap',
    loadComponent: () =>
      import('./sitemap/sitemap.component').then((m) => m.SitemapComponent)
  },
  {
    path: 'examples/:language/:id',
    data: { category: 'stackblitz' },
    loadComponent: () =>
      import('./example-detail/example-detail.component').then(
        (m) => m.ExampleDetailComponent
      )
  },
  {
    path: 'stackblitz',
    data: { category: 'stackblitz' },
    loadComponent: () =>
      import('./docs/stack-blitz/stack-blitz.component').then(
        (m) => m.StackBlitzOverviewComponent
      )
  },
  {
    path: 'docs',
    children: [
      {
        path: '',
        pathMatch: 'full',
        data: { category: 'docs' },
        loadComponent: () =>
          import('./docs-index/docs-index.component').then(
            (m) => m.DocsIndexComponent
          )
      },
      {
        path: 'dev-tools',
        data: { category: 'dev-tools' },
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./docs/dev-tools/dev-tools-landingpage.component').then(
                (m) => m.DevtoolsLandingPageComponent
              )
          },
          {
            path: ':type',
            loadComponent: () =>
              import('./docs/dev-tools/dev-tools-landingpage.component').then(
                (m) => m.DevtoolsLandingPageComponent
              )
          }
        ]
      },

      {
        path: 'diagrams',
        data: { category: 'welcome' },
        loadComponent: () =>
          import('./docs/diagrams/diagrams.component').then(
            (m) => m.DocsDiagramDocumenationComponent
          )
      },

      {
        path: 'videos',
        data: { category: 'welcome' },
        loadComponent: () =>
          import('./docs/videos/videos.component').then(
            (m) => m.DocsVideoDocumentationComponent
          )
      },

      {
        path: 'global-error-handler',
        loadComponent: () =>
          import('./docs/global-error-handler/global-error-handler.component').then(
            (m) => m.GlobalErrorHandlerComponent
          )
      },

      {
        path: 'migration',
        loadComponent: () =>
          import('./docs/migration/migration.component').then(
            (m) => m.DocsMigrationComponent
          ),
        data: { category: 'migration' }
      },

      {
        path: 'pipeline',
        children: [
          {
            path: '',
            data: { category: 'pipeline-overview' },
            loadComponent: () =>
              import('./docs/pipeline/pipeline.splashpage.component').then(
                (m) => m.PipelineSplashpageComponent
              )
          },
          {
            path: 'addons',
            children: [
              {
                path: 'what-is-an-addon',
                data: { category: 'pipeline-overview' },
                loadComponent: () =>
                  import('./docs/pipeline/behaviors/what-is-an-addon/what-is-an-addon.pipeline.component').then(
                    (m) => m.PipelineWhatIsAnAddonComponent
                  )
              },
              {
                path: 'how-to-build-an-addon',
                data: { category: 'pipeline-overview' },
                loadComponent: () =>
                  import('./docs/pipeline/behaviors/how-to-build-an-addon/how-to-build-an-addon.pipeline.component').then(
                    (m) => m.PipelineHowToBuildAnAddonComponent
                  )
              },
              {
                path: ':category',
                loadComponent: () =>
                  import('./docs/pipeline/behaviors/pipeline-behavior-landingpage.component').then(
                    (m) => m.PipelineBehaviorLandingComponent
                  )
              },
              {
                path: ':category/:type',
                loadComponent: () =>
                  import('./docs/pipeline/behaviors/pipeline-behavior-landingpage.component').then(
                    (m) => m.PipelineBehaviorLandingComponent
                  )
              }
            ]
          },
          {
            path: 'apis',
            children: [
              {
                path: ':category',
                loadComponent: () =>
                  import('./docs/pipeline/api/pipeline-api-landingpage.component').then(
                    (m) => m.PipelineApiLandingComponent
                  )
              },
              {
                path: ':category/:type',
                loadComponent: () =>
                  import('./docs/pipeline/api/pipeline-api-landingpage.component').then(
                    (m) => m.PipelineApiLandingComponent
                  )
              }
            ]
          },
          {
            path: 'behaviors',
            children: [
              {
                path: 'what-is-a-behavior',
                data: { category: 'pipeline-overview' },
                loadComponent: () =>
                  import('./docs/pipeline/behaviors/what-is-a-behavior/what-is-a-behavior.pipeline.component').then(
                    (m) => m.PipelineWhatIsABehaviorComponent
                  )
              },
              {
                path: ':category',
                loadComponent: () =>
                  import('./docs/pipeline/behaviors/pipeline-behavior-landingpage.component').then(
                    (m) => m.PipelineBehaviorLandingComponent
                  )
              },
              {
                path: ':category/:type',
                loadComponent: () =>
                  import('./docs/pipeline/behaviors/pipeline-behavior-landingpage.component').then(
                    (m) => m.PipelineBehaviorLandingComponent
                  )
              }
            ]
          },
          {
            path: 'builder',
            loadComponent: () =>
              import('./builder/pipeline-builder-splashpage.component').then(
                (m) => m.PipelineBuilderSplashpageComponent
              )
          },
          {
            path: 'controllers',
            data: { category: 'controllers' },
            children: [
              {
                path: '',
                loadComponent: () =>
                  import('./docs/pipeline/controllers/what-is-a-controller/what-is-a-controller.pipeline.component').then(
                    (m) => m.PipelineWhatIsAControllerComponent
                  )
              },
              {
                path: 'what-is-a-controller',
                loadComponent: () =>
                  import('./docs/pipeline/controllers/what-is-a-controller/what-is-a-controller.pipeline.component').then(
                    (m) => m.PipelineWhatIsAControllerComponent
                  )
              },
              {
                path: ':type',
                loadComponent: () =>
                  import('./docs/pipeline/controllers/pipeline-controller-landingpage.component').then(
                    (m) => m.PipelineControllerLandingComponent
                  )
              }
            ]
          },
          {
            path: 'execution-guarantee',
            data: { category: 'execution-guarantee' },
            children: [
              {
                path: '',
                loadComponent: () =>
                  import('./docs/pipeline/execution-guarantee/execution-guarantee.pipeline.component').then(
                    (m) => m.PipelineExecutionGuaranteeComponent
                  )
              },
              {
                path: 'decision-engine',
                data: { type: 'decision-engine' },
                loadComponent: () =>
                  import('./docs/pipeline/execution-guarantee/decision-engine/decision-engine.component').then(
                    (m) => m.DecisionEngineComponent
                  )
              },
              {
                path: 'orchestrator',
                data: { type: 'orchestrator' },
                loadComponent: () =>
                  import('./docs/pipeline/execution-guarantee/orchestrator/orchestrator.component').then(
                    (m) => m.OrchestratorComponent
                  )
              },
              {
                path: 'conductor',
                data: { type: 'conductor' },
                loadComponent: () =>
                  import('./docs/pipeline/execution-guarantee/conductor/conductor.component').then(
                    (m) => m.ConductorComponent
                  )
              },
              {
                path: 'conductor-queue',
                loadComponent: () =>
                  import('./docs/pipeline/execution-guarantee/conductor-queue/conductor-queue.component').then(
                    (m) => m.ConductorQueueComponent
                  )
              },
              {
                path: 'isolation',
                loadComponent: () =>
                  import('./docs/pipeline/execution-guarantee/isolation/pipeline-isolation.component').then(
                    (m) => m.PipelineIsolationComponent
                  )
              }
            ]
          },
          {
            path: 'extensions',
            data: { category: 'extensions' },
            children: [
              {
                path: '',
                loadComponent: () =>
                  import('./docs/pipeline/extensions/pipeline-extension-landingpage.component').then(
                    (m) => m.PipelineExtensionsLandingComponent
                  )
              },
              {
                path: ':type',
                loadComponent: () =>
                  import('./docs/pipeline/extensions/pipeline-extension-landingpage.component').then(
                    (m) => m.PipelineExtensionsLandingComponent
                  )
              }
            ]
          },
          {
            path: 'pipeline-architecture',
            data: { category: 'pipeline-overview' },
            loadComponent: () =>
              import('./docs/pipeline/behaviors/complete-pipeline-spec/complete-pipeline-spec.component').then(
                (m) => m.CompletePipelineSpecComponent
              )
          }
        ]
      },

      {
        path: 'references',
        children: [
          {
            path: 'abstracts/:type',
            loadComponent: () =>
              import('./docs/references/abstracts/references-abstracts.component').then(
                (m) => m.ReferencesAbstractsLandingPageComponent
              )
          },
          {
            path: 'behaviors/:type',
            loadComponent: () =>
              import('./docs/references/behaviors/references-behaviors.component').then(
                (m) => m.ReferencesBehaviorsLandingPageComponent
              )
          },
          {
            path: 'classes/:type',
            loadComponent: () =>
              import('./docs/references/classes/references-classes.component').then(
                (m) => m.ReferencesClassesLandingPageComponent
              )
          },
          {
            path: 'config/:type',
            loadComponent: () =>
              import('./docs/references/config/references-config.component').then(
                (m) => m.ReferencesConfigLandingPageComponent
              )
          },
          {
            path: 'const/:type',
            loadComponent: () =>
              import('./docs/references/const/references-const.component').then(
                (m) => m.ReferencesConstLandingPageComponent
              )
          },
          {
            path: 'contexts/:type',
            loadComponent: () =>
              import('./docs/references/contexts/references-contexts.component').then(
                (m) => m.ReferencesContextsLandingPageComponent
              )
          },
          {
            path: 'contracts/:type',
            loadComponent: () =>
              import('./docs/references/contracts/references-contracts.component').then(
                (m) => m.ReferencesContractsLandingPageComponent
              )
          },
          {
            path: 'controllers/:type',
            loadComponent: () =>
              import('./docs/references/controllers/references-controllers.component').then(
                (m) => m.ReferencesControllersLandingPageComponent
              )
          },
          {
            path: 'decorators/:type',
            loadComponent: () =>
              import('./docs/references/decorators/references-decorators.component').then(
                (m) => m.ReferencesDecoratorsLandingPageComponent
              )
          },
          {
            path: 'functions/:type',
            loadComponent: () =>
              import('./docs/references/functions/references-functions.component').then(
                (m) => m.ReferencesFunctionsLandingPageComponent
              )
          },
          {
            path: 'interfaces/:type',
            loadComponent: () =>
              import('./docs/references/interfaces/references-interfaces.component').then(
                (m) => m.ReferencesInterfacesLandingPageComponent
              )
          },
          {
            path: 'options/:type',
            loadComponent: () =>
              import('./docs/references/options/references-options.component').then(
                (m) => m.ReferencesOptionsLandingPageComponent
              )
          },
          {
            path: 'services/:type',
            loadComponent: () =>
              import('./docs/references/services/references-services.component').then(
                (m) => m.ReferencesServicesLandingPageComponent
              )
          },
          {
            path: 'shapes/:type',
            loadComponent: () =>
              import('./docs/references/shapes/references-shapes.component').then(
                (m) => m.ReferencesShapesLandingPageComponent
              )
          },
          {
            path: 'types/:type',
            loadComponent: () =>
              import('./docs/references/types/references-types.component').then(
                (m) => m.ReferencesTypesLandingPageComponent
              )
          }
        ]
      },

      {
        path: 'stackblitz',
        data: { category: 'stackblitz' },
        loadComponent: () =>
          import('./docs/stack-blitz/stack-blitz.component').then(
            (m) => m.StackBlitzOverviewComponent
          )
      },

      {
        path: 'welcome',
        data: { category: 'welcome' },
        children: [
          {
            path: ':type',
            loadComponent: () =>
              import('./docs/docs-landingpage.component').then(
                (m) => m.DocsLandingPageComponent
              )
          }
        ]
      }
    ]
  },

  {
    path: '**',
    loadComponent: () =>
      import('./not-found/not-found.component').then((m) => m.NotFoundComponent)
  }
];
