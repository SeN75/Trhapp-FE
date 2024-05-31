import { createFeature, createReducer, on } from '@ngrx/store';
import { TPState } from '@/shared/types/base.type';
import { initialLocationState } from '@/locations/utils/types/location.type';
import { LocationAction } from './location.action';

export const LocationsFeature = createFeature({
  name: 'locations',
  reducer: createReducer(
    initialLocationState,
    on(LocationAction.get, (state) => ({
      ...state,
      isLoading: true,
      status: 'sending' as TPState,
    })),
    on(LocationAction.getSuccess, (state, { locations }) => ({
      ...state,
      isLoading: false,
      locations,
      status: 'success' as TPState,
    })),
    on(LocationAction.success, (state) => ({
      ...state,
      isLoading: false,
      status: 'success' as TPState,
    })),
    on(LocationAction.error, (state, { error }) => ({
      ...state,
      isLoading: false,
      errors: error,
      status: 'error' as TPState,
    })),
    on(LocationAction.reset, (state) => ({
      ...state,
      isLoading: null,
      errors: null,
      status: 'prompt' as TPState,
    })),
    on(LocationAction.create, (state, { location }) => ({
      ...state,
      location,
      isLoading: true,
      status: 'sending' as TPState,
    })),
    on(LocationAction.update, (state, { updateLocation }) => ({
      ...state,
      isLoading: true,
      status: 'sending' as TPState,
    })),
    on(LocationAction.delete, (state, { id }) => ({
      ...state,
      isLoading: true,
      status: 'sending' as TPState,
    }))
  ),
});

export const {
  name: LocationFeatureKey,
  reducer: LocationReducer,
  selectSelectedLocation,
  selectIsLoading,
  selectErrors,
  selectLocations,
  selectSelectedLocationIndex,
} = LocationsFeature;
