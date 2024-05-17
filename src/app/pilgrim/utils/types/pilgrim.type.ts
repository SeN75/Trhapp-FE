import { Pilgrim, TPState } from '../../../shared/types/base.type';

export type CreatePilgrim = Omit<Pilgrim, 'id'>;
export type UpdatePilgrim = Partial<Pilgrim>;
export type Pilgrims = Pilgrim[];

export type PilgrimState = {
  pilgrims: Pilgrims | null;
  isLoading: boolean | null;
  errors: string | null;
  selectedPilgrim: Pilgrim | null;
  selectedPilgrimIndex: number | null;
  status: TPState;
};
export const initialPilgrimState: PilgrimState = {
  pilgrims: null,
  isLoading: null,
  errors: null,
  selectedPilgrim: null,
  selectedPilgrimIndex: null,
  status: 'prompt',
};
