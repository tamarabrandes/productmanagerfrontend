import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { httpBasicAuthInterceptor } from './_helpers/basic.auth.interceptor';

import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { ProductReducer } from './_store/Product/Product.Reducer';
import { ProductEffects } from './_store/Product/Product.Effects';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimations(), provideHttpClient(withInterceptors([httpBasicAuthInterceptor])),
    provideStore({ 'product': ProductReducer }), provideEffects([ProductEffects]), provideAnimations()]
};
