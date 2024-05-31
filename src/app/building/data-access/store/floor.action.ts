import { createAction, props } from '@ngrx/store';
import {
  CreateFloor,
  Floors,
  UpdateFloor,
} from '@/building/utils/types/floor.type';

export const FloorAction = {
  get: createAction('[Floor] get Floor'),
  getSuccess: createAction(
    '[Floor] get Floor success',
    props<{ floors: Floors }>()
  ),
  create: createAction('[Floor] create Floor', props<{ floor: CreateFloor }>()),
  update: createAction(
    '[Floor] update Floor',
    props<{ updateFloor: UpdateFloor }>()
  ),
  delete: createAction('[Floor] delete Floor', props<{ id: string }>()),
  success: createAction('[Floor] success'),
  error: createAction('[Floor] error', props<{ error: string }>()),
  reset: createAction('[Floor] reset'),
};
