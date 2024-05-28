import { TPState } from './base.type';

export type Availabilty = {
  package1: {
    arafah: AvailabiltyInfo;
    bus: AvailabiltyInfoBus;
    mina: AvailabiltyInfo;
    total_pilgrims: number;
  };
  package4: {
    arafah: AvailabiltyInfo;
    bus: AvailabiltyInfoBus;
    mina: AvailabiltyInfo;
    total_pilgrims: number;
  };
};

type AvailabiltyInfo = {
  allocated_female_pilgrims: number;
  allocated_male_pilgrims: number;
  available_female_beds: number;
  available_male_beds: number;
  created_female_beds: number;
  created_male_beds: number;
  required_female_beds: number;
  required_male_beds: number;
  total_female_pilgrims: number;
  total_male_pilgrims: number;
};

type AvailabiltyInfoBus = {
  [k: string]: {
    allocated_buses: number;
    allocated_pilgrims: number;
    created_buses: number;
    last_bus_count: number;
    required_buses: number;
    required_supervisors: number;
    total_pilgrims: number;
  };
};
export type AvailabiltyState = {
  isLoading: boolean | null;
  errors: any | null;
  data: Availabilty | null;
  status: TPState;
};

export const initialAvailabiltyState: AvailabiltyState = {
  isLoading: null,
  errors: null,
  data: null,
  status: 'prompt',
};
