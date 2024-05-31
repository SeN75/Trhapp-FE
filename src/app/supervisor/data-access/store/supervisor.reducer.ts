import { createFeature, createReducer, on } from '@ngrx/store';
import { SupervisorAction } from './supervisor.action';
import { initialSupervisorState } from '@/supervisor/utils/types/supervisor.type';
import { TPState } from '@/shared/types/base.type';

export const SupervisorsFeature = createFeature({
  name: 'supervisor',
  reducer: createReducer(
    initialSupervisorState,
    on(SupervisorAction.get, (state) => ({
      ...state,
      isLoading: true,
      status: 'sending' as TPState,
    })),
    on(SupervisorAction.getSuccess, (state, { supervisors }) => ({
      ...state,
      isLoading: false,
      supervisors,
      status: 'success' as TPState,
    })),
    on(SupervisorAction.success, (state) => ({
      ...state,
      isLoading: false,
      status: 'success' as TPState,
    })),
    on(SupervisorAction.error, (state, { error }) => ({
      ...state,
      isLoading: false,
      errors: error,
      status: 'error' as TPState,
    })),
    on(SupervisorAction.reset, (state) => ({
      ...state,
      isLoading: null,
      errors: null,
      status: 'prompt' as TPState,
    })),
    on(SupervisorAction.create, (state, { supervisor }) => ({
      ...state,
      supervisor,
      isLoading: true,
      status: 'sending' as TPState,
    })),
    on(SupervisorAction.update, (state, { updateSupervisor }) => ({
      ...state,
      isLoading: true,
      status: 'sending' as TPState,
    })),
    on(SupervisorAction.delete, (state, { id }) => ({
      ...state,
      isLoading: true,
      status: 'sending' as TPState,
    }))
  ),
});

export const {
  name: SupervisorFeatureKey,
  reducer: SupervisorReducer,
  selectSelectedSupervisor,
  selectSupervisores,
  selectIsLoading,
  selectErrors,
  selectSelectedSupervisorIndex,
} = SupervisorsFeature;
