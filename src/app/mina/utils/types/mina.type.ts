export type MinaState = {
  isLoading: boolean | null;
  errors: string | null;
};
export const initialMinaState: MinaState = {
  isLoading: null,
  errors: null,
};
