import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LoggerService } from '@/shared/service/logger.service';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { FloorService } from '../service/floor.service';
import { FloorState } from '@/building/utils/types/floor.type';
import { FloorAction } from './floor.action';

export const getFloorEffects = createEffect(
  (
    actions = inject(Actions),
    service = inject(FloorService),
    logger = inject(LoggerService)
  ) =>
    actions.pipe(
      ofType(FloorAction.get),
      switchMap(() =>
        service.get().pipe(
          map((floors) => FloorAction.getSuccess({ floors })),
          catchError((error) => {
            logger.error('[getFloorEffects erorr]', error);
            return of(FloorAction.error({ error }));
          })
        )
      )
    ),
  { functional: true }
);
export const createFloorEffects = createEffect(
  (
    actions = inject(Actions),
    service = inject(FloorService),
    logger = inject(LoggerService)
  ) =>
    actions.pipe(
      ofType(FloorAction.create),
      switchMap(({ floor }) =>
        service.create(floor).pipe(
          map((Floor) => FloorAction.success()),
          catchError((error) => {
            logger.error('[createFloorEffects erorr]', error);
            return of(FloorAction.error({ error }));
          })
        )
      )
    ),
  { functional: true }
);

export const updateFloorEffects = createEffect(
  (
    actions = inject(Actions),
    service = inject(FloorService),
    logger = inject(LoggerService)
  ) =>
    actions.pipe(
      ofType(FloorAction.update),
      switchMap(({ updateFloor }) =>
        service.update(updateFloor).pipe(
          map((Floor) => FloorAction.success()),
          catchError((error) => {
            logger.error('[updateFloorEffects erorr]', error);
            return of(FloorAction.error({ error }));
          })
        )
      )
    ),
  { functional: true }
);

export const deleteFloorEffects = createEffect(
  (
    actions = inject(Actions),
    service = inject(FloorService),
    logger = inject(LoggerService)
  ) =>
    actions.pipe(
      ofType(FloorAction.delete),
      switchMap(({ id }) =>
        service.delete(id).pipe(
          map((Floor) => FloorAction.success()),
          catchError((error) => {
            logger.error('[deleteFloorEffects erorr]', error);
            return of(FloorAction.error({ error }));
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
    store = inject(Store<{ floors: FloorState }>)
  ) =>
    actions.pipe(
      ofType(FloorAction.success),
      tap(() => store.dispatch(FloorAction.get()))
    ),
  { functional: true }
);
