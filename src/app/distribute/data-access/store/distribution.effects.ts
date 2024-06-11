import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LoggerService } from '@/shared/service/logger.service';
import { catchError, combineLatest, map, of, switchMap, tap } from 'rxjs';
import { DistributeService } from '../service/distribution.service';
import { DistributionAction } from './distribution.action';
import { Store } from '@ngrx/store';
import { DistributeState } from '@/distribute/utils/types/distribute.type';

export const readDistributionEffects = createEffect(
  (
    actions = inject(Actions),
    service = inject(DistributeService),
    logger = inject(LoggerService)
  ) =>
    actions.pipe(
      ofType(DistributionAction.read),
      switchMap(({ pack }) =>
        combineLatest({ data: service.read(pack), pack }).pipe(
          map(({ data, pack }) =>
            pack.includes('1')
              ? DistributionAction.readPack1Success({ pack1Read: data })
              : DistributionAction.readPack4Success({ pack4Read: data })
          ),
          catchError((error) => {
            logger.error('[readDistributionEffects erorr]', error);
            return of(DistributionAction.error({ error }));
          })
        )
      )
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
      switchMap(({ pack, num_employees, city }) =>
        combineLatest({
          data: service.peak({ num_employees, city }, pack),
          pack,
        }).pipe(
          tap((res) => console.log(res)),
          map(({ data, pack }) =>
            pack.includes('1')
              ? DistributionAction.peekPack1Success({ pack1Peek: data })
              : DistributionAction.peekPack4Success({ pack4Peek: data })
          ),
          catchError((error) => {
            logger.error('[peakDistributionEffects erorr]', error);
            return of(DistributionAction.error({ error }));
          })
        )
      )
    ),
  { functional: true }
);
export const updateDistributionEffects = createEffect(
  (
    actions = inject(Actions),
    service = inject(DistributeService),
    logger = inject(LoggerService)
  ) =>
    actions.pipe(
      ofType(DistributionAction.update),
      switchMap(({ pack, num_employees, city }) =>
        combineLatest({
          data: service.update({ num_employees, city }, pack),
          pack,
        }).pipe(
          tap((res) => console.log(res)),
          map(({ data, pack }) =>
            DistributionAction.success({
              pack: pack as 'package1' | 'package4',
            })
          ),
          catchError((error) => {
            logger.error('[updateDistributionEffects erorr]', error);
            return of(DistributionAction.error({ error }));
          })
        )
      )
    ),
  { functional: true }
);

export const successEffect = createEffect(
  (
    actions = inject(Actions),
    store = inject(Store<{ distribution: DistributeState }>)
  ) =>
    actions.pipe(
      ofType(DistributionAction.success),
      tap((pack) => store.dispatch(DistributionAction.read(pack)))
    ),
  { functional: true, dispatch: false }
);
