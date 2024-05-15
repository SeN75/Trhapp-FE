import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LoggerService } from '../../../shared/service/logger.service';
import { BusesAction } from './buses.action';
import { BusesService } from '../service/buses.service';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { BusState } from '../../utils/types/buses.type';
import { Store } from '@ngrx/store';

export const getBusesEffects = createEffect(
  (
    actions = inject(Actions),
    service = inject(BusesService),
    logger = inject(LoggerService)
  ) =>
    actions.pipe(
      ofType(BusesAction.get),
      switchMap(() => service.get()),
      map((buses) => BusesAction.getSuccess({ buses })),
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
      map((buses) => BusesAction.success()),
      catchError((error) => {
        logger.error('[createBusEffects erorr]', error);
        return of(BusesAction.error({ error }));
      })
    ),
  { functional: true }
);

export const updateBusEffects = createEffect(
  (
    actions = inject(Actions),
    service = inject(BusesService),
    logger = inject(LoggerService)
  ) =>
    actions.pipe(
      ofType(BusesAction.update),
      switchMap(({ updateBus }) => service.update(updateBus)),
      map((buses) => BusesAction.success()),
      catchError((error) => {
        logger.error('[updateBusEffects erorr]', error);
        return of(BusesAction.error({ error }));
      })
    ),
  { functional: true }
);

export const deleteBusEffects = createEffect(
  (
    actions = inject(Actions),
    service = inject(BusesService),
    logger = inject(LoggerService)
  ) =>
    actions.pipe(
      ofType(BusesAction.delete),
      switchMap(({ id }) => service.delete(id)),
      map((buses) => BusesAction.success()),
      catchError((error) => {
        logger.error('[deleteBusEffects erorr]', error);
        return of(BusesAction.error({ error }));
      })
    ),
  { functional: true }
);

export const getDataEffect = createEffect(
  (
    actions = inject(Actions),
    logger = inject(LoggerService),
    store = inject(Store<{ buses: BusState }>)
  ) =>
    actions.pipe(
      ofType(BusesAction.success),
      tap(() => store.dispatch(BusesAction.get()))
    ),
  { functional: true }
);
