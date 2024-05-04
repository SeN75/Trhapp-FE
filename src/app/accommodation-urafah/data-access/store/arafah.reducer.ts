import { createFeature, createReducer, on } from '@ngrx/store';
import { ArafahAction } from './arafah.action';
import { initialArafahState } from '../../utils/arafah.type';

export const MinasFeature = createFeature({
  name: 'arafah',
  reducer: createReducer(
    initialArafahState,
    on(ArafahAction.get, (state) => ({
      ...state,
      isLoading: true,
    })),
    on(ArafahAction.success, (state, { data }) => ({
      ...state,
      isLoading: false,
      data,
    })),
    on(ArafahAction.error, (state, { error }) => ({
      ...state,
      isLoading: false,
      errors: error,
    })),
    on(ArafahAction.reset, (state) => ({
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
