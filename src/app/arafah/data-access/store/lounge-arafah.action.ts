import { createAction, props } from '@ngrx/store';
import {
  CreateLoungeArafah,
  LoungesArafah,
  UpdateLoungeArafah,
} from '@/arafah/utils/types/lounges-arafah.type';

export const LoungeArafahAction = {
  get: createAction('[LoungeArafah] get LoungeArafahes'),
  getSuccess: createAction(
    '[LoungeArafah] get LoungeArafahes success',
    props<{ lounges_arafah: LoungesArafah }>()
  ),
  create: createAction(
    '[LoungeArafah] create LoungeArafahes',
    props<{ lounge_arafah: CreateLoungeArafah }>()
  ),
  update: createAction(
    '[LoungeArafah] update LoungeArafahes',
    props<{ updateLoungeArafah: UpdateLoungeArafah }>()
  ),
  delete: createAction(
    '[LoungeArafah] delete LoungeArafahes',
    props<{ id: string }>()
  ),
  success: createAction('[LoungeArafah] success'),
  error: createAction('[LoungeArafah] error', props<{ error: string }>()),
  reset: createAction('[LoungeArafah] reset'),
};
