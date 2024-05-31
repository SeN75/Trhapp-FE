import { createFeature, createReducer, on } from '@ngrx/store';
import { TPState } from '@/shared/types/base.type';
import { initialFloorState } from '@/building/utils/types/floor.type';
import { FloorAction } from './floor.action';

export const FloorFeature = createFeature({
  name: 'floors',
  reducer: createReducer(
    initialFloorState,
    on(FloorAction.get, (state) => ({
      ...state,
      isLoading: true,
      status: 'sending' as TPState,
    })),
    on(FloorAction.getSuccess, (state, { floors }) => ({
      ...state,
      isLoading: false,
      floors,
      status: 'success' as TPState,
    })),
    on(FloorAction.success, (state) => ({
      ...state,
      isLoading: false,
      status: 'success' as TPState,
    })),
    on(FloorAction.error, (state, { error }) => ({
      ...state,
      isLoading: false,
      errors: error,
      status: 'error' as TPState,
    })),
    on(FloorAction.reset, (state) => ({
      ...state,
      isLoading: null,
      errors: null,
      status: 'prompt' as TPState,
    })),
    on(FloorAction.create, (state, { floor }) => ({
      ...state,
      isLoading: true,
      status: 'sending' as TPState,
    })),
    on(FloorAction.update, (state, { updateFloor }) => ({
      ...state,
      isLoading: true,
      status: 'sending' as TPState,
    })),
    on(FloorAction.delete, (state, { id }) => ({
      ...state,
      isLoading: true,
      status: 'sending' as TPState,
    }))
  ),
});

export const {
  name: FloorFeatureKey,
  reducer: FloorReducer,
  selectFloors,
  selectIsLoading,
  selectErrors,
  selectSelectedFloor,
  selectSelectedFloorIndex,
  selectStatus,
} = FloorFeature;
