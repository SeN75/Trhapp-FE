import { createAction, props } from '@ngrx/store';
import {
  CreateLocation,
  Locations,
  UpdateLocation,
} from '../../utils/types/location.type';

export const LocationAction = {
  get: createAction('[Location] get Locationes'),
  getSuccess: createAction(
    '[Location] get Locationes success',
    props<{ locations: Locations }>()
  ),
  create: createAction(
    '[Location] create Locationes',
    props<{ location: CreateLocation }>()
  ),
  update: createAction(
    '[Location] update Locationes',
    props<{ updateLocation: UpdateLocation }>()
  ),
  delete: createAction('[Location] delete Locationes', props<{ id: string }>()),
  success: createAction('[Location] success'),
  error: createAction('[Location] error', props<{ error: string }>()),
  reset: createAction('[Location] reset'),
};
