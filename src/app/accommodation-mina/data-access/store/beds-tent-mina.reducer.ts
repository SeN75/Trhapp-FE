import { createFeature, createReducer, on } from '@ngrx/store';
import { TPState } from '../../../shared/types/base.type';
import { initialBedTentMinaState } from '../../utils/types/beds-tent-mina.type';
import { BedTentMinaAction } from './beds-tent-mina.action';

export const BeadTentMinaFeature = createFeature({
  name: 'beds_tent_mina',
  reducer: createReducer(
    initialBedTentMinaState,
    on(BedTentMinaAction.get, (state) => ({
      ...state,
      isLoading: true,
      status: 'sending' as TPState,
    })),
    on(BedTentMinaAction.getSuccess, (state, { beds_tent_mina }) => ({
      ...state,
      isLoading: false,
      beds_tent_mina,
      status: 'success' as TPState,
    })),
    on(BedTentMinaAction.success, (state) => ({
      ...state,
      isLoading: false,
      status: 'success' as TPState,
    })),
    on(BedTentMinaAction.error, (state, { error }) => ({
      ...state,
      isLoading: false,
      errors: error,
      status: 'error' as TPState,
    })),
    on(BedTentMinaAction.reset, (state) => ({
      ...state,
      isLoading: null,
      errors: null,
      status: 'prompt' as TPState,
    })),
    on(BedTentMinaAction.create, (state, { bed_tent_mina }) => ({
      ...state,
      isLoading: true,
      status: 'sending' as TPState,
    })),
    on(BedTentMinaAction.update, (state, { updateBedTentMina }) => ({
      ...state,
      isLoading: true,
      status: 'sending' as TPState,
    })),
    on(BedTentMinaAction.delete, (state, { id }) => ({
      ...state,
      isLoading: true,
      status: 'sending' as TPState,
    }))
  ),
});

export const {
  name: BeadTentMinaFeatureKey,
  reducer: BeadTentMinaReducer,
  selectBeds_tent_minaState,
  selectIsLoading,
  selectErrors,
  selectLounge_mina,
  selectSelectedBedTentMinaIndex,
} = BeadTentMinaFeature;
