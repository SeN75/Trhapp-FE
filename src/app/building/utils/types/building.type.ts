import { Building, TPState } from '../../../shared/types/base.type';

export type CreateBuilding = Omit<Building, 'id'>;
export type UpdateBuilding = Partial<Building>;
export type Buildings = Building[];

export type BuildingState = {
  buildings: Buildings | null;
  isLoading: boolean | null;
  errors: string | null;
  selectedBuilding: Building | null;
  selectedBuildingIndex: number | null;
  status: TPState;
};
export const initialBuildingState: BuildingState = {
  buildings: null,
  isLoading: null,
  errors: null,
  selectedBuilding: null,
  selectedBuildingIndex: null,
  status: 'prompt',
};
