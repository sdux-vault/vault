/*
 * Public API Surface of web
 */

export { ExampleViewerSourceComponent } from './lib/example-components/example-viewer-source/example-viewer-source.component';
export { ExampleViewerTabComponent } from './lib/example-components/example-viewer-tab/example-viewer-source-tab.component';
export { GenericTabComponent } from './lib/example-components/generic-tab/generic-tab.component';
export { MultiFrameworkExampleComponent } from './lib/example-components/multi-framework-example/multi-framework-example.component';

export { BrandNameComponent } from './lib/helpers/brand-name/brand-name.component';
export { CatchPhraseComponent } from './lib/helpers/catch-phrase/catch-phrase.component';
export { DeprecatedComponent } from './lib/helpers/deprecated/deprecated.component';
export { DiagramComponent } from './lib/helpers/diagram/diagram.component';
export { SDuXDownloadComponent as DownloadComponent } from './lib/helpers/download/download.component';
export { FeatureCellBrandNameComponent } from './lib/helpers/feature-cell-brand-name/feature-cell-brand-name.component';
export { ImageComponent } from './lib/helpers/image/image.component';
export { InfoDialogComponent } from './lib/helpers/info-dialog/info-dialog.component';
export { SDuXNewComponent } from './lib/helpers/new/new.component';
export { OverflowPillDirective } from './lib/helpers/overflow-pill/overflow-pill.directive';
export { PackageNameComponent } from './lib/helpers/package-name/package-name.component';
export { ShareBarComponent } from './lib/helpers/share-bar/share-bar.component';
export { VaultBrandNameComponent } from './lib/helpers/vault-brand-name/vault-brand-name.component';
export { SDuXVideoComponent } from './lib/helpers/video/video.component';

export { AnalyticsService } from './lib/services/analytics/analytics.service';
export { BrandNameService } from './lib/services/brand-name.service';
export { CatchPhraseService } from './lib/services/catch-phrase.service';
export { InfoDialogService } from './lib/services/info-dialog.service';
export { MobileLayoutService } from './lib/services/mobile-layout.service';

export { sduxTestingModule } from './lib/testing-module/sdux.testing.module';

export { ANALYTICS_ENABLED } from './lib/tokens/analytics-enabled.token';
export { SDUX_BRAND_NAME } from './lib/tokens/brand-name.token';
export { SDUX_CATCH_PHRASE } from './lib/tokens/catch-phrase.token';
export { SDUX_FEATURE_CELL_BRAND_NAME } from './lib/tokens/feature-cell-brand-name.token';
export { SDUX_PACKAGE_NAME } from './lib/tokens/package-name.token';
export { SDUX_VAULT_BRAND_NAME } from './lib/tokens/vault-brand-name.token';
export { WINDOW } from './lib/tokens/window.token';

export { windowFactory } from './lib/factory/window.factory';

export type { AnalyticsShareShape } from './lib/services/analytics/shapes/analytics.share.shape';
export type { AnalyticsStackBlitzShape as AnalyticsInteractionShape } from './lib/services/analytics/shapes/analytics.stackblitz.shape';

export type {
  AnalyticsType as AnalyticsInteractionType,
  AnalyticsTypes as AnalyticsInteractionTypes
} from './lib/services/analytics/types/analytics.type';
