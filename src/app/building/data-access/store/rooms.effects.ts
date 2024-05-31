import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LoggerService } from '@/shared/service/logger.service';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { RoomService } from '../service/rooms.service';
import { RoomState } from '@/building/utils/types/rooms.type';
import { RoomAction } from './rooms.action';

export const getRoomEffects = createEffect(
  (
    actions = inject(Actions),
    service = inject(RoomService),
    logger = inject(LoggerService)
  ) =>
    actions.pipe(
      ofType(RoomAction.get),
      switchMap(() => service.get()),
      map((rooms) => RoomAction.getSuccess({ rooms })),
      catchError((error) => {
        logger.error('[getRoomEffects erorr]', error);
        return of(RoomAction.error({ error }));
      })
    ),
  { functional: true }
);
export const createRoomEffects = createEffect(
  (
    actions = inject(Actions),
    service = inject(RoomService),
    logger = inject(LoggerService)
  ) =>
    actions.pipe(
      ofType(RoomAction.create),
      switchMap(({ room }) => service.create(room)),
      map((Room) => RoomAction.success()),
      catchError((error) => {
        logger.error('[createRoomEffects erorr]', error);
        return of(RoomAction.error({ error }));
      })
    ),
  { functional: true }
);

export const updateRoomEffects = createEffect(
  (
    actions = inject(Actions),
    service = inject(RoomService),
    logger = inject(LoggerService)
  ) =>
    actions.pipe(
      ofType(RoomAction.update),
      switchMap(({ updateRoom }) => service.update(updateRoom)),
      map((Room) => RoomAction.success()),
      catchError((error) => {
        logger.error('[updateRoomEffects erorr]', error);
        return of(RoomAction.error({ error }));
      })
    ),
  { functional: true }
);

export const deleteRoomEffects = createEffect(
  (
    actions = inject(Actions),
    service = inject(RoomService),
    logger = inject(LoggerService)
  ) =>
    actions.pipe(
      ofType(RoomAction.delete),
      switchMap(({ id }) => service.delete(id)),
      map((Room) => RoomAction.success()),
      catchError((error) => {
        logger.error('[deleteRoomEffects erorr]', error);
        return of(RoomAction.error({ error }));
      })
    ),
  { functional: true }
);

export const getDataEffect = createEffect(
  (
    actions = inject(Actions),
    logger = inject(LoggerService),
    store = inject(Store<{ rooms: RoomState }>)
  ) =>
    actions.pipe(
      ofType(RoomAction.success),
      tap(() => store.dispatch(RoomAction.get()))
    ),
  { functional: true }
);
