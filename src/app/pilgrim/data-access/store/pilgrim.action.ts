import { createAction, props } from '@ngrx/store';
import {
  CreatePilgrim,
  Pilgrims,
  UpdatePilgrim,
} from '@/pilgrim/utils/types/pilgrim.type';

export const PilgrimAction = {
  get: createAction('[Pilgrim] get Pilgrim'),
  getSuccess: createAction(
    '[Pilgrim] get Pilgrim success',
    props<{ pilgrims: Pilgrims }>()
  ),
  create: createAction(
    '[Pilgrim] create Pilgrim',
    props<{ pilgrim: CreatePilgrim }>()
  ),
  update: createAction(
    '[Pilgrim] update Pilgrim',
    props<{ updatePilgrim: UpdatePilgrim }>()
  ),
  delete: createAction('[Pilgrim] delete Pilgrim', props<{ id: string }>()),
  success: createAction('[Pilgrim] success'),
  error: createAction('[Pilgrim] error', props<{ error: string }>()),
  reset: createAction('[Pilgrim] reset'),
};
