import { createAction, props } from '@ngrx/store';
import {
  CreateSuite,
  Suites,
  UpdateSuite,
} from '../../utils/types/suites.type';

export const SuitesAction = {
  get: createAction('[Suites] get Suites'),
  getSuccess: createAction(
    '[Suites] get Suites success',
    props<{ suites: Suites }>()
  ),
  create: createAction(
    '[Suites] create Suites',
    props<{ suite: CreateSuite }>()
  ),
  update: createAction(
    '[Suites] update Suites',
    props<{ updateSuites: UpdateSuite }>()
  ),
  delete: createAction('[Suites] delete Suites', props<{ id: string }>()),
  success: createAction('[Suites] success'),
  error: createAction('[Suites] error', props<{ error: string }>()),
  reset: createAction('[Suites] reset'),
};
