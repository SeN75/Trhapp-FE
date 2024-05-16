import { Location, TPState } from '../../../shared/types/base.type';

export type CreateLocation = Omit<Location, 'id'>;
export type UpdateLocation = Partial<Location>;
export type Locations = Location[];

export type LocationState = {
  locations: Locations | null;
  isLoading: boolean | null;
  errors: string | null;
  selectedLocation: Location | null;
  selectedLocationIndex: number | null;
  status: TPState;
};
export const initialLocationState: LocationState = {
  locations: null,
  isLoading: null,
  errors: null,
  selectedLocation: null,
  selectedLocationIndex: null,
  status: 'prompt',
};
