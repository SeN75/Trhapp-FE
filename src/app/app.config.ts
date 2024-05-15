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
import { provideHttpClient } from '@angular/common/http';
import { AppTranslateModule } from './app.translate';
import { LoggerService } from './shared/service/logger.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    ...storeProviders.providers,
    // provideHttpClient(withInterceptors([appIdInterceptor])), // TODO: Add interceptor
    provideHttpClient(),
    importProvidersFrom(AppTranslateModule),
    provideEffects(),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    { provide: LoggerService, useClass: LoggerService },
  ],
};
