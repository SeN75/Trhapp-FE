import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LoggerService } from '../../../shared/service/logger.service';
import { ArafahAction } from './arafah.action';
import { catchError, map, of, switchMap } from 'rxjs';
import { ArafahService } from '../service/arafah.service';

export const getArafahEffects = createEffect(
  (
    actions = inject(Actions),
    service = inject(ArafahService),
    logger = inject(LoggerService)
  ) =>
    actions.pipe(
      ofType(ArafahAction.get),
      switchMap(() => service.get()),
      map((data: any) => ArafahAction.getSuccess({ data })),
      catchError((error) => {
        logger.error('[getArafahEffects erorr]', error);
        return of(ArafahAction.error({ error }));
      })
    ),
  { functional: true }
);
export const createArafahEffects = createEffect(
  (
    actions = inject(Actions),
    service = inject(ArafahService),
    logger = inject(LoggerService)
  ) =>
    actions.pipe(
      ofType(ArafahAction.create),
      switchMap(({ payload, pack }) => service.create(payload, pack)),
      map((data) => ArafahAction.success()),
      catchError((error) => {
        logger.error('[createArafahEffects erorr]', error);
        return of(ArafahAction.error({ error }));
      })
    ),
  { functional: true }
);
export const allocateArafahEffects = createEffect(
  (
    actions = inject(Actions),
    service = inject(ArafahService),
    logger = inject(LoggerService)
  ) =>
    actions.pipe(
      ofType(ArafahAction.allocate),
      switchMap(({ pack }) => service.allocate(pack)),
      map((data) => ArafahAction.success()),
      catchError((error) => {
        logger.error('[createArafahEffects erorr]', error);
        return of(ArafahAction.error({ error }));
      })
    ),
  { functional: true }
);