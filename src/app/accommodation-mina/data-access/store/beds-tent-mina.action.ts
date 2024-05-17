import { createAction, props } from '@ngrx/store';
import {
  CreateBedTentMina,
  BedsTentMina,
  UpdateBedTentMina,
} from '../../utils/types/beds-tent-mina.type';

export const BedTentMinaAction = {
  get: createAction('[BedTentMina] get BedTentMina'),
  getSuccess: createAction(
    '[BedTentMina] get BedTentMina success',
    props<{ beds_tent_mina: BedsTentMina }>()
  ),
  create: createAction(
    '[BedTentMina] create BedTentMina',
    props<{ bed_tent_mina: CreateBedTentMina }>()
  ),
  update: createAction(
    '[BedTentMina] update BedTentMina',
    props<{ updateBedTentMina: UpdateBedTentMina }>()
  ),
  delete: createAction(
    '[BedTentMina] delete BedTentMina',
    props<{ id: string }>()
  ),
  success: createAction('[BedTentMina] success'),
  error: createAction('[BedTentMina] error', props<{ error: string }>()),
  reset: createAction('[BedTentMina] reset'),
};
