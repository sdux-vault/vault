import { Injectable } from '@angular/core';
import { RELATED_TOPICS_REGISTRY } from '../constants/related-topics.registry';
import { RelatedTopicLinkContainerShape } from '../shapes/related-topic-link-container.shape';
import { RelatedTopicLinkShape } from '../shapes/related-topic-link.shape';
import { RelatedTopicCagtegoryKey } from '../shapes/related-topic-registry.category.shape';
import { RelatedTopicGlobalKey } from '../shapes/related-topic-registry.global.shape';
import {
  RelatedTopicLinkType,
  RelatedTopicLinkTypes
} from '../types/related-topic-link.type';

@Injectable({ providedIn: 'root' })
export class RelatedTopicsService {
  #aliases: Record<string, string> = {};

  #buildSeenLink(link: RelatedTopicLinkShape): string {
    return `${link.link}${link.fragment}`;
  }

  #findAlias(category: string): string | undefined {
    return this.#aliases[category];
  }

  resolve(context: {
    category: string;
    type?: string;
  }): RelatedTopicLinkContainerShape {
    let id = 1;

    const linkContainer: RelatedTopicLinkContainerShape = {
      links: [],
      crossLinks: [],
      globalLinks: [],
      globalCrossLinks: []
    };
    const seen = new Set<string>();

    const addLinks = (
      link: RelatedTopicLinkShape,
      type: RelatedTopicLinkType
    ) => {
      const seenLink = this.#buildSeenLink(link);
      if (!seen.has(seenLink)) {
        seen.add(seenLink);
        link.id = id++;
        switch (type) {
          case RelatedTopicLinkTypes.Link: {
            linkContainer.links.push(link);
            return;
          }

          case RelatedTopicLinkTypes.CrossLink: {
            linkContainer.crossLinks.push(link);
            return;
          }

          case RelatedTopicLinkTypes.GlobalLink: {
            linkContainer.globalLinks.push(link);
            return;
          }

          case RelatedTopicLinkTypes.GlobalCrosslLink: {
            linkContainer.globalCrossLinks.push(link);
            return;
          }
        }
      }
    };

    let current =
      RELATED_TOPICS_REGISTRY.categories[
        context.category as RelatedTopicCagtegoryKey
      ];

    if (!current) {
      current =
        RELATED_TOPICS_REGISTRY.categories[
          context.type as RelatedTopicCagtegoryKey
        ];

      const alias = this.#findAlias(context.category);

      if (alias) {
        current =
          RELATED_TOPICS_REGISTRY.categories[alias as RelatedTopicCagtegoryKey];
      } else {
        return linkContainer;
      }
    }

    // 4. Category items (exclude self)
    current.items?.forEach((item: RelatedTopicLinkShape) => {
      if (!context.type || !item.link.endsWith(`/${context.type}`)) {
        addLinks(item, RelatedTopicLinkTypes.Link);
      }
    });

    // 5. Cross-category inclusion (entire categories)
    current.cross?.forEach((crossKey: RelatedTopicCagtegoryKey) => {
      if (crossKey === context.category) return; // defensive

      const crossCategory = RELATED_TOPICS_REGISTRY.categories[crossKey];
      if (!crossCategory) return;

      addLinks(
        {
          link: crossCategory.baseRoute,
          display: crossCategory.baseDisplay
        },
        RelatedTopicLinkTypes.CrossLink
      );

      crossCategory.items?.forEach((item: RelatedTopicLinkShape) => {
        if (!item.link.endsWith(`/${context.type}`)) {
          addLinks(item, RelatedTopicLinkTypes.CrossLink);
        }
      });
    });

    // 1. globals
    current.globals?.forEach((groupName: RelatedTopicGlobalKey) => {
      const group = RELATED_TOPICS_REGISTRY.globals[groupName];
      group?.forEach((link: RelatedTopicLinkShape) =>
        addLinks(link, RelatedTopicLinkTypes.GlobalLink)
      );
    });

    // 2. Category-specific globals
    current.globalCross?.forEach((groupName: RelatedTopicGlobalKey) => {
      const group = RELATED_TOPICS_REGISTRY.globals[groupName];
      group?.forEach((link: RelatedTopicLinkShape) =>
        addLinks(link, RelatedTopicLinkTypes.GlobalCrosslLink)
      );
    });

    // 3. Category base (exclude if already on root)
    if (context.type && current.baseDisplay) {
      addLinks(
        {
          link: current.baseRoute,
          display: current.baseDisplay
        },
        RelatedTopicLinkTypes.Link
      );
    }

    // Now sort

    linkContainer.crossLinks.sort(
      (a: RelatedTopicLinkShape, b: RelatedTopicLinkShape) =>
        a.display.localeCompare(b.display)
    );

    linkContainer.globalCrossLinks.sort(
      (a: RelatedTopicLinkShape, b: RelatedTopicLinkShape) =>
        a.display.localeCompare(b.display)
    );

    linkContainer.links.sort(
      (a: RelatedTopicLinkShape, b: RelatedTopicLinkShape) =>
        a.display.localeCompare(b.display)
    );

    return linkContainer;
  }
}
