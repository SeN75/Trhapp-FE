import { createAction, props } from '@ngrx/store';
import {
  CreateLoungeMina,
  LoungesMina,
  UpdateLoungeMina,
} from '../../utils/types/lounges-mina.type';

export const LoungeMinaAction = {
  get: createAction(
    '[LoungeMina] get LoungeMinaes',
    props<{ package: '1' | '4' }>
  ),
  getSuccess: createAction(
    '[LoungeMina] get LoungeMinaes success',
    props<{ lounges_mina: LoungesMina }>()
  ),
  create: createAction(
    '[LoungeMina] create LoungeMinaes',
    props<{ lounge_mina: CreateLoungeMina }>()
  ),
  update: createAction(
    '[LoungeMina] update LoungeMinaes',
    props<{ updateLoungeMina: UpdateLoungeMina }>()
  ),
  delete: createAction(
    '[LoungeMina] delete LoungeMinaes',
    props<{ id: string }>()
  ),
  success: createAction('[LoungeMina] success'),
  error: createAction('[LoungeMina] error', props<{ error: string }>()),
  reset: createAction('[LoungeMina] reset'),
};
