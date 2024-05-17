import { createAction, props } from '@ngrx/store';
import {
  CreateBedTentArafah,
  BedsTentArafah,
  UpdateBedTentArafah,
} from '../../utils/types/beds-tent-arafah.type';

export const BedTentArafahAction = {
  get: createAction('[BedTentArafah] get BedTentArafah'),
  getSuccess: createAction(
    '[BedTentArafah] get BedTentArafah success',
    props<{ beds_tent_arafah: BedsTentArafah }>()
  ),
  create: createAction(
    '[BedTentArafah] create BedTentArafah',
    props<{ bed_tent_arafah: CreateBedTentArafah }>()
  ),
  update: createAction(
    '[BedTentArafah] update BedTentArafah',
    props<{ updateBedTentArafah: UpdateBedTentArafah }>()
  ),
  delete: createAction(
    '[BedTentArafah] delete BedTentArafah',
    props<{ id: string }>()
  ),
  success: createAction('[BedTentArafah] success'),
  error: createAction('[BedTentArafah] error', props<{ error: string }>()),
  reset: createAction('[BedTentArafah] reset'),
};
