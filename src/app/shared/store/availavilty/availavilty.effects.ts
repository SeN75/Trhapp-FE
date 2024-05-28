import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AvailabiltyActions } from './availavilty.action';
import { inject } from '@angular/core';
import { switchMap, map, catchError, of } from 'rxjs';
import { LoggerService } from '../../service/logger.service';
import { AvailabilityService } from '../../service/availability.service';

export const availabiltyEffects = createEffect(
  (
    actions = inject(Actions),
    service = inject(AvailabilityService),
    logger = inject(LoggerService)
  ) =>
    actions.pipe(
      ofType(AvailabiltyActions.get),
      switchMap(({}) => service.get()),
      map((data) => AvailabiltyActions.success({ data })),
      catchError((error) => {
        logger.error('[availabiltyEffects erorr]', error);
        return of(AvailabiltyActions.error({ error }));
      })
    ),
  { functional: true }
);
