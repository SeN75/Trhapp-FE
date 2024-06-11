import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LoggerService } from '@/shared/service/logger.service';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { SuiteService } from '../service/suites.service';
import { LoungeMinaState } from '@/mina/utils/types/lounges-mina.type';
import { SuitesAction } from './suites.action';

export const getSuiteEffects = createEffect(
  (
    actions = inject(Actions),
    service = inject(SuiteService),
    logger = inject(LoggerService)
  ) =>
    actions.pipe(
      ofType(SuitesAction.get),
      switchMap(() =>
        service.get().pipe(
          map((suites) => SuitesAction.getSuccess({ suites })),
          catchError((error) => {
            logger.error('[getSuiteEffects erorr]', error);
            return of(SuitesAction.error({ error }));
          })
        )
      )
    ),
  { functional: true }
);
export const createSuiteEffects = createEffect(
  (
    actions = inject(Actions),
    service = inject(SuiteService),
    logger = inject(LoggerService)
  ) =>
    actions.pipe(
      ofType(SuitesAction.create),
      switchMap(({ suite }) =>
        service.create(suite).pipe(
          map((suite) => SuitesAction.success()),
          catchError((error) => {
            logger.error('[createSuiteEffects erorr]', error);
            return of(SuitesAction.error({ error }));
          })
        )
      )
    ),
  { functional: true }
);

export const updateSuiteEffects = createEffect(
  (
    actions = inject(Actions),
    service = inject(SuiteService),
    logger = inject(LoggerService)
  ) =>
    actions.pipe(
      ofType(SuitesAction.update),
      switchMap(({ updateSuites }) =>
        service.update(updateSuites).pipe(
          map((suite) => SuitesAction.success()),
          catchError((error) => {
            logger.error('[updateSuiteEffects erorr]', error);
            return of(SuitesAction.error({ error }));
          })
        )
      )
    ),
  { functional: true }
);

export const deleteSuiteEffects = createEffect(
  (
    actions = inject(Actions),
    service = inject(SuiteService),
    logger = inject(LoggerService)
  ) =>
    actions.pipe(
      ofType(SuitesAction.delete),
      switchMap(({ id }) =>
        service.delete(id).pipe(
          map((suite) => SuitesAction.success()),
          catchError((error) => {
            logger.error('[deleteSuiteEffects erorr]', error);
            return of(SuitesAction.error({ error }));
          })
        )
      )
    ),
  { functional: true }
);

export const getDataEffect = createEffect(
  (
    actions = inject(Actions),
    logger = inject(LoggerService),
    store = inject(Store<{ suite: LoungeMinaState }>)
  ) =>
    actions.pipe(
      ofType(SuitesAction.success),
      tap(() => store.dispatch(SuitesAction.get()))
    ),
  { functional: true }
);
