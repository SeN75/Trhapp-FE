import { createAction, props } from '@ngrx/store';
import {
  DeleteAllocation,
  ManualAllocation,
  SwitchAllocation,
} from '../../utils/types/allocation.type';

export const AllocationAction = {
  switch: createAction(
    '[Allocation] switch',
    props<{ _switch: SwitchAllocation }>()
  ),
  delete: createAction(
    '[Allocation] delete',
    props<{ _delete: DeleteAllocation }>()
  ),
  manual: createAction(
    '[Allocation] manual',
    props<{ _manual: ManualAllocation }>()
  ),
  success: createAction('[Allocation] success'),
  error: createAction('[Allocation] error', props<{ error: string }>()),
  reset: createAction('[Allocation] reset'),
};
