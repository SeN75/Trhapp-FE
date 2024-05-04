import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LoggerService } from '../../../shared/service/logger.service';
import { MinaAction } from './mina.action';
import { catchError, map, of, switchMap } from 'rxjs';
import { MinaService } from '../service/mina.service';

export const getBusesEffects = createEffect(
  (
    actions = inject(Actions),
    service = inject(MinaService),
    logger = inject(LoggerService)
  ) =>
    actions.pipe(
      ofType(MinaAction.get),
      switchMap(() => service.get()),
      map((data) => MinaAction.success({ data })),
      catchError((error) => {
        logger.error('[getBusesEffects erorr]', error);
        return of(MinaAction.error({ error }));
      })
    ),
  { functional: true }
);
// export const createBusEffects = createEffect(
//   (
//     actions = inject(Actions),
//     service = inject(MinaService),
//     logger = inject(LoggerService)
//   ) =>
//     actions.pipe(
//       ofType(MinaAction.create),
//       switchMap(({ supervisor }) => service.create(supervisor)),
//       map((supervisors) =>
//         MinaAction.success({ supervisors: [supervisors] })
//       ),
//       catchError((error) => {
//         logger.error('[createBusEffects erorr]', error);
//         return of(MinaAction.error({ error }));
//       })
//     ),
//   { functional: true }
// );
