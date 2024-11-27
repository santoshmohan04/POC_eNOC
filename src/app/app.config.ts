import { ApplicationConfig,importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HttpClient, provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { routes } from './app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(withFetch()),
    importProvidersFrom([
      BrowserAnimationsModule,
      TranslateModule.forRoot({
        loader: {
          provide:TranslateLoader,
          useFactory:HttpLoaderFactory,
          deps:[HttpClient]
        },
        defaultLanguage: 'en',
      }),
    ]),
   provideZoneChangeDetection({ eventCoalescing: true }),
   provideRouter(routes),
   provideHttpClient(withInterceptorsFromDi()),]
};
