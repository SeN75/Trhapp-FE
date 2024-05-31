import { createFeature, createReducer, on } from '@ngrx/store';
import { TPState } from '@/shared/types/base.type';
import { initialBedTentArafahState } from '@/arafah/utils/types/beds-tent-arafah.type';
import { BedTentArafahAction } from './beds-tent-arafah.action';

export const BedTentArafahFeature = createFeature({
  name: 'beds_tent_arafah',
  reducer: createReducer(
    initialBedTentArafahState,
    on(BedTentArafahAction.get, (state) => ({
      ...state,
      isLoading: true,
      status: 'sending' as TPState,
    })),
    on(BedTentArafahAction.getSuccess, (state, { beds_tent_arafah }) => ({
      ...state,
      isLoading: false,
      beds_tent_arafah,
      status: 'success' as TPState,
    })),
    on(BedTentArafahAction.success, (state) => ({
      ...state,
      isLoading: false,
      status: 'success' as TPState,
    })),
    on(BedTentArafahAction.error, (state, { error }) => ({
      ...state,
      isLoading: false,
      errors: error,
      status: 'error' as TPState,
    })),
    on(BedTentArafahAction.reset, (state) => ({
      ...state,
      isLoading: null,
      errors: null,
      status: 'prompt' as TPState,
    })),
    on(BedTentArafahAction.create, (state, { bed_tent_arafah }) => ({
      ...state,
      isLoading: true,
      status: 'sending' as TPState,
    })),
    on(BedTentArafahAction.update, (state, { updateBedTentArafah }) => ({
      ...state,
      isLoading: true,
      status: 'sending' as TPState,
    })),
    on(BedTentArafahAction.delete, (state, { id }) => ({
      ...state,
      isLoading: true,
      status: 'sending' as TPState,
    }))
  ),
});

export const {
  name: BedTentArafahFeatureKey,
  reducer: BedTentArafahReducer,
  selectBeds_tent_arafahState,
  selectIsLoading,
  selectErrors,
  selectLounge_arafah,
  selectSelectedBedTentArafahIndex,
} = BedTentArafahFeature;
