import { createFeature, createReducer, on } from '@ngrx/store';
import { TPState } from '@/shared/types/base.type';
import { initialDistributeState } from '@/distribute/utils/types/distribute.type';
import { DistributionAction } from './distribution.action';

export const DistributionFeature = createFeature({
  name: 'distrbution',
  reducer: createReducer(
    initialDistributeState,
    on(DistributionAction.read, (state) => ({
      ...state,
      isLoading: true,
      status: 'sending' as TPState,
    })),
    on(DistributionAction.readPack1Success, (state, { pack1Read }) => ({
      ...state,
      isLoading: false,
      pack1Read,
      status: 'success' as TPState,
    })),
    on(DistributionAction.readPack4Success, (state, { pack4Read }) => ({
      ...state,
      isLoading: false,
      pack4Read,
      status: 'success' as TPState,
    })),
    on(DistributionAction.peek, (state) => ({
      ...state,
      isLoading: true,
      status: 'sending' as TPState,
    })),
    on(DistributionAction.peekPack1Success, (state, { pack1Peek }) => ({
      ...state,
      isLoading: false,
      pack1Peek,
      status: 'success' as TPState,
    })),
    on(DistributionAction.peekPack4Success, (state, { pack4Peek }) => ({
      ...state,
      isLoading: false,
      pack4Peek,
      status: 'success' as TPState,
    })),
    on(DistributionAction.success, (state) => ({
      ...state,
      isLoading: false,
      status: 'success' as TPState,
    })),
    on(DistributionAction.error, (state, { error }) => ({
      ...state,
      isLoading: false,
      errors: error,
      status: 'error' as TPState,
    })),
    on(DistributionAction.reset, (state) => ({
      ...state,
      isLoading: null,
      errors: null,
      status: 'prompt' as TPState,
    })),

    on(DistributionAction.update, (state, { peek }) => ({
      ...state,
      isLoading: true,
      status: 'sending' as TPState,
    }))
  ),
});

export const {
  name: DistributionFeatureKey,
  reducer: DistributionReducer,
  selectPack1Peek,
  selectPack1Read,
  selectPack4Peek,
  selectPack4Read,
  selectIsLoading,
  selectErrors,
  selectStatus,
} = DistributionFeature;
