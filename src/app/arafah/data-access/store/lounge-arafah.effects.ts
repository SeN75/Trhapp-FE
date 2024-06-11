import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LoggerService } from '@/shared/service/logger.service';
import { catchError, combineLatest, map, of, switchMap, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { LoungeArafahService } from '../service/lounge-arafah.service';
import { LoungeArafahState } from '@/arafah/utils/types/lounges-arafah.type';
import { LoungeArafahAction } from './lounge-arafah.action';

export const getloungeArafahEffects = createEffect(
  (
    actions = inject(Actions),
    service = inject(LoungeArafahService),
    logger = inject(LoggerService)
  ) =>
    actions.pipe(
      ofType(LoungeArafahAction.get),
      switchMap(({ pack }) =>
        combineLatest([service.get(pack), of(pack)]).pipe(
          map(([lounges_arafah, pack]) =>
            LoungeArafahAction.getSuccess({ lounges_arafah, pack })
          ),
          catchError((error) => {
            logger.error('[getloungeArafahEffects erorr]', error);
            return of(LoungeArafahAction.error({ error }));
          })
        )
      )
    ),
  { functional: true }
);
// export const createloungeArafahEffects = createEffect(
//   (
//     actions = inject(Actions),
//     service = inject(LoungeArafahService),
//     logger = inject(LoggerService)
//   ) =>
//     actions.pipe(
//       ofType(LoungeArafahAction.create),
//       switchMap(({ lounge_arafah }) => service.create(lounge_arafah)),
//       map((loungeArafah) => LoungeArafahAction.success()),
//       catchError((error) => {
//         logger.error('[createloungeArafahEffects erorr]', error);
//         return of(LoungeArafahAction.error({ error }));
//       })
//     ),
//   { functional: true }
// );

export const updateloungeArafahEffects = createEffect(
  (
    actions = inject(Actions),
    service = inject(LoungeArafahService),
    logger = inject(LoggerService)
  ) =>
    actions.pipe(
      ofType(LoungeArafahAction.update),
      switchMap(({ updateLoungeArafah, pack }) =>
        combineLatest([service.update(updateLoungeArafah), of(pack)]).pipe(
          map(([data, pack]) => LoungeArafahAction.success({ pack })),
          catchError((error) => {
            logger.error('[updateloungeArafahEffects erorr]', error);
            return of(LoungeArafahAction.error({ error }));
          })
        )
      )
    ),
  { functional: true }
);

export const deleteloungeArafahEffects = createEffect(
  (
    actions = inject(Actions),
    service = inject(LoungeArafahService),
    logger = inject(LoggerService)
  ) =>
    actions.pipe(
      ofType(LoungeArafahAction.delete),
      switchMap(({ id, pack }) =>
        combineLatest([service.delete(id), of(pack)]).pipe(
          map(([data, pack]) => LoungeArafahAction.success({ pack })),
          catchError((error) => {
            logger.error('[deleteloungeArafahEffects erorr]', error);
            return of(LoungeArafahAction.error({ error }));
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
    store = inject(Store<{ loungeArafah: LoungeArafahState }>)
  ) =>
    actions.pipe(
      ofType(LoungeArafahAction.success),
      tap(({ pack }) => store.dispatch(LoungeArafahAction.get({ pack })))
    ),
  { functional: true }
);
