import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LoggerService } from '../../../shared/service/logger.service';
import { ArafahAction } from './arafah.action';
import { catchError, map, of, switchMap } from 'rxjs';
import { ArafahService } from '../service/arafah.service';

export const getBusesEffects = createEffect(
  (
    actions = inject(Actions),
    service = inject(ArafahService),
    logger = inject(LoggerService)
  ) =>
    actions.pipe(
      ofType(ArafahAction.get),
      switchMap(() => service.get()),
      map((data) => ArafahAction.success({ data })),
      catchError((error) => {
        logger.error('[getBusesEffects erorr]', error);
        return of(ArafahAction.error({ error }));
      })
    ),
  { functional: true }
);
// export const createBusEffects = createEffect(
//   (
//     actions = inject(Actions),
//     service = inject(ArafahService),
//     logger = inject(LoggerService)
//   ) =>
//     actions.pipe(
//       ofType(ArafahAction.create),
//       switchMap(({ supervisor }) => service.create(supervisor)),
//       map((supervisors) =>
//         ArafahAction.success({ supervisors: [supervisors] })
//       ),
//       catchError((error) => {
//         logger.error('[createBusEffects erorr]', error);
//         return of(ArafahAction.error({ error }));
//       })
//     ),
//   { functional: true }
// );
