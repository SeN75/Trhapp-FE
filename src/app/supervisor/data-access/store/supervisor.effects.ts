import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LoggerService } from '../../../shared/service/logger.service';
import { SupervisorAction } from './supervisor.action';
import { catchError, map, of, switchMap } from 'rxjs';
import { SupervisorService } from '../service/supervisor.service';

export const getBusesEffects = createEffect(
  (
    actions = inject(Actions),
    service = inject(SupervisorService),
    logger = inject(LoggerService)
  ) =>
    actions.pipe(
      ofType(SupervisorAction.get),
      switchMap(() => service.get()),
      map((supervisors) => SupervisorAction.success({ supervisors })),
      catchError((error) => {
        logger.error('[getBusesEffects erorr]', error);
        return of(SupervisorAction.error({ error }));
      })
    ),
  { functional: true }
);
export const createBusEffects = createEffect(
  (
    actions = inject(Actions),
    service = inject(SupervisorService),
    logger = inject(LoggerService)
  ) =>
    actions.pipe(
      ofType(SupervisorAction.create),
      switchMap(({ supervisor }) => service.create(supervisor)),
      map((supervisors) =>
        SupervisorAction.success({ supervisors: [supervisors] })
      ),
      catchError((error) => {
        logger.error('[createBusEffects erorr]', error);
        return of(SupervisorAction.error({ error }));
      })
    ),
  { functional: true }
);
