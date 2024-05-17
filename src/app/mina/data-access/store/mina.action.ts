import { createAction, props } from '@ngrx/store';

export const MinaAction = {
  get: createAction('[Mina] get Supervisores'),
  // create: createAction(
  //   '[Mina] create Supervisores',
  //   props<{ supervisor: CreateSupervisor }>()
  // ),
  // update: createAction(
  //   '[Mina] update Supervisores',
  //   props<{ updateSupervisor: UpdateSupervisor }>()
  // ),
  // delete: createAction(
  //   '[Mina] delete Supervisores',
  //   props<{ id: string }>()
  // ),
  success: createAction('[Mina] success', props<{ data: any[] }>()),
  error: createAction('[Mina] error', props<{ error: string }>()),
  reset: createAction('[Mina] reset'),
};
