import { createAction, props } from '@ngrx/store';
import { CreateMinaPack1, CreateMinaPack4 } from '@/mina/utils/types/mina.type';

export const MinaAction = {
  get: createAction('[Mina] get Mina'),
  getSuccess: createAction('[Mina] get success', props<{ data: any[] }>()),
  create: createAction(
    '[Mina] create Accommodation',
    props<{
      payload: CreateMinaPack1 | CreateMinaPack4;
      pack: 'package1' | 'package4';
    }>()
  ),
  allocate: createAction(
    '[Mina] allocate Accommodation',
    props<{ pack: 'package1' | 'package4' }>()
  ),
  success: createAction(
    '[Mina]  success',
    props<{ pack: 'package1' | 'package4' }>()
  ),
  error: createAction('[Mina] error', props<{ error: string }>()),
  reset: createAction('[Mina] reset'),
};
