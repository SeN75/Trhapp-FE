import { TPState } from '@/shared/types/base.type';

export type DeleteAllocation = {
  national_id: string;
  location_type: string;
  package_name: string;
};

export type SwitchAllocation = {
  national_id1: string;
  national_id2: string;
  location_type: string;
  package_name: string;
};

export type ManualAllocation = {
  national_id: string;
  location_type: string;
  bed_id: number;
  package_name: string;
};

export type AllocationState = {
  delete: DeleteAllocation | null;
  switch: SwitchAllocation | null;
  manual: ManualAllocation | null;
  errors: string | null;
  isLoading: boolean | null;
  status: TPState;
};

export const initialAllocationState: AllocationState = {
  delete: null,
  switch: null,
  manual: null,
  errors: null,
  isLoading: null,
  status: 'prompt',
};
