import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LoggerService } from '../../../shared/service/logger.service';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { BuildingService } from '../service/building.service';
import { BuildingState } from '../../utils/types/building.type';
import { BuildingAction } from './building.action';

export const getBuildingEffects = createEffect(
  (
    actions = inject(Actions),
    service = inject(BuildingService),
    logger = inject(LoggerService)
  ) =>
    actions.pipe(
      ofType(BuildingAction.get),
      switchMap(() => service.get()),
      tap((res) => logger.log('[getBuildingEffects success]', res)),
      map((buildings) => BuildingAction.getSuccess({ buildings })),
      catchError((error) => {
        logger.error('[getBuildingEffects erorr]', error);
        return of(BuildingAction.error({ error }));
      })
    ),
  { functional: true }
);
export const createBuildingEffects = createEffect(
  (
    actions = inject(Actions),
    service = inject(BuildingService),
    logger = inject(LoggerService)
  ) =>
    actions.pipe(
      ofType(BuildingAction.create),
      switchMap(({ building }) => service.create(building)),
      map((Building) => BuildingAction.success()),
      catchError((error) => {
        logger.error('[createBuildingEffects erorr]', error);
        return of(BuildingAction.error({ error }));
      })
    ),
  { functional: true }
);

export const updateBuildingEffects = createEffect(
  (
    actions = inject(Actions),
    service = inject(BuildingService),
    logger = inject(LoggerService)
  ) =>
    actions.pipe(
      ofType(BuildingAction.update),
      switchMap(({ updateBuilding }) => service.update(updateBuilding)),
      map((Building) => BuildingAction.success()),
      catchError((error) => {
        logger.error('[updateBuildingEffects erorr]', error);
        return of(BuildingAction.error({ error }));
      })
    ),
  { functional: true }
);

export const deleteBuildingEffects = createEffect(
  (
    actions = inject(Actions),
    service = inject(BuildingService),
    logger = inject(LoggerService)
  ) =>
    actions.pipe(
      ofType(BuildingAction.delete),
      switchMap(({ id }) => service.delete(id)),
      map((Building) => BuildingAction.success()),
      catchError((error) => {
        logger.error('[deleteBuildingEffects erorr]', error);
        return of(BuildingAction.error({ error }));
      })
    ),
  { functional: true }
);

export const getDataEffect = createEffect(
  (
    actions = inject(Actions),
    logger = inject(LoggerService),
    store = inject(Store<{ buildings: BuildingState }>)
  ) =>
    actions.pipe(
      ofType(BuildingAction.success),
      tap(() => store.dispatch(BuildingAction.get()))
    ),
  { functional: true }
);
