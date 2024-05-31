import { createFeature, createReducer, on } from '@ngrx/store';
import { TPState } from '@/shared/types/base.type';
import { initialBedBuidingMinaState } from '@/mina/utils/types/beds-building-mina.type';
import { BedBulidingMinaAction } from './beds-building-mina.action';

export const BedBuildingMinaFeature = createFeature({
  name: 'beds_building_mina',
  reducer: createReducer(
    initialBedBuidingMinaState,
    on(BedBulidingMinaAction.get, (state) => ({
      ...state,
      isLoading: true,
      status: 'sending' as TPState,
    })),
    on(BedBulidingMinaAction.getSuccess, (state, { beds_building_mina }) => ({
      ...state,
      isLoading: false,
      beds_building_mina,
      status: 'success' as TPState,
    })),
    on(BedBulidingMinaAction.success, (state) => ({
      ...state,
      isLoading: false,
      status: 'success' as TPState,
    })),
    on(BedBulidingMinaAction.error, (state, { error }) => ({
      ...state,
      isLoading: false,
      errors: error,
      status: 'error' as TPState,
    })),
    on(BedBulidingMinaAction.reset, (state) => ({
      ...state,
      isLoading: null,
      errors: null,
      status: 'prompt' as TPState,
    })),
    on(BedBulidingMinaAction.create, (state, { bed_building_mina }) => ({
      ...state,
      isLoading: true,
      status: 'sending' as TPState,
    })),
    on(BedBulidingMinaAction.update, (state, { updateBedBulidingMina }) => ({
      ...state,
      isLoading: true,
      status: 'sending' as TPState,
    })),
    on(BedBulidingMinaAction.delete, (state, { id }) => ({
      ...state,
      isLoading: true,
      status: 'sending' as TPState,
    }))
  ),
});

export const {
  name: BedBuildingMinaFeatureKey,
  reducer: BedBuildingMinaReducer,
  selectBeds_building_minaState,
  selectIsLoading,
  selectErrors,
  selectBeds,
  selectStatus,
  selectSelectedBedBuidingMina,
  selectSelectedBedBuidingMinaIndex,
} = BedBuildingMinaFeature;
