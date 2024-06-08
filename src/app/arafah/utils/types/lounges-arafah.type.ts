import { LoungeArafah, TPState } from '@/shared/types/base.type';

export type CreateLoungeArafah = Omit<LoungeArafah, 'id' | 'name'>;
export type UpdateLoungeArafah = Partial<LoungeArafah>;
export type LoungesArafah = LoungeArafah[];

export type LoungeArafahState = {
  lounges_arafah: LoungesArafah | null;
  lounges_building_arafah: LoungesArafah | null;
  isLoading: boolean | null;
  errors: string | null;
  selectedLoungeArafah: LoungeArafah | null;
  selectedLoungeArafahIndex: number | null;
  status: TPState;
};
export const initialLoungeArafahState: LoungeArafahState = {
  lounges_arafah: null,
  lounges_building_arafah: null,
  isLoading: null,
  errors: null,
  selectedLoungeArafah: null,
  selectedLoungeArafahIndex: null,
  status: 'prompt',
};
