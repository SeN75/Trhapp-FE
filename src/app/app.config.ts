import {
  ApplicationConfig,
  importProvidersFrom,
  isDevMode,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { storeProviders } from './app.store';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AppTranslateModule } from './app.translate';
import { LoggerService } from './shared/service/logger.service';
import { authInterceptor } from './shared/interceptor/auth.interceptor';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    ...storeProviders.providers,
    // provideHttpClient(withInterceptors([appIdInterceptor])), // TODO: Add interceptor
    provideHttpClient(withInterceptors([authInterceptor])),
    importProvidersFrom(AppTranslateModule),
    provideEffects(),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideCharts(withDefaultRegisterables()),
    { provide: LoggerService, useClass: LoggerService },
  ],
};
