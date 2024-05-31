import { createFeature, createReducer, on } from '@ngrx/store';
import { TPState } from '@/shared/types/base.type';
import { initialBuildingState } from '@/building/utils/types/building.type';
import { BuildingAction } from './building.action';

export const BuildingFeature = createFeature({
  name: 'buildings',
  reducer: createReducer(
    initialBuildingState,
    on(BuildingAction.get, (state) => ({
      ...state,
      isLoading: true,
      status: 'sending' as TPState,
    })),
    on(BuildingAction.getSuccess, (state, { buildings }) => ({
      ...state,
      isLoading: false,
      buildings,
      status: 'success' as TPState,
    })),
    on(BuildingAction.success, (state) => ({
      ...state,
      isLoading: false,
      status: 'success' as TPState,
    })),
    on(BuildingAction.error, (state, { error }) => ({
      ...state,
      isLoading: false,
      errors: error,
      status: 'error' as TPState,
    })),
    on(BuildingAction.reset, (state) => ({
      ...state,
      isLoading: null,
      errors: null,
      status: 'prompt' as TPState,
    })),
    on(BuildingAction.create, (state, { building }) => ({
      ...state,
      isLoading: true,
      status: 'sending' as TPState,
    })),
    on(BuildingAction.update, (state, { updateBuilding }) => ({
      ...state,
      isLoading: true,
      status: 'sending' as TPState,
    })),
    on(BuildingAction.delete, (state, { id }) => ({
      ...state,
      isLoading: true,
      status: 'sending' as TPState,
    }))
  ),
});

export const {
  name: BuildingFeatureKey,
  reducer: BuildingReducer,
  selectBuildings,
  selectIsLoading,
  selectErrors,
  selectSelectedBuilding,
  selectSelectedBuildingIndex,
  selectStatus,
} = BuildingFeature;
