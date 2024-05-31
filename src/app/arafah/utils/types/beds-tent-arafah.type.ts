import { BedTentArafah, TPState } from '@/shared/types/base.type';

export type CreateBedTentArafah = Omit<BedTentArafah, 'id'>;
export type UpdateBedTentArafah = Partial<BedTentArafah>;
export type BedsTentArafah = BedTentArafah[];

export type BedTentArafahState = {
  lounge_arafah: BedsTentArafah | null;
  isLoading: boolean | null;
  errors: string | null;
  selectedBedTentArafah: BedTentArafah | null;
  selectedBedTentArafahIndex: number | null;
  status: TPState;
};
export const initialBedTentArafahState: BedTentArafahState = {
  lounge_arafah: null,
  isLoading: null,
  errors: null,
  selectedBedTentArafah: null,
  selectedBedTentArafahIndex: null,
  status: 'prompt',
};
