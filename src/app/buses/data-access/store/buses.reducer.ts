import { createFeature, createReducer, on } from '@ngrx/store';
import { initialBusState } from '../../utils/types/buses.type';
import { BusesAction } from './buses.action';

export const BusesFeature = createFeature({
  name: 'buses',
  reducer: createReducer(
    initialBusState,
    on(BusesAction.get, (state) => ({
      ...state,
      isLoading: true,
    })),
    on(BusesAction.success, (state, { buses }) => ({
      ...state,
      isLoading: false,
      buses,
    })),
    on(BusesAction.error, (state, { error }) => ({
      ...state,
      isLoading: false,
      errors: error,
    })),
    on(BusesAction.reset, (state) => ({
      ...state,
      isLoading: null,
      errors: null,
    })),
    on(BusesAction.create, (state, { bus }) => ({
      ...state,
      isLoading: true,
    })),
    on(BusesAction.update, (state, { updateBus }) => ({
      ...state,
      isLoading: true,
    })),
    on(BusesAction.delete, (state, { id }) => ({
      ...state,
      isLoading: true,
    }))
  ),
});

export const {
  name: BusesFeatureKey,
  reducer: BusesReducer,
  selectBusesState,
  selectIsLoading,
  selectErrors,
  selectSelectedBus,
  selectSelectedBusIndex,
} = BusesFeature;
