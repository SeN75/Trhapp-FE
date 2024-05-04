import { createAction, props } from '@ngrx/store';

export const ArafahAction = {
  get: createAction('[Arafah] get accommodations data'),
  success: createAction('[Arafah] success', props<{ data: any[] }>()),
  error: createAction('[Arafah] error', props<{ error: string }>()),
  reset: createAction('[Arafah] reset'),
};
