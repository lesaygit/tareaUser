import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.router';
import { httpInterceptorProviders } from './usuarios/core/index';
import { HttpClientModule } from '@angular/common/http';
import { AutenticarService } from './usuarios/autenticar.service';
import { provideAnimations } from '@angular/platform-browser/animations';


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    httpInterceptorProviders,
    AutenticarService,
    importProvidersFrom(HttpClientModule),
    provideAnimations(),
  ],







};
