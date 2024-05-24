import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LoggerService } from '../../../shared/service/logger.service';
import { MinaAction } from './mina.action';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { MinaService } from '../service/mina.service';
import { SuiteService } from '../service/suites.service';
import { Store } from '@ngrx/store';
import { SuiteState } from '../../utils/types/suites.type';
import { SuitesAction } from './suites.action';
import { Suite } from '../../../shared/types/base.type';

export const getBusesEffects = createEffect(
  (
    actions = inject(Actions),
    service = inject(MinaService),
    logger = inject(LoggerService)
  ) =>
    actions.pipe(
      ofType(MinaAction.get),
      switchMap(() => service.get()),
      map((data: any) => MinaAction.getSuccess({ data })),
      catchError((error) => {
        logger.error('[getBusesEffects erorr]', error);
        return of(MinaAction.error({ error }));
      })
    ),
  { functional: true }
);
export const createMinaEffects = createEffect(
  (
    actions = inject(Actions),
    service = inject(MinaService),
    logger = inject(LoggerService)
  ) =>
    actions.pipe(
      ofType(MinaAction.create),
      tap((data) => logger.log('[createMinaEffects]', data)),
      switchMap(({ payload, pack }) => service.create(payload, pack)),
      map((data) => MinaAction.success()),
      catchError((error) => {
        logger.error('[createMinaEffects erorr]', error);
        return of(MinaAction.error({ error }));
      })
    ),
  { functional: true }
);
export const allocateMinaEffects = createEffect(
  (
    actions = inject(Actions),
    service = inject(MinaService),
    logger = inject(LoggerService)
  ) =>
    actions.pipe(
      ofType(MinaAction.allocate),
      switchMap(({ pack }) => service.allocate(pack)),
      map((data) => MinaAction.success()),
      catchError((error) => {
        logger.error('[createMinaEffects erorr]', error);
        return of(MinaAction.error({ error }));
      })
    ),
  { functional: true }
);

export const createEffectSuccess = createEffect(
  (
    actions = inject(Actions),
    logger = inject(LoggerService),
    store = inject(Store<{ suites: SuiteState }>)
  ) =>
    actions.pipe(
      ofType(MinaAction.success),
      tap(() => store.dispatch(SuitesAction.get()))
    ),
  { functional: true, dispatch: false }
);
