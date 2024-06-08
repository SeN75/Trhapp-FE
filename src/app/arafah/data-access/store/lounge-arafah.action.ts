import { createAction, props } from '@ngrx/store';
import {
  CreateLoungeArafah,
  LoungesArafah,
  UpdateLoungeArafah,
} from '@/arafah/utils/types/lounges-arafah.type';

export const LoungeArafahAction = {
  get: createAction(
    '[LoungeArafah] get LoungeArafahes',
    props<{ pack: 'package1' | 'package4' }>()
  ),
  getSuccess: createAction(
    '[LoungeArafah] get LoungeArafahes success',
    props<{ lounges_arafah: LoungesArafah; pack: 'package1' | 'package4' }>()
  ),
  create: createAction(
    '[LoungeArafah] create LoungeArafahes',
    props<{ lounge_arafah: CreateLoungeArafah }>()
  ),
  update: createAction(
    '[LoungeArafah] update LoungeArafahes',
    props<{
      updateLoungeArafah: UpdateLoungeArafah;
      pack: 'package1' | 'package4';
    }>()
  ),
  delete: createAction(
    '[LoungeArafah] delete LoungeArafahes',
    props<{ id: string; pack: 'package1' | 'package4' }>()
  ),
  success: createAction(
    '[LoungeArafah] success',
    props<{ pack: 'package1' | 'package4' }>()
  ),
  error: createAction('[LoungeArafah] error', props<{ error: string }>()),
  reset: createAction('[LoungeArafah] reset'),
};
