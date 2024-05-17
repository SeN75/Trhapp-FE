import { createFeature, createReducer, on } from '@ngrx/store';
import { TPState } from '../../../shared/types/base.type';
import { initialPilgrimState } from '../../utils/types/pilgrim.type';
import { PilgrimAction } from './pilgrim.action';

export const PilgrimFeature = createFeature({
  name: 'pilgrims',
  reducer: createReducer(
    initialPilgrimState,
    on(PilgrimAction.get, (state) => ({
      ...state,
      isLoading: true,
      status: 'sending' as TPState,
    })),
    on(PilgrimAction.getSuccess, (state, { pilgrims }) => ({
      ...state,
      isLoading: false,
      pilgrims,
      status: 'success' as TPState,
    })),
    on(PilgrimAction.success, (state) => ({
      ...state,
      isLoading: false,
      status: 'success' as TPState,
    })),
    on(PilgrimAction.error, (state, { error }) => ({
      ...state,
      isLoading: false,
      errors: error,
      status: 'error' as TPState,
    })),
    on(PilgrimAction.reset, (state) => ({
      ...state,
      isLoading: null,
      errors: null,
      status: 'prompt' as TPState,
    })),
    on(PilgrimAction.create, (state, { pilgrim }) => ({
      ...state,
      isLoading: true,
      status: 'sending' as TPState,
    })),
    on(PilgrimAction.update, (state, { updatePilgrim }) => ({
      ...state,
      isLoading: true,
      status: 'sending' as TPState,
    })),
    on(PilgrimAction.delete, (state, { id }) => ({
      ...state,
      isLoading: true,
      status: 'sending' as TPState,
    }))
  ),
});

export const {
  name: PilgrimFeatureKey,
  reducer: PilgrimReducer,
  selectPilgrims,
  selectIsLoading,
  selectErrors,
  selectSelectedPilgrim,
  selectSelectedPilgrimIndex,
  selectStatus,
} = PilgrimFeature;
