import { createFeature, createReducer, on } from '@ngrx/store';
import { initialUploadOpsState } from '../../types/upload-operations.type';
import { UploadOperationActions } from './upload-operation.action';
import { TPState } from '../../types/base.type';

export const UploadOpsFeature = createFeature({
  name: 'uploadOps',
  reducer: createReducer(
    initialUploadOpsState,
    on(UploadOperationActions.upload, (state) => ({
      ...state,
      isLoading: true,
      status: 'sending' as TPState,
    })),
    on(UploadOperationActions.success, (state) => ({
      ...state,
      isLoading: false,
      status: 'success' as TPState,
    })),
    on(UploadOperationActions.error, (state, { error }) => ({
      ...state,
      isLoading: false,
      status: 'error' as TPState,
      errors: error,
    })),
    on(UploadOperationActions.reset, (state) => ({
      ...state,
      isLoading: null,
      status: 'prompt' as TPState,
      errors: null,
    }))
  ),
});

export const {
  name: UploadOpsFeatureKey,
  reducer: UploadOpsReducer,
  selectData,
  selectErrors,
  selectIsLoading,
  selectStatus,
} = UploadOpsFeature;
