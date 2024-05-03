import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';

// Function to load translations via HTTP
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/locale/', '.json');
}

@NgModule({
  imports: [
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      defaultLanguage: 'ar',
    }),
  ],
})
export class AppTranslateModule {}
