import { createAction, props } from '@ngrx/store';
import {
  CreatePilgrim,
  PilgrimDataTable,
  UpdatePilgrim,
} from '@/pilgrim/utils/types/pilgrim.type';

export const PilgrimAction = {
  get: createAction('[Pilgrim] get Pilgrim', props<{ page?: string }>()),
  getSuccess: createAction(
    '[Pilgrim] get Pilgrim success',
    props<{ pilgrims: PilgrimDataTable }>()
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
  updateImage: createAction(
    '[Pilgrim] updateImage',
    props<{ id: string; file: File }>()
  ),
  reset: createAction('[Pilgrim] reset'),
};
