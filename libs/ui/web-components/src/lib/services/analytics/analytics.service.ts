import { inject, Injectable } from '@angular/core';
import { ANALYTICS_ENABLED } from '../../tokens/analytics-enabled.token';
import { AnalyticsDiagramShape } from './shapes/analytics.diagram.shape';
import { AnalyticsShareShape } from './shapes/analytics.share.shape';
import { AnalyticsStackBlitzShape } from './shapes/analytics.stackblitz.shape';
import { AnalyticsVideoShape } from './shapes/analytics.video.shape';

/**
 * Provides the Google Analytics event function when it is available in the runtime.
 *
 * @param args Supplies the event command and associated values.
 */
declare let gtag: (...args: unknown[]) => void;

/**
 * Sends enabled user interaction events to Google Analytics.
 *
 * The service records framework-specific example actions, diagram clicks, video plays, and content sharing when analytics collection is enabled and the event function is available.
 */
@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  /** Indicates whether the consuming application permits analytics collection. */
  readonly #analyticsEnabled = inject(ANALYTICS_ENABLED);

  /**
   * Determines whether analytics events can be sent by this service.
   *
   * @returns Returns true when analytics collection is enabled and the event function is available.
   */
  #isGtagAvailable(): boolean {
    return this.#analyticsEnabled && typeof gtag === 'function';
  }

  /**
   * Records a framework-specific example launch or link-copy interaction.
   *
   * @param interaction Supplies the example identifier, framework, and action to record.
   */
  trackStackblitzInteraction(interaction: AnalyticsStackBlitzShape): void {
    if (!this.#isGtagAvailable()) {
      return;
    }

    gtag('event', 'stackblitz_interaction', {
      example_id: interaction.exampleId,
      framework: interaction.framework,
      action: interaction.action
    });
  }

  /**
   * Records a diagram click interaction.
   *
   * @param interaction Supplies the diagram identifier and click action to record.
   */
  trackDiagramInteraction(interaction: AnalyticsDiagramShape): void {
    if (!this.#isGtagAvailable()) {
      return;
    }

    gtag('event', 'diagram_interaction', {
      diagram_id: interaction.diagramId,
      action: interaction.action
    });
  }

  /**
   * Records a video play interaction.
   *
   * @param interaction Supplies the video identifier and play action to record.
   */
  trackVideoInteraction(interaction: AnalyticsVideoShape): void {
    if (!this.#isGtagAvailable()) {
      return;
    }

    gtag('event', 'video_interaction', {
      video_id: interaction.videoId,
      action: interaction.action
    });
  }

  /**
   * Records a share-bar interaction.
   *
   * @param interaction Supplies the content, destination, and action to record.
   */
  trackShareInteraction(interaction: AnalyticsShareShape): void {
    if (!this.#isGtagAvailable()) {
      return;
    }

    gtag('event', 'share_interaction', {
      content_type: interaction.contentType,
      content_url: interaction.contentUrl,
      platform: interaction.platform,
      action: interaction.action
    });
  }

  /**
   * Records a file download interaction.
   *
   * @param fileName Supplies the name of the downloaded file to record.
   */
  trackDownloadInteraction(fileName: string): void {
    if (!this.#isGtagAvailable()) {
      return;
    }

    gtag('event', 'download_interaction', {
      file_name: fileName,
      action: 'download'
    });
  }
}
