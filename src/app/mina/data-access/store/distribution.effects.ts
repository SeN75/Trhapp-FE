import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LoggerService } from '@/shared/service/logger.service';
import { catchError, combineLatest, map, of, switchMap, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { DistributeService } from '../service/distribution.service';
import { LoungeMinaState } from '@/mina/utils/types/lounges-mina.type';
import { DistributionAction } from './distribution.action';

export const readDistributionEffects = createEffect(
  (
    actions = inject(Actions),
    service = inject(DistributeService),
    logger = inject(LoggerService)
  ) =>
    actions.pipe(
      ofType(DistributionAction.read),
      switchMap(({ pack }) =>
        combineLatest({ data: service.read(pack), pack })
      ),
      map(({ data, pack }) =>
        pack.includes('1')
          ? DistributionAction.readPack1Success({ pack1Read: data })
          : DistributionAction.readPack4Success({ pack4Read: data })
      ),
      catchError((error) => {
        logger.error('[readDistributionEffects erorr]', error);
        return of(DistributionAction.error({ error }));
      })
    ),
  { functional: true }
);
export const peekDistributionEffects = createEffect(
  (
    actions = inject(Actions),
    service = inject(DistributeService),
    logger = inject(LoggerService)
  ) =>
    actions.pipe(
      ofType(DistributionAction.peek),
      switchMap(({ pack, num_employees }) =>
        combineLatest({ data: service.peak({ num_employees }, pack), pack })
      ),
      map(({ data, pack }) =>
        pack.includes('1')
          ? DistributionAction.peekPack1Success({ pack1Peek: data })
          : DistributionAction.peekPack4Success({ pack4Peek: data })
      ),
      catchError((error) => {
        logger.error('[peakDistributionEffects erorr]', error);
        return of(DistributionAction.error({ error }));
      })
    ),
  { functional: true }
);

// export const getDataEffect = createEffect(
//   (
//     actions = inject(Actions),
//     logger = inject(LoggerService),
//     store = inject(Store<{ suite: LoungeMinaState }>)
//   ) =>
//     actions.pipe(
//       ofType(DistributionAction.success),
//       tap(() => store.dispatch(DistributionAction.get()))
//     ),
//   { functional: true }
// );
