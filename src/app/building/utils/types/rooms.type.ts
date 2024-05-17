import { Room, TPState } from '../../../shared/types/base.type';

export type CreateRoom = Omit<Room, 'id'>;
export type UpdateRoom = Partial<Room>;
export type Rooms = Room[];

export type RoomState = {
  rooms: Rooms | null;
  isLoading: boolean | null;
  errors: string | null;
  selectedRoom: Room | null;
  selectedRoomIndex: number | null;
  status: TPState;
};
export const initialRoomState: RoomState = {
  rooms: null,
  isLoading: null,
  errors: null,
  selectedRoom: null,
  selectedRoomIndex: null,
  status: 'prompt',
};
