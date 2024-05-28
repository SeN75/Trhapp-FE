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
import {
  BedBuildingMinaFeatureKey,
  BedBuildingMinaReducer,
} from './mina/data-access/store/beds-building-mina.reducer';
import * as BedBuildingMinaEffect from './mina/data-access/store/beds-building-mina.effects';
import {
  BedTentMinaFeatureKey,
  BedTentMinaReducer,
} from './mina/data-access/store/beds-tent-mina.reducer';
import * as BedTentMinaEffect from './mina/data-access/store/beds-tent-mina.effects';
import {
  LoungeMinaFeatureKey,
  LoungeMinaReducer,
} from './mina/data-access/store/lounge-mina.reducer';
import * as LoungeMinaEffect from './mina/data-access/store/lounge-mina.effects';
import {
  SuitesFeatureKey,
  SuitesReducer,
} from './mina/data-access/store/suites.reducer';
import * as SuitesEffect from './mina/data-access/store/suites.effects';

import {
  BedTentArafahFeatureKey,
  BedTentArafahReducer,
} from './arafah/data-access/store/beds-tent-arafah.reducer';
import * as BedTentArafahEffect from './arafah/data-access/store/beds-tent-arafah.effects';
import {
  LoungeArafahFeatureKey,
  LoungeArafahReducer,
} from './arafah/data-access/store/lounge-arafah.reducer';
import * as LoungeArafahEffect from './arafah/data-access/store/lounge-arafah.effects';
import {
  ArafahFeatureKey,
  ArafahReducer,
} from './arafah/data-access/store/arafah.reducer';
import * as ArafahEffect from './arafah/data-access/store/arafah.effects';

import {
  PilgrimFeatureKey,
  PilgrimReducer,
} from './pilgrim/data-access/store/pilgrim.reducer';
import * as PilgrimEffect from './pilgrim/data-access/store/pilgrim.effects';
import {
  BuildingFeatureKey,
  BuildingReducer,
} from './building/data-access/store/building.reducer';
import * as BuildingEffect from './building/data-access/store/building.effects';
import {
  FloorFeatureKey,
  FloorReducer,
} from './building/data-access/store/floor.reducer';
import * as FloorEffect from './building/data-access/store/floor.effects';
import {
  RoomFeatureKey,
  RoomReducer,
} from './building/data-access/store/rooms.reducer';
import * as RoomEffect from './building/data-access/store/rooms.effects';
import {
  MinaFeatureKey,
  MinaReducer,
} from './mina/data-access/store/mina.reducer';
import * as MinaEffect from './mina/data-access/store/mina.effects';
import {
  DistributionFeatureKey,
  DistributionReducer,
} from './mina/data-access/store/distribution.reducer';
import * as DistrbutionEffect from './mina/data-access/store/distribution.effects';
import {
  AvailabilityFeatureKey,
  AvailabilityReducer,
} from './shared/store/availavilty/availavilty.reducer';
import * as AvailabilityEffect from './shared/store/availavilty/availavilty.effects';

export const storeProviders = {
  providers: [
    provideStore(),
    provideState(UploadOpsFeatureKey, UploadOpsReducer),
    provideState(ArafahFeatureKey, ArafahReducer),
    provideState(BusesFeatureKey, BusesReducer),
    provideState(SupervisorFeatureKey, SupervisorReducer),
    provideState(LocationFeatureKey, LocationReducer),
    provideState(CitiesFeatureKey, CitiesReducer),
    provideState(BedBuildingMinaFeatureKey, BedBuildingMinaReducer),
    provideState(BedTentMinaFeatureKey, BedTentMinaReducer),
    provideState(LoungeMinaFeatureKey, LoungeMinaReducer),
    provideState(SuitesFeatureKey, SuitesReducer),
    provideState(BedTentArafahFeatureKey, BedTentArafahReducer),
    provideState(LoungeArafahFeatureKey, LoungeArafahReducer),
    provideState(PilgrimFeatureKey, PilgrimReducer),
    provideState(BuildingFeatureKey, BuildingReducer),
    provideState(FloorFeatureKey, FloorReducer),
    provideState(RoomFeatureKey, RoomReducer),
    provideState(MinaFeatureKey, MinaReducer),
    provideState(DistributionFeatureKey, DistributionReducer),
    provideState(AvailabilityFeatureKey, AvailabilityReducer),
    provideEffects([
      UploadOpsEffect,
      ArafahEffect,
      BusesEffect,
      SupervisorEffect,
      LocationsEffect,
      CitiesEffect,
      BedBuildingMinaEffect,
      BedTentMinaEffect,
      LoungeMinaEffect,
      SuitesEffect,
      BedTentArafahEffect,
      LoungeArafahEffect,
      PilgrimEffect,
      BuildingEffect,
      FloorEffect,
      RoomEffect,
      MinaEffect,
      DistrbutionEffect,
      AvailabilityEffect,
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
