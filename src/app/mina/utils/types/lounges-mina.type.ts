import { LoungeMina, TPState } from '../../../shared/types/base.type';

export type CreateLoungeMina = Omit<LoungeMina, 'id'>;
export type UpdateLoungeMina = Partial<LoungeMina>;
export type LoungesMina = LoungeMina[];

export type LoungeMinaState = {
  lounge_mina: LoungesMina | null;
  isLoading: boolean | null;
  errors: string | null;
  selectedLoungeMina: LoungeMina | null;
  selectedLoungeMinaIndex: number | null;
  status: TPState;
};
export const initialLoungeMinaState: LoungeMinaState = {
  lounge_mina: null,
  isLoading: null,
  errors: null,
  selectedLoungeMina: null,
  selectedLoungeMinaIndex: null,
  status: 'prompt',
};
