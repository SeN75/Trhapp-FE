import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LoggerService } from '../../../shared/service/logger.service';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { BedTentArafahService } from '../service/beds-tent-arafah.service';
import { BedTentArafahState } from '../../utils/types/beds-tent-arafah.type';
import { BedTentArafahAction } from './beds-tent-arafah.action';

export const getBedTentArafahEffects = createEffect(
  (
    actions = inject(Actions),
    service = inject(BedTentArafahService),
    logger = inject(LoggerService)
  ) =>
    actions.pipe(
      ofType(BedTentArafahAction.get),
      switchMap(() => service.get()),
      map((beds_tent_arafah) =>
        BedTentArafahAction.getSuccess({ beds_tent_arafah })
      ),
      catchError((error) => {
        logger.error('[getBedTentArafahEffects erorr]', error);
        return of(BedTentArafahAction.error({ error }));
      })
    ),
  { functional: true }
);
export const createBedTentArafahEffects = createEffect(
  (
    actions = inject(Actions),
    service = inject(BedTentArafahService),
    logger = inject(LoggerService)
  ) =>
    actions.pipe(
      ofType(BedTentArafahAction.create),
      switchMap(({ bed_tent_arafah }) => service.create(bed_tent_arafah)),
      map((bedTentArafah) => BedTentArafahAction.success()),
      catchError((error) => {
        logger.error('[createBedTentArafahEffects erorr]', error);
        return of(BedTentArafahAction.error({ error }));
      })
    ),
  { functional: true }
);

export const updateBedTentArafahEffects = createEffect(
  (
    actions = inject(Actions),
    service = inject(BedTentArafahService),
    logger = inject(LoggerService)
  ) =>
    actions.pipe(
      ofType(BedTentArafahAction.update),
      switchMap(({ updateBedTentArafah }) =>
        service.update(updateBedTentArafah)
      ),
      map((bedTentArafah) => BedTentArafahAction.success()),
      catchError((error) => {
        logger.error('[updateBedTentArafahEffects erorr]', error);
        return of(BedTentArafahAction.error({ error }));
      })
    ),
  { functional: true }
);

export const deleteBedTentArafahEffects = createEffect(
  (
    actions = inject(Actions),
    service = inject(BedTentArafahService),
    logger = inject(LoggerService)
  ) =>
    actions.pipe(
      ofType(BedTentArafahAction.delete),
      switchMap(({ id }) => service.delete(id)),
      map((bedTentArafah) => BedTentArafahAction.success()),
      catchError((error) => {
        logger.error('[deleteBedTentArafahEffects erorr]', error);
        return of(BedTentArafahAction.error({ error }));
      })
    ),
  { functional: true }
);

export const getDataEffect = createEffect(
  (
    actions = inject(Actions),
    logger = inject(LoggerService),
    store = inject(Store<{ bedTentArafah: BedTentArafahState }>)
  ) =>
    actions.pipe(
      ofType(BedTentArafahAction.success),
      tap(() => store.dispatch(BedTentArafahAction.get()))
    ),
  { functional: true }
);
