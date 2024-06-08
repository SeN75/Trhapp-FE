import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LoggerService } from '@/shared/service/logger.service';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { PilgrimService } from '../service/pilgrim.service';
import { PilgrimState } from '@/pilgrim/utils/types/pilgrim.type';
import { PilgrimAction } from './pilgrim.action';

export const getPilgrimEffects = createEffect(
  (
    actions = inject(Actions),
    service = inject(PilgrimService),
    logger = inject(LoggerService)
  ) =>
    actions.pipe(
      ofType(PilgrimAction.get),
      switchMap(({ page = '' }) => service.get(page)),
      // map((pilgrims) => pilgrims.sort((a, b) => +a.id - +b.id)),
      tap((pilgrims) => console.log(pilgrims)),
      map((pilgrims) => PilgrimAction.getSuccess({ pilgrims })),
      catchError((error) => {
        logger.error('[getPilgrimEffects erorr]', error);
        return of(PilgrimAction.error({ error }));
      })
    ),
  { functional: true }
);
export const createPilgrimEffects = createEffect(
  (
    actions = inject(Actions),
    service = inject(PilgrimService),
    logger = inject(LoggerService)
  ) =>
    actions.pipe(
      ofType(PilgrimAction.create),
      switchMap(({ pilgrim }) => service.create(pilgrim)),
      map((Pilgrim) => PilgrimAction.success()),
      catchError((error) => {
        logger.error('[createPilgrimEffects erorr]', error);
        return of(PilgrimAction.error({ error }));
      })
    ),
  { functional: true }
);

export const updatePilgrimEffects = createEffect(
  (
    actions = inject(Actions),
    service = inject(PilgrimService),
    logger = inject(LoggerService)
  ) =>
    actions.pipe(
      ofType(PilgrimAction.update),
      switchMap(({ updatePilgrim }) => service.update(updatePilgrim)),
      map((Pilgrim) => PilgrimAction.success()),
      catchError((error) => {
        logger.error('[updatePilgrimEffects erorr]', error);
        return of(PilgrimAction.error({ error }));
      })
    ),
  { functional: true }
);

export const deletePilgrimEffects = createEffect(
  (
    actions = inject(Actions),
    service = inject(PilgrimService),
    logger = inject(LoggerService)
  ) =>
    actions.pipe(
      ofType(PilgrimAction.delete),
      switchMap(({ id }) => service.delete(id)),
      map((Pilgrim) => PilgrimAction.success()),
      catchError((error) => {
        logger.error('[deletePilgrimEffects erorr]', error);
        return of(PilgrimAction.error({ error }));
      })
    ),
  { functional: true }
);
export const updateProfilePilgrimEffects = createEffect(
  (
    actions = inject(Actions),
    service = inject(PilgrimService),
    logger = inject(LoggerService)
  ) =>
    actions.pipe(
      ofType(PilgrimAction.updateImage),
      switchMap(({ id, file }) => service.uploadImage(id, file)),
      map((Pilgrim) => PilgrimAction.success()),
      catchError((error) => {
        logger.error('[updateProfilePilgrimEffects erorr]', error);
        return of(PilgrimAction.error({ error }));
      })
    ),
  { functional: true }
);

export const getDataEffect = createEffect(
  (
    actions = inject(Actions),
    logger = inject(LoggerService),
    store = inject(Store<{ pilgrims: PilgrimState }>)
  ) =>
    actions.pipe(
      ofType(PilgrimAction.success),
      tap(() => store.dispatch(PilgrimAction.get({ page: '0' })))
    ),
  { functional: true }
);
