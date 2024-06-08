import { createFeature, createReducer, on } from '@ngrx/store';
import { TPState } from '@/shared/types/base.type';
import { initialLoungeArafahState } from '@/arafah/utils/types/lounges-arafah.type';
import { LoungeArafahAction } from './lounge-arafah.action';

export const LoungeArafahFeature = createFeature({
  name: 'lounges_arafah',
  reducer: createReducer(
    initialLoungeArafahState,
    on(LoungeArafahAction.get, (state) => ({
      ...state,
      isLoading: true,
      status: 'sending' as TPState,
    })),
    on(LoungeArafahAction.getSuccess, (state, { lounges_arafah, pack }) => ({
      ...state,
      isLoading: false,
      lounges_arafah:
        pack === 'package1'
          ? lounges_arafah
          : state!.lounges_arafah
          ? [...state?.lounges_arafah]
          : [],
      lounges_building_arafah:
        pack === 'package4'
          ? lounges_arafah
          : state!.lounges_building_arafah
          ? [...state?.lounges_building_arafah]
          : [],
      status: 'success' as TPState,
    })),
    on(LoungeArafahAction.success, (state) => ({
      ...state,
      isLoading: false,
      status: 'success' as TPState,
    })),
    on(LoungeArafahAction.error, (state, { error }) => ({
      ...state,
      isLoading: false,
      errors: error,
      status: 'error' as TPState,
    })),
    on(LoungeArafahAction.reset, (state) => ({
      ...state,
      isLoading: null,
      errors: null,
      status: 'prompt' as TPState,
    })),
    on(LoungeArafahAction.create, (state, { lounge_arafah }) => ({
      ...state,
      isLoading: true,
      status: 'sending' as TPState,
    })),
    on(LoungeArafahAction.update, (state, { updateLoungeArafah }) => ({
      ...state,
      isLoading: true,
      status: 'sending' as TPState,
    })),
    on(LoungeArafahAction.delete, (state, { id }) => ({
      ...state,
      isLoading: true,
      status: 'sending' as TPState,
    }))
  ),
});

export const {
  name: LoungeArafahFeatureKey,
  reducer: LoungeArafahReducer,
  selectSelectedLoungeArafah,
  selectLounges_building_arafah,
  selectIsLoading,
  selectErrors,
  selectLounges_arafah,
  selectSelectedLoungeArafahIndex,
} = LoungeArafahFeature;
