import { createFeature, createReducer, on } from '@ngrx/store';
import { initialBusState } from '@/buses/utils/types/buses.type';
import { BusesAction } from './buses.action';
import { TPState } from '@/shared/types/base.type';

export const BusesFeature = createFeature({
  name: 'buses',
  reducer: createReducer(
    initialBusState,
    on(BusesAction.get, (state) => ({
      ...state,
      status: 'sending' as TPState,
      isLoading: true,
    })),
    on(BusesAction.getSuccess, (state, { buses }) => ({
      ...state,
      status: 'success' as TPState,
      isLoading: false,
      buses,
    })),
    on(BusesAction.success, (state) => ({
      ...state,
      status: 'success' as TPState,
      isLoading: false,
    })),
    on(BusesAction.error, (state, { error }) => ({
      ...state,
      status: 'error' as TPState,
      isLoading: false,
      errors: error,
    })),
    on(BusesAction.reset, (state) => ({
      ...state,
      isLoading: null,
      errors: null,
      status: 'prompt' as TPState,
    })),
    on(BusesAction.create, (state, { bus }) => ({
      ...state,
      status: 'sending' as TPState,
      isLoading: true,
    })),
    on(BusesAction.update, (state, { updateBus }) => ({
      ...state,
      status: 'sending' as TPState,
      isLoading: true,
    })),
    on(BusesAction.delete, (state, { id }) => ({
      ...state,
      status: 'sending' as TPState,
      isLoading: true,
    }))
  ),
});

export const {
  name: BusesFeatureKey,
  reducer: BusesReducer,
  selectBusesState,
  selectBuses,
  selectIsLoading,
  selectErrors,
  selectSelectedBus,
  selectStatus,
  selectSelectedBusIndex,
} = BusesFeature;
