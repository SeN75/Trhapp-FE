import { TPState } from './base.type';

export type UploadOpsState = {
  isLoading: boolean | null;
  errors: string | null;
  data: unknown | null;
  status: TPState;
};

export const initialUploadOpsState: UploadOpsState = {
  isLoading: null,
  errors: null,
  data: null,
  status: 'prompt',
};

export type BatchesRes = {
  total_pilgrims: number;
  total_batches: number;
  batch_links: { batch_number: number; is_sent: boolean }[];
};
