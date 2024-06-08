import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UploadOpsService } from '../../service/upload-operations.service';
import { UploadOperationActions } from './upload-operation.action';
import { LoggerService } from '../../service/logger.service';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { PilgrimState } from '@/pilgrim/utils/types/pilgrim.type';
import { PilgrimAction } from '@/pilgrim/data-access/store/pilgrim.action';

export const uploadOperationEffects = createEffect(
  (
    actions = inject(Actions),
    logger = inject(LoggerService),
    service = inject(UploadOpsService)
  ) =>
    actions.pipe(
      ofType(UploadOperationActions.upload),
      switchMap(({ file }) => service.upload(file)),
      map((res) => UploadOperationActions.success({ res })),
      catchError((error) => {
        logger.error('[uploadOperationEffects erorr]', error);
        return of(UploadOperationActions.error({ error }));
      })
    ),
  {
    functional: true,
  }
);

export const uploadSuccessEffect = createEffect(
  (
    acitons = inject(Actions),
    pStore = inject(Store<{ pilgrims: PilgrimState }>)
  ) =>
    acitons.pipe(
      ofType(UploadOperationActions.success),
      tap(() => pStore.dispatch(PilgrimAction.get({ page: '1' })))
    ),
  { functional: true, dispatch: false }
);
