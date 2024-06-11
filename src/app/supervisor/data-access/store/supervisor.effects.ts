import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LoggerService } from '@/shared/service/logger.service';
import { SupervisorAction } from './supervisor.action';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { SupervisorService } from '../service/supervisor.service';
import { Store } from '@ngrx/store';
import { SupervisorState } from '@/supervisor/utils/types/supervisor.type';

export const getsupervisorEffects = createEffect(
  (
    actions = inject(Actions),
    service = inject(SupervisorService),
    logger = inject(LoggerService)
  ) =>
    actions.pipe(
      ofType(SupervisorAction.get),
      switchMap(() =>
        service.get().pipe(
          map((supervisors) => SupervisorAction.getSuccess({ supervisors })),
          catchError((error) => {
            logger.error('[getsupervisorEffects erorr]', error);
            return of(SupervisorAction.error({ error }));
          })
        )
      )
    ),
  { functional: true }
);
export const createsupervisorEffects = createEffect(
  (
    actions = inject(Actions),
    service = inject(SupervisorService),
    logger = inject(LoggerService)
  ) =>
    actions.pipe(
      ofType(SupervisorAction.create),
      switchMap(({ supervisor }) =>
        service.create(supervisor).pipe(
          map((supervisor) => SupervisorAction.success()),
          catchError((error) => {
            logger.error('[createsupervisorEffects erorr]', error);
            return of(SupervisorAction.error({ error }));
          })
        )
      )
    ),
  { functional: true }
);

export const updatesupervisorEffects = createEffect(
  (
    actions = inject(Actions),
    service = inject(SupervisorService),
    logger = inject(LoggerService)
  ) =>
    actions.pipe(
      ofType(SupervisorAction.update),
      switchMap(({ updateSupervisor }) =>
        service.update(updateSupervisor).pipe(
          map((supervisor) => SupervisorAction.success()),
          catchError((error) => {
            logger.error('[updatesupervisorEffects erorr]', error);
            return of(SupervisorAction.error({ error }));
          })
        )
      )
    ),
  { functional: true }
);

export const deletesupervisorEffects = createEffect(
  (
    actions = inject(Actions),
    service = inject(SupervisorService),
    logger = inject(LoggerService)
  ) =>
    actions.pipe(
      ofType(SupervisorAction.delete),
      switchMap(({ id }) =>
        service.delete(id).pipe(
          map((supervisor) => SupervisorAction.success()),
          catchError((error) => {
            logger.error('[deletesupervisorEffects erorr]', error);
            return of(SupervisorAction.error({ error }));
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
    store = inject(Store<{ supervisor: SupervisorState }>)
  ) =>
    actions.pipe(
      ofType(SupervisorAction.success),
      tap(() => store.dispatch(SupervisorAction.get()))
    ),
  { functional: true }
);
