import { createAction, props } from '@ngrx/store';
import { Buses, CreateBus, UpdateBus } from '@/buses/utils/types/buses.type';

export const BusesAction = {
  get: createAction('[Buses] get buses'),
  getSuccess: createAction(
    '[Buses] get buses success',
    props<{ buses: Buses }>()
  ),
  create: createAction('[Buses] create buses', props<{ bus: CreateBus }>()),
  update: createAction(
    '[Buses] update buses',
    props<{ updateBus: UpdateBus }>()
  ),
  delete: createAction('[Buses] delete buses', props<{ id: string }>()),
  success: createAction('[Buses] success'),
  error: createAction('[Buses] error', props<{ error: string }>()),
  reset: createAction('[Buses] reset'),
};
