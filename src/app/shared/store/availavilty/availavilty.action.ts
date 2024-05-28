import { createAction, props } from '@ngrx/store';
import { Availabilty } from '../../types/availabilty.type';

export const AvailabiltyActions = {
  get: createAction('[Availabilty] Get'),
  success: createAction(
    '[Availabilty] Success',
    props<{ data: Availabilty }>()
  ),
  error: createAction('[Availabilty] Error', props<{ error: string }>()),
  reset: createAction('[Availabilty] Reset'),
};
