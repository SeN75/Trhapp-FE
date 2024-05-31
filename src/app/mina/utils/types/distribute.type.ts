import { Pilgrims } from '../../../pilgrim/utils/types/pilgrim.type';
import { TPState } from '@/shared/types/base.type';

export type Distribute = {
  identifier: 'A1';
};

export type DistributePeek = {
  total_groups: number;
  distribution: (Distribute & {
    total_groups: number;
    booking_references: string[];
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

export type DistributeRead = (Distribute & {
  pilgrims: Pilgrims;
})[];

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
