import { LoungeArafah, TPState } from '@/shared/types/base.type';
import { BedsTentArafah } from './beds-tent-arafah.type';
import { LoungesArafah } from './lounges-arafah.type';

export type CreateArafahPack1 = {
  lounges: Omit<LoungesArafah, 'id' | 'name'>[];
};

export type ResponsCreatePack1 = LoungeArafah &
  {
    beds: BedsTentArafah;
  }[];
export type ArafahState = {
  isLoading: boolean | null;
  errors: string | null;
  status: TPState;
};
export const initialArafahState: ArafahState = {
  isLoading: null,
  errors: null,
  status: 'prompt',
};
