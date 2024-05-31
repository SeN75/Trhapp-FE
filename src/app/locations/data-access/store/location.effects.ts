import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LoggerService } from '@/shared/service/logger.service';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { LocationService } from '../service/location.service';
import { LocationState } from '@/locations/utils/types/location.type';
import { LocationAction } from './location.action';

export const getlocationEffects = createEffect(
  (
    actions = inject(Actions),
    service = inject(LocationService),
    logger = inject(LoggerService)
  ) =>
    actions.pipe(
      ofType(LocationAction.get),
      switchMap(() => service.get()),
      map((locations) => LocationAction.getSuccess({ locations })),
      catchError((error) => {
        logger.error('[getlocationEffects erorr]', error);
        return of(LocationAction.error({ error }));
      })
    ),
  { functional: true }
);
export const createlocationEffects = createEffect(
  (
    actions = inject(Actions),
    service = inject(LocationService),
    logger = inject(LoggerService)
  ) =>
    actions.pipe(
      ofType(LocationAction.create),
      switchMap(({ location }) => service.create(location)),
      map((location) => LocationAction.success()),
      catchError((error) => {
        logger.error('[createlocationEffects erorr]', error);
        return of(LocationAction.error({ error }));
      })
    ),
  { functional: true }
);

export const updatelocationEffects = createEffect(
  (
    actions = inject(Actions),
    service = inject(LocationService),
    logger = inject(LoggerService)
  ) =>
    actions.pipe(
      ofType(LocationAction.update),
      switchMap(({ updateLocation }) => service.update(updateLocation)),
      map((location) => LocationAction.success()),
      catchError((error) => {
        logger.error('[updatelocationEffects erorr]', error);
        return of(LocationAction.error({ error }));
      })
    ),
  { functional: true }
);

export const deletelocationEffects = createEffect(
  (
    actions = inject(Actions),
    service = inject(LocationService),
    logger = inject(LoggerService)
  ) =>
    actions.pipe(
      ofType(LocationAction.delete),
      switchMap(({ id }) => service.delete(id)),
      map((location) => LocationAction.success()),
      catchError((error) => {
        logger.error('[deletelocationEffects erorr]', error);
        return of(LocationAction.error({ error }));
      })
    ),
  { functional: true }
);

export const getDataEffect = createEffect(
  (
    actions = inject(Actions),
    logger = inject(LoggerService),
    store = inject(Store<{ location: LocationState }>)
  ) =>
    actions.pipe(
      ofType(LocationAction.success),
      tap(() => store.dispatch(LocationAction.get()))
    ),
  { functional: true }
);
