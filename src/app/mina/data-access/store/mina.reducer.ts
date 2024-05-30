import { createFeature, createReducer, on } from '@ngrx/store';
import { MinaAction } from './mina.action';
import { initialMinaState } from '../../utils/types/mina.type';
import { TPState } from '../../../shared/types/base.type';

export const MinasFeature = createFeature({
  name: 'mina',
  reducer: createReducer(
    initialMinaState,
    on(MinaAction.get, (state) => ({
      ...state,
      isLoading: true,
      status: 'sending' as TPState,
    })),
    on(MinaAction.create, (state) => ({
      ...state,
      isLoading: true,
      status: 'sending' as TPState,
    })),
    on(MinaAction.allocate, (state) => ({
      ...state,
      isLoading: true,
      status: 'sending' as TPState,
    })),
    on(MinaAction.getSuccess, (state, { data }) => ({
      ...state,
      isLoading: false,
      data,
      status: 'success' as TPState,
    })),
    on(MinaAction.success, (state) => ({
      ...state,
      isLoading: false,
      status: 'success' as TPState,
    })),
    on(MinaAction.error, (state, { error }) => ({
      ...state,
      isLoading: false,
      errors: error,
      status: 'error' as TPState,
    })),
    on(MinaAction.reset, (state) => ({
      ...state,
      isLoading: null,
      errors: null,
      status: 'prompt' as TPState,
    }))
  ),
});

export const {
  name: MinaFeatureKey,
  reducer: MinaReducer,
  selectIsLoading,
  selectStatus,
  selectErrors,
} = MinasFeature;
