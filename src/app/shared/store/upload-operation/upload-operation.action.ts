import { createAction, props } from '@ngrx/store';

export const UploadOperationActions = {
  upload: createAction('[Upload Operation] Upload', props<{ file: File }>()),
  success: createAction('[Upload Operation] Success'),
  error: createAction('[Upload Operation] Error', props<{ error: string }>()),
  reset: createAction('[Upload Operation] Reset'),
};
