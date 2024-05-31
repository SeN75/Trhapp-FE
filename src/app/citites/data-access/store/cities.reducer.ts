import { createFeature, createReducer, on } from '@ngrx/store';
import { TPState } from '@/shared/types/base.type';
import { initialCityState } from '@/citites/utils/types/cities.type';
import { CityAction } from './cities.action';

export const CitiessFeature = createFeature({
  name: 'cities',
  reducer: createReducer(
    initialCityState,
    on(CityAction.get, (state) => ({
      ...state,
      isLoading: true,
      status: 'sending' as TPState,
    })),
    on(CityAction.getSuccess, (state, { cities }) => ({
      ...state,
      isLoading: false,
      cities,
      status: 'success' as TPState,
    })),
    on(CityAction.success, (state) => ({
      ...state,
      isLoading: false,
      status: 'success' as TPState,
    })),
    on(CityAction.error, (state, { error }) => ({
      ...state,
      isLoading: false,
      errors: error,
      status: 'error' as TPState,
    })),
    on(CityAction.reset, (state) => ({
      ...state,
      isLoading: null,
      errors: null,
      status: 'prompt' as TPState,
    })),
    on(CityAction.create, (state, { city }) => ({
      ...state,
      city,
      isLoading: true,
      status: 'sending' as TPState,
    })),
    on(CityAction.update, (state, { updateCity }) => ({
      ...state,
      isLoading: true,
      status: 'sending' as TPState,
    })),
    on(CityAction.delete, (state, { id }) => ({
      ...state,
      isLoading: true,
      status: 'sending' as TPState,
    }))
  ),
});

export const {
  name: CitiesFeatureKey,
  reducer: CitiesReducer,
  selectSelectedCity,
  selectIsLoading,
  selectErrors,
  selectCities,
  selectSelectedCityIndex,
} = CitiessFeature;
