import { createAction, props } from '@ngrx/store';
import {
  CreateSupervisor,
  Supervisors,
  UpdateSupervisor,
} from '../../utils/types/supervisor.type';

export const SupervisorAction = {
  get: createAction('[Supervisor] get Supervisores'),
  getSuccess: createAction(
    '[Supervisor] get Supervisores success',
    props<{ supervisors: Supervisors }>()
  ),
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
  success: createAction('[Supervisor] success'),
  error: createAction('[Supervisor] error', props<{ error: string }>()),
  reset: createAction('[Supervisor] reset'),
};
