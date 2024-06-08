import { Pilgrim, TPState } from '@/shared/types/base.type';

export type CreatePilgrim = Omit<Pilgrim, 'id'>;
export type UpdatePilgrim = Partial<Pilgrim>;
export type Pilgrims = Pilgrim[];

export type PilgrimState = {
  pilgrims: PilgrimDataTable | null;
  isLoading: boolean | null;
  errors: string | null;
  selectedPilgrim: Pilgrim | null;
  selectedPilgrimIndex: number | null;
  status: TPState;
};

export type PilgrimDataTable = {
  count: number;
  links: {
    next: string;
    prev: string;
  };
  total_pages: number;
  results: (Pick<
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
  > & {
    mian: boolean;
    arafah: boolean;
    mina_building_accommodation: boolean;
    mina_tent_accommodation: boolean;
    arafah_tent_accommodation: boolean;
    arafah_accommodation: boolean;
  })[];
};
export const initialPilgrimState: PilgrimState = {
  pilgrims: null,
  isLoading: null,
  errors: null,
  selectedPilgrim: null,
  selectedPilgrimIndex: null,
  status: 'prompt',
};
