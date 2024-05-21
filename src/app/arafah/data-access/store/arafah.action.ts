import { createAction, props } from '@ngrx/store';
import { CreateArafahPack1 } from '../../utils/types/arafah.type';

export const ArafahAction = {
  get: createAction('[Arafah] get accommodations data'),
  getSuccess: createAction(
    '[Arafah] get accommodations data success',
    props<{ data: any }>()
  ),
  success: createAction('[Arafah] success'),
  create: createAction(
    '[Arafah] create Accommodation',
    props<{ payload: CreateArafahPack1; pack: 'package1' | 'package4' }>()
  ),
  allocate: createAction(
    '[Arafah] allocate Accommodation',
    props<{ pack: 'package1' | 'package4' }>()
  ),
  error: createAction('[Arafah] error', props<{ error: string }>()),
  reset: createAction('[Arafah] reset'),
};
