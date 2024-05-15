import { provideState, provideStore } from '@ngrx/store';

import { provideEffects } from '@ngrx/effects';
import { isDevMode } from '@angular/core';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import {
  UploadOpsFeatureKey,
  UploadOpsReducer,
} from './shared/store/upload-operation/upload-operation.reducer';
import * as UploadOpsEffect from './shared/store/upload-operation/upload-operation.effects';

import {
  BusesFeatureKey,
  BusesReducer,
} from './buses/data-access/store/buses.reducer';
import * as BusesEffect from './buses/data-access/store/buses.effects';
// import * as carEffect from './shared/store/car/car.effects';
// import {
//   CarFeaturesKey,
//   CarReducer,
// } from '../../../../wp-direct-project/wp-direct/src/app/shared/store/car/car.reducer';

export const storeProviders = {
  providers: [
    provideStore(),
    // provideState(CarFeaturesKey, CarReducer),
    provideState(UploadOpsFeatureKey, UploadOpsReducer),
    provideState(BusesFeatureKey, BusesReducer),
    provideEffects([
      // carEffect,
      UploadOpsEffect,
      BusesEffect,
    ]),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
    }),
  ],
};
