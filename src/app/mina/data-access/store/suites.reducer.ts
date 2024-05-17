import { createFeature, createReducer, on } from '@ngrx/store';
import { TPState } from '../../../shared/types/base.type';
import { initialSuiteState } from '../../utils/types/suites.type';
import { SuitesAction } from './suites.action';

export const SuitesFeature = createFeature({
  name: 'suites',
  reducer: createReducer(
    initialSuiteState,
    on(SuitesAction.get, (state) => ({
      ...state,
      isLoading: true,
      status: 'sending' as TPState,
    })),
    on(SuitesAction.getSuccess, (state, { suites }) => ({
      ...state,
      isLoading: false,
      suites,
      status: 'success' as TPState,
    })),
    on(SuitesAction.success, (state) => ({
      ...state,
      isLoading: false,
      status: 'success' as TPState,
    })),
    on(SuitesAction.error, (state, { error }) => ({
      ...state,
      isLoading: false,
      errors: error,
      status: 'error' as TPState,
    })),
    on(SuitesAction.reset, (state) => ({
      ...state,
      isLoading: null,
      errors: null,
      status: 'prompt' as TPState,
    })),
    on(SuitesAction.create, (state, { suite }) => ({
      ...state,
      isLoading: true,
      status: 'sending' as TPState,
    })),
    on(SuitesAction.update, (state, { updateSuites }) => ({
      ...state,
      isLoading: true,
      status: 'sending' as TPState,
    })),
    on(SuitesAction.delete, (state, { id }) => ({
      ...state,
      isLoading: true,
      status: 'sending' as TPState,
    }))
  ),
});

export const {
  name: SuitesFeatureKey,
  reducer: SuitesReducer,
  selectSelectedSuite,
  selectSelectedSuiteIndex,
  selectSuites,
  selectIsLoading,
  selectErrors,
  selectStatus,
} = SuitesFeature;
