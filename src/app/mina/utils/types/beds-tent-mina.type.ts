import { BedTentMina, TPState } from '@/shared/types/base.type';

export type CreateBedTentMina = Omit<BedTentMina, 'id'>;
export type UpdateBedTentMina = Partial<BedTentMina>;
export type BedsTentMina = BedTentMina[];

export type BedTentMinaState = {
  lounge_mina: BedsTentMina | null;
  isLoading: boolean | null;
  errors: string | null;
  selectedBedTentMina: BedTentMina | null;
  selectedBedTentMinaIndex: number | null;
  status: TPState;
};
export const initialBedTentMinaState: BedTentMinaState = {
  lounge_mina: null,
  isLoading: null,
  errors: null,
  selectedBedTentMina: null,
  selectedBedTentMinaIndex: null,
  status: 'prompt',
};
