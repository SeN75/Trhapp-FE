import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LoggerService } from '@/shared/service/logger.service';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { BedBuildingMinaService } from '../service/beds-building-mina.service';
import { BedBuidingMinaState } from '@/mina/utils/types/beds-building-mina.type';
import { BedBulidingMinaAction } from './beds-building-mina.action';

export const getBedBuildingMinaEffects = createEffect(
  (
    actions = inject(Actions),
    service = inject(BedBuildingMinaService),
    logger = inject(LoggerService)
  ) =>
    actions.pipe(
      ofType(BedBulidingMinaAction.get),
      switchMap(() =>
        service.get().pipe(
          map((beds_building_mina) =>
            BedBulidingMinaAction.getSuccess({ beds_building_mina })
          ),
          catchError((error) => {
            logger.error('[getBedBuildingMinaEffects erorr]', error);
            return of(BedBulidingMinaAction.error({ error }));
          })
        )
      )
    ),
  { functional: true }
);
export const createBedBuildingMinaEffects = createEffect(
  (
    actions = inject(Actions),
    service = inject(BedBuildingMinaService),
    logger = inject(LoggerService)
  ) =>
    actions.pipe(
      ofType(BedBulidingMinaAction.create),
      switchMap(({ bed_building_mina }) =>
        service.create(bed_building_mina).pipe(
          map((bedBuildingMina) => BedBulidingMinaAction.success()),
          catchError((error) => {
            logger.error('[createBedBuildingMinaEffects erorr]', error);
            return of(BedBulidingMinaAction.error({ error }));
          })
        )
      )
    ),
  { functional: true }
);

export const updateBedBuildingMinaEffects = createEffect(
  (
    actions = inject(Actions),
    service = inject(BedBuildingMinaService),
    logger = inject(LoggerService)
  ) =>
    actions.pipe(
      ofType(BedBulidingMinaAction.update),
      switchMap(({ updateBedBulidingMina }) =>
        service.update(updateBedBulidingMina).pipe(
          map((bedBuildingMina) => BedBulidingMinaAction.success()),
          catchError((error) => {
            logger.error('[updateBedBuildingMinaEffects erorr]', error);
            return of(BedBulidingMinaAction.error({ error }));
          })
        )
      )
    ),
  { functional: true }
);

export const deleteBedBuildingMinaEffects = createEffect(
  (
    actions = inject(Actions),
    service = inject(BedBuildingMinaService),
    logger = inject(LoggerService)
  ) =>
    actions.pipe(
      ofType(BedBulidingMinaAction.delete),
      switchMap(({ id }) =>
        service.delete(id).pipe(
          map((bedBuildingMina) => BedBulidingMinaAction.success()),
          catchError((error) => {
            logger.error('[deleteBedBuildingMinaEffects erorr]', error);
            return of(BedBulidingMinaAction.error({ error }));
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
    store = inject(Store<{ bedBuildingMina: BedBuidingMinaState }>)
  ) =>
    actions.pipe(
      ofType(BedBulidingMinaAction.success),
      tap(() => store.dispatch(BedBulidingMinaAction.get()))
    ),
  { functional: true }
);
