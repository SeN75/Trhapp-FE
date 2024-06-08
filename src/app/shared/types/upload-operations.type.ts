import { TPState } from './base.type';

export type UploadOpsRes = {
  existing_cities: string[];
  existing_cities_count: number;
  existing_locations: string[];
  existing_locations_count: number;
  existing_pilgrims_count: number;
  new_cities_added: string[];
  new_cities_count: number;
  new_locations_added: string[];
  new_locations_count: number;
  new_pilgrims_added: number;
  pilgrims_with_permit: number;
  pilgrims_without_permit: number;
  total_cities_after: string[];
  total_cities_after_count: number;
  total_locations_after: string[];
  total_locations_after_count: number;
  total_pilgrims_count_in_file: number;
};
export type UploadOpsState = {
  isLoading: boolean | null;
  errors: string | null;
  data: unknown | null;
  status: TPState;
  res: UploadOpsRes | null;
};

export const initialUploadOpsState: UploadOpsState = {
  isLoading: null,
  errors: null,
  data: null,
  status: 'prompt',
  res: null,
};

export type BatchesRes = {
  total_pilgrims: number;
  total_batches: number;
  batch_links: { batch_number: number; is_sent: boolean }[];
};
