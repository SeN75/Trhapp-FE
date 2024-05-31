import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LoggerService } from '@/shared/service/logger.service';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { CityService } from '../service/cities.service';
import { CityState } from '@/citites/utils/types/cities.type';
import { CityAction } from './cities.action';

export const getcityEffects = createEffect(
  (
    actions = inject(Actions),
    service = inject(CityService),
    logger = inject(LoggerService)
  ) =>
    actions.pipe(
      ofType(CityAction.get),
      switchMap(() => service.get()),
      map((cities) => CityAction.getSuccess({ cities })),
      catchError((error) => {
        logger.error('[getcityEffects erorr]', error);
        return of(CityAction.error({ error }));
      })
    ),
  { functional: true }
);
export const createcityEffects = createEffect(
  (
    actions = inject(Actions),
    service = inject(CityService),
    logger = inject(LoggerService)
  ) =>
    actions.pipe(
      ofType(CityAction.create),
      switchMap(({ city }) => service.create(city)),
      map((city) => CityAction.success()),
      catchError((error) => {
        logger.error('[createcityEffects erorr]', error);
        return of(CityAction.error({ error }));
      })
    ),
  { functional: true }
);

export const updatecityEffects = createEffect(
  (
    actions = inject(Actions),
    service = inject(CityService),
    logger = inject(LoggerService)
  ) =>
    actions.pipe(
      ofType(CityAction.update),
      switchMap(({ updateCity }) => service.update(updateCity)),
      map((city) => CityAction.success()),
      catchError((error) => {
        logger.error('[updatecityEffects erorr]', error);
        return of(CityAction.error({ error }));
      })
    ),
  { functional: true }
);

export const deletecityEffects = createEffect(
  (
    actions = inject(Actions),
    service = inject(CityService),
    logger = inject(LoggerService)
  ) =>
    actions.pipe(
      ofType(CityAction.delete),
      switchMap(({ id }) => service.delete(id)),
      map((city) => CityAction.success()),
      catchError((error) => {
        logger.error('[deletecityEffects erorr]', error);
        return of(CityAction.error({ error }));
      })
    ),
  { functional: true }
);

export const getDataEffect = createEffect(
  (
    actions = inject(Actions),
    logger = inject(LoggerService),
    store = inject(Store<{ city: CityState }>)
  ) =>
    actions.pipe(
      ofType(CityAction.success),
      tap(() => store.dispatch(CityAction.get()))
    ),
  { functional: true }
);
