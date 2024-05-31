import { BedBuidingMina, TPState } from '@/shared/types/base.type';

export type CreateBedBuidingMina = Omit<BedBuidingMina, 'id'>;
export type UpdateBedBuidingMina = Partial<BedBuidingMina>;
export type BedsBuidingMina = BedBuidingMina[];

export type BedBuidingMinaState = {
  beds: BedsBuidingMina | null;
  isLoading: boolean | null;
  errors: string | null;
  selectedBedBuidingMina: BedBuidingMina | null;
  selectedBedBuidingMinaIndex: number | null;
  status: TPState;
};
export const initialBedBuidingMinaState: BedBuidingMinaState = {
  beds: null,
  isLoading: null,
  errors: null,
  selectedBedBuidingMina: null,
  selectedBedBuidingMinaIndex: null,
  status: 'prompt',
};
