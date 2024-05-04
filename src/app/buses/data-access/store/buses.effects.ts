import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LoggerService } from '../../../shared/service/logger.service';
import { BusesAction } from './buses.action';
import { BusesService } from '../service/buses.service';
import { catchError, map, of, switchMap } from 'rxjs';

export const getBusesEffects = createEffect(
  (
    actions = inject(Actions),
    service = inject(BusesService),
    logger = inject(LoggerService)
  ) =>
    actions.pipe(
      ofType(BusesAction.get),
      switchMap(() => service.get()),
      map((buses) => BusesAction.success({ buses })),
      catchError((error) => {
        logger.error('[getBusesEffects erorr]', error);
        return of(BusesAction.error({ error }));
      })
    ),
  { functional: true }
);
export const createBusEffects = createEffect(
  (
    actions = inject(Actions),
    service = inject(BusesService),
    logger = inject(LoggerService)
  ) =>
    actions.pipe(
      ofType(BusesAction.create),
      switchMap(({ bus }) => service.create(bus)),
      map((buses) => BusesAction.success({ buses: [buses] })),
      catchError((error) => {
        logger.error('[createBusEffects erorr]', error);
        return of(BusesAction.error({ error }));
      })
    ),
  { functional: true }
);
