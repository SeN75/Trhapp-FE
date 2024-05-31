import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LoggerService } from '@/shared/service/logger.service';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { AllocationService } from '../service/allocation.service';
import { AllocationState } from '@/pilgrim/utils/types/allocation.type';
import { AllocationAction } from './allocation.action';

export const deleteAllocationEffects = createEffect(
  (
    actions = inject(Actions),
    service = inject(AllocationService),
    logger = inject(LoggerService)
  ) =>
    actions.pipe(
      ofType(AllocationAction.delete),
      switchMap(({ _delete }) => service.delete(_delete)),
      map(() => AllocationAction.success()),
      catchError((error) => {
        logger.error('[deleteAllocationEffects erorr]', error);
        return of(AllocationAction.error({ error }));
      })
    ),
  { functional: true }
);

export const switchAllocationEffects = createEffect(
  (
    actions = inject(Actions),
    service = inject(AllocationService),
    logger = inject(LoggerService)
  ) =>
    actions.pipe(
      ofType(AllocationAction.switch),
      switchMap(({ _switch }) => service.switchAlocation(_switch)),
      map(() => AllocationAction.success()),
      catchError((error) => {
        logger.error('[switchAllocationEffects erorr]', error);
        return of(AllocationAction.error({ error }));
      })
    ),
  { functional: true }
);

export const manualAllocationEffects = createEffect(
  (
    actions = inject(Actions),
    service = inject(AllocationService),
    logger = inject(LoggerService)
  ) =>
    actions.pipe(
      ofType(AllocationAction.manual),
      switchMap(({ _manual }) => service.manual(_manual)),
      map(() => AllocationAction.success()),
      catchError((error) => {
        logger.error('[manualAllocationEffects erorr]', error);
        return of(AllocationAction.error({ error }));
      })
    ),
  { functional: true }
);
