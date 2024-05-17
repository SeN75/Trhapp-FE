import { createFeature, createReducer, on } from '@ngrx/store';
import { TPState } from '../../../shared/types/base.type';
import { initialLoungeMinaState } from '../../utils/types/lounges-mina.type';
import { LoungeMinaAction } from './lounge-mina.action';

export const LoungeMinaFeature = createFeature({
  name: 'lounges_mina',
  reducer: createReducer(
    initialLoungeMinaState,
    on(LoungeMinaAction.get, (state) => ({
      ...state,
      isLoading: true,
      status: 'sending' as TPState,
    })),
    on(LoungeMinaAction.getSuccess, (state, { lounges_mina }) => ({
      ...state,
      isLoading: false,
      lounges_mina,
      status: 'success' as TPState,
    })),
    on(LoungeMinaAction.success, (state) => ({
      ...state,
      isLoading: false,
      status: 'success' as TPState,
    })),
    on(LoungeMinaAction.error, (state, { error }) => ({
      ...state,
      isLoading: false,
      errors: error,
      status: 'error' as TPState,
    })),
    on(LoungeMinaAction.reset, (state) => ({
      ...state,
      isLoading: null,
      errors: null,
      status: 'prompt' as TPState,
    })),
    on(LoungeMinaAction.create, (state, { lounge_mina }) => ({
      ...state,
      isLoading: true,
      status: 'sending' as TPState,
    })),
    on(LoungeMinaAction.update, (state, { updateLoungeMina }) => ({
      ...state,
      isLoading: true,
      status: 'sending' as TPState,
    })),
    on(LoungeMinaAction.delete, (state, { id }) => ({
      ...state,
      isLoading: true,
      status: 'sending' as TPState,
    }))
  ),
});

export const {
  name: LoungeMinaFeatureKey,
  reducer: LoungeMinaReducer,
  selectSelectedLoungeMina,
  selectIsLoading,
  selectErrors,
  selectLounge_mina,
  selectSelectedLoungeMinaIndex,
} = LoungeMinaFeature;
