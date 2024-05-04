import { createFeature, createReducer, on } from '@ngrx/store';
import { SupervisorAction } from './supervisor.action';
import { initialSupervisorState } from '../../utils/types/supervisor.type';

export const SupervisorsFeature = createFeature({
  name: 'supervisor',
  reducer: createReducer(
    initialSupervisorState,
    on(SupervisorAction.get, (state) => ({
      ...state,
      isLoading: true,
    })),
    on(SupervisorAction.success, (state, { supervisors }) => ({
      ...state,
      isLoading: false,
      supervisors,
    })),
    on(SupervisorAction.error, (state, { error }) => ({
      ...state,
      isLoading: false,
      errors: error,
    })),
    on(SupervisorAction.reset, (state) => ({
      ...state,
      isLoading: null,
      errors: null,
    })),
    on(SupervisorAction.create, (state, { supervisor }) => ({
      ...state,
      supervisor,
      isLoading: true,
    })),
    on(SupervisorAction.update, (state, { updateSupervisor }) => ({
      ...state,
      isLoading: true,
    })),
    on(SupervisorAction.delete, (state, { id }) => ({
      ...state,
      isLoading: true,
    }))
  ),
});

export const {
  name: SupervisorFeatureKey,
  reducer: SupervisorReducer,
  selectSelectedSupervisor,
  selectIsLoading,
  selectErrors,
  selectSelectedSupervisorIndex,
} = SupervisorsFeature;
