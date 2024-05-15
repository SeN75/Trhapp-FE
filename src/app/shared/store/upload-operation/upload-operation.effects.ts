import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UploadOpsService } from '../../service/upload-operations.service';
import { UploadOperationActions } from './upload-operation.action';
import { LoggerService } from '../../service/logger.service';
import { catchError, map, of, switchMap } from 'rxjs';

export const uploadOperationEffects = createEffect(
  (
    actions = inject(Actions),
    logger = inject(LoggerService),
    service = inject(UploadOpsService)
  ) =>
    actions.pipe(
      ofType(UploadOperationActions.upload),
      switchMap(({ file }) => service.upload(file)),
      map(() => UploadOperationActions.success()),
      catchError((error) => {
        logger.error('[uploadOperationEffects erorr]', error);
        return of(UploadOperationActions.error({ error }));
      })
    ),
  {
    functional: true,
  }
);
