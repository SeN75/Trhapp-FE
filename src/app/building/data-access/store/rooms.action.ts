import { createAction, props } from '@ngrx/store';
import {
  CreateRoom,
  Rooms,
  UpdateRoom,
} from '@/building/utils/types/rooms.type';

export const RoomAction = {
  get: createAction('[Room] get Room'),
  getSuccess: createAction(
    '[Room] get Room success',
    props<{ rooms: Rooms }>()
  ),
  create: createAction('[Room] create Room', props<{ room: CreateRoom }>()),
  update: createAction(
    '[Room] update Room',
    props<{ updateRoom: UpdateRoom }>()
  ),
  delete: createAction('[Room] delete Room', props<{ id: string }>()),
  success: createAction('[Room] success'),
  error: createAction('[Room] error', props<{ error: string }>()),
  reset: createAction('[Room] reset'),
};
