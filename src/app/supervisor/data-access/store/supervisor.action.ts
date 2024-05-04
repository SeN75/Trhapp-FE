import { createAction, props } from '@ngrx/store';
import {
  CreateSupervisor,
  Supervisors,
  UpdateSupervisor,
} from '../../utils/types/supervisor.type';

export const SupervisorAction = {
  get: createAction('[Supervisor] get Supervisores'),
  create: createAction(
    '[Supervisor] create Supervisores',
    props<{ supervisor: CreateSupervisor }>()
  ),
  update: createAction(
    '[Supervisor] update Supervisores',
    props<{ updateSupervisor: UpdateSupervisor }>()
  ),
  delete: createAction(
    '[Supervisor] delete Supervisores',
    props<{ id: string }>()
  ),
  success: createAction(
    '[Supervisor] success',
    props<{ supervisors: Supervisors }>()
  ),
  error: createAction('[Supervisor] error', props<{ error: string }>()),
  reset: createAction('[Supervisor] reset'),
};
