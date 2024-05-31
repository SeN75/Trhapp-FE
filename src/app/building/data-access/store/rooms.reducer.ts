import { createFeature, createReducer, on } from '@ngrx/store';
import { TPState } from '@/shared/types/base.type';
import { initialRoomState } from '@/building/utils/types/rooms.type';
import { RoomAction } from './rooms.action';

export const RoomFeature = createFeature({
  name: 'rooms',
  reducer: createReducer(
    initialRoomState,
    on(RoomAction.get, (state) => ({
      ...state,
      isLoading: true,
      status: 'sending' as TPState,
    })),
    on(RoomAction.getSuccess, (state, { rooms }) => ({
      ...state,
      isLoading: false,
      rooms,
      status: 'success' as TPState,
    })),
    on(RoomAction.success, (state) => ({
      ...state,
      isLoading: false,
      status: 'success' as TPState,
    })),
    on(RoomAction.error, (state, { error }) => ({
      ...state,
      isLoading: false,
      errors: error,
      status: 'error' as TPState,
    })),
    on(RoomAction.reset, (state) => ({
      ...state,
      isLoading: null,
      errors: null,
      status: 'prompt' as TPState,
    })),
    on(RoomAction.create, (state, { room }) => ({
      ...state,
      isLoading: true,
      status: 'sending' as TPState,
    })),
    on(RoomAction.update, (state, { updateRoom }) => ({
      ...state,
      isLoading: true,
      status: 'sending' as TPState,
    })),
    on(RoomAction.delete, (state, { id }) => ({
      ...state,
      isLoading: true,
      status: 'sending' as TPState,
    }))
  ),
});

export const {
  name: RoomFeatureKey,
  reducer: RoomReducer,
  selectRooms,
  selectIsLoading,
  selectErrors,
  selectSelectedRoom,
  selectSelectedRoomIndex,
  selectStatus,
} = RoomFeature;
