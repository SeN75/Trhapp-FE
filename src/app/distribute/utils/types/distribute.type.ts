import { Pilgrims } from '../../../pilgrim/utils/types/pilgrim.type';
import { TPState, Pilgrim } from '@/shared/types/base.type';

export type Distribute = {
  identifiers: 'A1';
};

export type DistributePeek = {
  total_groups: number;
  total_pilgrims: number;
  distribution: (Distribute & {
    total_groups: number;
  })[];
};

export type DistributeUpdate = {
  total_groups: number;
  result: (Distribute & {
    booking_reference: string;
    count: number;
    pilgrims: Pilgrims;
  })[];
};

export type DistributeRead = {
  total_groups: number;
  total_pilgrims: number;
  city: string;
  groups: [
    {
      identifier: string;
      pilgrims: Pilgrim[];
    }
  ];
}[];
export type DistributeState = {
  pack1Peek: DistributePeek | null;
  pack4Peek: DistributePeek | null;
  pack1Read: DistributeRead | null;
  pack4Read: DistributeRead | null;
  isLoading: boolean | null;
  errors: string | null;
  status: TPState;
};
export const initialDistributeState: DistributeState = {
  pack1Peek: null,
  pack4Peek: null,
  pack1Read: null,
  pack4Read: null,
  isLoading: null,
  errors: null,
  status: 'prompt',
};
