import { createFeature, createReducer, on } from '@ngrx/store';
import { initialAvailabiltyState } from '../../types/availabilty.type';
import { AvailabiltyActions } from './availavilty.action';
import { TPState } from '../../types/base.type';

export const AvailabilityFeature = createFeature({
  name: 'availavilty',
  reducer: createReducer(
    initialAvailabiltyState,
    on(AvailabiltyActions.get, (state) => ({
      ...state,
      isLoading: true,
      status: 'sending' as TPState,
    })),
    on(AvailabiltyActions.success, (state, { data }) => ({
      ...state,
      isLoading: false,
      data,
      status: 'success' as TPState,
    })),
    on(AvailabiltyActions.error, (state, { error }) => ({
      ...state,
      isLoading: false,
      errors: error,
      status: 'error' as TPState,
    })),
    on(AvailabiltyActions.reset, (state) => ({
      ...state,
      isLoading: null,
      errors: null,
    }))
  ),
});

export const {
  name: AvailabilityFeatureKey,
  reducer: AvailabilityReducer,
  selectIsLoading: selectIsLoading,
  selectData: selectData,
  selectStatus: selectStatus,
  selectErrors: selectErrors,
} = AvailabilityFeature;
