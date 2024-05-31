import { createFeature, createReducer, on } from '@ngrx/store';
import { ArafahAction } from './arafah.action';
import { initialArafahState } from '@/arafah/utils/types/arafah.type';
import { TPState } from '@/shared/types/base.type';

export const ArafahsFeature = createFeature({
  name: 'arafah',
  reducer: createReducer(
    initialArafahState,
    on(ArafahAction.get, (state) => ({
      ...state,
      isLoading: true,
      status: 'sending' as TPState,
    })),
    on(ArafahAction.create, (state) => ({
      ...state,
      isLoading: true,
      status: 'sending' as TPState,
    })),
    on(ArafahAction.allocate, (state) => ({
      ...state,
      isLoading: true,
      status: 'sending' as TPState,
    })),
    on(ArafahAction.success, (state) => ({
      ...state,
      isLoading: false,
      status: 'success' as TPState,
    })),
    on(ArafahAction.error, (state, { error }) => ({
      ...state,
      isLoading: false,
      errors: error,
      status: 'error' as TPState,
    })),
    on(ArafahAction.reset, (state) => ({
      ...state,
      isLoading: null,
      errors: null,
      status: 'prompt' as TPState,
    }))
  ),
});

export const {
  name: ArafahFeatureKey,
  reducer: ArafahReducer,
  selectIsLoading,
  selectErrors,
  selectStatus,
} = ArafahsFeature;
