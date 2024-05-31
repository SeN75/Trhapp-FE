import { createFeature, createReducer, on } from '@ngrx/store';
import { TPState } from '@/shared/types/base.type';
import { initialAllocationState } from '@/pilgrim/utils/types/allocation.type';
import { PilgrimAction } from './pilgrim.action';
import { AllocationAction } from './allocation.action';

export const AllocationFeature = createFeature({
  name: 'allocation',
  reducer: createReducer(
    initialAllocationState,
    on(AllocationAction.delete, (state, { _delete }) => ({
      ...state,
      isLoading: true,
      status: 'sending' as TPState,
      delete: _delete,
    })),
    on(AllocationAction.switch, (state, { _switch }) => ({
      ...state,
      isLoading: true,
      status: 'sending' as TPState,
      switch: _switch,
    })),
    on(AllocationAction.manual, (state, { _manual }) => ({
      ...state,
      isLoading: true,
      status: 'sending' as TPState,
      manual: _manual,
    })),
    on(AllocationAction.success, (state) => ({
      ...state,
      isLoading: false,
      status: 'success' as TPState,
    })),
    on(AllocationAction.error, (state, { error }) => ({
      ...state,
      isLoading: false,
      errors: error,
      status: 'error' as TPState,
    })),
    on(AllocationAction.reset, (state) => ({
      ...state,
      isLoading: null,
      errors: null,
      status: 'prompt' as TPState,
    }))
  ),
});

export const {
  name: AllocationFeatureKey,
  reducer: AllocationReducer,
  selectIsLoading,
  selectStatus,
  selectErrors,
  selectDelete,
  selectManual,
  selectSwitch,
} = AllocationFeature;
