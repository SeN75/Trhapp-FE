import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LoggerService } from '../../../shared/service/logger.service';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { BedTentMinaService } from '../service/beds-tent-mina.service';
import { BedTentMinaState } from '../../utils/types/beds-tent-mina.type';
import { BedTentMinaAction } from './beds-tent-mina.action';

export const getBedTentMinaEffects = createEffect(
  (
    actions = inject(Actions),
    service = inject(BedTentMinaService),
    logger = inject(LoggerService)
  ) =>
    actions.pipe(
      ofType(BedTentMinaAction.get),
      switchMap(() => service.get()),
      map((beds_tent_mina) => BedTentMinaAction.getSuccess({ beds_tent_mina })),
      catchError((error) => {
        logger.error('[getBedTentMinaEffects erorr]', error);
        return of(BedTentMinaAction.error({ error }));
      })
    ),
  { functional: true }
);
export const createBedTentMinaEffects = createEffect(
  (
    actions = inject(Actions),
    service = inject(BedTentMinaService),
    logger = inject(LoggerService)
  ) =>
    actions.pipe(
      ofType(BedTentMinaAction.create),
      switchMap(({ bed_tent_mina }) => service.create(bed_tent_mina)),
      map((bedTentMina) => BedTentMinaAction.success()),
      catchError((error) => {
        logger.error('[createBedTentMinaEffects erorr]', error);
        return of(BedTentMinaAction.error({ error }));
      })
    ),
  { functional: true }
);

export const updateBedTentMinaEffects = createEffect(
  (
    actions = inject(Actions),
    service = inject(BedTentMinaService),
    logger = inject(LoggerService)
  ) =>
    actions.pipe(
      ofType(BedTentMinaAction.update),
      switchMap(({ updateBedTentMina }) => service.update(updateBedTentMina)),
      map((bedTentMina) => BedTentMinaAction.success()),
      catchError((error) => {
        logger.error('[updateBedTentMinaEffects erorr]', error);
        return of(BedTentMinaAction.error({ error }));
      })
    ),
  { functional: true }
);

export const deleteBedTentMinaEffects = createEffect(
  (
    actions = inject(Actions),
    service = inject(BedTentMinaService),
    logger = inject(LoggerService)
  ) =>
    actions.pipe(
      ofType(BedTentMinaAction.delete),
      switchMap(({ id }) => service.delete(id)),
      map((bedTentMina) => BedTentMinaAction.success()),
      catchError((error) => {
        logger.error('[deleteBedTentMinaEffects erorr]', error);
        return of(BedTentMinaAction.error({ error }));
      })
    ),
  { functional: true }
);

export const getDataEffect = createEffect(
  (
    actions = inject(Actions),
    logger = inject(LoggerService),
    store = inject(Store<{ bedTentMina: BedTentMinaState }>)
  ) =>
    actions.pipe(
      ofType(BedTentMinaAction.success),
      tap(() => store.dispatch(BedTentMinaAction.get()))
    ),
  { functional: true }
);
