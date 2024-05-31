import { Suite, TPState } from '@/shared/types/base.type';

export type CreateSuite = Omit<Suite, 'id'>;
export type UpdateSuite = Partial<Suite>;
export type Suites = Suite[];

export type SuiteState = {
  suites: Suites | null;
  isLoading: boolean | null;
  errors: string | null;
  selectedSuite: Suite | null;
  selectedSuiteIndex: number | null;
  status: TPState;
};
export const initialSuiteState: SuiteState = {
  suites: null,
  isLoading: null,
  errors: null,
  selectedSuite: null,
  selectedSuiteIndex: null,
  status: 'prompt',
};
