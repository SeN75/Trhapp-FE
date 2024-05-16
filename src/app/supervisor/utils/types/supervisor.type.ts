import { Supervisor, TPState } from '../../../shared/types/base.type';

export type CreateSupervisor = Omit<Supervisor, 'id'>;
export type UpdateSupervisor = Partial<Supervisor>;
export type Supervisors = Supervisor[];

export type SupervisorState = {
  supervisores: Supervisors | null;
  isLoading: boolean | null;
  errors: string | null;
  selectedSupervisor: Supervisor | null;
  selectedSupervisorIndex: number | null;
  status: TPState;
};
export const initialSupervisorState: SupervisorState = {
  supervisores: null,
  isLoading: null,
  errors: null,
  selectedSupervisor: null,
  selectedSupervisorIndex: null,
  status: 'prompt',
};
