import { Provider, Type } from '@angular/core';
import { FeatureCell } from '@sdux-vault/core';
import { FeatureCellConfig } from '@sdux-vault/engine';
import {
  BehaviorClassContract,
  ControllerClassContract
} from '@sdux-vault/shared';
import { createAngularFeatureCellToken } from '../../tokens/feature-cell-di.token';
import { AngularFeatureCellAdapter } from './feature.cell.adapter';

/**
 * Angular provider factory that registers and exposes a FeatureCell instance.
 *
 * This function creates the dependency injection providers required to construct
 * a FeatureCell, adapt it for Angular-specific consumption, and register it for
 * global access using the provided configuration.
 *
 * @param service - Angular service type associated with the FeatureCell.
 * @param descriptor - Configuration object defining the FeatureCell contract.
 * @param behaviors - Optional list of behavior classes applied to the FeatureCell.
 * @param controllers - Optional list of controller classes applied to the FeatureCell.
 * @returns An array of Angular providers that supply the configured FeatureCell.
 */
export function provideFeatureCell<Service, T>(
  service: Type<Service>,
  descriptor: FeatureCellConfig<T>,
  behaviors: BehaviorClassContract<T>[] = [],
  controllers: ControllerClassContract<T>[] = []
): Provider[] {
  const angularToken = createAngularFeatureCellToken(descriptor.key);

  return [
    {
      provide: angularToken,
      useFactory: () => {
        const coreCell = FeatureCell(descriptor, behaviors, controllers);

        return new AngularFeatureCellAdapter(coreCell).build();
      }
    },

    service
  ];
}
