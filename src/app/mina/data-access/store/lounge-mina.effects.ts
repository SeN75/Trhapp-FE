import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LoggerService } from '../../../shared/service/logger.service';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { LoungeMinaService } from '../service/lounge-mina.service';
import { LoungeMinaState } from '../../utils/types/lounges-mina.type';
import { LoungeMinaAction } from './lounge-mina.action';

export const getloungeMinaEffects = createEffect(
  (
    actions = inject(Actions),
    service = inject(LoungeMinaService),
    logger = inject(LoggerService)
  ) =>
    actions.pipe(
      ofType(LoungeMinaAction.get),
      switchMap(() => service.get()),
      map((lounges_mina) => LoungeMinaAction.getSuccess({ lounges_mina })),
      catchError((error) => {
        logger.error('[getloungeMinaEffects erorr]', error);
        return of(LoungeMinaAction.error({ error }));
      })
    ),
  { functional: true }
);
export const createloungeMinaEffects = createEffect(
  (
    actions = inject(Actions),
    service = inject(LoungeMinaService),
    logger = inject(LoggerService)
  ) =>
    actions.pipe(
      ofType(LoungeMinaAction.create),
      switchMap(({ lounge_mina }) => service.create(lounge_mina)),
      map((loungeMina) => LoungeMinaAction.success()),
      catchError((error) => {
        logger.error('[createloungeMinaEffects erorr]', error);
        return of(LoungeMinaAction.error({ error }));
      })
    ),
  { functional: true }
);

export const updateloungeMinaEffects = createEffect(
  (
    actions = inject(Actions),
    service = inject(LoungeMinaService),
    logger = inject(LoggerService)
  ) =>
    actions.pipe(
      ofType(LoungeMinaAction.update),
      switchMap(({ updateLoungeMina }) => service.update(updateLoungeMina)),
      map((loungeMina) => LoungeMinaAction.success()),
      catchError((error) => {
        logger.error('[updateloungeMinaEffects erorr]', error);
        return of(LoungeMinaAction.error({ error }));
      })
    ),
  { functional: true }
);

export const deleteloungeMinaEffects = createEffect(
  (
    actions = inject(Actions),
    service = inject(LoungeMinaService),
    logger = inject(LoggerService)
  ) =>
    actions.pipe(
      ofType(LoungeMinaAction.delete),
      switchMap(({ id }) => service.delete(id)),
      map((loungeMina) => LoungeMinaAction.success()),
      catchError((error) => {
        logger.error('[deleteloungeMinaEffects erorr]', error);
        return of(LoungeMinaAction.error({ error }));
      })
    ),
  { functional: true }
);

export const getDataEffect = createEffect(
  (
    actions = inject(Actions),
    logger = inject(LoggerService),
    store = inject(Store<{ loungeMina: LoungeMinaState }>)
  ) =>
    actions.pipe(
      ofType(LoungeMinaAction.success),
      tap(() => store.dispatch(LoungeMinaAction.get()))
    ),
  { functional: true }
);
