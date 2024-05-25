import { createAction, props } from '@ngrx/store';
import {
  DistributeRead,
  DistributePeek,
  DistributeUpdate,
} from '../../utils/types/distribute.type';

export const DistributionAction = {
  read: createAction(
    '[Distribution] read Distribution',
    props<{ pack: 'package1' | 'package4' }>()
  ),
  readPack1Success: createAction(
    '[Distribution] read Distribution pack1 success',
    props<{ pack1Read: DistributeRead }>()
  ),
  readPack4Success: createAction(
    '[Distribution] read Distribution pack4 success',
    props<{ pack4Read: DistributeRead }>()
  ),
  peek: createAction(
    '[Distribution] create Distribution',
    props<{ num_employees: number; pack: 'package1' | 'package4' }>()
  ),
  peekPack1Success: createAction(
    '[Distribution] peek Distribution pack1 success',
    props<{ pack1Peek: DistributePeek }>()
  ),
  peekPack4Success: createAction(
    '[Distribution] peek Distribution pack4 success',
    props<{ pack4Peek: DistributePeek }>()
  ),
  update: createAction(
    '[Distribution] update Distribution',
    props<{ peek: DistributeUpdate; pack: 'package1' | 'package4' }>()
  ),
  success: createAction(
    '[Distribution] success',
    props<{ pack: 'package1' | 'package4' }>()
  ),
  error: createAction('[Distribution] error', props<{ error: string }>()),
  reset: createAction('[Distribution] reset'),
};
