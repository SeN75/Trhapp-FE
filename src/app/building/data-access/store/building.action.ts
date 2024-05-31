import { createAction, props } from '@ngrx/store';
import {
  CreateBuilding,
  Buildings,
  UpdateBuilding,
} from '@/building/utils/types/building.type';

export const BuildingAction = {
  get: createAction('[Building] get Building'),
  getSuccess: createAction(
    '[Building] get Building success',
    props<{ buildings: Buildings }>()
  ),
  create: createAction(
    '[Building] create Building',
    props<{ building: CreateBuilding }>()
  ),
  update: createAction(
    '[Building] update Building',
    props<{ updateBuilding: UpdateBuilding }>()
  ),
  delete: createAction('[Building] delete Building', props<{ id: string }>()),
  success: createAction('[Building] success'),
  error: createAction('[Building] error', props<{ error: string }>()),
  reset: createAction('[Building] reset'),
};
