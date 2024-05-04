import { Bus } from '../../../shared/types/base.type';

export type CreateBus = Omit<Bus, 'id'>;
export type UpdateBus = Partial<Bus>;
export type Buses = Bus[];

export type BusState = {
  buses: Buses | null;
  isLoading: boolean | null;
  errors: string | null;
  selectedBus: Bus | null;
  selectedBusIndex: number | null;
};
export const initialBusState: BusState = {
  buses: null,
  isLoading: null,
  errors: null,
  selectedBus: null,
  selectedBusIndex: null,
};
