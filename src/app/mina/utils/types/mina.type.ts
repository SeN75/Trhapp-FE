import {
  BedBuidingMina,
  LoungeMina,
  Pilgrim,
  Suite,
  TPState,
} from '../../../shared/types/base.type';

export type MinaState = {
  isLoading: boolean | null;
  errors: string | null;
  status: TPState;
};

export type CreateMinaPack1 = {
  suite_number: number;
  is_male_accommodation: boolean;
  lounges: Omit<LoungeMina, 'id'>[];
}[];

export type ResponsCreateMinaPack1 = Suite & {
  is_male_accommodation: boolean;
  lounges: Omit<
    LoungeMina,
    'suiteId' & {
      max_capacity: number;
      current_capacity: number;
      suite: number;
      beds: Omit<BedBuidingMina, 'roomId'> & {
        lounge: number;
        pilgrim: Pilgrim | null;
      };
    }
  >[];
};

export type CreateMinaPack4 = {
  building_name: string;
  floors: {
    floor_number: number;
    rooms: {
      room_number: number;
      is_male_accommodation: boolean;
      max_capacity: number;
    }[];
  }[];
};
export type ResponsCreateMinaPack4 = {};
export const initialMinaState: MinaState = {
  isLoading: null,
  errors: null,
  status: 'prompt',
};
