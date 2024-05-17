import { createFeature, createReducer, on } from '@ngrx/store';
import { MinaAction } from './mina.action';
import { initialMinaState } from '../../utils/types/mina.type';

export const MinasFeature = createFeature({
  name: 'mina',
  reducer: createReducer(
    initialMinaState,
    on(MinaAction.get, (state) => ({
      ...state,
      isLoading: true,
    })),
    on(MinaAction.success, (state, { data }) => ({
      ...state,
      isLoading: false,
      data,
    })),
    on(MinaAction.error, (state, { error }) => ({
      ...state,
      isLoading: false,
      errors: error,
    })),
    on(MinaAction.reset, (state) => ({
      ...state,
      isLoading: null,
      errors: null,
    }))
  ),
});

export const {
  name: MinaFeatureKey,
  reducer: MinaReducer,
  selectIsLoading,
  selectErrors,
} = MinasFeature;
