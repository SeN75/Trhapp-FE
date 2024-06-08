import { TPState } from './base.type';

export type Availabilty = {
  package1: {
    arafah: AvailabiltyInfo & { last_created_lounge: number };
    bus: AvailabiltyInfoBus;
    mina: AvailabiltyInfo & {
      last_created_suite: number;
      last_created_lounge: number;
    };
    total_pilgrims: number;
  };
  package4: {
    arafah: AvailabiltyInfo & { last_created_lounge: number };
    bus: AvailabiltyInfoBus;
    mina: AvailabiltyInfo & {
      last_created_floor: number;
      last_created_room: number;
    };
    total_pilgrims: number;
  };
};

type AvailabiltyInfo = {
  males: {
    total: number;
    beds: {
      required: number;
      available: number;
      created: number;
      allocated: number;
    };
  };
  females: {
    total: number;
    beds: {
      required: number;
      available: number;
      created: number;
      allocated: number;
    };
  };
};

type AvailabiltyInfoBus = {
  [k: string]: {
    pilgrims: {
      total: number;
      allocated: number;
    };
    bus: {
      required: number;
      allocated: number;
      created: number;
      last_bus_pilgrims_count: number;
    };
    supervisor: {
      required: number;
      allocated: number;
    };
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
