import { Floor, TPState } from '../../../shared/types/base.type';

export type CreateFloor = Omit<Floor, 'id'>;
export type UpdateFloor = Partial<Floor>;
export type Floors = Floor[];

export type FloorState = {
  floors: Floors | null;
  isLoading: boolean | null;
  errors: string | null;
  selectedFloor: Floor | null;
  selectedFloorIndex: number | null;
  status: TPState;
};
export const initialFloorState: FloorState = {
  floors: null,
  isLoading: null,
  errors: null,
  selectedFloor: null,
  selectedFloorIndex: null,
  status: 'prompt',
};
