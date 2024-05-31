import { City, TPState } from '@/shared/types/base.type';

export type CreateCity = Omit<City, 'id'>;
export type UpdateCity = Partial<City>;
export type Cities = City[];

export type CityState = {
  cities: Cities | null;
  isLoading: boolean | null;
  errors: string | null;
  selectedCity: City | null;
  selectedCityIndex: number | null;
  status: TPState;
};
export const initialCityState: CityState = {
  cities: null,
  isLoading: null,
  errors: null,
  selectedCity: null,
  selectedCityIndex: null,
  status: 'prompt',
};
