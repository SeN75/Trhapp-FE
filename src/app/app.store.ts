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
import {
  SupervisorFeatureKey,
  SupervisorReducer,
} from './supervisor/data-access/store/supervisor.reducer';
import * as SupervisorEffect from './supervisor/data-access/store/supervisor.effects';
import {
  LocationFeatureKey,
  LocationReducer,
} from './locations/data-access/store/location.reducer';
import * as LocationsEffect from './locations/data-access/store/location.effects';
import {
  CitiesFeatureKey,
  CitiesReducer,
} from './citites/data-access/store/cities.reducer';
import * as CitiesEffect from './citites/data-access/store/cities.effects';

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
    provideState(SupervisorFeatureKey, SupervisorReducer),
    provideState(LocationFeatureKey, LocationReducer),
    provideState(CitiesFeatureKey, CitiesReducer),
    provideEffects([
      // carEffect,
      UploadOpsEffect,
      BusesEffect,
      SupervisorEffect,
      LocationsEffect,
      CitiesEffect,
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
