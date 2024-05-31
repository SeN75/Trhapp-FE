import { createAction, props } from '@ngrx/store';
import {
  CreateCity,
  Cities,
  UpdateCity,
} from '@/citites/utils/types/cities.type';

export const CityAction = {
  get: createAction('[City] get Cityes'),
  getSuccess: createAction(
    '[City] get Cities success',
    props<{ cities: Cities }>()
  ),
  create: createAction('[City] create Cityes', props<{ city: CreateCity }>()),
  update: createAction(
    '[City] update Cityes',
    props<{ updateCity: UpdateCity }>()
  ),
  delete: createAction('[City] delete Cityes', props<{ id: string }>()),
  success: createAction('[City] success'),
  error: createAction('[City] error', props<{ error: string }>()),
  reset: createAction('[City] reset'),
};
