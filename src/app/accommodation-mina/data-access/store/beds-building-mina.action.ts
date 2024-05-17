import { createAction, props } from '@ngrx/store';
import {
  CreateBedBuidingMina,
  BedsBuidingMina,
  UpdateBedBuidingMina,
} from '../../utils/types/beds-building-mina.type';

export const BedBulidingMinaAction = {
  get: createAction('[BedBulidingMina] get BedBulidingMina'),
  getSuccess: createAction(
    '[BedBulidingMina] get BedBulidingMina success',
    props<{ beds_building_mina: BedsBuidingMina }>()
  ),
  create: createAction(
    '[BedBulidingMina] create BedBulidingMina',
    props<{ bed_building_mina: CreateBedBuidingMina }>()
  ),
  update: createAction(
    '[BedBulidingMina] update BedBulidingMina',
    props<{ updateBedBulidingMina: UpdateBedBuidingMina }>()
  ),
  delete: createAction(
    '[BedBulidingMina] delete BedBulidingMina',
    props<{ id: string }>()
  ),
  success: createAction('[BedBulidingMina] success'),
  error: createAction('[BedBulidingMina] error', props<{ error: string }>()),
  reset: createAction('[BedBulidingMina] reset'),
};
