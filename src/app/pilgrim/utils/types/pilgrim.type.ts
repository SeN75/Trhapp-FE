import { Pilgrim, TPState } from '@/shared/types/base.type';

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

export type PilgrimDataTable = Pick<
  Pilgrim,
  | 'id'
  | 'name'
  | 'city'
  | 'national_id'
  | 'package_name'
  | 'nationality'
  | 'booking_reference'
  | 'phone_number'
  | 'is_male'
> & { mian: boolean; arafah: boolean };
export const initialPilgrimState: PilgrimState = {
  pilgrims: null,
  isLoading: null,
  errors: null,
  selectedPilgrim: null,
  selectedPilgrimIndex: null,
  status: 'prompt',
};
